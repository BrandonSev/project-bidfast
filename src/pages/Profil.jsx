import React, { useContext, useState } from "react";
import Bid from "../components/Bid";
import ProfileBid from "../components/ProfileBid";
import NewBid from "../components/NewBid";
import PersonalInfo from "../components/PersonalInfo";
import { userIdContext } from "../components/AppContext";
import ProfileAvatar from "../components/ProfileAvatar";

const Profil = () => {
  const [bidBlock, setBidBlock] = useState(true);
  const [offerBlock, setOfferBlock] = useState(false);
  const [newBid, setNewBid] = useState(false);
  const [personalBlock, setPersonalBlock] = useState(false);
  const personalInfo = useContext(userIdContext);
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.id === "offer") {
      setBidBlock(false);
      setOfferBlock(true);
      setNewBid(false);
      setPersonalBlock(false);
    }
    if (e.target.id === "annonce") {
      setBidBlock(true);
      setOfferBlock(false);
      setNewBid(false);
      setPersonalBlock(false);
    }
    if (e.target.id === "newOffer") {
      setBidBlock(false);
      setOfferBlock(false);
      setNewBid(true);
      setPersonalBlock(false);
    }
    if (e.target.id === "informations") {
      setBidBlock(false);
      setOfferBlock(false);
      setNewBid(false);
      setPersonalBlock(true);
    }
  };

  return (
    <>
      <div className="profile__banner">
        <div className="container">
          <div className="avatar">
            <ProfileAvatar />
          </div>
          <div className="description">
            <h2>Bonjour, {personalInfo.personalInfo.firstname}</h2>
            <p className="text-muted">
              Ici retrouvez toutes vos informations de compte, vos enchères en
              cours...
            </p>
          </div>
        </div>
        <nav>
          <ul className={"container"}>
            <li className={`${bidBlock ? "active-link" : ""}`}>
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.22222 20.9524H17.7778C18.3671 20.9524 18.9324 20.7316 19.3491 20.3387C19.7659 19.9457 20 19.4128 20 18.8571V7.33302C20 7.05517 19.8829 6.78869 19.6746 6.59222C19.4662 6.39575 19.1836 6.28538 18.8889 6.28538H15.5556V5.47136C15.5556 2.73806 13.4411 0.290762 10.5556 0.025708C9.78319 -0.0466713 9.00332 0.0341949 8.2661 0.263104C7.52887 0.492013 6.85064 0.863896 6.27502 1.35483C5.6994 1.84576 5.23915 2.44486 4.92388 3.1136C4.60861 3.78234 4.44529 4.5059 4.44444 5.23773V6.28538H1.11111C0.816426 6.28538 0.533811 6.39575 0.325437 6.59222C0.117063 6.78869 0 7.05517 0 7.33302V18.8571C0 19.4128 0.234126 19.9457 0.650874 20.3387C1.06762 20.7316 1.63285 20.9524 2.22222 20.9524ZM15.5556 8.38066V10.4759H13.3333V8.38066H15.5556ZM6.66667 5.23773C6.66667 3.50493 8.16222 2.0948 10 2.0948C11.8378 2.0948 13.3333 3.50493 13.3333 5.23773V6.28538H6.66667V5.23773ZM4.44444 8.38066H6.66667V10.4759H4.44444V8.38066Z"
                  fill="currentColor"
                />
              </svg>
              <a href={"/mon-compte"} onClick={handleClick} id="annonce">
                Mes annonces
              </a>
            </li>
            <li className={`${offerBlock ? "active-link" : ""}`}>
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.26375 0.82501L9.6725 3.23376C9.88395 3.44501 10.0418 3.70376 10.133 3.98841C10.2241 4.27307 10.2459 4.57539 10.1965 4.87017C10.1471 5.16495 10.0279 5.44365 9.84889 5.68302C9.6699 5.92239 9.43628 6.11551 9.1675 6.24626L7.10875 7.24876C6.81116 7.39377 6.58324 7.65091 6.475 7.96376L6 9.34126C5.93079 9.54168 5.81173 9.72119 5.65403 9.86292C5.49633 10.0047 5.30517 10.1039 5.09853 10.1514C4.89189 10.1989 4.67656 10.1931 4.4728 10.1345C4.26903 10.0758 4.08354 9.96633 3.93375 9.81626L2.75 8.63251L1.13375 10.2475H0.25V9.36376L1.86625 7.75001L0.68125 6.56501C0.531474 6.4152 0.422226 6.22979 0.363765 6.02618C0.305303 5.82257 0.299546 5.60745 0.347033 5.401C0.394521 5.19456 0.493695 5.00357 0.635244 4.84596C0.776793 4.68836 0.956073 4.56932 1.15625 4.50001L2.53375 4.02501C2.68922 3.97112 2.83252 3.88707 2.95543 3.77767C3.07834 3.66827 3.17845 3.53568 3.25 3.38751L4.2525 1.32876C4.38325 1.05998 4.57637 0.826359 4.81574 0.647368C5.05511 0.468377 5.33381 0.349205 5.62859 0.29979C5.92337 0.250374 6.22569 0.272147 6.51035 0.363293C6.795 0.454438 7.05375 0.612316 7.265 0.82376L7.26375 0.82501ZM1.5 13.375V11.4088L2.6925 10.2163L2.75 10.2725V13.375C2.75 13.8723 2.94754 14.3492 3.29917 14.7008C3.65081 15.0525 4.12772 15.25 4.625 15.25H9V12.125C9 11.2962 9.32924 10.5014 9.91529 9.9153C10.5013 9.32925 11.2962 9.00001 12.125 9.00001H15.25V4.62501C15.25 4.12773 15.0525 3.65082 14.7008 3.29919C14.3492 2.94755 13.8723 2.75001 13.375 2.75001H10.8275C10.7765 2.68996 10.7231 2.632 10.6675 2.57626L9.59125 1.50001H13.375C14.2038 1.50001 14.9987 1.82925 15.5847 2.4153C16.1708 3.00135 16.5 3.79621 16.5 4.62501V9.21501C16.4998 10.0434 16.1707 10.8379 15.585 11.4238L11.4237 15.585C10.8379 16.1707 10.0434 16.4998 9.215 16.5H4.625C3.7962 16.5 3.00134 16.1708 2.41529 15.5847C1.82924 14.9987 1.5 14.2038 1.5 13.375ZM10.25 14.9375C10.3538 14.8688 10.45 14.79 10.54 14.7L14.7013 10.54C14.79 10.4513 14.8688 10.3538 14.9388 10.25H12.125C11.6277 10.25 11.1508 10.4476 10.7992 10.7992C10.4475 11.1508 10.25 11.6277 10.25 12.125V14.9375Z"
                  fill="currentColor"
                />
              </svg>
              <a href={"/mon-compte"} onClick={handleClick} id="offer">
                Suivi des offres
              </a>
            </li>
            <li className={`${newBid ? "active-link" : ""}`}>
              <svg
                width="20"
                height="20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#a)">
                  <path
                    d="M17.26 0c-.288 0-.563.13-.794.362l-.552.528 3.245 3.245.529-.553a1.11 1.11 0 0 0 0-1.61L18.077.36C17.847.13 17.547 0 17.259 0h.001Zm-1.875 1.347-.842.698 3.462 3.461.769-.77-3.39-3.39Zm-1.299 1.25L7.14 9.472a.75.75 0 0 0-.097.096l-.048.024a.75.75 0 0 0-.168.337l-.938 3.293a.75.75 0 0 0 .938.938l3.293-.938a.749.749 0 0 0 .505-.408l6.827-6.756-1.298-1.394v.072l-.914-.914h.072l-1.225-1.225Zm-13.46.528a.77.77 0 0 0-.626.77v15.384a.77.77 0 0 0 .77.77h15.384a.77.77 0 0 0 .77-.77v-8.461a.769.769 0 1 0-1.54 0v7.692H1.54V4.664H9.23a.77.77 0 0 0 0-1.539H.769a.772.772 0 0 0-.072 0 .772.772 0 0 0-.072 0Zm7.548 7.549 1.058.071.072 1.154-1.058.313-.408-.408.336-1.13Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="currentColor" d="M0 0h20v20H0z" />
                  </clipPath>
                </defs>
              </svg>
              <a href={"/mon-compte"} onClick={handleClick} id="newOffer">
                Déposer une annonce
              </a>
            </li>
            <li className={`${personalBlock ? "active-link" : ""}`}>
              <svg
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <a href={"/mon-compte"} onClick={handleClick} id="informations">
                Mes informations
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {bidBlock && <Bid />}
      {offerBlock && <ProfileBid />}
      {newBid && <NewBid />}
      {personalBlock && <PersonalInfo />}
    </>
  );
};

export default Profil;
