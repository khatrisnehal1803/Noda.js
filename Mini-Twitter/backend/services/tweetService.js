// User-defined module for tweet operations
// Uses fs module to read/write tweets.json

const fs = require('fs');
const path = require('path');

const TWEETS_FILE = path.join(__dirname, '../data/tweets.json');

// Helper function to read tweets from file
const readTweetsFromFile = () => {
  try {
    if (!fs.existsSync(TWEETS_FILE)) {
      // Create empty tweets.json if it doesn't exist
      fs.writeFileSync(TWEETS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(TWEETS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tweets:', error);
    return [];
  }
};

// Helper function to write tweets to file
const writeTweetsToFile = (tweets) => {
  try {
    fs.writeFileSync(TWEETS_FILE, JSON.stringify(tweets, null, 2));
  } catch (error) {
    console.error('Error writing tweets:', error);
    throw error;
  }
};

// Get all tweets
const getAllTweets = () => {
  return readTweetsFromFile();
};

// Create new tweet
const createTweet = (username, tweetContent) => {
  const tweets = readTweetsFromFile();
  
  const newTweet = {
    id: Date.now().toString(),
    username: username.trim(),
    tweet: tweetContent.trim(),
    createdAt: new Date().toISOString(),
  };
  
  tweets.unshift(newTweet); // Add to beginning (like Twitter)
  writeTweetsToFile(tweets);
  
  return newTweet;
};

// Update existing tweet
const updateTweet = (id, tweetContent) => {
  const tweets = readTweetsFromFile();
  const index = tweets.findIndex(t => t.id === id);
  
  if (index === -1) {
    return null;
  }
  
  tweets[index] = {
    ...tweets[index],
    tweet: tweetContent.trim(),
    editedAt: new Date().toISOString(),
  };
  
  writeTweetsToFile(tweets);
  return tweets[index];
};

// Delete tweet
const deleteTweet = (id) => {
  const tweets = readTweetsFromFile();
  const filteredTweets = tweets.filter(t => t.id !== id);
  
  if (filteredTweets.length === tweets.length) {
    return false; // Tweet not found
  }
  
  writeTweetsToFile(filteredTweets);
  return true;
};

module.exports = {
  getAllTweets,
  createTweet,
  updateTweet,
  deleteTweet,
};
