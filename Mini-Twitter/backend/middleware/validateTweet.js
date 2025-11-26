// Route-level middleware
// Validates tweet content before POST/PUT

const validateTweet = (req, res, next) => {
  const { tweet, username } = req.body;
  
  // For POST requests, check if username is provided
  if (req.method === 'POST' && (!username || !username.trim())) {
    return res.status(400).json({ error: 'Username is required' });
  }
  
  // Check if tweet is empty
  if (!tweet || !tweet.trim()) {
    return res.status(400).json({ error: 'Tweet cannot be empty' });
  }
  
  // Check minimum length (5 characters)
  if (tweet.trim().length < 5) {
    return res.status(400).json({ error: 'Tweet must be at least 5 characters long' });
  }
  
  // Check maximum length (280 characters like Twitter)
  if (tweet.length > 280) {
    return res.status(400).json({ error: 'Tweet cannot exceed 280 characters' });
  }
  
  next();
};

module.exports = validateTweet;
