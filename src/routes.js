import React from "react";
import { Switch, Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Main from "./components/Main/Main";

export default (
  <Switch>
    <Route component={Welcome} exact path="/" />
    <Route component={Main} path="/main" />
  </Switch>
);
