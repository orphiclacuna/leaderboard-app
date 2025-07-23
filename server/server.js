const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'https://leaderboardwebapplication.netlify.app/',
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

app.use('/api/users', require('./routes/users'));
app.use('/api/claim', require('./routes/claim'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/history', require('./routes/history'));

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
