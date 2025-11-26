const express = require('express');
const cors = require('cors');
const path = require('path');
const tweetRoutes = require('./routes/tweetRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Application-level middleware - Logger
app.use(logger);

// Routes
app.use('/api/tweets', tweetRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Mini Twitter API',
    endpoints: {
      'GET /api/tweets': 'Get all tweets',
      'POST /api/tweets': 'Create new tweet',
      'PUT /api/tweets/:id': 'Update tweet',
      'DELETE /api/tweets/:id': 'Delete tweet'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 API available at http://localhost:${PORT}/api/tweets`);
});

module.exports = app;
