export const getBreathingInstruction = (selectedLevel, breathingPhase, wimHofRound) => {
  if (selectedLevel === "expert") {
    if (breathingPhase === "power_breathing") {
      return `Power Breath ${wimHofRound}/30`
    } else if (breathingPhase === "retention") {
      return "Hold & Relax"
    }
  }

  switch (breathingPhase) {
    case "inhale":
      return "Breathe In"
    case "exhale":
      return "Breathe Out"
    case "hold":
      return "Hold"
    default:
      return "Ready"
  }
}

export const getPhaseColor = (selectedLevel, breathingPhase) => {
  if (selectedLevel === "expert") {
    if (breathingPhase === "power_breathing") {
      return "from-red-400 via-orange-400 to-yellow-400"
    } else if (breathingPhase === "retention") {
      return "from-blue-600 via-indigo-600 to-purple-600"
    }
  }

 switch (breathingPhase) {
  case "inhale":
    return "from-cyan-300 via-sky-400 to-teal-500"; 
  case "exhale":
    return "from-fuchsia-400 via-rose-500 to-pink-500";
  case "hold":
    return "from-lime-300 via-emerald-400 to-green-500"; 
  case "power_breathing": // expert only
    return "from-orange-400 via-red-500 to-yellow-400"; 
  case "retention": // expert only
    return "from-indigo-500 via-blue-700 to-purple-600"; 
  default:
    return "from-sky-500 via-blue-500 to-indigo-500"; 
}
}
