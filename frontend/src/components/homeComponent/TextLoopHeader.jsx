import { TextLoop } from "@/components/ui/text-loop";
import { motion } from "framer-motion";

export function TextLoopHeader() {
  return (
    <div className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground text-center flex flex-wrap justify-center gap-1">
      <motion.span
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.3 }} 
        className="inline-block"
      >
        <TextLoop
          interval={3}
          className="inline-block overflow-y-clip text-primary font-bold text-teal-800"
          transition={{
            type: "spring",
            stiffness: 900,
            damping: 80,
            mass: 10,
          }}
          variants={{
            initial: {
              y: 20,
              rotateX: 90,
              opacity: 0,
              filter: "blur(4px)",
            },
            animate: {
              y: 0,
              rotateX: 0,
              opacity: 1,
              filter: "blur(0px)",
            },
            exit: {
              y: -20,
              rotateX: -90,
              opacity: 0,
              filter: "blur(4px)",
            },
          }}
        >
          <span>focused attention</span>
          <span>inner peace</span>
          <span>mindful awareness</span>
          <span>emotional clarity</span>
          <span>gentle self-care</span>
          <span>daily insights</span>
          <span>personal growth</span>
          <span>authentic connection</span>
          <span>quiet strength</span>
          <span>your well-being</span>
          <span>stress reduction</span>
          <span>balanced living</span>
        </TextLoop>
      </motion.span>
    </div>
  );
}
