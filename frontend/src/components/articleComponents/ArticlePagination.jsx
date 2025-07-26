const ArticlePagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex gap-2 mt-12 flex-wrap justify-center">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === i + 1
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default ArticlePagination;
