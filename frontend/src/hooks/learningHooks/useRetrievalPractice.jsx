"use client"

import { useState, useEffect, useCallback } from "react"

// Helper function to shuffle an array
const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
  return array
}

export const useRetrievalPractice = () => {
  const [retrievalQuestion, setRetrievalQuestion] = useState("")
  const [retrievalAnswer, setRetrievalAnswer] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)
  const [retrievalQuestions, setRetrievalQuestions] = useState([])
  const [incorrectQuestions, setIncorrectQuestions] = useState([])
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(true)
  const [isReviewMode, setIsReviewMode] = useState(false)

  // New states for shuffled question IDs and current index within the shuffled list
  const [shuffledQuestionIds, setShuffledQuestionIds] = useState([])
  const [currentShuffledIndex, setCurrentShuffledIndex] = useState(0)

  // Load questions from localStorage on component mount
  useEffect(() => {
    const savedQuestions = localStorage.getItem("retrievalQuestions")
    const savedIncorrectQuestions = localStorage.getItem("incorrectRetrievalQuestions")

    let loadedQuestions = []
    let loadedIncorrectQuestions = []

    if (savedQuestions) {
      try {
        loadedQuestions = JSON.parse(savedQuestions)
        setRetrievalQuestions(loadedQuestions)
      } catch (error) {
        console.error("Error loading questions from localStorage:", error)
      }
    }
    if (savedIncorrectQuestions) {
      try {
        loadedIncorrectQuestions = JSON.parse(savedIncorrectQuestions)
        setIncorrectQuestions(loadedIncorrectQuestions)
      } catch (error) {
        console.error("Error loading incorrect questions from localStorage:", error)
      }
    }

    // Determine initial mode and shuffle if questions exist
    if (loadedQuestions.length > 0) {
      setIsCreatingQuestion(false) // Start in practice mode if questions exist
      // Initial shuffle for practice mode
      setShuffledQuestionIds(shuffleArray(loadedQuestions.map((q) => q.id)))
    } else {
      setIsCreatingQuestion(true) // Stay in creation mode if no questions
    }
  }, [])

  // Save questions to localStorage whenever retrievalQuestions changes
  useEffect(() => {
    if (retrievalQuestions.length > 0) {
      localStorage.setItem("retrievalQuestions", JSON.stringify(retrievalQuestions))
    } else {
      localStorage.removeItem("retrievalQuestions")
    }
  }, [retrievalQuestions])

  // Save incorrect questions to localStorage whenever incorrectQuestions changes
  useEffect(() => {
    if (incorrectQuestions.length > 0) {
      localStorage.setItem("incorrectRetrievalQuestions", JSON.stringify(incorrectQuestions))
    } else {
      localStorage.removeItem("incorrectRetrievalQuestions")
    }
  }, [incorrectQuestions])

  // Effect to re-shuffle questions when mode changes or question lists are updated
  useEffect(() => {
    let questionsToShuffle = []
    if (isReviewMode) {
      questionsToShuffle = incorrectQuestions
    } else {
      questionsToShuffle = retrievalQuestions
    }
    setShuffledQuestionIds(shuffleArray(questionsToShuffle.map((q) => q.id)))
    setCurrentShuffledIndex(0)
    setShowAnswer(false) // Always hide answer on mode change or shuffle
  }, [isReviewMode, retrievalQuestions, incorrectQuestions]) // Depend on question lists to re-shuffle on add/delete

  const addRetrievalQuestion = useCallback(() => {
    if (retrievalQuestion.trim() && retrievalAnswer.trim()) {
      const newQuestion = {
        id: Date.now(), // Simple ID generation
        question: retrievalQuestion,
        answer: retrievalAnswer,
        attempts: 0,
        correct: 0,
        createdAt: new Date().toISOString(),
      }

      setRetrievalQuestions((prev) => [...prev, newQuestion])
      setRetrievalQuestion("")
      setRetrievalAnswer("")

      // Show success message briefly
      const successMsg = document.createElement("div")
      successMsg.textContent = "✅ Question added successfully!"
      successMsg.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
      document.body.appendChild(successMsg)
      setTimeout(() => document.body.removeChild(successMsg), 2000)
    }
  }, [retrievalQuestion, retrievalAnswer])

  const deleteQuestion = useCallback(
    (questionId) => {
      setRetrievalQuestions((prev) => prev.filter((q) => q.id !== questionId))
      setIncorrectQuestions((prev) => prev.filter((q) => q.id !== questionId)) // Also remove from incorrect list

      // Update shuffled IDs and reset index if current question is deleted
      setShuffledQuestionIds((prevIds) => {
        const newIds = prevIds.filter((id) => id !== questionId)
        if (newIds.length === 0) {
          setCurrentShuffledIndex(0)
          setShowAnswer(false)
          setIsCreatingQuestion(true) // Go back to add mode if no questions left
        } else if (currentShuffledIndex >= newIds.length) {
          setCurrentShuffledIndex(newIds.length - 1) // Adjust index if current one was last
        }
        return newIds
      })
    },
    [currentShuffledIndex],
  )

  const clearAllQuestions = useCallback(() => {
    setRetrievalQuestions([])
    setIncorrectQuestions([]) // Clear incorrect questions too
    localStorage.removeItem("retrievalQuestions")
    localStorage.removeItem("incorrectRetrievalQuestions") // Clear incorrect questions from local storage
    setIsCreatingQuestion(true)
    setCurrentShuffledIndex(0)
    setShuffledQuestionIds([])
    setShowAnswer(false)
    setIsReviewMode(false) // Reset review mode
  }, [])

  const nextQuestion = useCallback(() => {
    setShowAnswer(false)
    if (shuffledQuestionIds.length === 0) {
      setCurrentShuffledIndex(0)
      return
    }
    setCurrentShuffledIndex((prev) => (prev + 1) % shuffledQuestionIds.length)
  }, [shuffledQuestionIds])

  const previousQuestion = useCallback(() => {
    setShowAnswer(false)
    if (shuffledQuestionIds.length === 0) {
      setCurrentShuffledIndex(0)
      return
    }
    setCurrentShuffledIndex((prev) => (prev - 1 + shuffledQuestionIds.length) % shuffledQuestionIds.length)
  }, [shuffledQuestionIds])

  const markCorrect = useCallback(
    (isCorrect) => {
      const currentQuestionId = shuffledQuestionIds[currentShuffledIndex]
      if (!currentQuestionId) return // Guard against undefined question ID

      // Find the actual question object from the main list
      const currentQ = retrievalQuestions.find((q) => q.id === currentQuestionId)
      if (!currentQ) return // Guard against question not found

      const updatedQuestions = retrievalQuestions.map((q) =>
        q.id === currentQ.id ? { ...q, attempts: q.attempts + 1, correct: isCorrect ? q.correct + 1 : q.correct } : q,
      )
      setRetrievalQuestions(updatedQuestions) // Update the main list

      if (isCorrect) {
        // If marked correct, remove from incorrect list if it was there
        setIncorrectQuestions((prev) => prev.filter((q) => q.id !== currentQ.id))
      } else {
        // If marked incorrect, add to incorrect list if not already there
        if (!incorrectQuestions.some((q) => q.id === currentQ.id)) {
          setIncorrectQuestions((prev) => [...prev, currentQ])
        }
      }

      // Immediately move to the next question without delay
      nextQuestion()
    },
    [shuffledQuestionIds, currentShuffledIndex, retrievalQuestions, incorrectQuestions, nextQuestion],
  )

  const toggleMode = useCallback((mode) => {
    setIsCreatingQuestion(mode === "add")
    setIsReviewMode(mode === "review")
    setShowAnswer(false) // Always hide answer when changing modes
    setCurrentShuffledIndex(0) // Reset index for new mode
    // The useEffect for shuffling will handle setting shuffledQuestionIds based on the new mode
  }, [])

  const clearIncorrectQuestions = useCallback(() => {
    setIncorrectQuestions([])
    localStorage.removeItem("incorrectRetrievalQuestions")
  }, [])

  // Get the current question object based on the shuffled ID and mode
  const currentQuestion =
    shuffledQuestionIds.length > 0
      ? (isReviewMode ? incorrectQuestions : retrievalQuestions).find(
          (q) => q.id === shuffledQuestionIds[currentShuffledIndex],
        )
      : null

  return {
    retrievalQuestion,
    setRetrievalQuestion,
    retrievalAnswer,
    setRetrievalAnswer,
    showAnswer,
    setShowAnswer,
    retrievalQuestions,
    incorrectQuestions,
    isCreatingQuestion,
    isReviewMode,
    addRetrievalQuestion,
    deleteQuestion,
    clearAllQuestions,
    nextQuestion,
    previousQuestion,
    markCorrect,
    toggleMode, // Renamed from toggleReviewMode for clarity
    clearIncorrectQuestions,
    currentQuestion, // Pass the actual current question object
    currentShuffledIndex,
    shuffledQuestionIds, // Pass the shuffled IDs for length/count
  }
}
