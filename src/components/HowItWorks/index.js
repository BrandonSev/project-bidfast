import React from "react";

const HowItWorks = () => {
  return (
    <section className="steps">
      <h2>Comment ça marche</h2>
      <div className="steps__body">
        <div>
          <img src="image/step1.png" alt="" />
          <p>
            Je créer mon compte <br />
            ou <br />
            Je me connecte
          </p>
        </div>
        <div>
          <img src="image/search.png" alt="" />
          <p>
            Je cherche ce qu’il me faut <br />
            ou <br />
            Je dépose mon offre <br />
          </p>
        </div>
        <div>
          <img src="image/follow_bid.png" alt="" />
          <p>
            Je fais une offre <br />
            ou <br />
            Je suis mes annonces via <br /> “Mon compte”
            <br />
          </p>
        </div>
        <div>
          <img src="image/end.png" alt="" />
          <p>
            L’enchère a été remporter ?
            <br />
            <br />
            Terminer le processus via “Mon compte”
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
