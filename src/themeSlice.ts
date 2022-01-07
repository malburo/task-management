import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  mode: string;
}
const initialState: ThemeState = {
  mode: localStorage.getItem('mode') || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeMode: (state, action: any) => {
      state.mode = action.payload;
      localStorage.setItem('mode', action.payload);
    },
  },
});

const { reducer: themeReducer, actions } = themeSlice;
export const { changeMode } = actions;
export default themeReducer;
