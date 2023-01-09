import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentContact } from "../store/chat/contactsSlice";

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentContact = useSelector((state) => state.contacts.currentContact);

  useEffect(() => {
    if (currentContact == null) {
      navigate("/login");
    }
  }, []);

  const handleLogin = async (contact) => {
    dispatch(updateCurrentContact(contact));
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(updateCurrentContact(null));
    navigate("/login");
  };

  const value = {
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export default AuthProvider;
