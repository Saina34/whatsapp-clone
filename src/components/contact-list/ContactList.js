import React, { useEffect } from "react";
import "./ContactList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleContactListStatus,
  updateContacts,
} from "../../store/chat/contactsSlice";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import db from "../../firebaseConfig";
import Contact from "../../components/contact/Contact";

const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts.contacts);

  const fetchContacts = async () => {
    const contactsQuery = query(collection(db, "contacts"), orderBy("name"));
    const unsubscribe = onSnapshot(contactsQuery, (querySnapshot) => {
      const contacts = [];
      querySnapshot.forEach((doc) => {
        contacts.push(doc.data());
      });

      dispatch(updateContacts(contacts));
    });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="contactList__container">
      <button onClick={() => dispatch(toggleContactListStatus())}>close</button>
      {contacts.map((contact) => (
        <Contact key={contact._userId} contact={contact} />
      ))}
    </div>
  );
};

export default ContactList;
