const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });

  const leaderboard = users.map((user, index) => ({
    name: user.name,
    totalPoints: user.totalPoints,
    rank: index + 1
  }));

  res.json(leaderboard);
});

module.exports = router;
