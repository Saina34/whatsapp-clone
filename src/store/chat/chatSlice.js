import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  currentConversation: null,
  conversations: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateName: (state, data) => {
      state.name = data.payload;
    },
    updateConversation: (state, data) => {
      state.currentConversation = data.payload;
    },
    updateConversations: (state, data) => {
      state.conversations = data.payload;
    },
    updateMessage: (state, data) => {
      const conversation = JSON.parse(
        JSON.stringify(current(state.currentConversation))
      );
      conversation.messages.push({
        id: 1,
        senderId: 1,
        text: data.payload,
      });

      state.currentConversation = conversation;
    },
  },
});

export const {
  updateName,
  updateConversation,
  updateConversations,
  updateMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
