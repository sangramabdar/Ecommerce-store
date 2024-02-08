import {
  BASE_URL,
  DEFAULT_HEADERS,
  RequestStatus,
} from "../../../services/constants";
import { getRequest, postRequest } from "../../../services/requests";
import { AppDispatch, RootState } from "../../../store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

const CART_URL = BASE_URL + "/carts";

const fetchCartItemsService = createAsyncThunk<any, any, { state: RootState }>(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    const result = await getRequest(CART_URL, {
      ...DEFAULT_HEADERS,
      Authorization: "Bearer " + getState().auth.user.accessToken,
    });

    if (result.status === RequestStatus.ERROR) {
      return rejectWithValue(result.error);
    }

    return result.data;
  }
);

function addItemToCartService(product: any, quantity: number) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const result = await postRequest(
      CART_URL,
      {
        productId: product._id,
        quantity,
      },
      {
        ...DEFAULT_HEADERS,
        Authorization: "Bearer " + getState().auth.user.accessToken,
      }
    );

    if (result.status === RequestStatus.ERROR) {
      throw result.error;
    }

    await dispatch(fetchCartItemsService(null));
  };
}

export { addItemToCartService, fetchCartItemsService };
