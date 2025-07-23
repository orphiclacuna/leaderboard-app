import React, { useState } from 'react';
import API from '../api';
export default function ClaimButton({ selectedUser, onClaimed }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const claimPoints = async () => {
    if (!selectedUser) {
      setMessage("Please select a player first!");
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    try {
      setLoading(true);
      setMessage('');
      const response = await API.post('api/claim', { userId: selectedUser });
      const pts = response.data.randomPoints;
      setMessage(`🎉 Amazing! You claimed ${pts} points!`);
      setMessageType('success');
      onClaimed(); 
      setShowConfetti(true);
      setTimeout(() => {
        setMessage('');
        setShowConfetti(false);
      }, 4000);
    } catch (error) {
      console.error('Error claiming points:', error);
      const errorMsg = error.response?.data?.error || "Oops! Something went wrong. Try again!";
      setMessage(`❌ ${errorMsg}`);
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="claim-section">
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(60)].map((_, i) => {
            const baseHeight = Math.min(window.innerWidth * 0.02, 18);
            const baseWidth = Math.min(window.innerWidth * 0.01, 7);
            const height = Math.max(5, baseHeight * 0.7 + Math.random() * baseHeight * 0.5);
            const width = Math.max(2, baseWidth * 0.7 + Math.random() * baseWidth * 0.5);
            const rotation = Math.random() * 360;
            const animationDuration = 4 + Math.random() * 3;
            const colors = [
              '#ff0000', '#ffa500', '#ffff00', '#00ff00', '#0088ff', '#8000ff', '#ff00ff',
              '#ff3377', '#33ff77', '#77ff33', '#33ffff', '#ffaa00', '#ff00aa', '#ffffff'
            ];
            const isMetallic = Math.random() < 0.2;
            const metallicStyles = isMetallic ? {
              background: `linear-gradient(135deg, ${colors[Math.floor(Math.random() * colors.length)]}, #fff)`,
              boxShadow: '0 0 5px rgba(255, 255, 255, 0.7)'
            } : {
              backgroundColor: colors[Math.floor(Math.random() * colors.length)]
            };
            return (
              <div key={i} className={`confetti ${isMetallic ? 'metallic' : ''}`} style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${animationDuration}s`,
                width: `${width}px`,
                height: `${height}px`,
                transform: `rotate(${rotation}deg)`,
                ...metallicStyles
              }} />
            );
          })}
        </div>
      )}
      {selectedUser && (
        <button 
          className="claim-button responsive-button"
          onClick={claimPoints} 
          disabled={loading}
        >
          {loading ? '⏳ Claiming...' : '🎯 Claim Points'}
        </button>
      )}
      {message && (
        <div className={`claim-message ${messageType}`}>
          {message}
        </div>
      )}
    </div>
  );
}
