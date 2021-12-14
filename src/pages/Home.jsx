import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Slider from "../components/Slider";
import Card from "../components/Card";
import LikeIt from "../components/LikeIt";
import LikeItCard from "../components/LikeIt/LikeItCard";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/offers?limit=10`)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        });
    };
    fetch();
  }, []);

  return (
    <div className="container">
      <Hero />
      <HowItWorks />
      <h2>Les offres à ne pas manquer</h2>
      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : (
        <Slider>
          {data.map((r) => (
            <Card {...r} />
          ))}
        </Slider>
      )}
      <LikeIt>
        <LikeItCard />
      </LikeIt>
    </div>
  );
};

export default Home;
