import React from "react";
import TimeAgo from "react-timeago";
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

function Card({ style, title, createdAt, startPrice}) {
  const formatter = buildFormatter(frenchStrings)
  return (
    <div className="card" style={style}>
      <div className="card__image">
        <img src="image/image.png" alt="image" />
      </div>
      <div className="card__body">
        <div className="card__body_head">
          <h4>{title}</h4>
          <p>Mise en ligne :
          &nbsp;<TimeAgo date={createdAt} formatter={formatter}/>
          </p>
          <p>Temps restant:
            &nbsp;<TimeAgo date={createdAt} formatter={formatter}/>
          </p>
          <p>
            Prix de départ: {startPrice}€,&nbsp;
            <span className="text-primary bold">Prix en cours: 350€</span>
          </p>
        </div>
        <div className="card__body_desc">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad atque
            aut autem, corporis deleniti dolores, et eveniet labore laborum
            maiores perferendis rem sequi tempore, unde voluptates. Neque nulla
            reprehenderit tempore.
          </p>
        </div>
        <div className="card__footer">
          <div className="card__footer_author">
            <img src="/image/avatar_mini.png" alt="avatar" />
            <p>Mise en ligne par: Julia</p>
          </div>
          <div>
            <a href="#" className="btn btn-primary btn-small">
              Voir l'annonce
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
