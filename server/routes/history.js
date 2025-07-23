const router = require('express').Router();
const ClaimHistory = require('../models/ClaimHistory');

router.get("/", async (req, res) => {
  try {
    const history = await ClaimHistory
      .find()
      .populate("userId", "name")
      .sort({ timestamp: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch history" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await ClaimHistory
      .find({ userId })
      .populate("userId", "name")
      .sort({ timestamp: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch user history" });
  }
});

module.exports = router;
