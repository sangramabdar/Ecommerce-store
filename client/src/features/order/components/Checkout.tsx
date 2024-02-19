import * as yup from "yup";
import OrderSummary from "./order-summary";
import { useFormik } from "formik";
import { showLoadingToast } from "../../../utils/toast";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/Input";
import { Navigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import PaymentOptions from "./payment-options";
import { useRef, useState } from "react";

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
  const queryClient = useQueryClient();

  const cart = queryClient.getQueryData(["cart"]);

  const handleOnSubmit = (deliveryInfo: any) => {
    // showLoadingToast("Processing");
    queryClient.setQueryData(["order-address"], {
      ...deliveryInfo,
    });
  };

  const [paymentOption, setPaymentOption] = useState<any>(null);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      validationSchema: deliveryInfoSchema,
      onSubmit: handleOnSubmit,
      initialValues: initialDeliveryInfo,
    });

  if (!cart) {
    return <Navigate to={"/cart"} />;
  }

  return (
    <form
      className="bg-white rounded-md shadow-sm border p-4 space-y-8 mx-auto flex flex-col"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <section className="flex flex-col space-y-2">
          <h2 className="font-bold text-lg flex">Shipping Address</h2>
          <div
            className="flex flex-col items-start space-y-3
    "
          >
            <Input
              name="address"
              value={values.address}
              error={errors.address}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              label="Address"
              touched={touched.address}
            />
            <Input
              name="city"
              value={values.city}
              error={errors.city}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              label="City"
              touched={touched.city}
            />
            <Input
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
        <PaymentOptions
          onChangePaymentOption={(payment: any) => {
            setPaymentOption(payment);
          }}
        />
      </div>
      {paymentOption?.mode}
      <Button type="submit">Place Order</Button>
    </form>
  );
}

export default Checkout;
