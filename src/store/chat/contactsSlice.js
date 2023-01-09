import { createSlice } from "@reduxjs/toolkit";

/**
 * {
    _userId: "9b1ea66f-f442-4f27-8345-73035044bf1b",
    about: "The Marathon continues",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/37.jpg",
    name: "Lauren Saina",
    phone: "254702345678",
  }
 */
const initialState = {
  contacts: [],
  currentContact: null,
  contactListIsOpen: false,
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    updateContacts: (state, data) => {
      state.contacts = data.payload;
    },
    updateCurrentContact: (state, data) => {
      state.currentContact = data.payload;
    },
    toggleContactListStatus: (state) => {
      state.contactListIsOpen = !state.contactListIsOpen;
    },
  },
});

export const { updateContacts, updateCurrentContact, toggleContactListStatus } =
  contactsSlice.actions;
export default contactsSlice.reducer;
