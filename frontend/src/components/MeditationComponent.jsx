import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import LevelBadge from "./meditationComponents/LevelBadge";

// Import data
import breathingTechniques from "../json/meditation/meditationBreathingTechniques.json";
import meditationSounds from "../json/meditation/meditationSounds.json";

// Import hooks
import { useAudio } from "../hooks/meditationHooks/useAudio";
import { useTimer } from "../hooks/meditationHooks/useTimer";
import { useBreathing } from "../hooks/meditationHooks/useBreathing";
import { usePersistentState } from "../hooks/meditationHooks/usePersistentState";
// Import components
import AOSWrapper from "../aos/AOSWrapper";
import BreathingCircle from "./meditationComponents/BreathingCircle";
import ControlButtons from "./meditationComponents/ControlButtons";
import SettingsPanel from "./meditationComponents/SettingsPanel";
import TechniqueGuide from "./meditationComponents/TechniqueGuide";
import MeditationTips from "./meditationComponents/MeditationTips";
import ConfirmDurationReset from "./meditationComponents/ConfirmDurationReset";

import PositiveQuotes from "./meditationComponents/PositiveQuotes";

const Meditation = () => {
  const [selectedDuration, setSelectedDuration] = usePersistentState(
    "meditationTimer",
    5,
    Number,
    String
  );
  const [selectedSound, setSelectedSound] = usePersistentState(
    "meditationSound",
    "rain"
  );
  const [volume, setVolume] = usePersistentState(
    "meditationVolume",
    50,
    Number,
    String
  );
  const [isMuted, setIsMuted] = usePersistentState(
    "meditationMuted",
    false,
    (v) => v === "true",
    String
  );
  const [selectedLevel, setSelectedLevel] = usePersistentState(
    "meditationLevel",
    "beginner"
  );
  const [pendingDuration, setPendingDuration] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const currentTechnique = breathingTechniques[selectedLevel];

  const handleTimerComplete = () => {
    setIsPlaying(false);
    pauseAudio();
    playNotification();
  };

  const { playAudio, pauseAudio, playNotification, resetAudio } = useAudio(
    selectedSound,
    meditationSounds,
    volume,
    isMuted
  );

  const {
    timeLeft,
    isPlaying,
    setIsPlaying,
    formatTime,
    reset: resetTimer,
    forceReset: forceResetTimer,
    progressPercentage,
    activeDuration,
  } = useTimer(selectedDuration, handleTimerComplete);

  const {
    breathingPhase,
    animationProgress,
    cycleCount,
    wimHofRound,
    currentPhaseIndex,
    resetBreathing,
  } = useBreathing(isPlaying, selectedLevel, currentTechnique);

  useEffect(() => {
    handleReset();
  }, [selectedLevel]);

  useEffect(() => {
    if (!isPlaying && selectedDuration !== activeDuration) {
      resetTimer();
    }
  }, [selectedDuration]);

  useEffect(() => {
    resetAudio();
    if (isPlaying) {
      setTimeout(() => playAudio(), 100);
    }
  }, [selectedSound]);

  const handleVolumeChange = (newVolume) => setVolume(newVolume);
  const handleMuteToggle = () => setIsMuted((prev) => !prev);
  const handleTogglePlayPause = () => {
    isPlaying
      ? (setIsPlaying(false), pauseAudio())
      : (setIsPlaying(true), playAudio());
  };
  const handleReset = () => {
    setIsPlaying(false);
    resetTimer();
    resetBreathing();
    resetAudio();
  };

  const handleDurationChange = (duration) => {
    const num = Number(duration);
    if (isPlaying && num !== activeDuration) {
      setPendingDuration(num);
      setShowModal(true);
    } else {
      setSelectedDuration(num);
    }
  };

  const confirmDurationChange = () => {
    handleReset();
    setSelectedDuration(pendingDuration);
    setPendingDuration(null);
    setShowModal(false);
  };
  const cancelDurationChange = () => {
    setPendingDuration(null);
    setShowModal(false);
  };
  const handleLevelChange = (level) => setSelectedLevel(level);
  const handleSoundChange = (sound) => setSelectedSound(sound);

  return (
    <AOSWrapper>
      <div className="min-h-screen bg-stone-100 py-8 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div
            className="text-center mb-6"
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Meditation Room
            </h1>
            <div className="text-base italic text-gray-600 max-w-xl mx-auto">
              <PositiveQuotes />
            </div>
          </div>
          {/* Main Content */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Breathing Panel */}
            <Card
              className="bg-darkblue backdrop-blur-md border shadow-lg rounded-lg"
              data-aos="slide-right"
              data-aos-delay="100"
            >
              <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                {/* Technique Info */}
                <div
                  className="text-center mb-4"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {currentTechnique.name}
                  </h3>
                  <p className="text-sm text-blue-200 mt-1">
                    {currentTechnique.description}
                  </p>
                  <div className="flex items-center justify-center mt-3 text-xs">
                    <LevelBadge level={selectedLevel} />
                    <span
                      className="bg-green-100 ml-2 px-2 py-1 rounded-full"
                      data-aos="scale-in"
                      data-aos-delay="400"
                    >
                      Cycle: {cycleCount}
                    </span>
                  </div>
                  {selectedLevel === "expert" && (
                  <div className="m-3 text-xs text-white text-center">
                    This technique inspired by{" "}
                    <a
                      href="https://www.wimhofmethod.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 underline hover:text-white font-medium"
                    >
                      Wim Hof
                    </a>
                    .
                  </div>
                )}
                </div>

                {/* Breathing Circle */}
                <BreathingCircle
                  currentTechnique={currentTechnique}
                  selectedLevel={selectedLevel}
                  breathingPhase={breathingPhase}
                  animationProgress={animationProgress}
                  wimHofRound={wimHofRound}
                  currentPhaseIndex={currentPhaseIndex}
                />

                {/* Timer and Progress */}
                <div
                  className="text-center my-4"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <div className="text-4xl font-mono font-bold text-white mb-3">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="w-full max-w-sm h-2 bg-gray-300 rounded-full overflow-hidden mx-auto">
                    <div
                      className="h-full bg-gradient-to-r from-teal-600 to-teal-700 transition-all duration-700 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-blue-100 mt-2">
                    {activeDuration === 60
                      ? "1 hour"
                      : `${activeDuration} minute${
                          activeDuration > 1 ? "s" : ""
                        }`}{" "}
                    session
                    {isPlaying && selectedDuration !== activeDuration && (
                      <span className="block text-[10px] text-orange-400 mt-1">
                        (Duration change will apply after reset)
                      </span>
                    )}
                  </p>
                </div>

                {/* Control Buttons */}
                <ControlButtons
                  isPlaying={isPlaying}
                  onTogglePlayPause={handleTogglePlayPause}
                  onReset={handleReset}
                />
              </CardContent>
              
            </Card>
                      
            {/* Settings Panel */}
            <SettingsPanel
              selectedLevel={selectedLevel}
              setSelectedLevel={handleLevelChange}
              selectedDuration={selectedDuration}
              handleDurationChange={handleDurationChange}
              selectedSound={selectedSound}
              setSelectedSound={handleSoundChange}
              volume={volume}
              setVolume={handleVolumeChange}
              isMuted={isMuted}
              setIsMuted={handleMuteToggle}
              breathingTechniques={breathingTechniques}
              meditationSounds={meditationSounds}
              currentTechnique={currentTechnique}
              cycleCount={cycleCount}
              wimHofRound={wimHofRound}
              isPlaying={isPlaying}
            />
          </div>

          {/* Additional Sections */}
          <TechniqueGuide breathingTechniques={breathingTechniques} />
          <MeditationTips />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ConfirmDurationReset
          current={activeDuration}
          newValue={pendingDuration}
          onConfirm={confirmDurationChange}
          onCancel={cancelDurationChange}
        />
      )}
    </AOSWrapper>
  );
};

export default Meditation;
