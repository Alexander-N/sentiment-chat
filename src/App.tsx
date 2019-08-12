import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { FirebaseSingleton } from "./components/Firebase";

import * as ROUTES from "./constants/routes";
import Chat from "./components/Chat";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

const App = () => {
  const loggedIn = FirebaseSingleton.isUserSignedIn();
  return (
    <Router>
      <Route
        path="/"
        render={() =>
          loggedIn ? (
            <Redirect to={ROUTES.CHAT} />
          ) : (
            <Redirect to={ROUTES.SIGN_IN} />
          )
        }
      />

      <Route path={ROUTES.CHAT} component={Chat} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
    </Router>
  );
};

export default App;
