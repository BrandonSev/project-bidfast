import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import React, { useEffect, useState } from "react";
import { userIdContext } from "./components/AppContext";
import axios from "axios";
import Profil from "./pages/Profil";
import Acheter from "./pages/Acheter";

function App() {
  const [userId, setUserId] = useState(null);
  const [personalInfo, setPersonalInfo] = useState([]);
  useEffect(() => {
    (async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/jwtid`, {
          withCredentials: true,
        })
        .then((res) => setUserId(res.data.id))
        .catch((err) => console.log(err));
    })();
    if (userId) {
      (async () => {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/api/users/${userId}`)
          .then((data) => setPersonalInfo(data.data[0]))
          .catch((err) => console.error(err));
      })();
    }
  }, [userId]);

  return (
    <>
      <userIdContext.Provider
        value={{ userId, setUserId: setUserId, personalInfo, setPersonalInfo }}
      >
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/acheter" exact component={Acheter} />
          <Route path="/connexion" exact>
            {userId ? <Redirect to={"/"} /> : <Login />}
          </Route>
          <Route path="/inscription" exact>
            {userId ? <Redirect to={"/"} /> : <Register />}
          </Route>
          <Route path="/mon-compte" exact>
            {userId ? <Profil /> : <Redirect to={"/"} />}
          </Route>
        </Switch>
        <Footer />
      </userIdContext.Provider>
    </>
  );
}

export default App;
