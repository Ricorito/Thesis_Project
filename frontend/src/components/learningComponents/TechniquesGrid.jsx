import { Brain, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const TechniquesGrid = ({ learningTechniques }) => {
  return (
    <div className="space-y-8" data-aos="fade-up" data-aos-delay="200">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800"> Effective Learning Techniques</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover evidence-based methods to enhance your learning and retention
        </p>
      </div>

      {learningTechniques.map((category, categoryIndex) => (
        <div
          key={category.category}
          className="space-y-6"
          data-aos="fade-up"
          data-aos-delay={categoryIndex * 100}
        >
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">{category.category}</h3>
            <div className="w-24 h-1 bg-gradient-to-br from-green-200 via-sand to-green-200 mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {category.techniques.map((technique, index) => (
              <div
                key={technique.title}
                className="flex flex-col w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] max-w-[300px]"
                data-aos="fade-up"
                data-aos-delay={categoryIndex * 100 + index * 50}
              >
                <Card
                  className={`${technique.color} h-full flex flex-col justify-between border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base text-gray-800 flex items-center gap-2 flex-1">
                        <Brain className="h-4 w-4 flex-shrink-0" />
                        <span className="leading-tight">{technique.title}</span>
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className={`text-xs ml-2 ${
                          technique.difficulty === "Beginner"
                            ? "bg-green-100 text-green-700"
                            : technique.difficulty === "Intermediate"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {technique.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-700 text-sm leading-relaxed">
                      {technique.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-700 flex items-center gap-1 text-sm">
                        <Target className="h-3 w-3" />
                        How to apply:
                      </h4>
                      <ul className="space-y-1 text-xs text-gray-600">
                        {technique.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5 text-xs">•</span>
                            <span className="leading-relaxed">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TechniquesGrid