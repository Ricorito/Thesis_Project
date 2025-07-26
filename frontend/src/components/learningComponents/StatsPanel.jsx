import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Plus, Minus } from "lucide-react"

const StatsPanel = ({ pomodoroHook, retrievalHook, activeTechnique }) => {
  const {
    completedSessions,
    currentInterval,
    isActive,
    resetDailyProgress,
    sessionTarget,
    setSessionTarget,
    isTargetReached,
    resetTargetReached,
  } = pomodoroHook
  const { retrievalQuestions } = retrievalHook

  const adjustTarget = (increment) => {
    const newTarget = Math.max(1, Math.min(10, sessionTarget + increment))
    setSessionTarget(newTarget)
  }

  if (activeTechnique === "pomodoro") {
    return (
      <Card className="bg-white backdrop-blur-sm border-0 shadow-xl" data-aos="fade-left">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800 flex items-center justify-between">
            Today&#39;s Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Session Target Section */}
          <div className="space-y-3 p-3 bg-darkblue rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => adjustTarget(-1)}
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0"
                  disabled={sessionTarget <= 1 || isActive}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-lg font-bold text-white min-w-[2rem] text-center">{sessionTarget}</span>
                <Button
                  onClick={() => adjustTarget(1)}
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0"
                  disabled={sessionTarget >= 10 || isActive}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <span className="text-xs text-white">sessions</span>
            </div>
            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-white">
                <span>Progress</span>
                <span>
                  {completedSessions}/{sessionTarget}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    isTargetReached ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{
                    width: `${Math.min((completedSessions / sessionTarget) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          {/* Current Stats */}
          <div className="text-center">
            <div className={`text-3xl font-bold ${isTargetReached ? "text-green-600" : "text-black"}`}>
              {completedSessions}
            </div>
            <div className="text-sm text-gray-800">Sessions Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-black">{completedSessions * currentInterval.work}</div>
            <div className="text-sm text-gray-600">Minutes Focused</div>
          </div>
          {/* Status Badge */}
          {isTargetReached ? (
            <div className="space-y-2">
              <Badge variant="default" className="w-full justify-center py-2 bg-green-500 hover:bg-green-600">
                <Trophy className="h-4 w-4 mr-1" />
                Target Reached!
              </Badge>
            </div>
          ) : (
            <Badge variant="secondary" className="w-full justify-center py-2">
              {isActive ? " In Focus Mode" : " Ready to Start"}
            </Badge>
          )}
          {!isTargetReached && sessionTarget > completedSessions && (
            <div className="text-center p-2 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-xs text-yellow-800">
                <strong>{sessionTarget - completedSessions}</strong> sessions remaining
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl" data-aos="fade-left">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800"> Practice Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{retrievalQuestions.length}</div>
          <div className="text-sm text-gray-600">Questions Created</div>
        </div>
        {retrievalQuestions.length > 0 && (
          <>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {retrievalQuestions.reduce((acc, q) => acc + q.attempts, 0) > 0
                  ? Math.round(
                      (retrievalQuestions.reduce((acc, q) => acc + q.correct, 0) /
                        retrievalQuestions.reduce((acc, q) => acc + q.attempts, 0)) *
                        100,
                    )
                  : 0}
                %
              </div>
              <div className="text-sm text-gray-600">Overall Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">
                {retrievalQuestions.filter((q) => q.attempts === 0).length}
              </div>
              <div className="text-sm text-gray-600">Unpracticed Questions</div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default StatsPanel
