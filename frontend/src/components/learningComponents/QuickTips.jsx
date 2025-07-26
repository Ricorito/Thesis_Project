import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QuickTips = () => {
  return (
    <Card
      className="bg-white/70 backdrop-blur-sm border-0 shadow-xl"
      data-aos="fade-left"
      data-aos-delay="100"
    >
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">
        Retrieval Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <span className="text-blue-500">•</span>
          <span>Try to recall before looking at notes</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-green-500">•</span>
          <span>Practice regularly, not just before exams</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-purple-500">•</span>
          <span>Focus on understanding, not memorization</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-orange-500">•</span>
          <span>Review incorrect answers more frequently</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickTips;
