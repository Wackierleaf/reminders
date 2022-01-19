import React from "react";
import Layout from "./Components/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import ModalWindow from "./Components/ModalWindow/ModalWindow";

function App() {
  return (
    <Switch>
      <Route path="/AddNote" exact component={ModalWindow} />
      <Route path="/" exact component={Layout} />
    </Switch>
  );
}

export default App;
