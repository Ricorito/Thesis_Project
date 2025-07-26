import { useMemo, useState, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";

import JournalHeader from "./JournalHeader";
import JournalForm from "./JournalForm";
import JournalEntry from "./JournalEntry";
import EmptyState from "./EmptyState";

import Logo from "/assets/logoWhite.png";

const JournalContent = ({
  journals,
  isDialogOpen,
  setIsDialogOpen,
  editingJournal,
  formData,
  setFormData,
  handleSubmit,
  handleEdit,
  handleDelete,
  handleNewEntry,
}) => {
  const [dimensions, setDimensions] = useState({
    width: 595,
    height: 842,
    minWidth: 300,
    maxWidth: 700,
    minHeight: 400,
    maxHeight: 842
  });

  useEffect(() => {
    const updateDimensions = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      if (screenWidth < 640) { 
        setDimensions({
          width: Math.min(screenWidth - 32, 320),
          height: Math.min(screenHeight - 200, 480),
          minWidth: 280,
          maxWidth: 320,
          minHeight: 400,
          maxHeight: 480
        });
      } else if (screenWidth < 768) { 
        setDimensions({
          width: Math.min(screenWidth - 64, 450),
          height: Math.min(screenHeight - 200, 640),
          minWidth: 350,
          maxWidth: 450,
          minHeight: 500,
          maxHeight: 640
        });
      } else if (screenWidth < 1024) { 
        setDimensions({
          width: Math.min(screenWidth - 96, 550),
          height: Math.min(screenHeight - 200, 750),
          minWidth: 400,
          maxWidth: 550,
          minHeight: 600,
          maxHeight: 750
        });
      } else { 
        setDimensions({
          width: 595,
          height: 842,
          minWidth: 500,
          maxWidth: 700,
          minHeight: 700,
          maxHeight: 842
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

 const coverPage = (
  <div className="page bg-gradient-to-br from-darkblue to-sky-950 font-serif flex flex-col items-center justify-center p-4 sm:p-8 lg:p-16 rounded-lg shadow-lg">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center w-full"
    >
      {/* Modified heading block */}
      <div className="mb-6 sm:mb-8">
        <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-white mb-2 sm:mb-4" />
        <h1 className="text-2xl sm:text-3xl lg:text-5xl text-white font-semibold italic mb-2 sm:mb-4">
          My Journal
        </h1>
        <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-lgreen to-sand mx-auto"></div>
      </div>

      {/* Preserved logo block */}
      <div className="flex justify-center mb-6 sm:mb-12 lg:mb-16">
        <div className="relative">
          <div className="relative rounded-full border-2 border-white bg-white/1 backdrop-blur-sm p-4 sm:p-6 lg:p-8 shadow-lg">
            <img
              src={Logo}
              alt="Journal Logo"
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Preserved hint block */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex items-center justify-center text-white font-medium text-sm sm:text-base lg:text-lg"
      >
        <span className="mr-2">Tap or swipe to read</span>
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
      </motion.div>
    </motion.div>
  </div>
  );

  const endPage = (
    <div className="page bg-darkblue text-white flex items-center justify-center p-4 sm:p-8 rounded-lg shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-lgreen to-sand mx-auto mb-4 sm:mb-6"></div>
        <p className="text-wite font-serif italic text-base sm:text-lg lg:text-xl mb-2">
          — End of Journal —
        </p>
        <p className="text-white/80 text-xs sm:text-sm">
          Thank you for beeing here. <br/>Feel free to continou your journal!
        </p>
        <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-lgreen to-sand mx-auto mt-4 sm:mt-6"></div>
      </motion.div>
    </div>
  );

  const flipBookKey = useMemo(() => Date.now(), [journals]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <JournalHeader onNewEntry={handleNewEntry} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="px-2 sm:px-4 lg:px-6"
      >
        <JournalForm
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          editingJournal={editingJournal}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />

        {journals.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex justify-center my-4 sm:my-6 lg:my-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* Background decoration */}
              <div className="absolute -inset-4 sm:-inset-6  rounded-2xl blur-xl"></div>
              
              <div className="relative">
                <HTMLFlipBook
                  key={flipBookKey}
                  width={dimensions.width}
                  height={dimensions.height}
                  minWidth={dimensions.minWidth}
                  maxWidth={dimensions.maxWidth}
                  minHeight={dimensions.minHeight}
                  maxHeight={dimensions.maxHeight}
                  size="stretch"
                  showCover={true}
                  flippingTime={700}
                  className="demo-book rounded-xl overflow-hidden"
                  style={{
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.05)",
                    fontFamily: "Georgia, serif",
                    borderRadius: "12px",
                    border: "1px solid rgba(245, 245, 244, 0.8)",
                  }}
                  usePortrait={true}
                  startPage={0}
                  drawShadow={true}
                  disableFlipByClick={false}
                  clickEventForward={true}
                  useMouseEvents={true}
                  swipeDistance={30}
                  showPageCorners={true}
                  maxShadowOpacity={0.3}
                >
                  {coverPage}

                  {journals.map((journal) => (
                    <div
                      key={journal.id}
                      className="page relative bg-gradient-to-br from-stone-50 to-amber-50/30 h-full p-3 sm:p-4 lg:p-6 overflow-hidden font-serif flex flex-col"
                    >
                      {/* Page texture overlay */}
                      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_#000_1px,_transparent_0)] bg-[length:20px_20px]"></div>
                      
                      {/* Page border */}
                      <div className="absolute inset-2 sm:inset-3 border border-amber-200/40 rounded-lg pointer-events-none"></div>
                      
                      <div className="relative z-10 flex-1 overflow-y-auto">
                        <JournalEntry
                          journal={journal}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      </div>
                    </div>
                  ))}

                  {endPage}
                </HTMLFlipBook>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </Dialog>
  );
};

export default JournalContent;