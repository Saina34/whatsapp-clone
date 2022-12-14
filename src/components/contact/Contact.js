import { Avatar } from "@mui/material";
import React from "react";
import "./Contact.css";
import { useSelector, useDispatch } from "react-redux";
import { doc, setDoc, collection } from "firebase/firestore";
import db from "../../firebaseConfig";
import { updateConversation } from "../../store/chat/chatSlice";

const Contact = ({ contact }) => {
  const currentContact = useSelector((state) => state.contacts.currentContact);
  const conversations = useSelector((state) => state.chat.conversations);
  const dispatch = useDispatch();
  const fetchConversation = async (contact) => {
    let conversationExists = false;
    conversations.every((conversation) => {
      if (conversation.members.includes(contact._userId)) {
        dispatch(updateConversation(conversation));
        conversationExists = true;
        return false;
      }

      return true;
    });

    if (!conversationExists) {
      const newConversationRef = doc(collection(db, "conversations"));
      const conversation = {
        memberIds: [currentContact._userId, contact._userId],
        members: [currentContact, contact],
        messages: [],
      };
      await setDoc(newConversationRef, conversation);
      conversation.id = newConversationRef.id;
      dispatch(updateConversation(conversation));
    }
  };
  return (
    <div
      onClick={() => fetchConversation(contact)}
      className="contact"
      role="button"
    >
      <div className="contact__left">
        <Avatar src={contact.avatar} />
      </div>
      <div className="contact__right">
        <p className="contact__name">{contact.name}</p>
        <p className="coact__about">{contact.about}</p>
      </div>
    </div>
  );
};

export default Contact;
