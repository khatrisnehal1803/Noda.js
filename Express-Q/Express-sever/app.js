const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

const pagesDir = path.join(__dirname, 'pages');
const logFile = path.join(__dirname, 'logs', 'server.log');

// Middleware to log every request
app.use((req, res, next) => {
  const logEntry = `${new Date().toISOString()} - Request: ${req.url}\n`;
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) console.error('Error writing log:', err);
  });
  next();
});

// Serve static HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(pagesDir, 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(pagesDir, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(pagesDir, 'contact.html'));
});

// Bonus: JSON route
app.get('/data', (req, res) => {
  const data = {
    server: 'Express.js File Server',
    version: '1.0.0',
    author: 'Snehal Khatri',
    message: 'Hello from Express server!'
  };
  res.json(data);
});

// Handle 404 - any other route
app.use((req, res) => {
  res.status(404).sendFile(path.join(pagesDir, '404.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
