import * as yup from "yup";
import OrderSummary from "./order-summary";
import { useFormik } from "formik";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/Input";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PaymentOptions from "./payment-options";
import { useState } from "react";
import { useAuthContext } from "../../../components/auth";
import { BASE_URL, RequestStatus } from "../../../services/constants";
import { postRequest } from "../../../services/requests";
import useRazorpay, { RazorpayOptions } from "react-razorpay";

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
  const navigate = useNavigate();

  const cart = queryClient.getQueryData(["cart"]) as any;

  const { user }: any = useAuthContext();

  const [paymentOption, setPaymentOption] = useState<any>({
    name: "cash",
    mode: "CASH",
  });

  const orderMutation = useMutation({
    mutationFn: (data: any) => {
      return placeOrderService(data);
    },
  });

  const placeOrderService = async (data: any) => {
    const result = await postRequest(BASE_URL + "/orders", data, {
      Authorization: "Bearer " + user.accessToken,
    });

    return result;
  };

  const handleOnSubmit = async (deliveryInfo: any) => {
    const payload = {
      ...deliveryInfo,
      pincode: Number.parseInt(deliveryInfo.pincode),
      paymentMode: paymentOption.mode,
    };

    try {
      if (paymentOption.mode === "CASH") {
        const result = await orderMutation.mutateAsync(payload);
        if (result.status === RequestStatus.ERROR) return;

        await queryClient.invalidateQueries({ queryKey: ["cart"] });
        navigate("/success");
      } else {
        handleOnlinePayment(payload);
      }
    } catch (error) {
      showErrorToast("Something went wrong");
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    status,
  } = useFormik({
    validationSchema: deliveryInfoSchema,
    onSubmit: handleOnSubmit,
    initialValues: initialDeliveryInfo,
  });

  const [Razorpay] = useRazorpay();

  const handleOnlinePayment = async (payload: any) => {
    const result = await postRequest(
      BASE_URL + `/payments/create`,
      {},
      {
        Authorization: "Bearer " + user.accessToken,
      }
    );

    if (result.status === RequestStatus.ERROR) {
      navigate("/not-found");
      return;
    }

    const order = result.data;

    const options: RazorpayOptions = {
      key: "rzp_test_Xje67C2pVeowD5",
      amount: order.amount,
      currency: order.currency,
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: async function (response) {
        //verify payment and place order for online payment
        const result = await postRequest(
          "http://localhost:8080/api/payments/verify",
          {
            ...response,
            razorpay_order_id: order.id,
            ...payload,
          },
          {
            Authorization: "Bearer " + user.accessToken,
          }
        );

        await queryClient.invalidateQueries({ queryKey: ["cart"] });

        showSuccessToast("order is placed");
        navigate("/success");
      },
      prefill: {
        name: "Sangram Abdar",
        email: "abdarsangram2697@gmail.com",
        contact: "8600174694",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();

    rzpay.on("payment.failed", function (response: any) {
      console.log(response);
    });
  };

  if (!cart) {
    return <Navigate to={"/cart"} />;
  }

  return (
    <div className="bg-white rounded-md shadow-sm border p-4 space-y-8 mx-auto flex flex-col">
      <form onSubmit={handleSubmit}>
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
                label="Pincode"
                touched={touched.pincode}
              />
            </div>
          </section>
        </div>
        <OrderSummary />
        <PaymentOptions
          disabled={cart?.isPaid}
          onChangePaymentOption={(payment: any) => {
            setPaymentOption(payment);
          }}
        />
        {paymentOption.mode === "CASH" ? (
          <Button type="submit" className="mt-4">
            Place order
          </Button>
        ) : (
          <Button type="submit" className="mt-4">
            Pay
          </Button>
        )}
      </form>
    </div>
  );
}

export default Checkout;
