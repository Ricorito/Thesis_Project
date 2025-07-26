import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useCommunity from "../../hooks/communityHooks/useCommunity";

const CommunityCommentForm = ({ postId, parentCommentId = null, onCommentCreated }) => {
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { toast } = useToast();

  const handleCreate = async () => {
    if (!content.trim()) return;
    setIsPosting(true);
    try {
      const created = await useCommunity.addComment(postId, {
        content: content.trim(),
        parent_comment_id: parentCommentId,
      });
      toast({
        title: "Comment added",
        description: "Your comment has been sent.",
        variant: "success",
      });
      setContent("");
      onCommentCreated?.(created);
    } catch {
      toast({
        title: "Error",
        description: "Failed to post comment.",
        variant: "error",
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="space-y-2">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={parentCommentId ? "Write a reply..." : "Share your thoughts..."}
        className="min-h-[80px] resize-none"
      />
      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setContent("")}
          disabled={isPosting || !content.trim()}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={handleCreate}
          disabled={isPosting || !content.trim()}
        >
          {isPosting ? "Posting..." : parentCommentId ? "Reply" : "Post Comment"}
        </Button>
      </div>
    </div>
  );
};

export default CommunityCommentForm;
