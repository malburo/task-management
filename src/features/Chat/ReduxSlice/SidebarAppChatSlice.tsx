import { createSlice } from "@reduxjs/toolkit";

const sidebarAppChatSlice = createSlice({
    name: 'sibarAppChat',
    initialState: {
        menuOpen: true,
        anyRoom: false
    },
    reducers: {
        addHasRoom(state, payload) {
            state.anyRoom = true;
        },
        toggleMenuOpen(state, payload) {
            state.menuOpen = !state.menuOpen;
        }
    }
})

const { actions, reducer } = sidebarAppChatSlice;
export const { addHasRoom, toggleMenuOpen } = actions;
export default reducer;
