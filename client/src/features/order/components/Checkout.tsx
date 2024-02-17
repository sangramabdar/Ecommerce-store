import * as yup from "yup";
import OrderSummary from "./order-summary";
import { useFormik } from "formik";
import CheckoutInputField from "./check-outInput-field";
import { showLoadingToast } from "../../../utils/toast";
import Button from "../../../components/ui/button";

const deliveryInfoSchema = yup.object().shape({
  address: yup.string().required("Required"),
  city: yup.string().required("Required"),
  pincode: yup.number().required("Required"),
});

const initialDeliveryInfo = {
  address: "",
  city: "",
  pincode: "",
};

function Checkout() {
  const handleOnSubmit = (deliveryInfo: any) => {
    showLoadingToast("Processing");
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      validationSchema: deliveryInfoSchema,
      onSubmit: handleOnSubmit,
      initialValues: initialDeliveryInfo,
    });

  // if (totalPrice === 0) {
  //   return <Navigate to={"/cart"} />;
  // }

  return (
    <form
      className="bg-white rounded-md shadow-lg p-4 space-y-8 sm:w-[80%] mx-auto flex flex-col justify-center items-center max-w-[600px]"
      onSubmit={handleSubmit}
    >
      <div
        className="flex flex-col items-center
       space-y-6"
      >
        <section className="flex flex-col justify-center items-center">
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
      <Button type="submit">Place Order</Button>
    </form>
  );
}

export default Checkout;
