import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

import "./LoggedInUsers.css";

interface ComponentState {
  loggedInUsernames: Array<string>;
}
const INITIAL_STATE: ComponentState = {
  loggedInUsernames: []
};

class LoggedInUsers extends Component<{}, ComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = { ...INITIAL_STATE };
    const query = firebase
      .firestore()
      .collection("users")
      .where("loggedIn", "==", true);
    query.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        const changedUser = change.doc.data().username;
        let loggedInUsers = this.state.loggedInUsernames;

        switch (change.type) {
          case "added":
            loggedInUsers.push(changedUser);
            break;
          case "removed":
            loggedInUsers = loggedInUsers.filter(
              username => username !== changedUser
            );
            break;
        }
        this.setState({ loggedInUsernames: [...loggedInUsers] });
      });
    });
  }

  componentDidMount() {
    this.setState({ loggedInUsernames: [] });
  }

  render() {
    const usernames = [];
    for (const username of this.state.loggedInUsernames) {
      usernames.push(
        <div key={username} className="username">
          {username}
        </div>
      );
    }
    return <div className="users">{usernames}</div>;
  }
}

export default LoggedInUsers;
