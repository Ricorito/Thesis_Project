import DOMPurify from "dompurify";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const JournalEntry = ({ journal, onEdit, onDelete }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const contentToDisplay = journal?.content || "";
  const truncated =
    contentToDisplay.length > 250
      ? contentToDisplay.substring(0, 250) + "..."
      : contentToDisplay;
  const sanitizedContent = DOMPurify.sanitize(truncated);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowConfirmDialog(true);
  };

  const confirmDelete = (e) => {
    e.stopPropagation();
    onDelete?.(journal?.id);
    setShowConfirmDialog(false);
  };

  const cancelDelete = (e) => {
    e.stopPropagation();
    setShowConfirmDialog(false);
  };

  const deleteDialog = (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Are you sure you want to delete this entry?
        </h2>
        <div className="flex justify-center gap-4 mt-4">
          <Button
            onClick={confirmDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md "
          >
            Yes, Delete
          </Button>
          <Button
            onClick={cancelDelete}
            variant="outline"
            className="px-4 py-2 rounded-md"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative flex justify-center">
      {showConfirmDialog && createPortal(deleteDialog, document.body)}

      {/* Journal Card */}
      <Card className="w-full max-w-3xl border border-stone-300 bg-gradient-to-br from-stone-50 to-amber-50/30 shadow-md rounded-md flex flex-col justify-between">
        <div className="px-4 sm:px-6 pt-6 text-center">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl text-darkblue font-semibold italic break-words">
            {journal?.title || "Untitled"}
          </CardTitle>
          <div className="w-16 h-0.5 bg-gradient-to-r from-lgreen to-sand mx-auto my-2"></div>
          <div className="flex justify-center items-center gap-2 text-black text-xs sm:text-sm italic">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(journal?.created_at)}</span>
          </div>
        </div>

        <CardContent className="px-4 sm:px-6 pt-4 text-center">
          <div
            className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
          {contentToDisplay.length > 250 && (
            <Button
              variant="link"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(journal);
              }}
              className="mt-3 text-teal-600 hover:text-teal-700 italic underline underline-offset-2"
            >
              Read more...
            </Button>
          )}
        </CardContent>

        {/* Buttons */}
        <div className="px-4 sm:px-6 pb-4 flex flex-wrap justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(journal);
            }}
            className="bg-darkblue px-4 py-4 text-white font-inter text-sm hover:text-white hover:bg-teal-600 rounded-md flex items-center justify-center gap-2 w-28"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDeleteClick}
            className="text-red-600 px-4 py-4 font-inter text-sm hover:text-white hover:bg-red-600 border border-red-300 rounded-md flex items-center justify-center gap-2 w-28"
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default JournalEntry;