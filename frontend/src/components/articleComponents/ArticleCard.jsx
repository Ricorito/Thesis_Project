import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ArticleCard = ({ post, index, getText }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (!post.img) setIsImageLoaded(true);
  }, [post.img]);

  const flexDirection = index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isImageLoaded ? { opacity: 1, y: 0 } : {}}
      whileHover={{ scale: 1.05 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: index * 0.1,
      }}
      className={`flex flex-col ${flexDirection} items-start rounded-2xl shadow-lg bg-white overflow-hidden cursor-pointer hover:shadow-xl transition-shadow gap-6 md:gap-8 py-6 px-6`}
    >
      {/* Image container */}
      <Link
        to={`/post/${post.id}`}
        className="flex-shrink-0 w-full md:w-5/12 h-64 overflow-hidden rounded-xl"
      >
        {post.img ? (
          <img
            src={`/upload/${post.img}`}
            alt={post.title}
            onLoad={() => setIsImageLoaded(true)}
            className="w-full h-full object-cover transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-500 italic text-sm px-4 text-center rounded-xl">
            No image available yet.
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col justify-center w-full md:w-7/12">
        {post.cat && (
          <span className="text-sm text-teal-600 font-semibold uppercase tracking-wide mb-1">
            {post.cat}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">
          {getText(post.desc).slice(0, 150)}...
        </p>
        <Link to={`/post/${post.id}`}>
          <Button
            variant="outline"
            className="text-sm border-teal-500 text-teal-600 hover:bg-teal-50 transition"
          >
            Read more
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
