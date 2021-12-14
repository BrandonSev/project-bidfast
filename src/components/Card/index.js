import React, { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/fr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import CountDown from "../CountDown";
import axios from "axios";
import CardSkeleton from "../CardSkeleton";

function Card({
  id,
  style,
  name,
  expireAt,
  createdAt,
  startPrice,
  content,
  image,
  userId,
}) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const formatter = buildFormatter(frenchStrings);
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/offers/${id}/offerBiddings?limit=1&order=DESC`
        )
        .then((res) => {
          setData(res.data[0]);
        })
        .catch((err) => console.log(err));
    };
    fetch();
  }, [id, userId]);

  useEffect(() => {
    if (data) {
      (async () =>
        await axios
          .get(`${process.env.REACT_APP_API_URL}/api/users/${userId}`)
          .then((result) => {
            setUser(result.data[0]);
          }))();
    }
  }, [data]);

  return (
    <>
      {data && user ? (
        <div className="card" style={style}>
          <div className="card__image">
            <img src={`${image ? image : "image/image.png"}`} alt="image" />
          </div>
          <div className="card__body">
            <div className="card__body_head">
              <h4>
                {name}
                <span>
                  <TimeAgo date={new Date(createdAt)} formatter={formatter} />
                </span>
              </h4>

              <p>
                Temps restant: &nbsp;{" "}
                <CountDown date={new Date(expireAt).getTime()} />
              </p>
              <p>
                Prix de départ: {startPrice}€,&nbsp;
                <span className="text-primary bold">
                  Prix en cours: {data.price ? data.price + "€" : "-"}
                </span>
              </p>
            </div>
            <div className="card__body_desc">
              <p>
                <strong>Description:</strong> <br />
                <br />
                {content ? content.substring(0, 250) : ""}...
              </p>
            </div>
            <div className="card__footer">
              <div className="card__footer_author">
                <img src="/image/avatar_mini.png" alt="avatar" />
                <p>{user.firstname}</p>
              </div>
              <div>
                <a href="#" className="btn btn-primary btn-small">
                  Voir l'annonce
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CardSkeleton />
      )}
    </>
  );
}

export default Card;
