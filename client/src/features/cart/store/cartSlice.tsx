import { createSlice } from "@reduxjs/toolkit";

interface CartSliceType {
  cartItems: any[];
  totalPrice: number;
}

const initialCart: CartSliceType = {
  cartItems: [],
  totalPrice: 0,
};

function calculateTotalPrice(cartItems: any[]): number {
  if (!cartItems) return 0;
  return cartItems.reduce((sum, element) => sum + element.totalPrice, 0);
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

            product.totalPrice = product.price * product.quantity;
          }
        }
      } else {
        //for new product

        let newProduct = {
          ...action.payload.product,
          totalPrice: action.payload.product.price,
          quantity: 1,
        };

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

const { addToCart, removeFromCart, loadInitialCartItems, emptyCart } =
  cartSlice.actions;

export { addToCart, removeFromCart, emptyCart, loadInitialCartItems };
export type { CartSliceType };

export default cartSlice.reducer;
