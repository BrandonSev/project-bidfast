import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import Card from "../Card";
import {userIdContext} from "../AppContext";

const Bid = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userContext = useContext(userIdContext);
  useEffect(() => {
    (async () => {
      await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userContext.userId}/offers`)
        .then(res => {
          setData([res.data])
          setLoading(false)
        })
        .catch(err => console.log(err))
    })()
  }, []);

  return (
    <div className="bid container">
      <h2>Mes annonces en ligne</h2>
      {loading ? <p>Chargement...</p> : (
        data.map(res => {
          return <Card title={res.name} createdAt={res.createdAt} startPrice={res.startPrice}/>
        })
      )}
    </div>
  );
};

export default Bid;
