import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Target } from "lucide-react";

const SessionTargetSelector = ({ pomodoroHook }) => {
  const {
    sessionTarget,
    setSessionTarget,
    isActive,
    completedSessions,
    isTargetReached,
  } = pomodoroHook;

  const targetOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleTargetSelect = (target) => {
    if (!isActive && !isTargetReached) {
      setSessionTarget(target);
    }
  };

  if (completedSessions > 0 || isActive || isTargetReached) {
    return null; 
  }

  return (
    <Card
      className="bg-white/70 backdrop-blur-sm border-0 shadow-xl mb-6"
      data-aos="fade-up"
      data-aos-delay="50"
    >
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl text-gray-800 flex items-center justify-center gap-2">
          Choose Your Session Goal
        </CardTitle>
        <p className="text-sm text-gray-600">
          How many focus sessions do you want to complete today?
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-3">
          {targetOptions.map((target) => (
            <Button
              key={target}
              onClick={() => handleTargetSelect(target)}
              variant={sessionTarget === target ? "default" : "outline"}
              className={`h-16 flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                sessionTarget === target
                  ? "bg-darkblue hover:bg-teal-600 text-white shadow-lg scale-105"
                  : "hover:bg-teal-50 hover:border-teal-300"
              }`}
            >
              <span className="text-2xl font-bold">{target}</span>
              <span className="text-xs opacity-80">
                session{target > 1 ? "s" : ""}
              </span>
            </Button>
          ))}
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Selected: <strong className="text-gray-900">{sessionTarget}</strong>{" "}
            session
            {sessionTarget > 1 ? "s" : ""} ({sessionTarget * 25} minutes of
            focus time)
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionTargetSelector;
