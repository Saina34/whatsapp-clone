import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import ContactList from "./components/contact-list/ContactList";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
} from "react-router-dom";

import { useSelector } from "react-redux";

const App = () =>  {
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
}

export default App;
