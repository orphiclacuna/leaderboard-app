const router = require('express').Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const randomPoints = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.totalPoints += randomPoints;
    await user.save();

    const history = new ClaimHistory({ userId, pointsClaimed: randomPoints });
    await history.save();

    res.json({ user, randomPoints });
  } catch (error) {
    console.error('Error in claim route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
