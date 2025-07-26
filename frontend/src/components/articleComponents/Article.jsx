import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import moment from "moment";

import Menu from "./Menu";
import Edit from "/assets/edit.png";
import Delete from "/assets/delete.png";

import { useArticle } from "../../hooks/articleHooks/useArticle";
import ArticleConfirmDialog from "./ArticleConfirmDialog";

const Article = () => {
  const {
    articleDetail: post,
    postId,
    currentUser,
    showConfirm,
    setShowConfirm,
    handleDelete,
  } = useArticle();

  if (!post) {
    return (
      <div className="text-center py-20 text-sm text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <img
            src={post.img ? `/upload/${post.img}` : "/default.jpg"}
            alt={post.title || "article image"}
            className="w-full rounded-lg object-cover shadow-md max-h-[400px] sm:max-h-[480px]"
            loading="lazy"
          />
          <h1 className="mt-8 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-10">
        <article className="flex-1 flex flex-col gap-8">
          <div className="flex items-center gap-4 text-sm sm:text-base">
            {post.userImg && (
              <img
                src={post.userImg}
                alt={post.username || "author"}
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
                loading="lazy"
              />
            )}
            <div>
              <p className="font-semibold text-indigo-700">{post.username}</p>
              <time className="text-gray-500" dateTime={post.date}>
                Posted {moment(post.date).fromNow()}
              </time>
            </div>

            {currentUser?.username === post.username && (
              <div className="ml-auto flex gap-4">
                <Link
                  to={`/write?edit=${postId}`}
                  state={post}
                  className="hover:text-indigo-600 transition-colors"
                  aria-label="Edit article"
                >
                  <img src={Edit} alt="Edit" className="w-6 h-6" />
                </Link>
                <button
                  onClick={() => setShowConfirm(true)}
                  aria-label="Delete article"
                  className="hover:text-red-600 transition-colors"
                >
                  <img src={Delete} alt="Delete" className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          <section
            className="prose prose-indigo max-w-none text-gray-700 text-base sm:text-lg"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc) }}
          />
        </article>

        <aside className="md:w-96 sticky top-24 self-start">
          <Menu cat={post.cat} currentPostId={postId} />
        </aside>
      </div>

      <ArticleConfirmDialog
        open={showConfirm}
        onConfirm={() => {
          setShowConfirm(false);
          handleDelete();
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};

export default Article;
