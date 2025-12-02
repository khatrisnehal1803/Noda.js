const express = require('express');
const router = express.Router();
const tweetService = require('../services/tweetService');
const validateTweet = require('../middleware/validateTweet');

// GET /api/tweets - Get all tweets
router.get('/', (req, res) => {
  try {
    const tweets = tweetService.getAllTweets();
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tweets' });
  }
});

// POST /api/tweets - Create new tweet (with validation middleware)
router.post('/', validateTweet, (req, res) => {
  try {
    const { username, tweet } = req.body;
    const newTweet = tweetService.createTweet(username, tweet);
    res.status(201).json(newTweet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tweet' });
  }
});

// PUT /api/tweets/:id - Update tweet (with validation middleware)
router.put('/:id', validateTweet, (req, res) => {
  try {
    const { id } = req.params;
    const { tweet } = req.body;
    const updatedTweet = tweetService.updateTweet(id, tweet);
    
    if (!updatedTweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }
    
    res.json(updatedTweet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tweet' });
  }
});

// DELETE /api/tweets/:id - Delete tweet
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const success = tweetService.deleteTweet(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Tweet not found' });
    }
    
    res.json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tweet' });
  }
});

module.exports = router;
