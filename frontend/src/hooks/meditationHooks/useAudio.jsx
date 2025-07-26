import { useEffect, useRef } from "react"

export const useAudio = (selectedSound, meditationSounds, volume, isMuted) => {
  const audioRef = useRef(null)
  const notificationRef = useRef(null)

  useEffect(() => {
    if (selectedSound !== "silence" && meditationSounds[selectedSound]?.url) {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      audioRef.current = new Audio(meditationSounds[selectedSound].url)
      audioRef.current.loop = true
      audioRef.current.volume = (isMuted ? 0 : volume) / 100
    }

   if (!notificationRef.current) {
    notificationRef.current = new Audio("/sounds/meditation_complete.mp3")
    notificationRef.current.volume = 0.5;
  }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [selectedSound])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  const playAudio = () => {
    if (audioRef.current && selectedSound !== "silence") {
      audioRef.current.play().catch((e) => {
        console.log("Audio play failed:", e)
      })
    }
  }

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const playNotification = () => {
    if (notificationRef.current) {
      notificationRef.current.play().catch((e) => console.log("Notification sound failed:", e))
    }
  }

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  return { playAudio, pauseAudio, playNotification, resetAudio }
}
