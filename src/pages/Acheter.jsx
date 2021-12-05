import React, { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

const Acheter = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios(`${process.env.REACT_APP_API_URL}/api/offers?expire=false`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="acheter__banner">
        <div className="container">
          <div className="acheter__banner_text">
            <img src="/image/ri_auction-line.svg" alt="" />
            <div>
              <h1>Les annonces</h1>
              <p>Ici retrouvez toutes les annonces en ligne</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className={`filter__container ${open ? "open" : ""}`}>
          <div className="filter" onClick={handleClick}>
            <p>Filtrer les résultats</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-up"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
              />
            </svg>
          </div>
          <div>
            <div className="filter__form">
              <div className="form__group">
                <label htmlFor="title">Que recherchez-vous ?</label>
                <input type="text" id="title" name="title" />
              </div>
              <div className="form__group">
                <label htmlFor="title">Catégorie</label>
                <input type="text" id="title" name="title" />
              </div>
              <div className="form__group">
                <label htmlFor="title">Prix minimum</label>
                <input type="text" id="title" name="title" />
              </div>
              <div className="form__group">
                <label htmlFor="title">Prix maximum</label>
                <input type="text" id="title" name="title" />
              </div>
            </div>
            <div className="filter__button">
              <button className="btn btn-primary">Filtrer les résultats</button>
            </div>
          </div>
        </div>
        <div className="bid__container">
          {data ? data.map((r) => <Card {...r} />) : <p>Chargement...</p>}
        </div>
      </div>
    </>
  );
};

export default Acheter;
