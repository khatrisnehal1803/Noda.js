const express = require('express');
const app = express();
const PORT = 5000;

// Import routes
const basicServer = require('./routes/basicServer');
const jsonServer = require('./routes/jsonServer');
const logServer = require('./routes/logServer');

// Use routes
app.use('/', basicServer);
app.use('/json', jsonServer);
app.use('/log', logServer);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
