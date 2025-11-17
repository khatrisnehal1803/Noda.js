const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Task 3: Write current date & time to file
router.get('/', (req, res) => {
  const logPath = path.join(__dirname, '../logs/request.log');
  const currentTime = new Date().toLocaleString();

  // Append date and time to log file
  fs.appendFileSync(logPath, `GET request at: ${currentTime}\n`);

  res.send('Date and Time logged successfully!');
});

module.exports = router;
