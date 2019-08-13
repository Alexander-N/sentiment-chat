import React, { Component, ChangeEvent, FormEvent } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

import Message, { MessageProps } from "./Message";

interface ComponentProps {}
interface ComponentState {
  messages: { [key: string]: MessageProps };
  ownMessageText: string;
}

class Chat extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = { messages: {}, ownMessageText: "" };
  }
  componentDidMount() {
    const query = firebase
      .firestore()
      .collection("messages")
      .orderBy("timestamp", "desc")
      .limit(12);

    query.onSnapshot(snapshot => {
      for (let change of snapshot.docChanges()) {
        const message = change.doc.data();
        this.setState(prevState => ({
          messages: {
            ...prevState.messages,
            [change.doc.id]: { ...message, id: change.doc.id } as MessageProps
          }
        }));
      }
    });
  }

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ ownMessageText: event.target.value });
  };

  onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    this.setState({ ownMessageText: "" });
    event.preventDefault();
    await firebase
      .firestore()
      .collection("messages")
      .add({
        text: this.state.ownMessageText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(function(error) {
        console.error("Error writing new message to Firebase Database", error);
      });
  };

  render() {
    const messages = [];
    for (const [key, messageProps] of Object.entries(this.state.messages)) {
      messages.push(<Message key={key} {...messageProps} />);
    }

    return (
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
          <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
            <div className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
              <h3>
                <i className="material-icons">chat_bubble_outline</i> Sentiment
                Chat
              </h3>
            </div>
            <div id="user-container">
              <div hidden id="user-pic" />
              <div hidden id="user-name" />
              <button
                id="sign-out"
                className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
              >
                Sign-out
              </button>
            </div>
          </div>
        </header>

        <main className="mdl-layout__content mdl-color--grey-100">
          <div
            id="messages-card-container"
            className="mdl-cell mdl-cell--12-col mdl-grid"
          >
            <div
              id="messages-card"
              className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop"
            >
              <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                <div id="messages">{messages}</div>
                <form onSubmit={this.onSubmit} id="message-form" action="#">
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                      className="mdl-textfield__input"
                      value={this.state.ownMessageText}
                      onChange={this.onChange}
                      type="text"
                      id="message"
                      autoComplete="off"
                    />
                    <label className="mdl-textfield__label" htmlFor="message" />
                  </div>
                  <button
                    id="submit"
                    type="submit"
                    disabled={this.state.ownMessageText.length === 0}
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>

            <div
              id="must-signin-snackbar"
              className="mdl-js-snackbar mdl-snackbar"
            >
              <div className="mdl-snackbar__text" />
              <button className="mdl-snackbar__action" type="button" />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Chat;