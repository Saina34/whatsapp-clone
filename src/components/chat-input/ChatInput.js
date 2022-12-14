import React, { useState } from "react";
import "./ChatInput.css";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { useDispatch } from "react-redux";
import { updateMessage } from "../../store/chat/chatSlice";

const ChatInput = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState();

  const handleSubmitMessage = (message) => {
    dispatch(updateMessage(message));
  };

  return (
    <div className="chatInput">
      <InsertEmoticonIcon />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitMessage(message);
        }}
      >
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message"
        />
        <button type="submit">Send a Message</button>
      </form>
      <MicIcon />
    </div>
  );
};

export default ChatInput;
