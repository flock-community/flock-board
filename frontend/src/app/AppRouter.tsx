import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Projects } from "../feature/projects/Projects";
import { NoMatchFound } from "./NoMatchFound";
import { Homepage } from "../feature/homepage/Homepage";
import { AppLayout } from "./AppLayout";

export function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route
          path="/projects"
          render={(props) => (
            <AppLayout {...props} title="Projects">
              <Projects></Projects>
            </AppLayout>
          )}
        ></Route>
        {/* <Route
          exact
          path="/"
          render={props => (
            <AppLayout {...props} title="Welcome to the Flock board!">
              <Homepage></Homepage>
            </AppLayout>
          )}
        ></Route> */}
        <Redirect to={"/projects"} />
        <Route component={NoMatchFound}></Route>
      </Switch>
    </Router>
  );
}
