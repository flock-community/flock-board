import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Projects } from '../feature/projects/Projects';
import { NoMatchFound } from './NoMatchFound';
import { Homepage } from '../feature/homepage/Homepage';

export function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/projects">
          <Projects></Projects>
        </Route>
        <Route exact path="/">
          <Homepage></Homepage>
        </Route>
        <Route component={NoMatchFound}></Route>
      </Switch>
    </Router>
  );
}
