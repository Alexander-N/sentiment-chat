import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AuthService } from "../Auth";
import { User } from "firebase/app";

import * as ROUTES from "../../constants/routes";
import Chat from "../Chat";
import SignUp from "../SignUp";
import SignIn from "../SignIn";

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
    AuthService.auth.onAuthStateChanged(user => {
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
            this.state.user ? <Chat /> : <Redirect to={ROUTES.SIGN_IN} />
          }
        />

        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
      </Router>
    );
  }
}

export default App;
