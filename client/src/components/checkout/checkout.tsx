import OrderSummary from "./order-summary";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../ui/button";
import Input from "../ui/input";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAuthContext } from "../authentication/auth-provider";
import { BASE_URL, RequestStatus } from "../../services/constants";
import { getRequest, postRequest } from "../../services/requests";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import {
  ShippingAddressSchema,
  shippinngAddressSchema,
} from "../../schema/checkout.schema";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { placeOrderService } from "../../services/order.service";
import ListOptions from "../ui/list-options";

function Checkout() {
  const [Razorpay] = useRazorpay();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user }: any = useAuthContext();
  const [paymentOption, setPaymentOption] = useState<any>({
    label: "Select",
    value: "select",
  });

  const cart = queryClient.getQueryData(["cart"]) as any;

  const orderMutation = useMutation({
    mutationFn: (data: any) => {
      return placeOrderService(data);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddressSchema>({
    resolver: zodResolver(shippinngAddressSchema),
  });

  const onSubmit: SubmitHandler<ShippingAddressSchema> = async data => {
    const payload = {
      ...data,
      paymentMode: paymentOption.value,
    };

    try {
      if (paymentOption.value === "CASH") {
        const result = await orderMutation.mutateAsync(payload);
        if (result.status === RequestStatus.ERROR) return;

        await queryClient.invalidateQueries({ queryKey: ["cart"] });
        navigate("/checkout/success");
      } else {
        handleOnlinePayment(payload);
      }
    } catch (error) {
      showErrorToast("Something went wrong");
    }
  };

  const handleOnlinePayment = async (payload: any) => {
    const result = await getRequest(BASE_URL + `/payments/proceed`);

    if (result.status === RequestStatus.ERROR) {
      navigate("*");
      return;
    }

    const order = result.data;

    const options: RazorpayOptions = {
      key: "rzp_test_Xje67C2pVeowD5",
      amount: "1000",
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
          }
        );

        if (result.status === RequestStatus.ERROR) {
          showErrorToast("something went wrong");
          return;
        }

        await queryClient.invalidateQueries({ queryKey: ["cart"] });

        showSuccessToast("order is placed");
        navigate("/checkout/success");
      },
      prefill: {
        name: "Sangram Abdar",
        email: "abdarsangram2697@gmail.com",
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

  const PAYMENT_OPTIONS = [
    { label: "Cash", value: "CASH" },
    { label: "Online", value: "ONLINE" },
  ];

  if (!cart) {
    return <Navigate to={"/cart"} />;
  }

  return (
    <div className="bg-white rounded-md shadow-sm border p-4 sm:p-8 space-y-8 mx-auto flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <section className="flex flex-col space-y-2">
            <h2 className="font-medium text-lg flex">Shipping Address</h2>
            <div
              className="flex flex-col items-start space-y-3
    "
            >
              <Input
                label="Address"
                type="text"
                error={errors.address?.message}
                {...register("address")}
              />
              <Input
                label="State"
                type="text"
                error={errors.state?.message}
                {...register("state")}
              />
              <Input
                label="City"
                type="text"
                error={errors.city?.message}
                {...register("city")}
              />
            </div>
          </section>
        </div>
        <OrderSummary />
        <ListOptions
          options={PAYMENT_OPTIONS}
          value={paymentOption}
          label="Payment"
          onChange={setPaymentOption}
        />

        {paymentOption.value === "CASH" ? (
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
