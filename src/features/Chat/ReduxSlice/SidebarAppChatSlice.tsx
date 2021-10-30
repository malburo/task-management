import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface sidebarState {
  menuOpen: boolean;
  anyRoom: boolean;
}

const initialState: sidebarState = {
  menuOpen: true,
  anyRoom: false,
};

const sidebarAppChatSlice = createSlice({
  name: 'sibarAppChat',
  initialState,
  reducers: {
    setAnyRoom(state, action: PayloadAction<boolean>) {
      state.anyRoom = action.payload;
    },
    setMenuOpen(state, action: PayloadAction<boolean>) {
      state.menuOpen = action.payload;
    },
  },
});

const { actions, reducer: appchatUIReducer } = sidebarAppChatSlice;
export const { setAnyRoom, setMenuOpen } = actions;
export default appchatUIReducer;
