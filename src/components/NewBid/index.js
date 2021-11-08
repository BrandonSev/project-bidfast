import React from 'react';

const NewBid = () => {
  return (
    <div className="container">
      <h2>Déposer une annonce</h2>
      <form action="#" className="new__bid">
        <div className="grid">
          <div className="grid__group">
            <label htmlFor="titre">Titre de l'annonce:</label>
            <input type="text" id="titre" />
          </div>
          <div className="grid__group">
            <label htmlFor="titre">Catégorie:</label>
            <input type="text" id="titre" />
          </div>
          <div className="grid__group">
            <label htmlFor="titre">Date d'expiration:</label>
            <input type="date" id="titre" />
          </div>
          <div className="grid__group">
            <label htmlFor="titre">Image:</label>
            <input type="file" id="titre" />
          </div>
          <div className="grid__group">
            <label htmlFor="titre">Description:</label>
            <textarea id="titre" rows={10} />
          </div>
        </div>
        <button className="btn btn-small btn-primary">Envoyer</button>
      </form>
    </div>
  );
};

export default NewBid;
