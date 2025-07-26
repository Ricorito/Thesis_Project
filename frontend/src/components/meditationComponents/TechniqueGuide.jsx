import { Card, CardContent } from "@/components/ui/card";
import techniqueCardMeta from "../../json/meditation/meditationBreathingTechniqueCards.json";
import { motion } from "framer-motion";

const cardVariants = {
  hover: {
    scale: 1.05,
    y: -8,
    boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  initial: {
    scale: 1,
    y: 20,
    opacity: 0,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const TechniqueGuide = ({ breathingTechniques }) => (
  <Card className="mt-4 bg-white border border-gray-200 shadow-xl">
    <CardContent className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Breathing Technique Guide
      </h3>
      <div className="grid md:grid-cols-4 gap-4">
        {Object.entries(breathingTechniques).map(([level, technique], index) => {
          const meta = techniqueCardMeta[level] || {};
          return (
            <motion.div
              key={level}
              custom={index}
              initial="initial"
              whileHover="hover"
              variants={cardVariants}
              viewport={{ once: true, amount: 0.3 }}
              whileInView="visible"
              className={`transform ${
                meta.gradient
                  ? `bg-gradient-to-br ${meta.gradient}`
                  : "bg-white"
              } ${meta.border || "border-gray-200"} p-4 rounded-xl border cursor-pointer`}
            >
              <h4 className="font-semibold text-gray-800 mb-1">
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </h4>
              <p className="text-base text-black mb-1">
                <strong>{technique.name}</strong>
              </p>
              <p className="text-sm text-gray-800">{technique.benefits}</p>
            </motion.div>
          );
        })}
      </div>
    </CardContent>
  </Card>
);

export default TechniqueGuide;
