import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import mentalHealthContent from "../../json/home/mentalHealthContent.json";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Chart from "./Chart";
import AOSWrapper from "@/aos/AOSWrapper";
export default function MentalHealthSection() {
  return (
    <AOSWrapper>
      <section className="w-full pt-12 sd-pt-12 md:pt-12 lg:pt-12 bg-stone-100">
        <div className="container mx-auto px-4 md:px-6">

          {/* Title and Intro */}
          <div className="text-center space-y-6 mb-12" data-aos="fade-up">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold font-inter text-gray-800"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Understanding the Critical Importance <br /> of <br /> Mental Health
            </h1>
            <p
              className="max-w-3xl mx-auto font-jakarta italic text-lg text-gray-800"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {mentalHealthContent.introduction}
            </p>
          </div>

          {/* Featured Categories */}
          <div className="grid gap-8 md:grid-cols-2 mb-16">
            {mentalHealthContent.featuredCategories.map((category, idx) => (
              <Card
                key={idx}
                data-aos="zoom-in"
                data-aos-delay={100}
                className="flex flex-col shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-2xl text-center font-inter font-semibold text-gray-800">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-800 italic">{category.description}</p>
                  {category.references?.length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-800">
                        Sources:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
                        {category.references.map((ref, i) => (
                          <li key={i}>
                            <a
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline text-teal-600"
                            >
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

          <Chart />
          <Separator className="pb-12 border-t border-sand" />

          {/* Other Categories */}
          <div className="space-y-12">
            <h2
              className="text-3xl font-bold text-center text-gray-800 mb-8"
              data-aos="fade-up"
            >
              <span className="underline" data-aos="fade-right">
                Explore & Connect
              </span>
              <br />
              <span data-aos="fade-left" data-aos-delay="100">
                Dive Into Articles & Forums
              </span>
              <br />
              <span data-aos="fade-up" data-aos-delay="200">
                Across the Following Categories
              </span>
            </h2>

            {mentalHealthContent.categories.map((category, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={100}
                  className={`flex flex-col md:flex-row ${
                    isReversed ? "md:flex-row-reverse" : ""
                  } items-center gap-6 md:gap-10 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow max-w-4xl mx-auto p-6`}
                >
                  {/* Title Section – Vertically Centered */}
                  <div className="md:w-1/2 flex items-center justify-center text-center">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {category.title}
                    </h3>
                  </div>

                  {/* Description Section */}
                  <div className="md:w-1/2">
                    <p className="text-gray-800 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="my-6 text-center" data-aos="fade-up">
            <p className="max-w-3xl mx-auto text-base italic font-medium text-gray-800">
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
    </AOSWrapper>
  );
}
