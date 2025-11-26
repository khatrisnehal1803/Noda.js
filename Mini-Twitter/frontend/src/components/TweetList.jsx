import { TweetCard } from "./TweetCard";
import { Twitter } from "lucide-react";

export const TweetList = ({ tweets, onUpdate }) => {
  return (
    <div className="space-y-4">
      {tweets.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
            <Twitter className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            No tweets yet
          </h2>
          <p className="text-muted-foreground">
            Be the first to share what's happening!
          </p>
        </div>
      ) : (
        tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} onUpdate={onUpdate} />
        ))
      )}
    </div>
  );
};
