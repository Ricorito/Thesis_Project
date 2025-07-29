import { useState, useEffect } from "react"

export const usePomodoro = (initialInterval, audioHook) => {
  const [timeLeft, setTimeLeft] = useState(initialInterval.work * 60)
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [currentInterval, setCurrentInterval] = useState(initialInterval)
  const [completedSessions, setCompletedSessions] = useState(0)
  const [hasPlayedCountdown, setHasPlayedCountdown] = useState(false)
  const [autoStart, setAutoStart] = useState(true)
  const [sessionTarget, setSessionTarget] = useState(1) // Default to 1 session
  const [isTargetReached, setIsTargetReached] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("learningPomodoroSettings")
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings)
        setCompletedSessions(settings.completedSessions || 0)
        setAutoStart(settings.autoStart !== undefined ? settings.autoStart : true)
        setSessionTarget(settings.sessionTarget || 1)

        // Load current interval if it exists
        if (settings.currentInterval) {
          setCurrentInterval(settings.currentInterval)
          setTimeLeft(settings.currentInterval.work * 60)
        }
      } catch (error) {
        console.error("Error loading pomodoro settings:", error)
      }
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      completedSessions,
      currentInterval,
      autoStart,
      sessionTarget,
    }
    localStorage.setItem("learningPomodoroSettings", JSON.stringify(settings))
  }, [completedSessions, currentInterval, autoStart, sessionTarget])

  // Save daily progress to localStorage
  useEffect(() => {
    const today = new Date().toDateString()
    const dailyProgress = {
      date: today,
      sessions: completedSessions,
      minutes: completedSessions * currentInterval.work,
    }
    localStorage.setItem("learningDailyProgress", JSON.stringify(dailyProgress))
  }, [completedSessions, currentInterval])

  // Synchronize background music with timer state
  // This effect now only controls the *overall* play/pause based on timer activity
  useEffect(() => {
    if (!audioHook) return

    if (isActive) {
      // When timer starts, ensure background music is playing (or will start)
      audioHook.startBackgroundMusic()
    } else {
      // When timer pauses/stops, pause background music
      audioHook.pauseBackgroundMusic()
    }
  }, [isActive, audioHook])

  // Main timer logic
  useEffect(() => {
    let interval = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1

          // Play countdown sound at 5 seconds
          if (newTime === 5 && !hasPlayedCountdown && audioHook) {
            audioHook.playCountdownSound()
            setHasPlayedCountdown(true)
          }

          return newTime
        })
      }, 1000)
    } else if (timeLeft === 0) {
      setHasPlayedCountdown(false)

      if (!isBreak) {
        // Work session completed
        const newCompletedSessions = completedSessions + 1
        setCompletedSessions(newCompletedSessions)

        setIsBreak(true)
        setTimeLeft(currentInterval.break * 60)

        // Remove audioHook.playBreakMusic() call
        // if (audioHook) {
        //   audioHook.playBreakMusic()
        // }

        // Show notification
        showNotification("Work Session Complete! 🎉", `${sessionTarget - newCompletedSessions} sessions remaining`)

        // Auto-start break if enabled
        if (autoStart) {
          setTimeout(() => {
            setIsActive(true)
          }, 2000)
        } else {
          setIsActive(false) // Stop if auto-start is off
        }
      } else {
        // Break completed
        setIsBreak(false)
        setTimeLeft(currentInterval.work * 60)

        // Remove audioHook.resumeSessionMusic() call
        // if (audioHook) {
        //   audioHook.resumeSessionMusic()
        // }

        // Show notification
        showNotification("Break Complete! 💪", "Ready to focus again?")

        // Check if target was reached after the *previous* work session
        if (completedSessions >= sessionTarget && sessionTarget > 0) {
          setIsActive(false) // Stop the timer
          setIsTargetReached(true) // Set target reached flag
          showNotification(
            "🎉 All Sessions Complete!",
            `Amazing work! You've completed all ${sessionTarget} focus sessions!`,
          )
          return () => clearInterval(interval) // Stop further processing
        }

        // Auto-start work session if enabled and target not reached
        if (autoStart) {
          setTimeout(() => {
            setIsActive(true)
          }, 2000)
        } else {
          setIsActive(false) // Stop if auto-start is off
        }
      }
    }
    return () => clearInterval(interval)
  }, [
    isActive,
    timeLeft,
    isBreak,
    currentInterval,
    hasPlayedCountdown,
    audioHook,
    autoStart,
    completedSessions,
    sessionTarget,
  ])

  // Browser notification function
  const showNotification = (title, body) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
      })
    } else if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, {
            body,
            icon: "/favicon.ico",
            badge: "/favicon.ico",
          })
        }
      })
    }
  }

  const toggleTimer = () => {
    const newActiveState = !isActive
    setIsActive(newActiveState)

    // Reset countdown flag when starting/stopping
    if (newActiveState) {
      setHasPlayedCountdown(false)
    }
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsBreak(false)
    setTimeLeft(currentInterval.work * 60)
    setHasPlayedCountdown(false)
    setCompletedSessions(0)
    setIsTargetReached(false)

    // Stop all audio when resetting
    if (audioHook) {
      audioHook.stopAllAudio()
    }
  }

  const changeInterval = (newInterval) => {
    setCurrentInterval(newInterval)
    setIsActive(false)
    setIsBreak(false)
    setTimeLeft(newInterval.work * 60)
    setHasPlayedCountdown(false)
    setCompletedSessions(0) // Reset completed sessions on interval change
    setIsTargetReached(false) // Reset target reached state on interval change

    // Stop all audio when changing intervals
    if (audioHook) {
      audioHook.stopAllAudio()
    }
  }

  const resetDailyProgress = () => {
    setCompletedSessions(0)
    setIsTargetReached(false)
    localStorage.removeItem("learningDailyProgress")
  }

  const resetTargetReached = () => {
    setIsTargetReached(false)
    setIsActive(false)
    setIsBreak(false)
    setTimeLeft(currentInterval.work * 60)
    setHasPlayedCountdown(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getProgress = () => {
    const totalTime = isBreak ? currentInterval.break * 60 : currentInterval.work * 60
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  return {
    timeLeft,
    isActive,
    isBreak,
    currentInterval,
    completedSessions,
    sessionTarget,
    setSessionTarget,
    isTargetReached,
    autoStart,
    setAutoStart,
    toggleTimer,
    resetTimer,
    changeInterval,
    resetDailyProgress,
    resetTargetReached,
    formatTime,
    getProgress,
  }
}
