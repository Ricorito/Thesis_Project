import {Volume2,VolumeX, VibrateOffIcon as VolumeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {Card,CardContent,CardHeader,CardTitle} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import audioConfig from "../../json/learning/learningAudio.json";

const BackgroundMusic = ({ audioHook, musicOptions }) => {
  const {
    currentMusic,
    setCurrentMusic,
    isMuted,
    setIsMuted,
    volume,
    setVolume,
    isPlaying,
    shouldPlay,
    pauseBackgroundMusic,
    resumeBackgroundMusic,
  } = audioHook;

  const iconMap = {
    Volume2,
    VolumeX,
    VolumeOff,
  };

  return (
    <Card
      className="bg-white border-0 shadow-xl"
      data-aos="fade-left"
      data-aos-delay="50"
    >
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
          Background Sounds
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Volume Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Volume</span>
            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              {isMuted ? (
                <VolumeOff className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Slider
            value={[volume * 100]}
            onValueChange={(value) => setVolume(value[0] / 100)}
            max={100}
            step={5}
            className="w-full"
            disabled={isMuted}
          />
        </div>

        {/* Sound Options */}
        <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
          {audioConfig.backgroundMusic.map((option) => {
            const IconComponent = iconMap[option.icon];
            const isSelected = currentMusic === option.id;
            const isCurrentlyPlaying =
              isSelected && isPlaying && !isMuted && shouldPlay;

            return (
              <Button
                key={option.id}
                onClick={() => setCurrentMusic(option.id)}
                className={`h-auto p-3 flex flex-col items-center gap-2 text-center relative min-h-[70px] border transition-all duration-200 ${
                  isSelected
                    ? "bg-darkblue text-white hover:bg-teal-600 shadow-lg scale-105"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-teal-50 hover:border-teal-300"
                }`}
              >
                <IconComponent className="h-4 w-4 flex-shrink-0" />
                <span className="text-xs font-medium leading-tight line-clamp-2 break-words">
                  {option.name}
                </span>

                {isCurrentlyPlaying && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                )}
                {isSelected &&
                  shouldPlay &&
                  !isPlaying &&
                  !isMuted &&
                  currentMusic !== "silent" && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  )}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BackgroundMusic;
