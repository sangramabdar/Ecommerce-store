import { createSlice } from "@reduxjs/toolkit";

const initailSignedInUser: {
  user: any;
} = {
  user: null,
};

const authSlice = createSlice({
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

export const { addUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
