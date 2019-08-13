import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AuthService } from "../Auth";
import firebase from "firebase/app";

import * as ROUTES from "../../constants/routes";
import Chat from "../Chat";
import SignUp from "../SignUp";
import SignIn from "../SignIn";

interface ComponentProps {}

interface User {
  uid: string;
  username: string;
  fullname: string;
}
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
    AuthService.auth.onAuthStateChanged(async authUser => {
      const usersRef = firebase.firestore().collection("users");
      if (authUser) {
        const userSnapshot = await usersRef
          .where("uid", "==", authUser.uid)
          .limit(1)
          .get();

        const users = userSnapshot.docs.map(doc => doc.data());
        console.assert(users.length === 1);
        const user = users[0];

        this.setState({ user: user as User });
        usersRef.doc(user.username).update({ loggedIn: true });
      } else {
        usersRef.doc(this.state.user!.username).update({ loggedIn: false });
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
              <Chat user={this.state.user} />
            ) : (
              <Redirect to={ROUTES.SIGN_IN} />
            )
          }
        />

        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
      </Router>
    );
  }
}

export default App;
