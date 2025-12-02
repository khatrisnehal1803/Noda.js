// Route-level middleware simulation
// Validates tweet content before POST/PUT

export const validateTweet = (tweet, username) => {
  const errors = [];

  // Check if username is provided (for POST only)
  if (username !== undefined && !username.trim()) {
    errors.push({
      field: "username",
      message: "Username is required",
    });
  }

  // Check if tweet is empty
  if (!tweet || !tweet.trim()) {
    errors.push({
      field: "tweet",
      message: "Tweet cannot be empty",
    });
    return errors; // Early return if empty
  }

  // Check minimum length (5 characters)
  if (tweet.trim().length < 5) {
    errors.push({
      field: "tweet",
      message: "Tweet must be at least 5 characters long",
    });
  }

  // Check maximum length (280 characters like Twitter)
  if (tweet.length > 280) {
    errors.push({
      field: "tweet",
      message: "Tweet cannot exceed 280 characters",
    });
  }

  return errors;
};
