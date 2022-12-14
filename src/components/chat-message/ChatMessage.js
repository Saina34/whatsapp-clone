import React from "react";
import "./ChatMessage.css";

const ChatMessage = ({ message }) => {
  return (
    <div className="chatMessage">
      <p className={`chat__message ${true && `chat__receiver`}`}>
        <span className="chat__name">Saina</span>
        {message.text}
        <span className="chat__timestamp">3:52pm</span>
      </p>
    </div>
  );
};

export default ChatMessage;
