import { withRouter, RouteComponentProps } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import React, { Component, ChangeEvent, FormEvent } from "react";

import { Firebase, FirebaseSingleton } from "../Firebase";

import { CHAT } from "../../constants/routes";

interface ComponentState {
  email: string;
  password: string;
  error: Error | null;
}

const INITIAL_STATE: ComponentState = {
  email: "",
  password: "",
  error: null
};

class SignIn extends Component<RouteComponentProps, ComponentState> {
  firebase: Firebase;

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.firebase = FirebaseSingleton;
  }

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const { email, password } = this.state;

    this.firebase
      .signIn(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(CHAT);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <Input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <Button disabled={isInvalid} type="submit">
          Sign In
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withRouter(SignIn);
