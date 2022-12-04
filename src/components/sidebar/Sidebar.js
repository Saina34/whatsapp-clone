import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SidebarChat from "../sidebar-chat/SidebarChat";
import db from "../../firebaseConfig";
import { collection, where, query, onSnapshot } from "firebase/firestore";
import { toggleContactListStatus } from "../../store/chat/contactsSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {
    const firestoreQuery = query(collection(db, "rooms"));
    onSnapshot(firestoreQuery, (snapshot) => {
      const roomsResult = [];
      snapshot.forEach((roomSnapshot) => {
        roomsResult.push(roomSnapshot.data());
      });

      setRooms(roomsResult);
    });

    // db.collection("rooms").onSnapshot((snapshot) =>
    // setRooms(
    //     snapshot.doc.map((doc) =>({
    //         id: doc.id,
    //         data: doc.data(),
    //     }))
    // )
    // )
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
        {/* <SidebarChat addNewChat /> */}
        {rooms.map((room, key) => (
          <SidebarChat key={key} id={key} name={room.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
