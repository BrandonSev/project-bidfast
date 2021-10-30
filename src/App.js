import {Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header/>
      <Switch>
        <Route path='/' exact component={Home}/>
      </Switch>
    </>
  );
}

export default App;
