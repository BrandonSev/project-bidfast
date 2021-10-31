import React from 'react';
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Slider from "../components/Carousel";
import Card from "../components/Card";

const Home = () => {
  return (
    <div className="container">
      <Hero/>
      <HowItWorks/>
      <h2>Les offres à ne pas manquer</h2>
      <Slider slidesVisible={1} gap={8}>
        <Card title={"1"}/>
        <Card title={"1"}/>
        <Card title={"1"}/>
        <Card title={"1"}/>
      </Slider>
    </div>
  );
};

export default Home;
