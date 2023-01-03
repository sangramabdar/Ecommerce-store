import { async } from "@firebase/util";
import { createSlice } from "@reduxjs/toolkit";
import { getCartItemsService } from "./cart";
import { getOrdersService } from "./order";

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

export function loadInitialThings() {
  return async function (dispatch: any, getState: any) {
    dispatch(getCartItemsService());
    dispatch(getOrdersService());
  };
}

export const { addUser, removeUser } = signedInUserSlice.actions;

export default signedInUserSlice.reducer;
