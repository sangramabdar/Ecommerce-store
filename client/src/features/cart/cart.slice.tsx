import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProductTocartSerivce, getCartItemsService } from "./cart.service";
import { RequestStatus } from "../../services/constants";
import { AppDispatch, RootState } from "../../store";

interface CartSliceType {
  cartItems: any[];
  totalPrice: number;
  status: RequestStatus;
  isFetched: boolean;
}

const initialCart: CartSliceType = {
  cartItems: [],
  totalPrice: 0,
  status: RequestStatus.LOADING,
  isFetched: false,
};

const fetchCartItemsThunk = createAsyncThunk<any, any, { state: RootState }>(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    const result = await getCartItemsService({
      Authorization: "Bearer " + getState().auth.user.accessToken,
    });

    if (result.status === RequestStatus.ERROR) {
      return rejectWithValue(result.error);
    }

    return result.data;
  }
);

function addProductToCartThunk(product: any, quantity: number) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const result = await addProductTocartSerivce(
      {
        productId: product._id,
        quantity,
      },
      {
        Authorization: "Bearer " + getState().auth.user.accessToken,
      }
    );

    if (result.status === RequestStatus.ERROR) {
      throw result.error;
    }

    await dispatch(fetchCartItemsThunk(null));
  };
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCartItemsThunk.pending, (state, action) => {
      state.status = RequestStatus.LOADING;
    });

    builder.addCase(fetchCartItemsThunk.fulfilled, (state, action) => {
      state.cartItems = action.payload.cartItems;
      state.status = RequestStatus.SUCCESS;
      state.totalPrice = action.payload.totalPrice;
      state.isFetched = true;
    });

    builder.addCase(fetchCartItemsThunk.rejected, (state, action) => {
      state.status = RequestStatus.ERROR;
      state.cartItems = [];
      state.isFetched = false;
    });
  },
});

export type { CartSliceType };

export default cartSlice.reducer;

export { fetchCartItemsThunk, addProductToCartThunk };
