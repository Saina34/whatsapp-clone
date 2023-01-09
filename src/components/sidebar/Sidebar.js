import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import db from "../../firebaseConfig";
import { toggleContactListStatus } from "../../store/chat/contactsSlice";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, getDocs, where } from "firebase/firestore";
import { updateConversations } from "../../store/chat/chatSlice";
import Conversation from "../chat/Conversation";

const Sidebar = () => {
  const conversations = useSelector((state) => state.chat.conversations);
  const currentContact = useSelector((state) => state.contacts.currentContact);
  const dispatch = useDispatch();

  const fetchConversations = async () => {
    const conversationsRef = collection(db, "conversations");
    const q = query(
      conversationsRef,
      where("memberIds", "array-contains", currentContact._userId)
    );

    const querySnapshot = await getDocs(q);
    const fetchedConversations = [];

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      const docSnap = doc.data();
      fetchedConversations.push({ ...docSnap, ...{ id: doc.id } });
    });

    console.log(fetchedConversations);

    dispatch(updateConversations(fetchedConversations));
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />

        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton onClick={() => dispatch(toggleContactListStatus())}>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        {conversations.map((conversation) => (
          <Conversation key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
