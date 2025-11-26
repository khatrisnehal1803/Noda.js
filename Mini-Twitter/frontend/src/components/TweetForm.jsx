import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { logRequest } from "@/middleware/logger";
import { validateTweet } from "@/middleware/validateTweet";
import { createTweet } from "@/services/tweetService";

export const TweetForm = ({ onTweetAdded }) => {
  const [username, setUsername] = useState("");
  const [tweetContent, setTweetContent] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate middleware logging
    logRequest("POST", "/api/tweets");

    // Simulate route-level validation middleware
    const errors = validateTweet(tweetContent, username);

    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors[0].message,
        variant: "destructive",
      });
      return;
    }

    try {
      // Call service to create tweet (connects to Express backend)
      await createTweet(username.trim(), tweetContent.trim());

      toast({
        title: "Tweet posted!",
        description: "Your tweet has been published successfully.",
      });

      // Reset form
      setUsername("");
      setTweetContent("");
      onTweetAdded();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to post tweet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const charCount = tweetContent.length;
  const isOverLimit = charCount > 280;
  const isUnderMinimum = charCount > 0 && charCount < 5;

  return (
    <Card className="p-4 border-border">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-input"
            maxLength={50}
          />
        </div>

        <div className="relative">
          <Textarea
            placeholder="What's happening?"
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            className="min-h-[120px] border-input resize-none"
            maxLength={280}
          />
          <div
            className={`absolute bottom-2 right-2 text-sm ${
              isOverLimit
                ? "text-destructive font-semibold"
                : isUnderMinimum
                ? "text-muted-foreground"
                : charCount > 260
                ? "text-primary font-medium"
                : "text-muted-foreground"
            }`}
          >
            {charCount}/280
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!username.trim() || !tweetContent.trim() || isOverLimit}
            className="bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-full px-6"
          >
            Tweet
          </Button>
        </div>
      </form>
    </Card>
  );
};
