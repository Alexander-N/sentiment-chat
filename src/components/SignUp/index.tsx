import React, { Component, ChangeEvent, FormEvent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

import { Firebase, FirebaseSingleton } from "../Firebase";
import { CHAT } from "../../constants/routes";

interface ComponentState {
  username: string;
  fullName: string;
  email: string;
  passwordOne: string;
  passwordTwo: string;
  error: Error | null;
}

const INITIAL_STATE: ComponentState = {
  username: "",
  fullName: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUp extends Component<RouteComponentProps, ComponentState> {
  firebase: Firebase;

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.firebase = FirebaseSingleton;
  }

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const { username, fullName, email, passwordOne } = this.state;

    this.firebase
      .createUser(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  isInvalid = () => {
    return (
      this.state.passwordOne !== this.state.passwordTwo ||
      this.state.passwordOne === "" ||
      this.state.email === "" ||
      this.state.username === "" ||
      this.state.fullName === ""
    );
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.onSubmit}>
          <Input
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            type="text"
            placeholder="Username"
          />
          <Input
            name="fullName"
            value={this.state.fullName}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
          <Input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <Input
            name="passwordOne"
            value={this.state.passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <Input
            name="passwordTwo"
            value={this.state.passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <Button disabled={this.isInvalid()} type="submit">
            Sign Up
          </Button>

          {this.state.error && <p>{this.state.error.message}</p>}
        </form>
      </div>
    );
  }
}

export default SignUp;
