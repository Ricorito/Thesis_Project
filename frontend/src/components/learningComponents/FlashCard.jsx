import {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@radix-ui/react-select";

export default function FlashCard({ card, onSubmit }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleReveal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowAnswer(true);
      setIsAnimating(false);
    }, 200);
  };

  const handleSubmit = (isCorrect) => {
    onSubmit(card.id, isCorrect);
    setShowAnswer(false); 
  };

  return (
    <DialogContent className="rounded-xl max-w-md p-0 overflow-hidden border-0 shadow-2xl">
      <div className="relative bg-gradient-to-br from-indigo-50 to-blue-50">
        <DialogHeader className="px-6 pt-8 pb-16 space-y-8">
          <div className="text-center">
          <DialogTitle className="text-gray-700 text-xl font-medium">
          Question
        </DialogTitle>
            <p className="mt-4 text-2xl font-semibold text-gray-800 px-4">
              {card.question}
            </p>
          </div>

          {showAnswer && (
            <AnimatePresence mode="wait">
              <motion.div
                key="answer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="text-center"
              >
                
                  <p className="mt-4 text-base font-semibold text-gray-800 px-4">
                    {card.answer}
                  </p>
                
              </motion.div>
            </AnimatePresence>
          )}
        </DialogHeader>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="px-6 py-4 bg-white">
        <div className="flex justify-center mb-6">
          {!showAnswer && (
            <Button
              onClick={handleReveal}
              variant="outline"
              className="rounded-full px-6 py-5 bg-darkblue hover:bg-teal-600 text-white font-medium shadow-sm hover:shadow-md transition-all"
            >
              <Search className="w-4 h-4 mr-2" /> Show Answer
            </Button>
          )}
        </div>

        {showAnswer && (
          <DialogFooter className="grid grid-cols-2 gap-3 sm:gap-4">
            <DialogClose asChild>
              <Button
                onClick={() => handleSubmit(true)}
                className="py-5 gap-2 font-medium bg-green-600 hover:bg-green-700 text-white shadow hover:shadow-md transition-all"
              >
                <Check className="w-5 h-5" /> Correct
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() => handleSubmit(false)}
                className="py-5 gap-2 font-medium bg-red-500 hover:bg-red-600 text-white shadow hover:shadow-md transition-all"
              >
                <X className="w-5 h-5" /> Incorrect
              </Button>
            </DialogClose>
          </DialogFooter>
        )}
      </div>
    </DialogContent>
  );
}