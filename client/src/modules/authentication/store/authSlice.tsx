import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthSliceType {
  user: any;
}

const initailSignedInUser: AuthSliceType = {
  user: null,
};

const authSlice = createSlice({
  name: "user",
  initialState: { ...initailSignedInUser },
  reducers: {
    addUser(state, action) {
      state.user = action.payload;
    },

    removeUser(state, action: PayloadAction<undefined>) {
      state.user = null;
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;
export type { AuthSliceType };

export default authSlice.reducer;
