import { useState, useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowUp,
  ArrowDown,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import useCommunity from "../../hooks/communityHooks/useCommunity";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "../../contexts/authContext";

const CommunityPostCard = ({ post, onUpvote, onCategoryClick, onDelete }) => {
  const { toast } = useToast();
  const { currentUser } = useContext(AuthContext);

  const [isUpvoted, setIsUpvoted] = useState(!!post.isUpvoted);
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [isLoading, setIsLoading] = useState(false);

  const shortContent =
    DOMPurify.sanitize(post.content || "").slice(0, 350) + " ... ";
  const navigate = useNavigate();

  const handleUpvote = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const newUpvotedState = !isUpvoted;
      setIsUpvoted(newUpvotedState);
      setUpvotes((prev) => (newUpvotedState ? prev + 1 : prev - 1));

      if (isUpvoted) {
        await useCommunity.downvotePost(post.id);
      } else {
        await useCommunity.upvotePost(post.id);
      }

      onUpvote?.(post.id, newUpvotedState);
    } catch (err) {
      setIsUpvoted(!!post.isUpvoted);
      setUpvotes(post.upvotes || 0);
      toast({
        title: "Error",
        description: "Failed to update vote",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReport = async () => {
    try {
      await useCommunity.reportPost(post.id, "Inappropriate content");
      toast({
        title: "Reported",
        description: "Post submitted for review",
        variant: "directive",
      });
    } catch {
      toast({
        title: "Error",
        description: "Could not report",
        variant: "error",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await useCommunity.deletePost(post.id);
      toast({ title: "Deleted", description: "Post removed" });
      onDelete?.(post.id);
    } catch {
      toast({
        title: "Error",
        description: "Could not delete",
        variant: "error",
      });
    }
  };

  const handlePostOpen = (postId) => {
    navigate(`/community/${postId}`);
  };
 
  return (
    <Card className="p-4 bg-white border border-gray-300 rounded-lg hover:shadow-md transition duration-200">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex sm:flex-col items-center gap-1 sm:gap-2 sm:w-12">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleUpvote}
            className={`rounded-full ${
              isUpvoted
                ? "bg-teal-500 text-white"
                : "text-gray-500 hover:bg-teal-500"
            }`}>
            {isUpvoted ? (
              <ArrowDown className="w-4 h-4" />
            ) : (
              <ArrowUp className="w-4 h-4" />
            )}
          </Button>
          <span
            className={`text-sm font-medium cursor-default ${
              isUpvoted ? "text-teal-500 text-xl" : "text-gray-500 "
            }`}>
            {upvotes}
          </span>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <Badge
              className="bg-green-100 border border-teal-600 text-black hover:bg-darkblue hover:text-white cursor-pointer"
              onClick={() => onCategoryClick?.(post.category)}>
              CATEGORY : {post.category}
            </Badge>
            <span>
              ◉{" "}
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </span>{" "}
          </div>
          <Link
            to={`/profile/`}
            className="text-teal-600 hover:underline text-xs">
            @{post.author}
          </Link>
          <h3
            className="text-lg pt-2 font-semibold border-b-2 capitalize border-gray-200 text-gray-800 cursor-pointer hover:text-teal-700"
            onClick={() => handlePostOpen(post.id)}>
            {post.title}
          </h3>
          <div
            className="text-sm text-gray-700"
            dangerouslySetInnerHTML={{ __html: shortContent }}
          />

          <div className="flex items-center justify-between pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePostOpen(post.id)}
              className="text-gray-500 hover:text-teal-700">
              <MessageCircle className="w-4 h-4 mr-1" />
              {post.comments}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-teal-700">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
{post.user_id === currentUser?.id && (
  <>
    <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
    <DropdownMenuItem onClick={() => navigate(`/community/${post.id}`, { state: { edit: true } })}>
      Edit
    </DropdownMenuItem>
  </>
)}

                <DropdownMenuItem onClick={handleReport}>
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CommunityPostCard;
