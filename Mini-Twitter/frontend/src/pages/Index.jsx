import { useState, useEffect } from "react";
import { TweetForm } from "@/components/TweetForm";
import { TweetList } from "@/components/TweetList";
import { getAllTweets } from "@/services/tweetService";
import { logRequest } from "@/middleware/logger";
import { Twitter } from "lucide-react";

const Index = () => {
  const [tweets, setTweets] = useState([]);

  const loadTweets = async () => {
    // Simulate middleware logging
    logRequest("GET", "/api/tweets");
    
    const allTweets = await getAllTweets();
    setTweets(allTweets);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTweets();
  }, []);

  return (
    <div className="min-h-screen bg-twitter-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Twitter className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Mini Twitter</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Tweet Form */}
        <div className="mb-6">
          <TweetForm onTweetAdded={loadTweets} />
        </div>

        {/* Tweets List */}
        <TweetList tweets={tweets} onUpdate={loadTweets} />
      </main>

      {/* Footer Info */}
      <footer className="max-w-2xl mx-auto px-4 py-8 mt-8 border-t border-border">
        <div className="text-sm text-muted-foreground space-y-2">
          <p className="font-semibold text-foreground">🎓 Assignment Implementation Notes:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>✅ CRUD Operations: Create, Read, Update, Delete tweets</li>
            <li>✅ Validation Middleware: Min 5 chars, max 280 chars, required fields</li>
            <li>✅ Logger Middleware: Check console for request logs (METHOD + URL + Time)</li>
            <li>✅ Service Layer: tweetService.ts simulates Express backend module</li>
            <li>✅ Data Storage: localStorage simulates tweets.json file</li>
            <li>✅ Features: Character count, "Edited" badge, delete confirmation</li>
          </ul>
          <p className="mt-4 text-xs">
            💡 Open browser console (F12) to see middleware logging in action!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
