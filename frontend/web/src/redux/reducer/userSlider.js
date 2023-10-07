import { createSlice } from "@reduxjs/toolkit";

export const userSlider = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
    setUserReset: (state, action) => {
      state.user = {};
    },
  },
});

export const { setUserDetails, setUserReset } = userSlider.actions;

export default userSlider.reducer;
