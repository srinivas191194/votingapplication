import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Form from "./components/Form";
import Voting from "./components/Voting";

function App(props) {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Form}></Route>
        <Route exact path="/admin" component={Admin}></Route>
        <Route exact path="/voting" component={Voting}></Route>
      </Router>
    </div>
  );
}

export default App;
