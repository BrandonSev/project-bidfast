import React from "react";

const CardSkeleton = () => {
  return (
    <div className="card__skeleton">
      <div className="card__skeleton__image">
        <span />
      </div>
      <div className="card__skeleton__body">
        <div className="card__skeleton__body_head">
          <div>
            <span />
            <span />
          </div>
          <span />
          <span />
        </div>
        <div className="card__skeleton__body_desc">
          <span />
          <span />
          <span />
        </div>
        <div className="card__skeleton__footer">
          <div className="card__skeleton__footer_author">
            <span />
            <span />
          </div>
          <span />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
