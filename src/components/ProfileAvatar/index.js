import React, {useContext, useEffect, useState} from 'react';
import {userIdContext} from "../AppContext";
import axios from "axios";
import {toast} from "react-toastify";
import {BarLoader, ClockLoader, DotLoader, MoonLoader, SyncLoader} from "react-spinners";

const ProfileAvatar = () => {
  const [hover, setHover] = useState(false)
  const [loading, setLoading] = useState(false);
  const {personalInfo, setPersonalInfo, userId} = useContext(userIdContext)
  const handleFileUpload = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!e.target.files[0]) return
    if (e.target.files[0].size > 300000) {
      setLoading(false)
      return toast.error('Votre image ne doit pas dépasser les 300ko')
    }
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, formData, {
      withCredentials: true,
      headers: {'Content-Type': 'multipart/form-data'}
    })
      .then(res => {
        setPersonalInfo({...personalInfo, avatar: res.data.data[0].avatar})
        toast.success('Votre avatar a bien été modifié')
      })
      .catch(err => {
        console.log(err)
      })
    setLoading(false)
  }
  return (
    <>
      <div className={`avatar_profile__container ${hover ? 'hover' : ''}`} onMouseEnter={() => setHover(true)}
           onMouseLeave={() => setHover(false)}>
        {loading ? <div className="loader">
          <ClockLoader color={"var(--primary-light)"} width={70} height={4}
                       css={'display: flex;justify-content: center;position: absolute;left: 50%;top: 50%;transform:translate(-50%,-50%)'}/>
        </div> : (
          <div id={"test"}>
            <div>
              <input type="file" name="file" id="file" accept='image/*' onChange={handleFileUpload} onClick={() => setHover(false)}
              />
              <img src="/image/upload-image.svg" alt="upload icon" className="upload__icon"/>
            </div>
          </div>
        )}
        <img
          src={personalInfo.avatar ?
            personalInfo.avatar :
            'https://lesexpertsdurecouvrement.com/wp-content/uploads/2015/11/default-avatar.jpg'}
          alt={`${personalInfo.firstname}-avatar`}
        />
      </div>
    </>
  );
};

export default ProfileAvatar;
