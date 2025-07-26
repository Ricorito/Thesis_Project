import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  Timer,
  Brain,
  NotebookPen,
  Users,
  Music,
  BookOpen,
} from "lucide-react";

import content from "../../json/home/projectReviewContent.json";

const icons = { Timer, Brain, NotebookPen, Users, Music, BookOpen };

const FeatureGrid = () => {
  return (
    <section
      aria-label="App Features"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
      data-aos="fade-up"
    >
      {content.features.map((feature, index) => {
        const Icon = icons[feature.icon];
        return (
          <Card
            key={index}
            className="transform transition duration-300 ease-in-out hover:scale-[1.05] hover:shadow-lg hover:-translate-y-1 cursor-default"
          >
            <CardHeader className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-teal-600" />
              <CardTitle as="h3" className="text-lg font-semibold">
                {feature.title}
                <Separator className="my-10 border-t border-sand" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              {feature.desc}
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
};

export default FeatureGrid;
