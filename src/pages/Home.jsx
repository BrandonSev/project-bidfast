import React from "react";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Slider from "../components/Carousel";
import Card from "../components/Card";
import LikeIt from "../components/LikeIt";
import LikeItCard from "../components/LikeIt/LikeItCard";

const Home = () => {
  return (
    <div className="container">
      <Hero />
      <HowItWorks />
      <h2>Les offres à ne pas manquer</h2>
      <Slider slidesVisible={1} gap={8}>
        <Card title={"1"} />
        <Card title={"1"} />
        <Card title={"1"} />
        <Card title={"1"} />
      </Slider>
      <LikeIt>
        <LikeItCard />
      </LikeIt>
    </div>
  );
};

export default Home;
