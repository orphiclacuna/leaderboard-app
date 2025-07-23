import React, { useEffect, useState } from "react";
import API from '../api';
const ClaimHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchHistory();
  }, []);
  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await API.get("api/history");
      setHistory(res.data);
    } catch (err) {
      setError("Failed to load claim history");
      console.error("Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  };
  const getAvatarInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  if (loading) {
    return (
      <div className="main-content">
        <div className="header-section">
          <div className="trophy-icon">📜</div>
          <h1 className="main-title">Claim History</h1>
          <p className="subtitle">View all claimed points</p>
        </div>
        <div className="leaderboard-container">
          <div className="loading-message">📜 Loading claim history...</div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="main-content">
        <div className="header-section">
          <div className="trophy-icon">📜</div>
          <h1 className="main-title">Claim History</h1>
          <p className="subtitle">View all claimed points</p>
        </div>
        <div className="leaderboard-container">
          <div className="error-message">❌ {error}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="main-content">
      <div className="header-section">
        <div className="trophy-icon">📜</div>
        <h1 className="main-title">Claim History</h1>
        <p className="subtitle">View all claimed points</p>
      </div>
      <div className="leaderboard-container">
        {history.length === 0 ? (
          <div className="empty-state">
            <h3>No claims yet!</h3>
            <p>Start claiming points to see your history here.</p>
          </div>
        ) : (
          <ul className="leaderboard-list">
            {history.map((entry) => (
              <li key={entry._id} className="leaderboard-item">
                <div className="item-left">
                  <div className="item-avatar">
                    {getAvatarInitial(entry.userId?.name)}
                  </div>
                  <div>
                    <div className="item-name">
                      {entry.userId?.name || 'Unknown Player'}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>
                      {formatDate(entry.timestamp)}
                    </div>
                  </div>
                </div>
                <div className="item-points">
                  <span className="fire-icon">🔥</span>
                  +{entry.pointsClaimed}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default ClaimHistory;
