const express = require('express');
const router = express.Router();

// Task 1: Basic Server Response
router.get('/', (req, res) => {
  res.send('Server is Running Successfully');
});

module.exports = router;
