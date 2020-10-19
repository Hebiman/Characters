import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import FF from "./characters/FF";
import Home from "./Home";
import "./App.scss";

function App() {
  return (
    <Router hashType="noslash">
      <nav style={{ display: "none" }}>
        <ul>
          <li>
            <Link className="button" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="button" to="/FF14">
              O'ndanya Hebi
            </Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/FF14">
          <FF />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
