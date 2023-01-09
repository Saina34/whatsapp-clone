import React, { useState } from "react";
import "./ChatInput.css";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { useDispatch, useSelector } from "react-redux";
import { updateMessage } from "../../store/chat/chatSlice";
import db from "../../firebaseConfig";
import { doc, updateDoc, Timestamp } from "firebase/firestore";

const ChatInput = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const currentConversation = useSelector(
    (state) => state.chat.currentConversation
  );
  const currentContact = useSelector((state) => state.contacts.currentContact);

  // console.log("Will you be my Valentine?", currentConversation);
  const handleSubmitMessage = async (message) => {
    const currentMessages = currentConversation.messages;
    let count = currentMessages.length;
    const conversationRef = doc(db, "conversations", currentConversation.id);
    const messageObject = {
      id: count++,
      text: message,
      sentOn: Timestamp.fromDate(new Date()),
      senderId: currentContact._userId,
    };

    await updateDoc(conversationRef, {
      messages: [...currentMessages, messageObject],
    });

    dispatch(updateMessage(messageObject));

    setMessage("");
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
          value={message}
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
