import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react" 

const RetrievalPractice = ({ retrievalHook }) => {
  const {
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
    toggleMode, 
    clearIncorrectQuestions,
    currentQuestion, 
    currentShuffledIndex,
    shuffledQuestionIds, // Get the shuffled IDs for count
  } = retrievalHook

  const [activeTechnique, setActiveTechnique] = useState("Retrieval Practice") // Declare activeTechnique state

  const questionsToDisplayCount = shuffledQuestionIds.length

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Question Management */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl" data-aos="fade-up">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-gray-800">Retrieval Practice</CardTitle>
            <CardDescription className="text-lg">
              Test your memory by recalling information without looking at your notes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Toggle between creating and practicing */}
            <div className="flex justify-center gap-4 mb-6">
              <Button
                onClick={() => toggleMode("add")}
                variant={isCreatingQuestion ? "default" : "outline"}
                className="px-6 py-2"
              >
              Add Questions
              </Button>
              <Button
                onClick={() => toggleMode("practice")}
                variant={!isCreatingQuestion && !isReviewMode ? "default" : "outline"}
                className="px-6 py-2"
                disabled={retrievalQuestions.length === 0}
              >
              Practice All ({retrievalQuestions.length})
              </Button>
              <Button
                onClick={() => toggleMode("review")}
                variant={isReviewMode ? "default" : "outline"}
                className="px-6 py-2"
                disabled={incorrectQuestions.length === 0}
              >
              Review Wrong ({incorrectQuestions.length})
              </Button>
            </div>

            {isCreatingQuestion ? (
              // Question Creation Form
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Create a question to test yourself:
                  </label>
                  <input
                    type="text"
                    value={retrievalQuestion}
                    onChange={(e) => setRetrievalQuestion(e.target.value)}
                    placeholder="e.g., What are the main causes of World War I?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Write the answer:</label>
                  <textarea
                    value={retrievalAnswer}
                    onChange={(e) => setRetrievalAnswer(e.target.value)}
                    placeholder="Write the complete answer here..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button
                  onClick={addRetrievalQuestion}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
                  disabled={!retrievalQuestion.trim() || !retrievalAnswer.trim()}
                >
                  Add Question
                </Button>

                {/* Question List */}
                {retrievalQuestions.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h4 className="font-semibold text-gray-700">Your Questions ({retrievalQuestions.length}):</h4>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {retrievalQuestions.map((q) => (
                        <div key={q.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800 truncate">{q.question}</p>
                            <p className="text-xs text-gray-500">
                              {q.attempts > 0 ? `${q.correct}/${q.attempts} correct` : "Not practiced yet"}
                            </p>
                          </div>
                          <Button
                            onClick={() => deleteQuestion(q.id)}
                            variant="outline"
                            size="sm"
                            className="ml-2 text-red-600 hover:bg-red-50"
                          >
                            🗑️
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={clearAllQuestions}
                      variant="outline"
                      className="w-full text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                    >
                      Clear All Questions
                    </Button>
                  </div>
                )}
              </div>
            ) : // Question Practice or Review
            questionsToDisplayCount === 0 ? (
              <div className="text-center p-6 text-gray-600">
                {isReviewMode
                  ? "No incorrect questions to review! Keep up the great work! 🎉"
                  : "No questions added yet. Go to 'Add Questions' to start!"}
                {!isReviewMode && (
                  <Button onClick={() => toggleMode("add")} className="mt-4">
                    Add Questions
                  </Button>
                )}
                {isReviewMode && (
                  <Button onClick={() => toggleMode("practice")} className="mt-4">
                    Go to All Questions
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-4">
                    {isReviewMode ? "Review Question" : "Question"} {currentShuffledIndex + 1} of{" "}
                    {questionsToDisplayCount}
                  </Badge>
                  <div className="text-xl font-semibold text-gray-800 mb-6 p-4 bg-blue-50 rounded-lg flex justify-between items-center">
                    <span>{currentQuestion?.question}</span>
                    <Button
                      onClick={() => deleteQuestion(currentQuestion?.id)}
                      variant="outline"
                      size="sm"
                      className="ml-2 text-red-600 hover:bg-red-50"
                      aria-label="Delete current question"
                    >
                      🗑️
                    </Button>
                  </div>
                </div>

                {!showAnswer ? (
                  <div className="text-center space-y-4">
                    <p className="text-gray-600">Think about the answer, then click to reveal:</p>
                    <Button
                      onClick={() => setShowAnswer(true)}
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-3"
                    >
                      Show Answer
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                      <h4 className="font-semibold text-green-800 mb-2">Answer:</h4>
                      <p className="text-gray-700">{currentQuestion?.answer}</p>
                    </div>
                    <div className="text-center space-y-3">
                      <p className="text-gray-600">How did you do?</p>
                      <div className="flex justify-center gap-4">
                        <Button
                          onClick={() => markCorrect(false)}
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          ❌ Incorrect
                        </Button>
                        <Button
                          onClick={() => markCorrect(true)}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          ✅ Correct
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center gap-4 pt-4">
                  <Button onClick={previousQuestion} variant="outline" disabled={questionsToDisplayCount <= 1}>
                    ← Previous
                  </Button>
                  <Button onClick={nextQuestion} variant="outline" disabled={questionsToDisplayCount <= 1}>
                    Next →
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Retrieval Stats Sidebar */}
      <div className="space-y-6">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl" data-aos="fade-left">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">📊 Practice Stats</CardTitle>
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
            {/* New: Incorrect Questions Section */}
            <div className="text-center mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="text-xl font-bold text-red-600">{incorrectQuestions.length}</div>
              <div className="text-sm text-red-800">Incorrect Questions</div>
              {incorrectQuestions.length > 0 && (
                <Button
                  onClick={clearIncorrectQuestions}
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full text-xs text-red-600 border-red-300 hover:bg-red-100 bg-transparent"
                >
                  Clear Incorrect List
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RetrievalPractice
