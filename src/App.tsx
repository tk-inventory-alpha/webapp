import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import IndexPage from "./containers/IndexPage";
import DashboardPage from "./containers/DashboardPage";


function App() {
  return (
    <Router>
        <Switch>
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/" component={IndexPage} />
        </Switch>
    </Router>
  );
}

export default App;
