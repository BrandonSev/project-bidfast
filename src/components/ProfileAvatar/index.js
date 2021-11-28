import React, {useContext, useEffect, useState} from 'react';
import {userIdContext} from "../AppContext";
import axios from "axios";
import {toast} from "react-toastify";

const ProfileAvatar = () => {
  const [hover, setHover] = useState(false)
  const {personalInfo, setPersonalInfo, userId} = useContext(userIdContext)
  const handleFileUpload = async (e) => {
    e.preventDefault()
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, formData, {withCredentials: true})
      .then(res => {
        setPersonalInfo({...personalInfo, avatar: res.data.i})
        toast.success('Votre avatar a bien été modifié')
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {

  }, [personalInfo])
  return (
    <div className={`avatar_profile__container ${hover ? 'hover' : ''}`} onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}>
      <div id={"test"}>
        <div>
          <input type="file" name="file" id="file" accept='image/*' onChange={handleFileUpload}/>
          <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-upload"
             viewBox="0 0 16 16">
          <path
            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
          <path
            d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
        </svg>
      </span>
        </div>
        <div>
        </div>
      </div>
      <img
        src={personalInfo.avatar ?
          personalInfo.avatar :
          'https://lesexpertsdurecouvrement.com/wp-content/uploads/2015/11/default-avatar.jpg'}
        alt={`${personalInfo.firstname}-avatar`}
      />
    </div>
  );
};

export default ProfileAvatar;
