// Import core modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define constants
const PORT = 5000;
const logFile = path.join(__dirname, 'logs', 'server.log');
const pagesDir = path.join(__dirname, 'pages');

// Helper function to log requests
function logRequest(url) {
  const logEntry = `${new Date().toISOString()} - Request: ${url}\n`;
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
}

// Helper function to serve HTML pages
function servePage(res, filename, statusCode = 200) {
  const filePath = path.join(pagesDir, filename);
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error');
    } else {
      res.writeHead(statusCode, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}

// Create HTTP server
const server = http.createServer((req, res) => {
  logRequest(req.url);

  switch (req.url) {
    case '/':
      servePage(res, 'index.html');
      break;
    case '/about':
      servePage(res, 'about.html');
      break;
    case '/contact':
      servePage(res, 'contact.html');
      break;
    case '/data':
      // Bonus: Return JSON response
      const data = {
        name: "File Server",
        version: "1.0.0",
        message: "Hello from Node.js server!"
      };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data, null, 2));
      break;
    default:
      servePage(res, '404.html', 404);
      break;
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
