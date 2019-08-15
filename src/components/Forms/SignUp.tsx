import { withRouter, RouteComponentProps } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import React, { Component, ChangeEvent, FormEvent } from "react";

import { Auth, AuthService } from "../Auth";
import { HOME } from "../../constants/routes";
import "./Forms.css";

interface ComponentState {
  username: string;
  fullname: string;
  email: string;
  passwordOne: string;
  passwordTwo: string;
  error: Error | null;
}
const INITIAL_STATE: ComponentState = {
  username: "",
  fullname: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUp extends Component<RouteComponentProps, ComponentState> {
  firebase: Auth;

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.firebase = AuthService;
  }

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const { username, fullname, email, passwordOne } = this.state;

    this.firebase
      .createUser(email, passwordOne, username, fullname)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(HOME);
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
      this.state.fullname === ""
    );
  };

  render() {
    return (
      <div className="sign-up">
        <form onSubmit={this.onSubmit}>
          <Input
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            type="text"
            placeholder="Username"
          />
          <Input
            name="fullname"
            value={this.state.fullname}
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

export default withRouter(SignUp);
