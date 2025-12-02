const API_BASE_URL = "http://localhost:3000/api";

// GET /api/tweets - Fetch all tweets
export const getAllTweets = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tweets`);
    if (!response.ok) {
      throw new Error("Failed to fetch tweets");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return [];
  }
};

// POST /api/tweets - Create new tweet
export const createTweet = async (username, tweet) => {
  const response = await fetch(`${API_BASE_URL}/tweets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, tweet }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create tweet");
  }

  return await response.json();
};

// PUT /api/tweets/:id - Update existing tweet
export const updateTweet = async (id, tweetContent) => {
  const response = await fetch(`${API_BASE_URL}/tweets/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tweet: tweetContent }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update tweet");
  }

  return await response.json();
};

// DELETE /api/tweets/:id - Delete tweet
export const deleteTweet = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tweets/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete tweet");
  }

  return true;
};
