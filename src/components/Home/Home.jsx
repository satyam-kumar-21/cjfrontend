import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import Testimonials from "./Testinomials";
import Stats from "../Stats/Stats";
import Team from "../Teams/Team";
import LetUs from "../Contact/LetUs";
import { useDispatch } from "react-redux";
import { getAllLecturesAction } from "../../store/Action/lectureAction";
import AboutUs from "./AboutUs";
import Mission from "./Mission";
import WhyWeAreBest from "./WhyWeAreBest";
import Ceo from "./Ceo";


function Home() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
  
    dispatch(getAllLecturesAction())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching lectures:", error);
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      <HeroSection />
      <AboutUs />
      <Ceo />
      <Mission />
      <Stats />
      <Team />
      <WhyWeAreBest />
      <Testimonials />
      <LetUs />
    
    </>
  );
}

export default Home;
