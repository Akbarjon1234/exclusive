import "./About.css";
import OurStory from "../../components/ourStory/OurStory";
import Statistics from "../../components/statistics/Statistics";
import Team from "../../components/team/Team";
import Services from "../../components/services/Services";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about">
      <OurStory />
      <Statistics />
      <Team />
      <Services />
    </div>
  );
};

export default About;
