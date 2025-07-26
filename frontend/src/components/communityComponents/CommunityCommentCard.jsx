import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import CommunityCommentForm from "./CommunityCommentForm";
import {
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "../../contexts/authContext";
import useCommunity from "../../hooks/communityHooks/useCommunity";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const CommunityCommentCard = ({
  comment,
  postId,
  onCommentsUpdated,
  depth = 0,
  hasReplies = false,
  areRepliesVisible = false,
  onToggleReplies,
  onShowMoreReplies
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [isUpvoted, setIsUpvoted] = useState(!!comment.isUpvoted);
  const [upvotes, setUpvotes] = useState(comment.upvotes);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { toast } = useToast();
  const isOwner = currentUser?.id === comment.user_id;

  const handleDelete = async () => {
    try {
      await useCommunity.deleteComment(comment.id);
      toast({ title: "Deleted", description: "Comment removed." });
      onCommentsUpdated?.(comment.id);
      setShowDeleteDialog(false);
    } catch {
      toast({ title: "Error", description: "Could not delete comment.", variant: "error" });
    }
  };

  const handleReport = async () => {
    try {
      await useCommunity.reportComment(comment.id, "Inappropriate content");
      toast({ title: "Reported", description: "Comment submitted for review." });
    } catch {
      toast({ title: "Error", description: "Could not report comment.", variant: "error" });
    }
  };

  const handleUpvote = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const newUpvotedState = !isUpvoted;
      setIsUpvoted(newUpvotedState);
      setUpvotes((prev) => newUpvotedState ? prev + 1 : prev - 1);

      if (isUpvoted) {
        await useCommunity.downvoteComment(comment.id);
      } else {
        await useCommunity.upvoteComment(comment.id);
      }

      onCommentsUpdated?.();
    } catch {
      setIsUpvoted(!!comment.isUpvoted);
      setUpvotes(comment.upvotes ?? 0);
      toast({
        title: "Error",
        description: "Failed to update vote",
        variant: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-2 relative">
      <div className="flex items-center gap-2 mb-1">
        <Avatar className="w-6 h-6">
          <AvatarImage src={comment.userImg} alt={comment.username} />
          <AvatarFallback>{comment.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
        </Avatar>
        <span className="font-medium text-sm">{comment.username || "User"}</span>

        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-teal-700">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isOwner && (
                <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>Delete</DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleReport}>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <p className="mb-2 text-sm">{comment.content}</p>

      <div className="flex items-center space-x-4">
        {hasReplies && (
          <Button
            variant="ghost"
            size="xs"
            className="flex items-center gap-1"
            onClick={onToggleReplies}
          >
            {areRepliesVisible ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            {areRepliesVisible ? "Hide Replies" : "Show Replies"}
          </Button>
        )}

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleUpvote}
            className={`rounded-full ${isUpvoted ? "bg-teal-500 text-white" : "text-gray-500 hover:bg-teal-500"}`}
          >
            {isUpvoted ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
          </Button>
          <span className={`text-sm font-medium ${isUpvoted ? "text-teal-500" : "text-gray-500"}`}>
            {typeof upvotes === "number" ? upvotes : comment.upvotes ?? 0}
          </span>
        </div>

        {depth < 2 && (
          <Button variant="ghost" size="xs" onClick={() => setShowReplyForm(!showReplyForm)}>
            {showReplyForm ? "Cancel" : "Reply"}
          </Button>
        )}
      </div>

      {showReplyForm && (
        <div className="mt-2">
          <CommunityCommentForm
            postId={postId}
            parentCommentId={comment.id}
            onCommentCreated={() => {
              setShowReplyForm(false);
              onCommentsUpdated?.();
              if (onToggleReplies && !areRepliesVisible) {
                 onToggleReplies();
              }
            }}
          />
        </div>
      )}

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Comment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button variant="ghost" size="sm">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityCommentCard;