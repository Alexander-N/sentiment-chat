import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

export interface MessageProps {
  id: string;
  timestamp: firebase.firestore.Timestamp;
  userName: string;
  text: string;
  sentiment: number;
}
interface MessageState {}

const NEUTRAL_SCORE = 0.15;
class Message extends Component<MessageProps, MessageState> {
  render() {
    let emotion;
    const sentimentScore = this.props.sentiment;
    if (sentimentScore < -NEUTRAL_SCORE) {
      emotion = "☹️";
    } else if (
      sentimentScore >= -NEUTRAL_SCORE &&
      sentimentScore <= NEUTRAL_SCORE
    ) {
      emotion = "😐";
    } else if (sentimentScore > NEUTRAL_SCORE) {
      emotion = "😀";
    }
    return (
      <div id={this.props.id} className="message-container visible">
        <div className="spacing">
          <div className="pic" />
        </div>
        <div className="message">{this.props.text}</div>
        <div className="sentiment">{emotion}</div>
        <div className="name">{this.props.userName}</div>
      </div>
    );
  }
}

export default Message;
