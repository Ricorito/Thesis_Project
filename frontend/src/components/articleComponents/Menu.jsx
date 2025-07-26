import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useArticle } from "../../hooks/articleHooks/useArticle";

const Menu = ({ cat, currentPostId }) => {
  const { relatedPosts, fetchRelatedPosts } = useArticle();

  useEffect(() => {
    fetchRelatedPosts(cat, currentPostId);
  }, [cat, currentPostId, fetchRelatedPosts]);

  return (
    <div className="menu flex flex-col gap-6">
      <h1 className="text-xl font-bold text-gray-600">
        Other posts you may like
      </h1>
      {relatedPosts.map((post) => (
        <div key={post.id} className="post flex flex-col gap-3">
          <img
            src={`/upload/${post.img}`}
            alt={post.title}
            className="w-full h-52 object-cover rounded-lg"
          />
          <h2 className="text-lg text-gray-600">{post.title}</h2>
          <Link to={`/post/${post.id}`}>
            <button className="px-4 py-2 border border-teal-500 text-teal-500 hover:bg-green-200 hover:text-black transition rounded">
              Read more
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
