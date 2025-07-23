import axios from 'axios';

const API = axios.create({
  baseURL: 'https://leaderboard-app-2hxn.onrender.com/api'
});

export default API;
