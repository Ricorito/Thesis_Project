import { TextLoopHeader } from "./TextLoopHeader";

import FeatureGrid from "../../components/homeComponent/FeatureGrid";
import PlanSection from "../../components/homeComponent/PlanSection";
import CreatorNote from "../../components/homeComponent/CreatorNote";

import content from "../../json/home/projectReviewContent.json";
import AOSWrapper from "../../aos/AOSWrapper";

const ProjectReview = () => {
  return (
    <AOSWrapper>
      <section
        className="max-w-6xl mx-auto px-6 pb-16"
        aria-labelledby="project-review-heading"
      >
        <header className="text-center mb-8">
          <h1
            id="project-review-heading"
            className="text-3xl md:text-4xl font-extrabold text-teal-600 mt-4"
          >
            {content.header.title} <TextLoopHeader />
          </h1>
          <p className="text-lg font-inter text-transform: uppercase text-bold md:text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
            {content.header.description}
          </p>
        </header>
        <FeatureGrid />
        <PlanSection />
        <CreatorNote />

      </section>
    </AOSWrapper>
  );
};

export default ProjectReview;
