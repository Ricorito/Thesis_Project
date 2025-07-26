import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const JournalForm = ({
  isOpen,
  onOpenChange,
  editingJournal,
  formData,
  setFormData,
  onSubmit,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[95%] sm:max-w-[600px] bg-white border-2 border-gray-200 shadow-xl px-4 sm:px-6 py-6 sm:py-8">
        {/* Page holes */}
        <div className="absolute left-2 top-20 flex flex-col gap-3 z-20">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gray-400 border border-gray-300 rounded-full"
            ></div>
          ))}
        </div>

        <div className="relative z-10">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl sm:text-2xl font-sans text-gray-800 mb-2">
              {editingJournal ? "Edit Journal" : "New Journal"}
            </DialogTitle>
            <DialogDescription className="font-sans text-gray-600 italic text-sm sm:text-base">
              {editingJournal
                ? "Revisit and refine what you've written."
                : "Begin writing freely — this space belongs entirely to you."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit}>
            <div className="grid gap-5 sm:gap-6 py-4">
              {/* Title Field */}
              <div className="grid gap-2">
                <Label
                  htmlFor="title"
                  className="font-sans text-gray-800 font-medium"
                >
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter your journal title..."
                  className="font-sans text-gray-800 bg-gray-50 border-gray-300 focus:border-blue-500 text-base sm:text-lg p-3"
                />
              </div>

              {/* Content Field */}
              <div className="grid gap-2">
                <Label
                  htmlFor="content"
                  className="font-sans text-gray-800 font-medium"
                >
                  Content
                </Label>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, content: value }))
                  }
                  placeholder="Dear diary, today..."
                  className="bg-white [&_.ql-container]:h-64 sm:[&_.ql-container]:h-72 [&_.ql-container]:overflow-y-auto"
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1rem",
                    lineHeight: "1.75",
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <DialogFooter className="mt-10">
              <Button
                type="submit"
                className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-sans text-base sm:text-lg px-6 py-3 border-2"
              >
                {editingJournal ? "Update Entry" : "Save Entry"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JournalForm;
