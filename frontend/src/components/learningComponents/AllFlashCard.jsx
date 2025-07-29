import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Trash, Settings } from "lucide-react";
import FlashCard from "./FlashCard";

const PAGE_SIZE = 10;

const AllFlashCard = ({ cards, deleteCard, submitAnswer, updateCard }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(cards.length / PAGE_SIZE);

  const paginatedCards = cards.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        Your Flashcards
        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
          {cards.length} items
        </span>
      </h2>

      <AnimatePresence>
        {cards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No flashcards yet
            </h3>
            <p className="mt-1 text-gray-500">
              Add your first flashcard to get started
            </p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {paginatedCards.map((card) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card className="cursor-pointer shadow-sm hover:shadow-md transition h-full flex flex-col">
                          <CardContent className="p-4 flex-grow flex items-center gap-2">
                            <p className="font-medium text-gray-800 line-clamp-2">
                              {card.question}
                            </p>
                            <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); 
                                updateCard(card.id);
                              }}
                              className="ml-2 text-gray-500 hover:text-gray-700"
                              title="Settings">
                              <Settings className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); 
                                deleteCard(card.id);
                              }}
                              className="ml-2 text-red-500 hover:text-red-600"
                              title="Delete Card">
                              <Trash className="w-4 h-4" />
                            </button>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <FlashCard
                        card={card}
                        onSubmit={submitAnswer}
                        onDelete={() => deleteCard(card.id)}
                      />
                    </Dialog>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50">
                  Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1 rounded border ${
                      page === i + 1
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-gray-300"
                    }`}>
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50">
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllFlashCard;
