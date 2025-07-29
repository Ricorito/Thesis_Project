import { useState, useEffect } from "react";
import "aos/dist/aos.css";
import AOSWrapper from "../aos/AOSWrapper";

// Import data
import intervals from "../json/learning/learningPomodorIntervals.json";
import learningTechniques from "../json/learning/learningOtherTechniques.json";

// Import hooks
import { usePomodoro } from "../hooks/learningHooks/usePomodoro";
import  useRetrievalPractice  from "../hooks/learningHooks/useRetrievalHook";
import { useAudio } from "../hooks/learningHooks/useAudio";

// Import components
import TechniqueSelector from "./learningComponents/TechniquesSelector";
import PomodoroTimer from "./learningComponents/PomodoroTimer";
import BackgroundMusic from "./learningComponents/BackgroundMusic";
import RetrievalPractice from "./learningComponents/RetrievalPractice";
import TechniquesGrid from "./learningComponents/TechniquesGrid";
import SessionTargetSelector from "./learningComponents/SessionTargetSelector";

const LearningTechniques = () => {
  const [activeTechnique, setActiveTechnique] = useState("pomodoro")

  // Load active technique from localStorage
  useEffect(() => {
    const savedTechnique = localStorage.getItem("learningActiveTechnique")
    if (savedTechnique) {
      setActiveTechnique(savedTechnique)
    }
  }, [])

  // Save active technique to localStorage
  useEffect(() => {
    localStorage.setItem("learningActiveTechnique", activeTechnique)
  }, [activeTechnique])

  // Initialize hooks
  const audioHook = useAudio()
  const pomodoroHook = usePomodoro(intervals[0], audioHook)
  const retrievalHook = useRetrievalPractice() // Now using the new simplified hook

  // Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [])

  return (
    <AOSWrapper>
      <div className="min-h-screen bg-stone-100 py-8 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4" data-aos="fade-down">
            <h1 className="text-4xl font-bold font-jakarta text-gray-800 mb-2">Learning Hub</h1>
            <p className="text-lg italic text-gray-600 max-w-2xl mx-auto">
              Focus your mind, enhance your learning, and grow at your own pace. Use proven techniques with calming
              sounds to create your perfect study environment.
            </p>
          </div>

          {/* Technique Selector */}
          <TechniqueSelector activeTechnique={activeTechnique} setActiveTechnique={setActiveTechnique} />

          {/* Main Content + Panels */}
          <div className="space-y-6">
            {/* Main Component */}
            {activeTechnique === "pomodoro" ? (
              <PomodoroTimer pomodoroHook={pomodoroHook} intervals={intervals} audioHook={audioHook} />
            ) : (
              <RetrievalPractice retrievalHook={retrievalHook} audioHook={audioHook} />
            )}

            {activeTechnique === "pomodoro" && <SessionTargetSelector pomodoroHook={pomodoroHook} />}

            {/* ⬇️ Horizontal Row of Panels */}
            <div className="grid">
              {activeTechnique === "pomodoro" && <BackgroundMusic audioHook={audioHook} />}
            </div>
          </div>

          {/* Techniques Grid */}
          <TechniquesGrid learningTechniques={learningTechniques} />
        </div>
      </div>
    </AOSWrapper>
  )
}

export default LearningTechniques;


