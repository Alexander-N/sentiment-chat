import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import Chat from "./components/Chat";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to={ROUTES.CHAT}>Chat</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </li>
      </ul>
    </div>

    <Route path={ROUTES.CHAT} component={Chat} />
    <Route path={ROUTES.SIGN_UP} component={SignUp} />
    <Route path={ROUTES.SIGN_IN} component={SignIn} />
  </Router>
);

export default App;
