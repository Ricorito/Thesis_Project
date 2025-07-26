import { Button } from "@/components/ui/button";

const TechniqueSelector = ({ activeTechnique, setActiveTechnique }) => {
  return (
    <div className="flex justify-center gap-4 mb-8" data-aos="fade-up">
      <Button
        onClick={() => setActiveTechnique("pomodoro")}
        className={`px-6 py-3 border transition-all duration-200 ${
          activeTechnique === "pomodoro"
            ? "bg-darkblue hover:bg-teal-600 text-white shadow-lg scale-105"
            : "bg-white text-gray-800 border-gray-300 hover:bg-teal-50 hover:border-teal-300"
        }`}
      >
        Pomodoro Timer
      </Button>
      <Button
        onClick={() => setActiveTechnique("retrieval")}
        className={`px-6 py-3 border transition-all duration-200 ${
          activeTechnique === "retrieval"
            ? "bg-darkblue hover:bg-teal-600 text-white shadow-lg scale-105"
            : "bg-white text-gray-800 border-gray-300 hover:bg-teal-50 hover:border-teal-300"
        }`}
      >
        Retrieval Practice
      </Button>
    </div>
  );
};

export default TechniqueSelector;
