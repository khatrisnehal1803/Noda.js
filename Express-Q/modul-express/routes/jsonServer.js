const express = require('express');
const router = express.Router();

// Task 2: Return JSON data
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the JSON API',
    status: 'success',
    developer: 'Snehal Khatri',
    time: new Date().toLocaleString()
  });
});

module.exports = router;
