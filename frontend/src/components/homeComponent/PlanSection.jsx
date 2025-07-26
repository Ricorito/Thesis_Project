import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { motion } from "framer-motion";

import content from "../../json/home/projectReviewContent.json";

const PlanSection = () => {
  const [starter, complete, community] = content.plans;

  const renderCard = (plan, index, isCenter = false) => {
    const cardContent = (
      <Card
        className={`h-[${isCenter ? "500px" : "420px"}] ${
          isCenter
            ? "border-2 border-teal-500 bg-teal-50 shadow-lg"
            : "border border-teal-200 shadow-md"
        } flex flex-col justify-between transform transition duration-300 ease-in-out hover:scale-[1.05] hover:shadow-lg hover:-translate-y-1`}
      >
        <CardHeader>
          <CardTitle className="text-xl font-bold text-teal-600 text-center">
            {plan.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-2 text-gray-700">
          <div
            className={`text-${
              isCenter ? "4xl" : "3xl"
            } font-extrabold text-teal-500`}
          >
            FREE
          </div>
          <ul className="text-sm space-y-1">
            {plan.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          {isCenter && (
            <Button className="mt-4 bg-darkblue hover:bg-teal-700 text-white font-semibold">
              Join the Community
            </Button>
          )}
        </CardContent>
      </Card>
    );

    return (
      <motion.div
        key={index}
        initial={{ y: isCenter ? 0 : 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`w-full max-w-sm ${
          isCenter ? "lg:-translate-y-6 z-10" : ""
        }`}
      >
        {isCenter ? (
          <Link to="/authpage" className="block focus:outline-none">
            {cardContent}
          </Link>
        ) : (
          cardContent
        )}
      </motion.div>
    );
  };

  return (
    <section className="mt-24 px-4" data-aos="fade-up">
      <Separator className="my-10 border-t border-sand" />
      <h2 className="text-2xl font-bold text-teal-600 text-center mb-4">
        What does it cost?
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
        Nothing. No subscriptions. No hidden fees. Just support, tools, and
        community—completely free.
      </p>
      <div className="flex flex-col lg:flex-row justify-center items-end gap-6">
        {renderCard(starter, 0)}
        {renderCard(complete, 1, true)}
        {renderCard(community, 2)}
      </div>
    </section>
  );
};

export default PlanSection;
