import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCommunity from "../../hooks/communityHooks/useCommunity";
import { ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "../../contexts/authContext";
import { useToast } from "@/hooks/use-toast";
import DOMPurify from "dompurify";
import { formatDistanceToNow } from "date-fns";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CommunityCommentSection from "./CommunityCommentSection";

const CommunityPostDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editContent, setEditContent] = useState("");
  useEffect(() => {
    if (showEditDialog && post) {
      setEditContent(post.content || "");
    }
  }, [showEditDialog, post]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await useCommunity.getSinglePost(id);
        setPost(data);
        setIsUpvoted(!!data.isUpvoted);
        setUpvotes(data.upvotes ?? 0);
      } catch {
        toast({
          title: "Error",
          description: "Could not load post or comments.",
          variant: "error",
        });
      }
    })();
  }, [id, toast]);

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

  const handleUpdate = async () => {
    try {
      const sanitized = DOMPurify.sanitize(editContent);

      await useCommunity.updatePost(post.id, {
        content: sanitized,
      });

      setPost({
        ...post,
        content: sanitized,
      });

      toast({
        title: "Update Success",
        description: "The post has been updated!",
      });
      setShowEditDialog(false);
    } catch {
      toast({
        title: "Error",
        description: "Failed to update.",
        variant: "error",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await useCommunity.deletePost(post.id);
      toast({ title: "Deleted", description: "Post removed." });
      navigate("/community");
    } catch {
      toast({
        title: "Error",
        description: "Could not delete post.",
        variant: "error",
      });
    }
  };

  const handleReport = async () => {
    try {
      await useCommunity.reportPost(post.id, "Inappropriate content");
      toast({ title: "Reported", description: "Post has been reported." });
    } catch {
      toast({
        title: "Error",
        description: "Could not report post.",
        variant: "error",
      });
    }
  };

  return (
    <div className="w-full min-h-screen max-w-screen-lg px-4 mx-auto py-6 space-y-6">
      {!post ? (
        <div className="p-6 text-center text-gray-600">Loading...</div>
      ) : (
        <>
          <div className="bg-white border border-gray-300 rounded-lg hover:shadow-md transition duration-200 p-4 relative">
            {/* Dropdown in the top-right corner */}
            <div className="absolute top-4 right-4 z-10">
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
                      <DropdownMenuItem onClick={handleDelete}>
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
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

            {/* Post content */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {/* Upvote section */}
              <div className="flex sm:flex-col items-center gap-1 sm:gap-2 sm:w-12">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleUpvote}
                  disabled={isLoading}
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
                    isUpvoted ? "text-teal-500 text-xl" : "text-gray-500"
                  }`}>
                  {upvotes}
                </span>
              </div>

              {/* Post body */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  <Badge className="bg-violet-50 text-black hover:bg-darkblue cursor-pointer">
                    {post.category}
                  </Badge>
                  <span>
                    ◉{" "}
                    {formatDistanceToNow(new Date(post.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <span className="text-teal-600 text-xs hover:underline">
                  @{post.username}
                </span>
                <h1 className="text-lg pt-2 font-semibold border-b-2 capitalize border-gray-200 text-gray-800">
                  {post.title}
                </h1>
                <div
                  className="text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.content || ""),
                  }}
                />
              </div>
            </div>
          </div>

          {/* Comments */}
          <CommunityCommentSection postId={post.id} />
          {showEditDialog && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg space-y-4">
                <h2 className="text-xl font-semibold">Edit Post</h2>

                <ReactQuill
                  value={editContent}
                  onChange={setEditContent}
                  theme="snow"
                  className="bg-white rounded"
                />

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowEditDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdate}>Save</Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommunityPostDetail;
