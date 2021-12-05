import React from "react";

function LikeItCard() {
  return (
    <div className="likeItCard">
      <div className="likeItCard__header">
        <img src="image/Oval.png" alt="avatar" />
        <img src="image/star.png" alt="star" className="star" />
      </div>
      <div className="likeItCard__content">
        <p>Super site je recommande fortement Et le site est super beau :))</p>
      </div>
      <div className="likeItCard__footer">@brandonSev</div>
    </div>
  );
}

export default LikeItCard;
