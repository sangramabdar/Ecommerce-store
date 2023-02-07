import {
  BASE_URL,
  DEFAULT_HEADERS,
  RequestStatus,
} from "../../../services/constants";
import { putRequest, getRequest } from "../../../services/requests";
import { handleTokenError } from "../../../utils/tokenError";
import {
  removeFromCart,
  addToCart,
  loadInitialCartItems,
} from "../store/cartSlice";

const CART_URL = BASE_URL + "/carts";

function removeItemFromCartService(product: any) {
  return async function (dispatch: any, getState: any) {
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

function getCartItemsService() {
  return async function (dispatch: any, getState: any) {
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
  return async function (dispatch: any, getState: any) {
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

export { addItemToCartService, getCartItemsService, removeItemFromCartService };
