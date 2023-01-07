import { createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest, putRequest } from "../api/requests";
import { BASE_URL, DEFAULT_HEADERS, Result, Status } from "../api/constants";
import { handleTokenError } from "../utils/tokenError";

const initialCart: {
  cartItems: any[];
  totalPrice: number;
} = {
  cartItems: [],
  totalPrice: 0,
};

function calculateTotalPrice(cartItems: any[]): number {
  if (!cartItems) return 0;
  return cartItems.reduce((sum, element) => sum + element.price, 0);
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    addToCart(state, action) {
      let filteredProduct = state.cartItems.filter(
        product => product.id === action.payload.product.id
      );

      if (filteredProduct.length > 0) {
        //for same product
        for (let product of state.cartItems) {
          if (product.id === action.payload.product.id) {
            if (action.payload.actionType === "increment") {
              product.quantity++;
            } else {
              product.quantity--;
            }

            product.price = product.originalPrice * product.quantity;
          }
        }
      } else {
        //for new product

        let newProduct = {
          ...action.payload.product,
          originalPrice: action.payload.product.price,
        };

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
      state.cartItems = [];
      state.totalPrice = 0;
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
  };
}

function getCartItemsService() {
  return async function (dispatch: any, getState: any) {
    const CART_URL = BASE_URL + "/carts";
    const result = await getRequest(CART_URL, {
      ...DEFAULT_HEADERS,
      Authorization: "Bearer " + getState().auth.user.accessToken,
    });

    if (result.status === Status.ERROR) {
      handleTokenError(result.statusCode!!);
      return;
    }

    dispatch(loadInitialCartItems(result.data));
  };
}

function addItemToCartService(product: any, actionType: string) {
  return async function (dispatch: any, getState: any) {
    dispatch(
      addToCart({
        product,
        actionType,
      })
    );

    const cartItems = [...getState().cart.cartItems];

    for (let i = 0; i < cartItems.length; i++) {
      let { originalPrice, ...newItem } = cartItems[i];
      cartItems[i] = newItem;
    }

    const CART_URL = BASE_URL + "/carts";
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
