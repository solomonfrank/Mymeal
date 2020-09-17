import React from "react";
import logo from "./logo.svg";

import PublicRoute from "./BaseLayout/public";
import HomePage from "./Pages/HomePage";
import ItemDetailPage from "./Pages/ItemDetailPage";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/" exact component={HomePage} />
        <PublicRoute path="/meal/:id" exact component={ItemDetailPage} />
      </Switch>
    </Router>
  );
}

export default App;
