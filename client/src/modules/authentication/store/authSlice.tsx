import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthSliceType {
  user: any;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
}

const initailSignedInUser: AuthSliceType = {
  user: null,
  isAuthenticated: false,
  isAuthenticating: true,
};

const authSlice = createSlice({
  name: "user",
  initialState: { ...initailSignedInUser },
  reducers: {
    addUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAuthenticating = false;
    },

    removeUser(state, action: PayloadAction<undefined>) {
      state.user = null;
      state.isAuthenticated = false;
      state.isAuthenticating = false;
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;
export type { AuthSliceType };

export default authSlice.reducer;
