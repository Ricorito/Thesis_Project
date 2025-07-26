import AOSWrapper from "../aos/AOSWrapper"; 
import HeroSection from "./utilityComponents/HeroSection";
import ProjectReview from "./homeComponent/ProjectReview";
import ContactBugReport from "./utilityComponents/ContactBugReport";
import MentalHealthSection from "./homeComponent/MentalHealthSection";
const HomeComponent = () => {
 
  return (
    <AOSWrapper>
      <div className="flex flex-col bg-stone-100">
        <HeroSection />
        <MentalHealthSection/>
        <ProjectReview />
        <ContactBugReport/>
        </div>
    </AOSWrapper>
  );
};

export default HomeComponent;
