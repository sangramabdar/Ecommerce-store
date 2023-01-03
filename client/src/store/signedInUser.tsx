import { createSlice } from "@reduxjs/toolkit";

const initailSignedInUser: {
  user: any;
} = {
  user: null,
};

const signedInUserSlice = createSlice({
  name: "user",
  initialState: { ...initailSignedInUser },
  reducers: {
    addUser(state, action) {
      state.user = action.payload;
    },

    removeUser(state, action) {
      state.user = null;
    },
  },
});

export const { addUser, removeUser } = signedInUserSlice.actions;

export default signedInUserSlice.reducer;
