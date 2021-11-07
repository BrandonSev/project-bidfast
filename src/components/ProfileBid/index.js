import React from 'react';

const ProfileBid = () => {
  return (
    <div className={"profile__bid container"}>
      <h2>Suivi des offres</h2>
      <p className="text-muted">Liste les offres auxquelles je participe ou auxquelles j’ai participées</p>
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
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Mon titre</td>
            <td>Ma description</td>
            <td>21 mars 2021</td>
            <td>21 Fevrier 2022</td>
            <td>190€</td>
            <td>1900€</td>
            <td><span className="green">Terminer</span></td>
          </tr>
          <tr>
            <td>Mon titre</td>
            <td>Ma description</td>
            <td>21 mars 2021</td>
            <td>21 Fevrier 2022</td>
            <td>190€</td>
            <td>1900€</td>
            <td><span className="red">Terminer</span></td>
          </tr>
          <tr>
            <td>Mon titre</td>
            <td>Ma description</td>
            <td>21 mars 2021</td>
            <td>21 Fevrier 2022</td>
            <td>190€</td>
            <td>1900€</td>
            <td><span className="yellow">Terminer</span></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileBid;
