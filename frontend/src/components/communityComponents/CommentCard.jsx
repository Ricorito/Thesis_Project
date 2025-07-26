import { ArrowUp, Reply, Flag, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import useCommunity from "@/frontend/hooks/communityHooks/useCommunity";

const CommentCard = ({ comment, onUpvote, onReply, postId }) => {
  const [isUpvoted, setIsUpvoted] = useState(comment.isUpvoted || false);
  const [upvoteCount, setUpvoteCount] = useState(comment.upvotes);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const depth = comment.depth || 0;
  const maxDepth = 6;

  const handleUpvote = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await useCommunity.upvoteComment(comment.id);
      setIsUpvoted(!isUpvoted);
      setUpvoteCount(isUpvoted ? upvoteCount - 1 : upvoteCount + 1);
      onUpvote?.(comment.id);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upvote comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async () => {
    if (!replyContent.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      const newComment = await useCommunity.addComment(postId, {
        content: replyContent,
        parent_comment_id: comment.id
      });
      onReply?.(comment.id, replyContent, newComment);
      setReplyContent("");
      setShowReplyForm(false);
      toast({
        title: "Success",
        description: "Reply added successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add reply. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReport = async () => {
    try {
      await useCommunity.reportComment(comment.id, "Inappropriate content");
      toast({
        title: "Reported",
        description: "Comment has been reported for review.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to report comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`${depth > 0 ? 'ml-6 border-l-2 border-border pl-4' : ''}`}>
      <div className="bg-comment-bg rounded-lg p-3 mb-2">
        <div className="flex gap-3">
          {/* Upvote Section */}
          <div className="flex flex-col items-center space-y-1 min-w-[32px]">
            <Button
              variant="ghost"
              size="icon"
              className={`h-6 w-6 rounded-full transition-colors ${
                isUpvoted 
                  ? 'text-upvote hover:text-upvote-hover bg-upvote/10' 
                  : 'text-muted-foreground hover:text-upvote hover:bg-upvote/10'
              }`}
              onClick={handleUpvote}
            >
              <ArrowUp className="h-3 w-3" />
            </Button>
            <span className={`text-xs font-medium ${isUpvoted ? 'text-upvote' : 'text-muted-foreground'}`}>
              {upvoteCount}
            </span>
          </div>

          {/* Comment Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium">{comment.author}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm text-foreground/90 mb-2">
              {comment.content}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {depth < maxDepth && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-muted-foreground hover:text-foreground h-7 px-2"
                  onClick={() => setShowReplyForm(!showReplyForm)}
                >
                  <Reply className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-muted-foreground hover:text-destructive h-7 px-2"
                onClick={handleReport}
              >
                <Flag className="h-3 w-3 mr-1" />
                Report
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-auto text-muted-foreground hover:text-foreground h-7 w-7"
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="ml-9 mb-3">
          <Textarea
            placeholder="Share your thoughts or support..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="mb-2 min-h-[80px] resize-none"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleReply} disabled={isLoading}>
              {isLoading ? "Posting..." : "Reply"}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowReplyForm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-1">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={{ ...reply, depth: depth + 1 }}
              onUpvote={onUpvote}
              onReply={onReply}
              postId={postId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;