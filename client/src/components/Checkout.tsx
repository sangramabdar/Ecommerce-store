import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { placeOrderService } from "../store/order";
import { showLoadingToast, showSuccessToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import { removeItemFromCartService } from "../store/cart";
import { useAuthentication } from "../utils/hooks";

function OrderProduct(product: any) {
  const { id, image, title, price, quantity } = product;

  const dispatch = useDispatch();

  const handleRemoveProduct = (id: number) => {
    showSuccessToast("Removed");
    dispatch<any>(removeItemFromCartService(product));
  };

  return (
    <div
      className="bg-white flex justify-between
     p-2 items-center rounded-md space-x-6
      "
    >
      <div className="w-10">
        <img className="h-fit w-12 object-cover" src={image} alt="" />
      </div>

      <p className="text-center ">{quantity}</p>
      <p className="text-center w-44">{title}</p>
      <p className="text-center">{price}</p>
      <button
        className="text-center p-1 rounded bg-violet-600 text-white"
        onClick={() => {
          handleRemoveProduct(id);
        }}
      >
        remove
      </button>
    </div>
  );
}

function Checkout() {
  useAuthentication();
  const totalPrice = useSelector<any, any>(state => state.cart.totalPrice);
  const cartItems = useSelector<any, any>(state => state.cart.cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (totalPrice > 0) return;
    navigate("/");
  }, [totalPrice]);

  const [orderAddress, setOrderAddress] = useState({
    address: "",
    pincode: "",
    city: "",
  });

  const [errors, setErrors] = useState({
    address: "",
    pincode: "",
    city: "",
  });

  const handlePlaceOrder = () => {
    showLoadingToast("Processing");
    dispatch<any>(placeOrderService(orderAddress));
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;

    setOrderAddress(previous => {
      return {
        ...previous,
        [name]: value,
      };
    });

    setErrors(previous => {
      return {
        ...previous,
        address: "",
        city: "",
        pincode: "",
      };
    });
  };

  return (
    <>
      <div
        className="bg-white rounded-md shadow-md p-5 flex flex-col items-start
       space-y-4"
      >
        <section>
          <div
            className="flex flex-col items-start space-y-3
    "
          >
            <div className="flex flex-col">
              <span className="mb-1">Address</span>
              <input
                className="border-black border-solid border-2 rounded-md focus:outline-none pl-2"
                type="text"
                name="address"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <span className="mb-1">City</span>
              <input
                className="border-black border-solid border-2 rounded-md focus:outline-none pl-2"
                type="text"
                name="city"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <span className="mb-1">Pincode</span>
              <input
                className="border-black border-solid border-2 rounded-md focus:outline-none pl-2"
                type="text"
                name="pincode"
                onChange={handleChange}
              />
            </div>
          </div>
        </section>
        <section>
          <span>Order Summary</span>
          {cartItems.map((item: any) => {
            return <OrderProduct key={item.id} {...item} />;
          })}
          <span className="mt-2">Total Price : {totalPrice}</span>
        </section>
        <button
          onClick={handlePlaceOrder}
          className=" bg-violet-600 p-1 text-white rounded-md"
        >
          Place Order
        </button>
      </div>
    </>
  );
}

export default Checkout;
