import {
  BASE_URL,
  DEFAULT_HEADERS,
  RequestStatus,
} from "../../../services/constants";
import { putRequest, getRequest } from "../../../services/requests";
import { handleTokenError } from "../../../utils/tokenError";
import { AppDispatch, RootState } from "../../../store/store";
import {
  removeFromCart,
  addToCart,
  loadInitialCartItems,
} from "../store/cartSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

const CART_URL = BASE_URL + "/carts";

function removeItemFromCartService(product: any) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    dispatch(removeFromCart(product));

    const cartItems = getState().cart.cartItems;

    const result = await putRequest(
      CART_URL,
      { cartItems },
      {
        ...DEFAULT_HEADERS,
        Authorization: "Bearer " + getState().auth.user.accessToken,
      }
    );
  };
}

const fetchCartItemsService = createAsyncThunk<any, any, { state: RootState }>(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    const result = await getRequest(CART_URL, {
      ...DEFAULT_HEADERS,
      Authorization: "Bearer " + getState().auth.user.accessToken,
    });

    console.log(result);

    if (result.status === RequestStatus.ERROR) {
      return rejectWithValue(result.error);
    }

    return result.data;
  }
);

function getCartItemsService() {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const result = await getRequest(CART_URL, {
      ...DEFAULT_HEADERS,
      Authorization: "Bearer " + getState().auth.user.accessToken,
    });

    if (result.status === RequestStatus.ERROR) {
      handleTokenError(result.statusCode!!);
      return;
    }

    dispatch(loadInitialCartItems(result.data));
  };
}

function addItemToCartService(product: any, actionType: string) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    dispatch(
      addToCart({
        product,
        actionType,
      })
    );

    const cartItems = getState().cart.cartItems;

    const result = await putRequest(
      CART_URL,
      { cartItems },
      {
        ...DEFAULT_HEADERS,
        Authorization: "Bearer " + getState().auth.user.accessToken,
      }
    );
  };
}

export {
  addItemToCartService,
  getCartItemsService,
  removeItemFromCartService,
  fetchCartItemsService,
};
