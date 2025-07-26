import AOSWrapper from "../aos/AOSWrapper";
import ArticleCard from "./articleComponents/ArticleCard";
import Pagination from "./articleComponents/ArticlePagination";
import ArticleAdminButton from "./articleComponents/ArticleAdminButton";
import { useArticle } from "../hooks/articleHooks/useArticle";

const ArticlesComponent = () => {
  const {
    currentPosts,
    totalPages,
    currentPage,
    setCurrentPage,
    getTextFromHTML,
  } = useArticle();

  return (
    <AOSWrapper>
      <div className="min-h-screen px-4 flex flex-col items-center bg-stone-100 overflow-hidden">
        <div className="text-center space-y-4 gap-6 py-8 px-4" data-aos="fade-down">
          <h1 className="text-4xl font-bold font-jakarta text-gray-800">Articles</h1>
          <p className="text-lg italic text-gray-600 max-w-2xl mx-auto">
            Explore insightful articles on mental health, well-being, and personal growth.
          </p>
          <ArticleAdminButton />
        </div>

        <div className="flex flex-col gap-6 w-full max-w-6xl my-8">
          {currentPosts.map((post, index) => (
            <ArticleCard
              key={post.id}
              post={post}
              index={index}
              getText={getTextFromHTML}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </AOSWrapper>
  );
};

export default ArticlesComponent;
