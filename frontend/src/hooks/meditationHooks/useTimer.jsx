import { useState, useEffect, useRef } from "react"

export const useTimer = (selectedDuration, onComplete) => {
  const [timeLeft, setTimeLeft] = useState(selectedDuration * 60)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeDuration, setActiveDuration] = useState(selectedDuration)
  const intervalRef = useRef(null)
  const onCompleteRef = useRef(onComplete)

  // Keep onComplete reference current
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  // Timer effect - ONLY depends on isPlaying
  useEffect(() => {
    if (isPlaying) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      // Start new interval
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1
          if (newTime <= 0) {
            // Timer completed
            clearInterval(intervalRef.current)
            intervalRef.current = null
            setIsPlaying(false)
            onCompleteRef.current()
            return 0
          }
          return newTime
        })
      }, 1000)
    } else {
     
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isPlaying])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const reset = () => {
    // Stop timer and reset to current selected duration
    setIsPlaying(false)
    setTimeLeft(selectedDuration * 60)
    setActiveDuration(selectedDuration)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const forceReset = (newDuration) => {
    setIsPlaying(false)
    setTimeLeft(newDuration * 60)
    setActiveDuration(newDuration)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const progressPercentage = ((activeDuration * 60 - timeLeft) / (activeDuration * 60)) * 100

  return {
    timeLeft,
    isPlaying,
    setIsPlaying,
    formatTime,
    reset,
    forceReset,
    progressPercentage,
    activeDuration,
  }
}
