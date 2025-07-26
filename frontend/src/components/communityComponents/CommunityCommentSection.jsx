import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import useCommunity from "../../hooks/communityHooks/useCommunity";
import CommunityCommentTree from "./CommunityCommentTree";

const CommunityCommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { toast } = useToast();
  const { getCommentsForPost, addComment } = useCommunity;

  useEffect(() => {
    loadComments();
  }, [postId]);

  const flattenComments = (nestedComments) => {
    const flat = [];

    const recurse = (comment, parentId = null) => {
      const { replies, ...rest } = comment;
      flat.push({ ...rest, parent_comment_id: parentId });

      if (replies?.length) {
        replies.forEach((reply) => recurse(reply, comment.id));
      }
    };

    nestedComments.forEach((c) => recurse(c));
    return flat;
  };

  const loadComments = async () => {
    try {
      const response = await getCommentsForPost(postId);
      const flatComments = flattenComments(response.comments || []);
      setComments(flatComments);
    } catch {
      toast({
        title: "Error",
        description: "Couldn't load comments",
        variant: "error",
      });
    }
  };

  const handleCreateComment = async () => {
    if (!content.trim()) return;
    setIsPosting(true);
    try {
      await addComment(postId, {
        content: content.trim(),
        parent_comment_id: null,
      });
      setContent("");
      await loadComments();
      toast({ title: "Comment added" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive",
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="space-y-6 pt-6">
      {/* Comment Form */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Leave a Comment</h3>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Say something..."
          className="min-h-[100px]"
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
            onClick={handleCreateComment}
            disabled={isPosting || !content.trim()}
          >
            {isPosting ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>

      {/* Comments Tree */}
      <div className="space-y-4">
        <CommunityCommentTree
          comments={comments}
          postId={postId}
          onCommentsUpdated={loadComments}
        />
      </div>
    </div>
  );
};

export default CommunityCommentSection;