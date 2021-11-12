import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import Card from "../Card";
import {userIdContext} from "../AppContext";
import CardSkeleton from "../CardSkeleton";
import {NavLink} from "react-router-dom";

const Bid = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userContext = useContext(userIdContext);
  useEffect(() => {
    (async () => {
      await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userContext.userId}/offers?order=DESC`)
        .then(res => {
          setData(res.data)
          setLoading(false)
        })
        .catch(err => console.log(err))
    })()
  }, []);

  return (
    <div className="bid container">
      <h2>Mes annonces en ligne</h2>
      {loading ? (<CardSkeleton/>) : (
        data.length ? data.map(res => {
          return <Card id={res.id} title={res.name} expireAt={res.expireAt} createdAt={res.createdAt}
                       startPrice={res.startPrice} description={res.content}/>
        }) : (
          <>
            <p>Vous n'avez aucune annonce en ligne :(</p>
            <NavLink to={''} className="btn btn-small btn-primary">Créer une annonce</NavLink>
          </>
        )
      )}
    </div>
  );
};

export default Bid;
