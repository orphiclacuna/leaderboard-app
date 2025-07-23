import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import API from '../api';
const Leaderboard = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get('/leaderboard');
      setData(response.data);
    } catch (err) {
      setError('Failed to load leaderboard');
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };
  useImperativeHandle(ref, () => ({
    fetchLeaderboard
  }));
  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 10000);
    return () => clearInterval(interval);
  }, []);
  const getAvatarInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };
  const renderTopWinners = () => {
    const topThree = data.slice(0, 3);
    if (topThree.length === 0) return null;
    const winnerCards = [];
    topThree.forEach((user, index) => {
      winnerCards.push(
        <div key={user.name} className={`winner-card ${index === 0 ? 'first' : index === 1 ? 'second' : 'third'}`}>
          <div className="winner-position">{index + 1}</div>
          <div className="winner-avatar">
            {getAvatarInitial(user.name)}
          </div>
          <div className="winner-name">{user.name}</div>
          <div className="winner-points">
            <span className="fire-icon">🐦‍🔥</span>
            {user.totalPoints}
          </div>
        </div>
      );
    });
    while (winnerCards.length < 3) {
      const position = winnerCards.length + 1;
      winnerCards.push(
        <div key={`placeholder-${position}`} className={`winner-card ${position === 1 ? 'first' : position === 2 ? 'second' : 'third'} placeholder`}>
          <div className="winner-position">{position}</div>
          <div className="winner-avatar placeholder-avatar">?</div>
          <div className="winner-name">Unclaimed</div>
          <div className="winner-points">
            <span className="fire-icon">⭐</span>
            0
          </div>
        </div>
      );
    }
    return (
      <div className="top-winners">
        {winnerCards}
      </div>
    );
  };
  const renderRestOfLeaderboard = () => {
    const restOfUsers = data.slice(3);
    if (restOfUsers.length === 0) return null;
    return (
      <ul className="leaderboard-list">
        {restOfUsers.map((user) => (
          <li key={user.name} className="leaderboard-item">
            <div className="item-left">
              <div className="item-rank">{user.rank}</div>
              <div className="item-avatar">
                {getAvatarInitial(user.name)}
              </div>
              <div className="item-name">{user.name}</div>
            </div>
            <div className="item-points">
              <span className="fire-icon">🔥</span>
              {user.totalPoints}
            </div>
          </li>
        ))}
      </ul>
    );
  };
  if (loading && data.length === 0) {
    return (
      <div className="leaderboard-container">
        <div className="loading-message">🏆 Loading leaderboard...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="leaderboard-container">
        <div className="error-message">❌ {error}</div>
      </div>
    );
  }
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h3 className="leaderboard-title">🏆 Leaderboard</h3>
      </div>
      {data.length === 0 ? (
        <div className="empty-state">
          <h3>No competitors yet!</h3>
          <p>Add some users and start claiming points to see the leaderboard!</p>
        </div>
      ) : (
        <>
          {renderTopWinners()}
          {renderRestOfLeaderboard()}
        </>
      )}
    </div>
  );
});
Leaderboard.displayName = 'Leaderboard';
export default Leaderboard;
