import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Clock, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import autumnDesk from "/assets/autumnDesk.gif";
import retroJapan from "/assets/retroJapan.gif";
import cafeBg from "/assets/cafebg.gif";
import coastalBg from "/assets/coastal.gif";
import natureBg from "/assets/naturebg.webp";
import cherryBlossomBg from "/assets/cherry.gif";

const backgroundOptions = [
  { id: 'desk', name: 'Autumn Afternoon', image: autumnDesk },
  { id: 'japan', name: 'Retro Japan', image: retroJapan },
  { id: 'cafe', name: 'Cafe', image: cafeBg },
  { id: 'coastal', name: 'Coastal', image: coastalBg },
  { id: 'nature', name: 'Nature', image: natureBg },
  { id: 'cherry', name: 'Cherry Blossom', image: cherryBlossomBg },
];

const PomodoroTimer = ({ pomodoroHook, intervals, audioHook }) => {
  const {timeLeft,isActive,isBreak,currentInterval,toggleTimer,resetTimer,changeInterval,formatTime,getProgress } = pomodoroHook;

  const { isPlaying, shouldPlay, currentMusic } = audioHook;
  const [selectedBg, setSelectedBg] = useState(() => {
    return localStorage.getItem('pomodoroBackground') || 'desk';
  });
  const [showBgSelector, setShowBgSelector] = useState(false);

  useEffect(() => {
    localStorage.setItem('pomodoroBackground', selectedBg);
  }, [selectedBg]);

  const currentBackground = backgroundOptions.find(bg => bg.id === selectedBg)?.image || autumnDesk;

  return (
    <Card
      className="bg-white/70 backdrop-blur-sm border-0 shadow-xl overflow-hidden"
      data-aos="fade-up"
    >
      {/* Background Selection Button */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="sm"
          className="bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-sm"
          onClick={() => setShowBgSelector(!showBgSelector)}
        >
          <Image className="w-4 h-4 mr-2" />
          Background
        </Button>
        
        {/* Background Selector Dropdown */}
        {showBgSelector && (
          <div 
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 border border-gray-200"
            onMouseLeave={() => setShowBgSelector(false)}
          >
            <div className="p-2 grid grid-cols-2 gap-2">
              {backgroundOptions.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => {
                    setSelectedBg(bg.id);
                    setShowBgSelector(false);
                  }}
                  className={`p-1 rounded-md transition-all ${
                    selectedBg === bg.id ? 'ring-2 ring-darkblue bg-teal-50' : 'hover:bg-gray-100'
                  }`}
                >
                  <img 
                    src={bg.image} 
                    alt={bg.name}
                    className="w-full h-16 object-cover rounded-md"
                  />
                  <p className="text-xs mt-1 text-center font-medium">{bg.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cozy Background Section */}
       <div className="relative h-96 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
        {/* Background Container - CHANGED TO USE IMG TAG */}
        <div className="absolute inset-0 overflow-hidden">
          <img src={currentBackground} alt="Background" className="h-full w-full object-fill "
            style={{
              filter: "brightness(0.9) contrast(1.1)",
              opacity: 0.9
            }}
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Timer Overlay - PERFECTLY CENTERED */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-3">
              <span className="font-semibold text-lg text-white">
                {isBreak ? "Break Time" : "Focus Time"}
              </span>
              {/* Audio sync indicator */}
              {shouldPlay && isPlaying && currentMusic !== "silent" && (
                <div className="flex items-center gap-1 ml-2">
                  <div className="w-1 h-2 bg-white/80 rounded animate-pulse"></div>
                  <div
                    className="w-1 h-3 bg-white/80 rounded animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-1 h-2 bg-white/80 rounded animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              )}
            </div>
            <p className="text-white/90 text-sm font-medium">
              {isBreak
                ? "Take a moment to breathe and relax"
                : "Deep focus for meaningful learning"}
            </p>
          </div>

          {/* Large Timer Display - CENTERED */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              {/* Circular background for timer */}
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
                <div className="text-4xl font-mono font-bold text-white tracking-wider">
                  {formatTime(timeLeft)}
                </div>
              </div>

              {/* Progress Ring */}
              <svg
                className="absolute inset-0 w-32 h-32 transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 45 * (1 - getProgress() / 100)
                  }`}
                  className="transition-all duration-1000 ease-in-out"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Session Info */}
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/90 mt-4">
              Session {currentInterval.work}min • Break {currentInterval.break}
              min
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <CardContent className="p-6 space-y-6">
        {/* Timer Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={toggleTimer}
            size="lg"
            className={`px-8 py-3 text-lg font-medium transition-all duration-300 ${
              isActive
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-darkblue hover:bg-teal-700 text-white"
            }`}
          >
            {isActive ? (
              <Pause className="mr-2 h-5 w-5" />
            ) : (
              <Play className="mr-2 h-5 w-5" />
            )}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button
            onClick={resetTimer}
            size="lg"
            variant="outline"
            className="px-8 py-3 text-lg font-medium border-2 hover:bg-gray-50 bg-transparent"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(getProgress())}%</span>
          </div>
          <Progress value={getProgress()} className="h-2 bg-gray-200" />
        </div>

        {/* Interval Selection */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 text-center">
            Time Intervals
          </h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
            {" "}
            {/* Added flex-wrap and responsive gap/padding */}
            {intervals.map((interval) => (
              <Button
                key={interval.label}
                onClick={() => changeInterval(interval)}
                className={`flex-grow px-4 py-3 border transition-all duration-200 text-center ${
                  /* Added flex-grow, adjusted px */
                  currentInterval.work === interval.work
                    ? "bg-darkblue hover:bg-teal-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-teal-50 hover:border-teal-300"
                }`}
                disabled={isActive}
              >
                <Clock className="mr-2 h-4 w-4" />
                {interval.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;
