import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store/store";
import { loginUserService, signUpUserService } from "./services";
import { RequestStatus } from "../../services/constants";
import { LoginSchema, SignUpSchema } from "./schema";

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

function loginUserThunk(user: LoginSchema) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const result = await loginUserService(user);

    if (result.status === RequestStatus.ERROR) {
      throw result.error;
    }

    return result;
  };
}

function signUpUserThunk(user: SignUpSchema) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const result = await signUpUserService(user);

    if (result.status === RequestStatus.ERROR) {
      throw result.error;
    }

    return result;
  };
}

const authSlice = createSlice({
  name: "user",
  initialState: initailSignedInUser,
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

const selectAuth = (state: RootState) => state.auth;

export const { addUser, removeUser } = authSlice.actions;
export type { AuthSliceType };

export default authSlice.reducer;

export { selectAuth };
export { loginUserThunk, signUpUserThunk };
