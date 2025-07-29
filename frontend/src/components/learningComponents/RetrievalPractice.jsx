import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

import useRetrievalHook from "../../hooks/learningHooks/useRetrievalHook";
import AllFlashCard from "./AllFlashCard";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatItem = ({ label, value, color }) => (
  <div className="flex flex-col items-center">
    <span className={`text-2xl font-bold ${color}`}>{value}</span>
    <span className="text-sm text-gray-500">{label}</span>
  </div>
);

const RetrievalPractice = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { cards, addCard, deleteCard, submitAnswer, answers, updateCard } =
    useRetrievalHook();
  const total = answers.correct.length + answers.incorrect.length;
  const accuracy = total
    ? Math.round((answers.correct.length / total) * 100)
    : 0;

  const pieData = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        data: [answers.correct.length, answers.incorrect.length],
        backgroundColor: ["#10b981", "#ef4444"],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const handleAdd = () => {
    if (question.trim() && answer.trim()) {
      addCard(question.trim(), answer.trim());
      setQuestion("");
      setAnswer("");
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition">
          <CardHeader className="flex justify-center items-center">
            <CardTitle>
              <span className="text-xl font-semibold text-gray-800">
                Create Flashcard
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Label>Question</Label>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What is the capital of Hungary?"
                className="py-5 px-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label>Answer</Label>
              <Textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Budapest"
                className="h-32 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-base"
              />
            </div>
            <Button
              onClick={handleAdd}
              className="w-full bg-darkblue hover:bg-teal-700 py-5">
              Add Flashcard
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="items-center justify-center content-center text-center">
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="flex gap-4 mb-2">
              <div className="flex items-center">
                <div className="w-8 h-3 bg-green-500 rounded-sm mr-2"></div>
                <span className="text-sm">Correct {answers.correct.length}</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-3 bg-red-500 rounded-sm mr-2"></div>
                <span className="text-sm">Incorrect {answers.incorrect.len}</span>
              </div>
            </div>

            {/* Pie chart with centered accuracy */}
            <div className="w-40 h-40 relative">
              <Pie data={pieData} options={pieOptions} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-teal-700">
                  {accuracy}%
                </span>
                <span className="text-xs text-gray-500">Accuracy</span>
              </div>
            </div>
            <div className="flex gap-6 mt-4">
              <StatItem
                label="Cards"
                value={cards.length}
                color="text-darkblue"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <AllFlashCard
        cards={cards}
        deleteCard={deleteCard}
        submitAnswer={submitAnswer}
        updateCard={updateCard}
      />
    </div>
  );
};

export default RetrievalPractice;
