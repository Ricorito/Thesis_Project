import { Card, CardContent } from "@/components/ui/card";
import meditationTips from "../../json/meditation/meditationTipCards.json";
import { motion } from "framer-motion";

const cardVariants = {
  hover: {
    y: -6,
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
    transition: { duration: 0.25, ease: "easeOut" },
  },
  initial: {
    y: 20,
    opacity: 0,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const MeditationTips = () => (
  <Card className="mt-4 bg-white border border-gray-200 shadow-xl">
    <CardContent className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Meditation Tips</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {meditationTips.map((tip, idx) => (
          <motion.div
            key={tip.title}
            custom={idx}
            initial="initial"
            whileHover="hover"
            variants={cardVariants}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`bg-gradient-to-br ${tip.gradient} ${tip.border} border p-4 rounded-xl relative z-10 cursor-pointer`}
            style={{
              transform: "translateZ(0)", // pixelhinting
              textRendering: "optimizeLegibility",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            <h4 className="text-base font-semibold text-gray-800 mb-1">{tip.title}</h4>
            <p className="text-sm text-gray-600">{tip.text}</p>
          </motion.div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default MeditationTips;