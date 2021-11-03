import {Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {ToastContainer} from "react-toastify";
import React from "react";

function App() {
  return (
    <>
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
      <Header/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/connexion' exact component={Login}/>
        <Route path='/inscription' exact component={Register}/>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
