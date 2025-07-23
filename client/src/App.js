import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserSelector from './components/UserSelector';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from "./components/ClaimHistory";
import CustomCursor from "./components/CustomCursor";
import './App.css';
import './confetti.css';
import './cursor.css';
import './responsive.css';
import './mobile.css';
function App() {
  const [selectedUser, setSelectedUser] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const leaderboardRef = useRef();
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    if (isMobile) {
      document.body.classList.add('mobile-device');
    } else {
      document.body.classList.remove('mobile-device');
    }
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [isMobile]);
  const handlePointsClaimed = () => {
    if (leaderboardRef.current) {
      leaderboardRef.current.fetchLeaderboard();
    }
  };
  return (
    <Router>
      <div className="app-container">
        {!isMobile && <CustomCursor />}
        <div className="floating-circle-1"></div>
        <div className="floating-circle-2"></div>
        <div className="floating-circle-3"></div>
        <div className="floating-circle-4"></div>
        <div className="floating-circle-5"></div>
        <div className="floating-circle-6"></div>
        <div className="floating-circle-7"></div>
        <div className="floating-circle-8"></div>
        <div className="floating-circle-9"></div>
        <div className="floating-circle-10"></div>
        <div className="floating-circle-11"></div>
        <div className="floating-circle-12"></div>
        <div className="floating-circle-13"></div>
        <div className="floating-circle-14"></div>
        <div className="floating-circle-15"></div>
        <div className="floating-circle-16"></div>
        <div className="floating-circle-17"></div>
        <div className="floating-circle-18"></div>
        <div className="floating-circle-19"></div>
        <div className="floating-circle-20"></div>
        <div className="floating-circle-21"></div>
        <div className="floating-circle-22"></div>
        <div className="floating-circle-23"></div>
        <div className="floating-circle-24"></div>
        <div className="floating-circle-25"></div>
        <div className="floating-circle-26"></div>
        <div className="floating-circle-27"></div>
        <div className="floating-circle-28"></div>
        <div className="floating-circle-29"></div>
        <div className="floating-circle-30"></div>
        <div className="floating-circle-31"></div>
        <div className="floating-circle-32"></div>
        <div className="floating-circle-33"></div>
        <div className="floating-circle-34"></div>
        <div className="floating-circle-35"></div>
        <div className="floating-circle-36"></div>
        <div className="floating-circle-37"></div>
        <div className="floating-circle-38"></div>
        <div className="floating-circle-39"></div>
        <div className="floating-circle-40"></div>
        <div className="floating-circle-41"></div>
        <div className="floating-circle-42"></div>
        <div className="floating-circle-43"></div>
        <div className="floating-circle-44"></div>
        <div className="floating-circle-45"></div>
        <div className="floating-circle-46"></div>
        <div className="floating-circle-47"></div>
        <div className="floating-circle-48"></div>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <div className="main-content">
              <div className="header-section">
                <div className="trophy-icon">👑</div>
                <h1 className="main-title">Leaderboard</h1>
                <p className="subtitle">Compete and climb to the top!</p>
              </div>
              <div className="controls-section">
                <UserSelector selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                <ClaimButton selectedUser={selectedUser} onClaimed={handlePointsClaimed} />
              </div>
              <Leaderboard ref={leaderboardRef} />
              <footer className="footer">
                Made with ❤️ by Anushka
              </footer>
            </div>
          } />
          <Route path="/history" element={<ClaimHistory />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
