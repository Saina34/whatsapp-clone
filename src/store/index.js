import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat/chatSlice"
import contactsReducer from "./chat/contactsSlice"
export const store = configureStore({
  reducer: {
    chat: chatReducer,
    contacts: contactsReducer,
  },
});
