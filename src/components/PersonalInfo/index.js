import React, {useCallback, useContext, useState} from 'react';
import {userIdContext} from "../AppContext";
import ProfileAvatar from "../ProfileAvatar";
import axios from "axios";
import {toast} from "react-toastify";

const PersonalInfo = () => {
  const {userId, personalInfo, setPersonalInfo} = useContext(userIdContext)
  const [change, setChange] = useState(false);
  const [state, setSate] = useState({firstname: personalInfo.firstname})
  const handleChange = useCallback((e) => {
    setChange(true)
    const name = e.target.name
    const value = e.target.value
    setSate({...state, [name]: value})
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!change) return
    const data = {}
    if (state.genre) {
      data.genre = state.genre
    }
    if (state.firstname) {
      data.firstname = state.firstname
    }
    await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, data, {
      withCredentials: true
    }).then(res => {
      setPersonalInfo({...personalInfo, ...state})
      toast.success(res.data.message)
    }).catch(err => {
      console.log(err)
    })
    setChange(false)
  }
  return (
    <div className="personal container">
      <h2>Mes informations</h2>
      <div>
        <form action="#" onSubmit={handleSubmit}>
          <div className="personal__form">
            <div>
              <div className="personal__group avatar">
                <label htmlFor="image">Photo de profil</label>
                <ProfileAvatar/>
              </div>
            </div>
            <div>
              <div className="personal__group">
                <label htmlFor="image">Pseudo:</label>
                <input type="text" value={state.firstname} name="firstname" onChange={handleChange}/>
              </div>
              <div className="personal__group">
                <label htmlFor="email">Email:</label>
                <input type="email" value={personalInfo.email} disabled/>
              </div>
              <div className="personal__group">
                <label htmlFor="image">Pays:</label>
                <input type="text" disabled/>
              </div>
              <div className="personal__group">
                <label htmlFor="phone">Numéro de telephone:</label>
                <input type="tel"/>
              </div>
              <div className="personal__group">
                <label htmlFor="image">Genre:</label>
                <select name="genre" id="genre" onChange={handleChange}>
                  <option value="homme" selected={personalInfo.genre === 'homme' && true}>Homme</option>
                  <option value="femme" selected={personalInfo.genre === 'femme' && true}>Femme</option>
                </select>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={!change}>Modifier mes informations
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
