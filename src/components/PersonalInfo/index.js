import React, {useContext} from 'react';
import {userIdContext} from "../AppContext";
import ProfileAvatar from "../ProfileAvatar";

const PersonalInfo = () => {
  const userContext = useContext(userIdContext)
  return (
    <div className="personal container">
      <h2>Mes informations</h2>
      <div>
        <form action="#">
          <div className="personal__form">
            <div>
              <div className="personal__group avatar">
                <label htmlFor="image">Photo de profil</label>
                <ProfileAvatar />
              </div>
            </div>
            <div>
              <div className="personal__group">
                <label htmlFor="image">Pseudo:</label>
                <input type="text" value={userContext.personalInfo.firstname} disabled/>
              </div>
              <div className="personal__group">
                <label htmlFor="email">Email:</label>
                <input type="email" value={userContext.personalInfo.email} disabled/>
              </div>
              <div className="personal__group">
                <label htmlFor="image">Pays:</label>
                <input type="text" value="France" disabled/>
              </div>
              <div className="personal__group">
                <label htmlFor="phone">Numéro de telephone:</label>
                <input type="tel" value={'07-68-78-88-41'}/>
              </div>
              <div className="personal__group">
                <label htmlFor="image">Genre:</label>
                <input type="tel" value={'Homme'}/>
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
