import React, {useState} from 'react';
import Bid from "../components/Bid";
import ProfileBid from "../components/ProfileBid";

const Profil = () => {
  const [bidBlock, setBidBlock] = useState(true);
  const [offerBlock, setOfferBlock] = useState(false);
  const handleClick = e => {
    e.preventDefault()
    if(e.target.id === 'offer'){
      setBidBlock(false)
      setOfferBlock(true)
    }
    if(e.target.id === 'annonce'){
      setBidBlock(true)
      setOfferBlock(false)
    }
  }
  return (
    <>
      <div className="profile__baner">
        <div className="container">
          <div className="avatar">
            <img src="./image/avatar.png" alt="avatar"/>
          </div>
          <div className="description">
            <h2>Bonjour, Brandon</h2>
            <p className="text-muted">Ici retrouvez toutes vos informations de compte, vos enchères en cours...</p>
          </div>
        </div>
        <nav>
          <ul className={"container"}>
            <li>
              <span><img src="./image/bid-icon.svg" alt="bid icon"/></span>
              <a href={''} onClick={handleClick} id="annonce">Mes annonces</a>
            </li>
            <li>
              <span><img src="./image/follow-icon.svg" alt="bid icon"/></span>
              <a href={''} onClick={handleClick} id="offer">Suivre mes offres</a>
            </li>
            <li>
              <span><img src="./image/edit-icon.svg" alt="bid icon"/></span>
              <a href={''} id="informations">Mes informations</a>
            </li>
          </ul>
        </nav>
      </div>
      {bidBlock ? <Bid/> : null}
      {offerBlock ? <ProfileBid /> : null}
      </>
        );
      };

      export default Profil;
