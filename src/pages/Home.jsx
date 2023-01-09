import React from "react";
import Chat from "../components/chat/Chat";
import ContactList from "../components/contact-list/ContactList";
import Sidebar from "../components/sidebar/Sidebar";
import { useSelector } from "react-redux";

const Home = () => {
  const isOpen = useSelector((state) => state.contacts.contactListIsOpen);

  return (
    <div className="app">
      <div className="app__body">
        {isOpen && <ContactList />}
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
