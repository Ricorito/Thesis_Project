import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import mentalHealthContent from "../../json/home/mentalHealthContent.json";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function MentalHealthSection() {
  return (
    <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-stone-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Title and Intro */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-50">
            {mentalHealthContent.mainTitle}
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            {mentalHealthContent.introduction}
          </p>
        </div>

        {/* Featured Categories */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {mentalHealthContent.featuredCategories.map((category, idx) => (
            <Card
              key={idx}
              className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  {category.description}
                </p>
                {category.references?.length > 0 && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      References:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {category.references.map((ref, i) => (
                        <li key={i}>
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline text-blue-600 dark:text-blue-400">
                            {ref.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other Categories */}
        <div className="space-y-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-50 mb-8">
            Discover Topics That Matter To You <br />
            Learn, Share, And Start Conversations Through The Following
            Categories.
          </h2>

          {mentalHealthContent.categories.map((category, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row ${
                  isReversed ? "md:flex-row-reverse" : ""
                } items-center gap-6 md:gap-10 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow max-w-4xl mx-auto p-6`}>
                {/* Title Section – Vertically Centered */}
                <div className="md:w-1/2 flex items-center justify-center text-center">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    {category.title}
                  </h3>
                </div>

                {/* Description Section */}
                <div className="md:w-1/2">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="my-6 text-center">
          <p className="max-w-3xl mx-auto text-xl font-medium text-gray-800 dark:text-gray-200">
            {mentalHealthContent.callToAction}
          </p>
          <Separator className="mt-12 border-t border-sand" />
          <p className="font-inter font-bold text-xl pt-12 text-teal-600">
            Join use <br />
            We offer you a
          </p>
        </div>
      </div>
    </section>
  );
}
