import { Quote } from "lucide-react";
import content from "../../json/home/projectReviewContent.json";

const CreatorNote = () => (
  <blockquote
    className="border-l-4 border-teal-400 pl-6 italic text-gray-700 text-sm max-w-3xl mx-auto mt-16"
    data-aos="fade-up"
  >
    <div className="flex items-center gap-2 mb-2 text-teal-600 font-semibold">
      <Quote className="w-4 h-4" />
      From the Creator
    </div>
    <p>{content.creatorNote}</p>
  </blockquote>
);

export default CreatorNote;
