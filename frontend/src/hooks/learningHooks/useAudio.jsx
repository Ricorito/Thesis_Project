import { useState, useEffect, useRef } from "react";
import audioConfig from "../../json/learning/learningAudio.json";

// Helper function to get initial state from localStorage
const getInitialAudioSettings = () => {
  try {
    const savedSettings = localStorage.getItem("learningAudioSettings");
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      return {
        currentMusic: parsed.currentMusic || "silent",
        isMuted: parsed.isMuted || false,
        volume: parsed.volume || audioConfig.volume.background,
      };
    }
  } catch (error) {
    console.error(
      "Error parsing initial audio settings from localStorage:",
      error
    );
  }
  // Fallback to defaults if no saved settings or error
  return {
    currentMusic: "silent",
    isMuted: false,
    volume: audioConfig.volume.background,
  };
};

export const useAudio = () => {
  const initialSettings = getInitialAudioSettings();

  const [currentMusic, setCurrentMusic] = useState(
    initialSettings.currentMusic
  );
  const [isMuted, setIsMuted] = useState(initialSettings.isMuted);
  const [volume, setVolume] = useState(initialSettings.volume);
  const [isPlaying, setIsPlaying] = useState(false); // isPlaying should not be persisted

  const backgroundAudioRef = useRef(null);
  const countdownAudioRef = useRef(null);

  // Effect to save settings to localStorage whenever they change
  useEffect(() => {
    const settingsToSave = {
      currentMusic,
      isMuted,
      volume,
    };
    localStorage.setItem(
      "learningAudioSettings",
      JSON.stringify(settingsToSave)
    );
  }, [currentMusic, isMuted, volume]);

  // Effect 1: Initialize audio elements and attach event listeners (runs once)
  useEffect(() => {
    backgroundAudioRef.current = new Audio();
    backgroundAudioRef.current.loop = true;
    backgroundAudioRef.current.preload = "auto";

    // Event listeners to keep isPlaying state in sync with actual audio playback
    backgroundAudioRef.current.addEventListener("play", () =>
      setIsPlaying(true)
    );
    backgroundAudioRef.current.addEventListener("pause", () =>
      setIsPlaying(false)
    );
    backgroundAudioRef.current.addEventListener("ended", () =>
      setIsPlaying(false)
    );
    backgroundAudioRef.current.addEventListener("error", (e) => {
      console.error(
        `Background audio error for ${currentMusic} (path: ${backgroundAudioRef.current?.src}):`,
        e
      );
      setIsPlaying(false); // Stop playing on error
    });

    countdownAudioRef.current = new Audio(
      audioConfig.timerSounds.countdown.audioPath
    );
    countdownAudioRef.current.volume = audioConfig.volume.timer;
    countdownAudioRef.current.preload = "auto";

    // Cleanup function for unmount
    return () => {
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
        backgroundAudioRef.current.currentTime = 0; // Reset on full unmount
        backgroundAudioRef.current.src = "";
        backgroundAudioRef.current = null;
      }
      if (countdownAudioRef.current) {
        countdownAudioRef.current.pause();
        countdownAudioRef.current = null;
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  // Effect 2: Update background music source when currentMusic changes
  useEffect(() => {
    if (!backgroundAudioRef.current) return;

    const musicConfig = audioConfig.backgroundMusic.find(
      (music) => music.id === currentMusic
    );
    const newSrc = musicConfig?.audioPath || "";

    if (backgroundAudioRef.current.src !== newSrc) {
      backgroundAudioRef.current.src = newSrc;
      backgroundAudioRef.current.load(); // Load the new source
      // When source changes, we might want to stop and then play if it was playing
      if (isPlaying && currentMusic !== "silent") {
        backgroundAudioRef.current
          .play()
          .catch((error) =>
            console.log("Audio play failed (source change):", error)
          );
      } else {
        backgroundAudioRef.current.pause();
      }
    }
  }, [currentMusic]); // Only runs when currentMusic changes

  // Effect 3: Control playback based on isPlaying, isMuted, and volume
  useEffect(() => {
    if (!backgroundAudioRef.current) return;

    backgroundAudioRef.current.volume = volume; // Always keep volume updated
    backgroundAudioRef.current.muted = isMuted; // Always keep mute state updated

    if (isPlaying && !isMuted && currentMusic !== "silent") {
      if (backgroundAudioRef.current.paused) {
        backgroundAudioRef.current
          .play()
          .catch((error) =>
            console.log("Audio play failed (playback control):", error)
          );
      }
    } else {
      if (!backgroundAudioRef.current.paused) {
        backgroundAudioRef.current.pause();
      }
    }
  }, [isPlaying, isMuted, volume, currentMusic]); // Runs when these states change

  // Handle browser tab visibility (YouTube-like behavior)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Tab becomes visible, if music was playing (isPlaying) and not muted, resume
        if (
          backgroundAudioRef.current &&
          backgroundAudioRef.current.paused &&
          isPlaying &&
          !isMuted
        ) {
          backgroundAudioRef.current
            .play()
            .catch((error) =>
              console.log("Audio resume failed on tab focus:", error)
            );
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying, isMuted]);

  // Functions to control background music
  const startBackgroundMusic = () => {
    if (currentMusic !== "silent" && !isMuted) {
      backgroundAudioRef.current
        ?.play()
        .catch((error) =>
          console.log("Audio play failed (startBackgroundMusic):", error)
        );
    }
    setIsPlaying(true); // Set the intent to play
  };

  const stopBackgroundMusic = () => {
    backgroundAudioRef.current?.pause();
    backgroundAudioRef.current.currentTime = 0; // Explicitly reset time on full stop
    setIsPlaying(false); // Set the intent to stop
  };

  const pauseBackgroundMusic = () => {
    // This is called by usePomodoro when the timer pauses.
    // We pause the audio but keep isPlaying as true,
    // indicating the user's intent is still to play when the timer resumes.
    backgroundAudioRef.current?.pause();
  };

  const resumeBackgroundMusic = () => {
    // This is called by usePomodoro when the timer resumes.
    // We attempt to play the audio.
    if (currentMusic !== "silent" && !isMuted) {
      backgroundAudioRef.current
        ?.play()
        .catch((error) =>
          console.log("Audio play failed (resumeBackgroundMusic):", error)
        );
    }
  };

  const stopAllAudio = () => {
    backgroundAudioRef.current?.pause();
    backgroundAudioRef.current.currentTime = 0;
    setIsPlaying(false); // Set the intent to stop
    if (countdownAudioRef.current) countdownAudioRef.current.pause();
  };

  const playCountdownSound = () => {
    if (countdownAudioRef.current && !isMuted) {
      countdownAudioRef.current.currentTime = 0;
      countdownAudioRef.current
        .play()
        .catch((error) => console.log("Countdown sound failed:", error));
    }
  };

  return {
    currentMusic,
    setCurrentMusic,
    isMuted,
    setIsMuted,
    volume,
    setVolume,
    isPlaying, // Expose isPlaying
    startBackgroundMusic,
    stopBackgroundMusic,
    pauseBackgroundMusic,
    resumeBackgroundMusic,
    playCountdownSound,
    stopAllAudio,
  };
};
