import React, { Component } from "react";
import "firebase/firestore";

export interface MessageProps {
  id: string;
  timestamp: firebase.firestore.Timestamp;
  username: string;
  text: string;
  sentiment: number;
}

const NEUTRAL_SCORE = 0.15;

class Message extends Component<MessageProps, {}> {
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
        <div className="name">{this.props.username}</div>
      </div>
    );
  }
}

export default Message;
