import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const ControlButtons = ({ isPlaying, onTogglePlayPause, onReset }) => {
  return (
    <div className="flex gap-4" >
      <Button
        onClick={onTogglePlayPause}
        size="lg"
        className={`px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
          isPlaying
            ? "bg-red-500 hover:bg-red-600 border border-white text-white"
            : "bg-teal-600 hover:bg-darkblue border border-white text-white"
        }`}
      >
        {isPlaying ? (
          <>
            <Pause className="w-6 h-6 mr-2" />
            Pause
          </>
        ) : (
          <>
            <Play className="w-6 h-6 mr-2" />
            Start
          </>
        )}
      </Button>

      <Button
        onClick={onReset}
        variant="outline"
        size="lg"
        className="px-8 py-4 rounded-full border-2 border-gray-300 hover:border-gray-400 
          text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <RotateCcw className="w-6 h-6 mr-2" />
        Reset
      </Button>
    </div>
  );
};

export default ControlButtons;