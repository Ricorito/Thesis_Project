import { useState, useEffect } from "react";

const PositiveQuotes = () => {
  const [quoteData, setQuoteData] = useState({
    content: "",
    author: "",
  });

  const fetchQuote = async () => {
    try {
      const res = await fetch(
        "https://api.quotable.io/random?tags=inspirational|wisdom|peace|mindfulness|healing"
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! Status: ${res.status} - ${errorText}`);
      }

      const data = await res.json();

      const quote = {
        content: data?.content ?? "Keep going. You're doing better than you think.",
        author: data?.author ?? "Unknown",
      };

      setQuoteData(quote);
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      setQuoteData({
        content: "An inspirational thought: 'The only way to do great work is to love what you do.'",
        author: "Steve Jobs (Failed to fetch from API)",
      });
    }
  };

  useEffect(() => {
    fetchQuote();

    const interval = setInterval(() => {
      fetchQuote();
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  const { content, author } = quoteData;

  return (
    <div className="text-lg italic text-gray-600 max-w-2xl mx-auto text-center">
      <blockquote>“{content}”</blockquote>
      <span className="block text-sm font-medium text-gray-600 mt-1"> - {author}</span>

      <button
        onClick={fetchQuote}
        className="mt-4 px-3 py-1.5 bg-darkblue hover:bg-teal-700 text-white font-semibold rounded-md shadow-md transition-colors duration-200 flex items-center justify-center mx-auto text-xs"
      >
        <span className="mr-1">⟳</span> Reroll
      </button>
    </div>
  );
};

export default PositiveQuotes;