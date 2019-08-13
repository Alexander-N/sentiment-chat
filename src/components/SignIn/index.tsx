import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import React, { Component, ChangeEvent, FormEvent } from "react";

import { Auth, AuthService } from "../Auth";

import { CHAT, SIGN_UP } from "../../constants/routes";

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
  firebase: Auth;

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.firebase = AuthService;
  }

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const { email, password } = this.state;

    this.firebase
      .signIn(email, password)
      .then(() => {
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

    return (
      <div>
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
          <Button type="submit">Sign In</Button>

          {error && <p>{error.message}</p>}
        </form>
        <p>
          Don't have an account? <Link to={SIGN_UP}>Sign Up</Link>
        </p>
      </div>
    );
  }
}

export default withRouter(SignIn);
