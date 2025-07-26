import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-stone-100 px-4 sm:px-6 lg:px-8 pb-8">
      {/* Decorative page holes */}
      <div className="absolute left-4 sm:left-6 top-16 sm:top-20 flex flex-col gap-3 sm:gap-4 z-20">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-400 border border-gray-300 rounded-full"
          ></div>
        ))}
      </div>

      {/* A4 journal card */}
      <Card className="w-full max-w-[95%] sm:max-w-[595px] h-auto sm:h-[842px] mx-auto border-2 border-gray-200 shadow-xl bg-stone-200 relative overflow-hidden text-center py-12 sm:py-16 px-4 sm:px-6">
        <CardContent className="space-y-8 relative z-10">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-gray-700" />
            </div>
          </div>

          {/* Heading and message */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-sans font-semibold text-gray-800">
              Your journal awaits...
            </h3>
            <p className="text-gray-600 max-w-[90%] sm:max-w-[400px] mx-auto font-sans italic text-base sm:text-lg leading-relaxed">
              Feel free to share your thoughts, experiences, and emotions. This
              space is yours alone — completely private and invisible to anyone
              else, even me, the creator of the project. There&#39;s no judgment
              here, no expectations — just a quiet space where your voice can
              speak freely.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyState;