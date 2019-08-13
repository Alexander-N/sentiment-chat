import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { FirebaseSingleton as firebase } from "./components/Firebase";
import { User } from "firebase/app";

import * as ROUTES from "./constants/routes";
import Chat from "./components/Chat";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

interface ComponentProps {}
interface ComponentState {
  user: User | null;
  loading: boolean;
}
const INITIAL_STATE: ComponentState = {
  user: null,
  loading: true
};

class App extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }

      if (this.state.loading) {
        this.setState({ loading: false });
      }
    });
  }

  render() {
    if (this.state.loading) return null;
    return (
      <Router>
        <Route
          path="/"
          render={() =>
            this.state.user ? (
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
  }
}

export default App;
