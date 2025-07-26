import { useState, useEffect, useRef } from "react";

export const useBreathing = (isPlaying, selectedLevel, currentTechnique) => {
  const [breathingPhase, setBreathingPhase] = useState("inhale");
  const [animationProgress, setAnimationProgress] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [wimHofRound, setWimHofRound] = useState(0);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  // State to track pause/resume
  const [pausedAt, setPausedAt] = useState(0);
  const [isReset, setIsReset] = useState(false);

  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (isPlaying && currentTechnique) {
      if (isReset || pausedAt === 0) {
        startTimeRef.current = Date.now();
        setPausedAt(0);
        setIsReset(false);
      } else {
        startTimeRef.current = Date.now() - pausedAt;
      }

      startBreathingLoop();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } else if (!isPlaying && startTimeRef.current && !isReset) {
      const currentElapsed = Date.now() - startTimeRef.current;
      setPausedAt(currentElapsed);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isPlaying, selectedLevel, isReset]);

  useEffect(() => {
    resetBreathing();
  }, [selectedLevel]);

  const startBreathingLoop = () => {
    if (selectedLevel === "expert") {
      startWimHofLoop();
    } else {
      startRegularLoop();
    }
  };

  const startWimHofLoop = () => {
    const inhaleTime = currentTechnique.pattern.inhale;
    const exhaleTime = currentTechnique.pattern.exhale;
    const retentionTime = currentTechnique.pattern.holdOut;
    const totalCycleTime =
      (inhaleTime + exhaleTime) * currentTechnique.rounds + retentionTime;

    const animate = () => {
      if (!isPlaying) return;

      const totalElapsed = Date.now() - startTimeRef.current;
      const currentCycleNumber = Math.floor(totalElapsed / totalCycleTime);
      const elapsedInCurrentCycle = totalElapsed % totalCycleTime;
      const cycleProgress = elapsedInCurrentCycle / totalCycleTime;

      if (currentCycleNumber !== cycleCount) {
        setCycleCount(currentCycleNumber);
      }

      if (cycleProgress < 0.8) {
        setBreathingPhase("power_breathing");
        const breathProgress = (cycleProgress / 0.8) * currentTechnique.rounds;
        const currentRound = Math.floor(breathProgress) + 1;
        setWimHofRound(Math.min(currentRound, currentTechnique.rounds));

        const fastCycle = (breathProgress % 1) * 2;
        setAnimationProgress(fastCycle);
      } else {
        setBreathingPhase("retention");
        setWimHofRound(0);
        setAnimationProgress(2);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const startRegularLoop = () => {
    const { pattern, phases } = currentTechnique;
    const totalCycleTime = phases.reduce((sum, phase) => {
      switch (phase) {
        case "inhale":
          return sum + pattern.inhale;
        case "hold":
          return sum + pattern.holdIn;
        case "exhale":
          return sum + pattern.exhale;
        default:
          return sum + (pattern.holdOut || 0);
      }
    }, 0);

    const animate = () => {
      if (!isPlaying) return;

      const totalElapsed = Date.now() - startTimeRef.current;
      const currentCycleNumber = Math.floor(totalElapsed / totalCycleTime);
      const elapsedInCurrentCycle = totalElapsed % totalCycleTime;
      const cycleProgress = elapsedInCurrentCycle / totalCycleTime;

      if (currentCycleNumber !== cycleCount) {
        setCycleCount(currentCycleNumber);
      }

      let accumulatedTime = 0;
      let currentPhase = "inhale";
      let phaseIndex = 0;
      let phaseProgress = 0;

      for (let i = 0; i < phases.length; i++) {
        const phase = phases[i];
        const phaseDuration = getPhaseDuration(phase, pattern);
        const phaseEndTime = (accumulatedTime + phaseDuration) / totalCycleTime;

        if (cycleProgress <= phaseEndTime) {
          currentPhase = phase;
          phaseIndex = i;
          const phaseStartTime = accumulatedTime / totalCycleTime;
          phaseProgress =
            (cycleProgress - phaseStartTime) / (phaseEndTime - phaseStartTime);
          break;
        }
        accumulatedTime += phaseDuration;
      }

      setBreathingPhase(currentPhase);
      setCurrentPhaseIndex(phaseIndex);

      let animProgress = 0;
      switch (currentPhase) {
        case "inhale": {
          const inhaleEased = easeOutSine(phaseProgress);
          animProgress = inhaleEased; // 0 to 1
          break;
        }
        case "hold": {
          if (phaseIndex === 1) {
            // Hold after inhale
            animProgress = 1; // Stay at peak
          } else {
            // Hold after exhale
            animProgress = 2; // Stay at bottom
          }
          break;
        }
        case "exhale": {
          // Smooth ease in (like breathOut easing)
          const exhaleEased = easeInSine(phaseProgress);
          animProgress = 1 + exhaleEased; // 1 to 2
          break;
        }
        default:
          animProgress = 0;
      }

      setAnimationProgress(animProgress);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const getPhaseDuration = (phase, pattern) => {
    switch (phase) {
      case "inhale":
        return pattern.inhale;
      case "hold":
        return pattern.holdIn;
      case "exhale":
        return pattern.exhale;
      default:
        return pattern.holdOut || 0;
    }
  };

  // Easing functions matching React Native's Easing.out(Easing.sin) and Easing.in(Easing.sin)
  const easeOutSine = (t) => Math.sin((t * Math.PI) / 2);
  const easeInSine = (t) => 1 - Math.cos((t * Math.PI) / 2);

  const resetBreathing = () => {
    // Complete reset - clear all state
    setAnimationProgress(0);
    setBreathingPhase("inhale");
    setCycleCount(0);
    setWimHofRound(0);
    setCurrentPhaseIndex(0);
    setPausedAt(0); // Clear pause state
    setIsReset(true); // Mark as reset

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    startTimeRef.current = null;
  };

  return {
    breathingPhase,
    animationProgress,
    cycleCount,
    wimHofRound,
    currentPhaseIndex,
    resetBreathing,
  };
};
