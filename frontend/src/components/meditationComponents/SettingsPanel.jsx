import { Volume2, VolumeX, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

const SettingsPanel = ({
  selectedLevel,
  setSelectedLevel,
  selectedDuration,
  handleDurationChange,
  selectedSound,
  setSelectedSound,
  volume,
  setVolume,
  isMuted,
  setIsMuted,
  breathingTechniques,
  meditationSounds,
  currentTechnique,
  cycleCount,
  wimHofRound,
  isPlaying,
}) => {

  return (
  <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl" data-aos="slide-left" data-aos-delay="100">
    <CardContent className="p-6">
      <h2 className="text-2xl font-medium text-gray-800 mb-4" data-aos="fade-down" data-aos-delay="100">
        Settings
      </h2>

      {/* Level Selection */}
      <div className="mb-4" data-aos="fade-up" data-aos-delay="100">
        <label className="block text-sm font-medium text-gray-800 mb-2">Experience Level</label>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-full h-10 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(breathingTechniques).map(([level, technique]) => (
              <SelectItem key={level} value={level}>
                <span className="font-medium">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                <span className="text-xs text-gray-500">{" - " + technique.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Duration Selection */}
      <div className="mb-4" data-aos="fade-up" data-aos-delay="100">
        <label className="block text-sm font-medium text-gray-800 mb-2">Duration</label>
        <Select value={selectedDuration.toString()} onValueChange={handleDurationChange}>
          <SelectTrigger className="w-full h-10 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 3, 5, 10, 15, 20, 30, 45, 60].map((duration) => (
              <SelectItem key={duration} value={duration.toString()}>
                {duration === 60 ? "1 hour" : `${duration} min`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sound Selection */}
      <div className="mb-4" data-aos="fade-up" data-aos-delay="100">
        <label className="block text-sm font-medium text-gray-800 mb-2">Background Sound</label>
        <Select value={selectedSound} onValueChange={setSelectedSound}>
          <SelectTrigger className="w-full h-10 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(meditationSounds).map(([key, sound]) => (
              <SelectItem key={key} value={key}>
                <span className="font-medium">{sound.name}</span>
                <span className="text-xs text-gray-500">{" - " + sound.description}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Volume Control */}
      {selectedSound !== "silence" && (
        <div className="mb-4" data-aos="fade-up" data-aos-delay="100">
          <label className="block text-sm font-medium text-gray-700 mb-2">Volume</label>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)} className="p-1">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
              className="flex-1 "
              disabled={isMuted}
            />
            <span className="text-xs text-gray-600 w-10 text-right">{isMuted ? "0" : volume}%</span>
          </div>
        </div>
      )}

      {/* Current Technique Info */}
      <div className="bg-teal-50 rounded-lg p-4 border border-teal-200 mb-4" data-aos="zoom-in" data-aos-delay="100">
        <h3 className="font-medium text-gray-800 mb-2 flex items-center">
          {currentTechnique.name}
        </h3>
        <p className="text-xs text-gray-600 mb-2">{currentTechnique.benefits}</p>
        <TechniquePattern selectedLevel={selectedLevel} currentTechnique={currentTechnique} />
      </div>

      {/* Session Stats */}
      <div className="bg-teal-50 rounded-lg p-4 border border-teal-200 mb-4" data-aos="zoom-in" data-aos-delay="100"
      >
        <h3 className="font-medium text-gray-800 mb-1 flex items-center">
          Session Stats
        </h3>
        <div className="text-xs text-gray-800 space-y-1">
          <p>Level: {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}</p>
          <p>Technique: {currentTechnique.name}</p>
          <p className="text-sm font-bold"> Cycles Completed: {cycleCount} </p>
          {selectedLevel === "expert" && wimHofRound > 0 && <p>Power Breath: {wimHofRound}/30</p>}
          <p>Status: {isPlaying ? "Active" : "Paused"}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);
}

const TechniquePattern = ({ selectedLevel, currentTechnique }) => {
  if (selectedLevel === "expert") {
    return (
      <div className="text-xs text-gray-600">
        <p className="font-sm mb-1">Pattern:</p>
        <p>• {currentTechnique.rounds} rapid power breaths (1.5s each)</p>
        <p>• {currentTechnique.pattern.holdOut / 1000}-second breath retention</p>
        <p>• Repeat cycle</p>
      </div>
    )
  }

  return (
    <div className="text-xs text-gray-600">
      <p className="mb-1 font-bold text-black">Pattern:</p>
      <div className="grid grid-cols-2 gap-1">
        {currentTechnique.phases.map((phase, index) => (
          <div key={index} className="flex items-center text-black">
            {phase.charAt(0).toUpperCase() + phase.slice(1)}:{" "}
            {Math.ceil((currentTechnique.pattern[phase] || currentTechnique.pattern.inhale) / 1000)}s
          </div>
        ))}
      </div>
    </div>
  )
}

export default SettingsPanel

