import React from "react";

import { Route, Switch } from "react-router-dom";
import WatchMovie from "./WatchMovie";

function App() {
  return (
    <Switch>
      <Route path="/" component={WatchMovie} />
    </Switch>
  );
}

export default App;
