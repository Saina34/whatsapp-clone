import { Avatar } from "@mui/material";
import React from "react";
import "./Contact.css";
import { useSelector } from "react-redux";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import db from "../../firebaseConfig";

const Contact = ({ contact }) => {
  const currentContact = useSelector((state) => state.contacts.currentContact);

  const fetchConversation = async (contactId) => {
    let conversationExists = false;
    const conversations = [];
    // console.log(currentContact);
    const q = query(collection(db, "conversations"));

    const querySnapshot = await getDocs(q);
    // console.log([currentContact?._userId, contactId]);
    querySnapshot.forEach((doc) => {
      let convo = doc.data();
      if (
        convo.members.includes(currentContact?._userId) &&
        convo.members.includes(contactId)
      ) {
        conversations.push(convo);
      }
    });

    console.log(conversations);
    // const docSnap = await getDoc(docRef);
    // console.log(docSnap);
    // if (conversationExists) {
    // } else {
    //   // const newConversationRef = doc(collection(db, "conversations"));
    //   // await setDoc(newConversationRef, {
    //   //   members: [currentContact?._userId, contactId],
    //   //   messages: [],
    //   // });
    //   // console.log("conversation created")
    // }
  };
  return (
    <div
      onClick={() => fetchConversation(contact._userId)}
      className="contact"
      role="button"
    >
      <div className="contact__left">
        <Avatar src={contact.avatar} />
      </div>
      <div className="contact__right">
        <p className="contact__name">{contact.name}</p>
        <p className="contact__about">{contact.about}</p>
      </div>
    </div>
  );
};

export default Contact;
