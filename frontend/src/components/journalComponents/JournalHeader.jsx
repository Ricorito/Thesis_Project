import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";

const JournalHeader = ({ onNewEntry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-6 py-8 px-4"
    >
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className="text-4xl font-bold font-jakarta text-gray-800 mb-2">
            My journal
          </h1>
        </div>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-jakarta italic max-w-xl mx-auto">
          &quot;Memory... is the diary that we all carry about with us.&quot;
          <span className="text-sm">
            <br />– Oscar Wilde
          </span>
        </p>
      </div>

      <DialogTrigger asChild>
        <Button
          onClick={onNewEntry}
          size="lg"
          className="bg-darkblue hover:bg-teal-700 text-white font-jakarta font-semibold shadow-md hover:shadow-lg transition-all duration-300 px-6 py-3 border rounded-lg"
        >
          New journey
        </Button>
      </DialogTrigger>
    </motion.div>
  );
};

export default JournalHeader;
