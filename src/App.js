import React from 'react';

import './App.css';
import VrMode from './VrMode';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/vr">
            <VrMode />
          </Route>
        </Switch>

    </Router>
  );
}

export default App;
