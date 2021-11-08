import React from 'react';

const PersonalInfo = () => {
  return (
    <div className="personal container">
      <h2>Mes informations</h2>
      <div>
        <form action="#">
          <div className="personal__form">
            <div>
              <div className="personal__group avatar">
                <label htmlFor="image">Photo de profil</label>
                <img src="./image/avatar.png" alt="avatar"/>
              </div>
            </div>
            <div>
              <div className="personal__group">
                <label htmlFor="image">Pseudo:</label>
                <input type="text"/>
              </div>
              <div className="personal__group">
                <label htmlFor="email">Email:</label>
                <input type="email"/>
              </div>
              <div className="personal__group">
                <label htmlFor="image">Pays:</label>
                <input type="text"/>
              </div>
              <div className="personal__group">
                <label htmlFor="phone">Numéro de telephone:</label>
                <input type="tel"/>
              </div>
              <div className="personal__group">
                <label htmlFor="image">Genre:</label>
                <select name="genre" id="genre">
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                </select>
              </div>
            </div>
          </div>
          <button className="btn btn-primary">Modifier mes informations</button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
