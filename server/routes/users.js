const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.json(user);
});

module.exports = router;
