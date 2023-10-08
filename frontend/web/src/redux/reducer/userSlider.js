import { createSlice } from "@reduxjs/toolkit";

export const userSlider = createSlice({
  name: "user",
  initialState: {
    user: {},
    loader: false,
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
    setUserReset: (state, action) => {
      state.user = {};
      state.loader = false;
    },
    setActiveLoader: (state, action) => {
      state.loader = action.payload;
    },
  },
});

export const { setUserDetails, setUserReset, setActiveLoader } =
  userSlider.actions;

export default userSlider.reducer;
