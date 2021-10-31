import {Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
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
