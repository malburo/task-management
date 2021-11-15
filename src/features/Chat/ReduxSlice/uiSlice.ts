import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const uiSlide = createSlice({
  name: 'chatapp-ui',
  initialState: {
    isOpenMenu: false,
  },
  reducers: {
    setIsOpenMenu: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpenMenu = payload;
    },
  },
});

const { reducer: chatUIReducer, actions } = uiSlide;

export const { setIsOpenMenu } = actions;

export default chatUIReducer;
