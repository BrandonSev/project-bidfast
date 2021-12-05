import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userIdContext } from "../AppContext";

const ProfileBid = () => {
  const [data, setData] = useState([]);
  const [myOffers, setMyOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userContext = useContext(userIdContext);

  useEffect(() => {
    const fetchOfferBiddings = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/users/${userContext.userId}/offerBiddings`
        )
        .then((res) => {
          if (res.data.length)
            setData([
              ...new Map(
                res.data.map((item) => [JSON.stringify(item.id), item])
              ).values(),
            ]);
          else setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    fetchOfferBiddings();
  }, [userContext.userId]);

  useEffect(() => {
    const fetchLastPrice = () => {
      data.forEach(async (r, i) => {
        await axios
          .get(
            `${process.env.REACT_APP_API_URL}/api/offers/${r.id}/offerBiddings?limit=1&order=DESC`
          )
          .then((res) => {
            setMyOffers((prevState) => [...prevState, res.data[0].price]);
            if (i === data.length - 1) setLoading(false);
          })
          .catch((err) => console.log(err));
      });
    };
    fetchLastPrice();
  }, [data]);

  return (
    <div className={"profile__bid container"}>
      <h2>Suivi des offres</h2>
      <p className="text-muted">
        Liste les annonces auxquelles je participe ou auxquelles j’ai
        participées
      </p>
      <div>
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Date de publication</th>
              <th>Date d'expiration</th>
              <th>Prix de départ</th>
              <th>Prix actuel</th>
              <th>Mon offre</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8}>Chargement ...</td>
              </tr>
            ) : data.length ? (
              data.map((data, index) => {
                return (
                  <tr key={data.id}>
                    <td>{data.name}</td>
                    <td>{data.content}</td>
                    <td>{new Date(data.createdAt).toLocaleString()}</td>
                    <td>{new Date(data.expireAt).toLocaleString()}</td>
                    <td>{data.startPrice}€</td>
                    <td>{myOffers[index]}€</td>
                    <td>{data.price}€</td>
                    <td>
                      <span
                        className={`${
                          new Date().getTime() <
                          new Date(data.expireAt).getTime()
                            ? "primary"
                            : new Date().getTime() >
                                new Date(data.expireAt).getTime() &&
                              data.price >= myOffers[index]
                            ? "green"
                            : "red"
                        }`}
                      >
                        <span>
                          {new Date().getTime() <
                          new Date(data.expireAt).getTime()
                            ? "En cours"
                            : new Date().getTime() >
                                new Date(data.expireAt).getTime() &&
                              data.price >= myOffers[index]
                            ? "Remporter"
                            : "Perdu"}
                        </span>
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8}>
                  Vous n'avez fait aucune enchere actuellement
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProfileBid;
