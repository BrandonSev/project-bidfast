import React from "react";
import LikeItCard from "./LikeItCard";

function LikeIt() {
  return (
    <section className="likeIt">
      <h2 className="likeIt__title">
        <span>
          <img src="image/loveIt.png" alt="loveIt" />
        </span>
        Ils ont aimé BidFast
      </h2>
      <div className="likeIt__body">
        <LikeItCard />
        <LikeItCard />
        <LikeItCard />
        <LikeItCard />
        <LikeItCard />
      </div>
    </section>
  );
}

export default LikeIt;
