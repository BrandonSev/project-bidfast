import React, {useContext, useEffect, useState} from 'react';
import {userIdContext} from "../AppContext";
import axios from "axios";
import {toast} from "react-toastify";

const ProfileAvatar = () => {
  const [hover, setHover] = useState(false)
  const {personalInfo, setPersonalInfo, userId} = useContext(userIdContext)
  const handleFileUpload = async (e) => {
    if (!e.target.files[0]) return
    e.preventDefault()
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, formData, {withCredentials: true})
      .then(res => {
        setPersonalInfo({...personalInfo, avatar: res.data.data.avatar})
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
          <img src="/image/upload-image.svg" alt="upload icon" className="upload__icon"/>
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
