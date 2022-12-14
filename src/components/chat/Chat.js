import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import ChatMessage from "../chat-message/ChatMessage";
import ChatInput from "../chat-input/ChatInput";

const Chat = () => {
  const [input, setInput] = useState("");
  const currentConversation = useSelector(
    (state) => state.chat.currentConversation
  );

  const currentContact = useSelector((state) => state.contacts.currentContact);

  console.log({ currentConversation });

  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed >>>,", input);
    setInput("");
  };

  if (currentConversation) {
    const contact = currentConversation.members.filter(
      (member) => member._userId !== currentContact._userId
    )[0];
    return (
      <div className="chat">
        <div className="chat__header">
          <Avatar src={contact.avatar} />

          <div className="chat__headerInfo">
            <h3>{contact.name}</h3>
            <p>Last seen today</p>
          </div>

          <div className="chat__headerRight">
            <IconButton>
              <SearchOutlinedIcon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="chat__body">
          {currentConversation.messages.map((message, key) => (
            <ChatMessage message={message} key={key} />
          ))}
        </div>
        <div className="chat__footer">
          <ChatInput />
        </div>
      </div>
    );
  } else {
    return <h1>ain't nobody coming to see you otis</h1>;
  }
};

export default Chat;
