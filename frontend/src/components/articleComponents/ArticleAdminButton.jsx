import { Link } from "react-router-dom";
import { useArticle } from "../../hooks/articleHooks/useArticle";

const ArticleAdminButton = () => {
  const { isAdmin } = useArticle();

  if (!isAdmin) return null;

  return (
    <div className="w-full flex justify-center">
      <Link
        to="/write"
        aria-label="Write article"
        className="bg-darkblue text-sm hover:bg-teal-700 text-white font-jakarta font-semibold shadow-md hover:shadow-lg transition-all duration-300 px-6 py-2 border rounded-lg"
      >
        Write Article
      </Link>
    </div>
  );
};

export default ArticleAdminButton;
