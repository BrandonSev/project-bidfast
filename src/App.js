import {Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Header/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/connexion' exact component={Login}/>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
