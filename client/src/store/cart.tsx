import { createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest, putRequest } from "../api/requests";
import { BASE_URL, DEFAULT_HEADERS } from "../api/constants";

const initialCart: {
  cartItems: any[];
  totalPrice: number;
  cartId: any;
} = {
  cartItems: [],
  totalPrice: 0,
  cartId: null,
};

function calculateTotalPrice(cartItems: any[]): number {
  return cartItems.reduce((sum, element) => sum + element.price, 0);
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    addToCart(state, action) {
      //for same product
      let filteredProduct = state.cartItems.filter(
        product => product.id === action.payload.id
      );
      if (filteredProduct.length > 0) {
        for (let product of state.cartItems) {
          if (product.id === action.payload.id) {
            product.quantity++;
            product.price *= product.quantity;
          }
        }
      } else {
        //for new product
        let newProduct = { ...action.payload };
        newProduct.quantity = 1;
        state.cartItems.push(newProduct);
      }

      // state.cartItems = action.payload;
      state.totalPrice = calculateTotalPrice(state.cartItems);
    },

    loadInitialCartItems(state, action) {
      state.cartItems = action.payload;
      state.totalPrice = calculateTotalPrice(state.cartItems);
    },

    removeFromCart(state, action) {
      const newCartItems = state.cartItems.filter(product => {
        return product.id !== action.payload.id;
      });

      state.cartItems = newCartItems;
      state.totalPrice = calculateTotalPrice(state.cartItems);
    },

    emptyCart(state, action) {
      (state.cartId = null), (state.cartItems = []), (state.totalPrice = 0);
    },
  },
});

function removeItemFromCartService(product: any) {
  return async function (dispatch: any, getState: any) {
    dispatch(removeFromCart(product));

    const cartItems = getState().cart.cartItems;

    const CART_URL = BASE_URL + "/carts";
    const result = await putRequest(
      CART_URL,
      { cartItems },
      {
        ...DEFAULT_HEADERS,
        Authorization: "Bearer " + getState().auth.user.accessToken,
      }
    );

    console.log(result);
  };
}

function getCartItemsService() {
  return async function (dispatch: any, getState: any) {
    const CART_URL = BASE_URL + "/carts";
    const result = await getRequest(CART_URL, {
      ...DEFAULT_HEADERS,
      Authorization: "Bearer " + getState().auth.user.accessToken,
    });

    dispatch(loadInitialCartItems(result.data));
  };
}

function addItemToCartService(product: any) {
  return async function (dispatch: any, getState: any) {
    dispatch(addToCart(product));
    const finalProduct = getState().cart.cartItems.filter((item: any) => {
      return product.id === item.id;
    })[0];

    const cartItems = getState().cart.cartItems;
    const CART_URL = BASE_URL + "/carts";
    const result = await putRequest(
      CART_URL,
      { cartItems },
      {
        ...DEFAULT_HEADERS,
        Authorization: "Bearer " + getState().auth.user.accessToken,
      }
    );

    console.log(result);
  };
}

const { addToCart, removeFromCart, loadInitialCartItems, emptyCart } =
  cartSlice.actions;

export {
  addToCart,
  removeFromCart,
  emptyCart,
  addItemToCartService,
  getCartItemsService,
  removeItemFromCartService,
};

export default cartSlice.reducer;
