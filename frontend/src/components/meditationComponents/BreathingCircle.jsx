import {
  getBreathingInstruction,
  getPhaseColor,
} from "../../lib/breathingUtils";

const BreathingCircle = ({
  currentTechnique,
  selectedLevel,
  breathingPhase,
  animationProgress, 
  wimHofRound,
  currentPhaseIndex,
}) => {
  const circleSize = 200;
  const translateDistance = circleSize / 6;

  const getTranslation = (progress) => {
    if (progress <= 1) {
      return progress * translateDistance; 
    } else {
      return (2 - progress) * translateDistance; 
    }
  };

  const translation = getTranslation(animationProgress);

  const circles = Array.from({ length: 8 }, (_, index) => {
    const baseRotation = index * 45; 

    const getRotation = (progress) => {
      if (progress <= 1) {
        return baseRotation + progress * 180;
      } else {
        return baseRotation + 180 + (progress - 1) * 180; 
      }
    };

    const rotation = getRotation(animationProgress);

    return (
      <div
        key={index}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `rotate(${rotation}deg) translate(${translation}px, ${translation}px)`,
        }}
      >
        <div
          className={`rounded-full bg-gradient-to-r ${getPhaseColor(
            selectedLevel,
            breathingPhase
          )} 
            transition-opacity duration-300`}
          style={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            opacity: 0.15,
          }}
        />
      </div>
    );
  });

  return (
    <div
      className="relative mb-2 flex flex-col items-center"
      data-aos="zoom-in"
      data-aos-delay="400"
    >
      <div
        className="relative flex items-center justify-center w-full max-w-[420px]"
        style={{
          width: `${circleSize * 1.5}px`,
          height: `${circleSize * 1.5}px`,
        }}
      >
        <div
          className="absolute opacity-0"
          style={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
          }}
        >
          <div
            className="rounded-full bg-blue-500"
            style={{
              width: `${circleSize}px`,
              height: `${circleSize}px`,
            }}
          />
        </div>

        {circles}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <p className="text-xl sm:text-2xl font-bold text-gray-800 drop-shadow-lg mb-1">
            {getBreathingInstruction(
              selectedLevel,
              breathingPhase,
              wimHofRound
            )}
          </p>
          <p className="text-sm sm:text-base text-gray-900 drop-shadow-md">
            {getDurationText(selectedLevel, breathingPhase, currentTechnique)}
          </p>
        </div>
      </div>

      <div
        className="mt-16 text-center"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <p className="text-lg text-white italic mb-2">Follow the rhythm</p>
        <div className="flex items-center justify-center gap-2">
          {currentTechnique.phases.map((phase, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                isPhaseActive(
                  index,
                  currentPhaseIndex,
                  selectedLevel,
                  phase,
                  breathingPhase
                )
                  ? "bg-teal-400 scale-125"
                  : "bg-gray-300"
              }`}
              title={`${phase} ${index + 1}`}
              data-aos="scale-in"
              data-aos-delay={700 + index * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const getDurationText = (selectedLevel, breathingPhase, currentTechnique) => {
  if (selectedLevel === "expert") {
    return breathingPhase === "retention" ? "60s" : "1.5s";
  }
  return `${Math.ceil(
    (currentTechnique.pattern[breathingPhase] ||
      currentTechnique.pattern.inhale) / 1000
  )}s`;
};

const isPhaseActive = (
  index,
  currentPhaseIndex,
  selectedLevel,
  phase,
  breathingPhase
) => {
  if (selectedLevel === "expert") {
    return (
      (phase === "power_breathing" && breathingPhase === "power_breathing") ||
      (phase === "retention" && breathingPhase === "retention")
    );
  }
  return index === currentPhaseIndex;
};

export default BreathingCircle;
