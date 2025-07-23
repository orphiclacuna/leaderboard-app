import React, { useState, useEffect } from 'react';
import API from '../api';
import '../userSelector.css';
export default function UserSelector({ selectedUser, setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddInput, setShowAddInput] = useState(false);
  useEffect(() => {
    fetchUsers();
    const handleFocus = () => {
      fetchUsers();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const timestamp = new Date().getTime();
      const response = await API.get(`api/users?t=${timestamp}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };
  const addUser = async () => {
    if (!newUser.trim()) return;
    try {
      const response = await API.post('api/users', { name: newUser.trim() });
      setUsers([...users, response.data]);
      setNewUser('');
      setShowAddInput(false); 
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  const handleSelectPlayer = () => {
    setShowDropdown(true);
    setShowAddInput(false);
  };
  const handleAddNewPlayer = () => {
    setShowAddInput(true);
    setShowDropdown(false);
  };
  const handleDropdownChange = (e) => {
    setSelectedUser(e.target.value);
    if (e.target.value) {
      setShowDropdown(false); 
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addUser();
    }
  };
  const selectedUserName = users.find(user => user._id === selectedUser)?.name || '';
  return (
    <div className="user-selector">
      {}
      <div className="user-selector-container">
        <button 
          onClick={handleSelectPlayer}
          className={`selector-button select-player-btn ${showDropdown ? 'active' : ''}`}
        >
          {selectedUserName ? `Selected: ${selectedUserName}` : '👤 Select Player'}
        </button>
        <button 
          onClick={handleAddNewPlayer}
          className={`selector-button add-player-btn ${showAddInput ? 'active' : ''}`}
        >
          ➕ Add New Player
        </button>
      </div>
      {}
      {showDropdown && (
        <select 
          className="user-select"
          onChange={handleDropdownChange}
          value={selectedUser}
          disabled={loading}
          style={{ marginBottom: '15px' }}
        >
          <option value="">
            {loading ? "Loading players..." : `Choose your player`}
          </option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      )}
      {}
      {showAddInput && (
        <div className="add-user-section" style={{ marginBottom: '15px' }}>
          <input
            type="text"
            className="user-input"
            placeholder="Enter new player name"
            value={newUser}
            onChange={e => setNewUser(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
          />
          <button 
            className="add-user-btn"
            onClick={addUser}
            disabled={!newUser.trim()}
          >
            ➕ Add
          </button>
        </div>
      )}
    </div>
  );
}
