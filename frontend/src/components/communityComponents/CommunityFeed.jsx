import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import useCommunity from "../../hooks/communityHooks/useCommunity";
import { Plus } from "lucide-react";

import CommunityPostCard from "./CommunityPostCard";
import CommunityPostForm from "./CommunityPostForm";
import CommunityFilter from "./CommunityFilter";
import AOSWrapper from "../../aos/AOSWrapper";

const CommunityFeed = () => {
  const { toast } = useToast();

  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data = await useCommunity.getPosts(category, sort);
        const formatted = data.map((post) => ({
          ...post,
          upvotes: post.upvoteCount,
          comments: post.commentCount,
          author: post.username,
          createdAt: post.created_at,
          isUpvoted: post.isUpvoted,
        }));
        setPosts(formatted);
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "ERROR! Could load posts!",
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [category, sort, toast]);

  const handleCreatePost = async (newPost) => {
    try {
      const result = await useCommunity.createPost(newPost);
      const formattedPost = {
        id: result.id,
        title: result.title,
        content: result.content,
        category: result.category,
        upvotes: result.upvoteCount,
        comments: result.commentCount,
        author: result.username,
        createdAt: result.created_at,
        isUpvoted: result.isUpvoted,
      };
      setPosts([formattedPost, ...posts]);
      setShowPostForm(false);
      toast({
        title: "Success",
        description: "Your community post has been shared!",
        variant: "success",
      });
    } catch (err) {
      console.error("Post creation failed:", err);
      toast({
        title: "Error",
        description: "Could not create community post.",
        variant: "error",
      });
    }
  };
  const handleCategoryFilter = (category) => {
    setCategory(category);
  };
  const handleDeletePost = (postId) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  return (
    <AOSWrapper>
      <div className="min-h-screen bg-background py-8 px-4 bg-stone-100">
        <main className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4" data-aos="fade-down">
            <h1 className="text-4xl font-bold font-jakarta text-gray-800 mb-2">
              Community Space
            </h1>
            <p className="text-lg italic text-gray-600 max-w-2xl mx-auto">
                Welcome to a space where stories spark connection and support flourishes. 
                Share your personal journey, lift others with your insight, and grow through meaningful dialogue. 
                This is your hub for thoughtful reflection, collective wisdom, and a sense of belonging.
            </p>
          </div>

          {/* Filter + Add post wrapper */}
          <div className="flex justify-center flex-col items-center gap-4">
            <div
              className="w-full max-w-sm"
              data-aos="fade-right"
              data-aos-delay="150">
              <CommunityFilter
                value={category}
                onChange={setCategory}
                sort={sort}
                setSort={setSort}
              />
            </div>

            <div
              className="w-full max-w-sm"
              data-aos="fade-left"
              data-aos-delay="250">
              <button
                onClick={() => setShowPostForm(true)}
                className="w-full p-4 bg-card border border-border rounded-lg text-left text-muted-foreground hover:bg-accent transition-colors">
                <Plus className="inline-block mr-2" />
                Add post
              </button>
            </div>
          </div>

          {/* Feed */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8">Loading posts...</div>
            ) : posts.length > 0 ? (
              posts.map((post, idx) => (
                <div key={post.id} data-aos="fade-up" data-aos-delay={idx * 80}>
                  <CommunityPostCard
                    post={post}
                    onCategoryClick={handleCategoryFilter}
                    onDelete={handleDeletePost}
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No posts found. Be the first to share!
              </div>
            )}
          </div>
        </main>

        <CommunityPostForm
          isOpen={showPostForm}
          onSubmit={handleCreatePost}
          onCancel={() => setShowPostForm(false)}
        />
      </div>
    </AOSWrapper>
  );
};

export default CommunityFeed;
