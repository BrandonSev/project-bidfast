import {Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header/>
      <Switch>
        <Route path='/' exact component={Home}/>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
