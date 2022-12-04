import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: ''
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        updateName: (state, data) => {
            state.name = data.payload
        }
    }
})


export const { updateName } = chatSlice.actions
export default chatSlice.reducer