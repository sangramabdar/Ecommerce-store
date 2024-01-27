import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { showLoadingToast } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";
import { placeOrderService } from "../services/order";
import * as yup from "yup";
import OrderSummary from "./OrderSummary";
import { useFormik } from "formik";
import CheckoutInputField from "./CheckOutInputField";
import useAuthentication from "../../../hooks/useAuthentication";
import { RootState } from "../../../store/store";

const deliveryInfoSchema = yup.object().shape({
  address: yup.string().required("Required"),
  city: yup.string().required("Required"),
  pincode: yup.number().required("Required"),
});

const initialDeliveryInfo = {
  address: "",
  city: "",
  pincode: null,
};

function Checkout() {
  const totalPrice = useSelector<RootState, number>(
    state => state.cart.totalPrice
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (totalPrice > 0) return;
    navigate("/products");
  }, [totalPrice]);

  const handleOnSubmit = (deliveryInfo: any) => {
    showLoadingToast("Processing");
    dispatch<any>(placeOrderService(deliveryInfo));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      validationSchema: deliveryInfoSchema,
      onSubmit: handleOnSubmit,
      initialValues: initialDeliveryInfo,
    });

  return (
    <form
      className="bg-white rounded-md shadow-lg p-5s sm:w-[80%] mx-auto flex flex-col justify-center items-center max-w-[600px]"
      onSubmit={handleSubmit}
    >
      <div
        className="flex flex-col items-center
       space-y-6"
      >
        <section className="flex flex-col justify-center items-center w-full h-full">
          <h1 className="font-bold text-lg flex">Delivery Address</h1>
          <div
            className="flex flex-col items-start space-y-3
    "
          >
            <CheckoutInputField
              name="address"
              value={values.address}
              error={errors.address}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              label="Address"
              touched={touched.address}
            />
            <CheckoutInputField
              name="city"
              value={values.city}
              error={errors.city}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              label="City"
              touched={touched.city}
            />
            <CheckoutInputField
              name="pincode"
              value={values.pincode}
              error={
                errors.pincode?.includes("number")
                  ? "pincode must be number"
                  : errors.pincode
              }
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              label="Address"
              touched={touched.pincode}
            />
          </div>
        </section>
        <OrderSummary />
      </div>
      <button
        type="submit"
        className=" bg-violet-600 mb-2 p-1 text-white rounded-md mt-4"
      >
        Place Order
      </button>
    </form>
  );
}

export default Checkout;
