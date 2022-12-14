import React from "react";
import "./Conversation.css";
import { Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateConversation } from "../../store/chat/chatSlice";

const Conversation = ({ conversation }) => {
  const currentContact = useSelector((state) => state.contacts.currentContact);
  const dispatch = useDispatch();
  const contact = conversation.members.filter(
    (member) => member._userId !== currentContact._userId
  )[0];
  return (
    <div
      onClick={() => {
        dispatch(updateConversation(conversation));
      }}
      className="contact"
      role="button"
    >
      <div className="contact__left">
        <Avatar src={contact.avatar} />
      </div>
      <div className="contact__right">
        <p className="contact__name">{contact.name}</p>
        <p className="contact__about">{"latest message..."}</p>
      </div>
    </div>
  );
};

export default Conversation;
