import OrderSummary from "./order-summary";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Button from "../ui/button";
import Input from "../ui/Input";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PaymentOptions from "./payment-options";
import { useState } from "react";
import { useAuthContext } from "../authentication/auth-provider";
import { BASE_URL, RequestStatus } from "../../services/constants";
import { getRequest, postRequest } from "../../services/requests";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import {
  ShippingAddressSchema,
  shippinngAddressSchema,
} from "../../schema/checkout.schema";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { placeOrderService } from "../../services/order.service";

function Checkout() {
  const [Razorpay] = useRazorpay();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user }: any = useAuthContext();
  const [paymentOption, setPaymentOption] = useState<any>({
    name: "cash",
    mode: "CASH",
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
      pincode: Number.parseInt(String(data.pincode)),
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

  const handleOnlinePayment = async (payload: any) => {
    const result = await getRequest(BASE_URL + `/payments/proceed`, {
      Authorization: "Bearer " + user.accessToken,
    });

    if (result.status === RequestStatus.ERROR) {
      navigate("/not-found");
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
          },
          {
            Authorization: "Bearer " + user.accessToken,
          }
        );

        if (result.status === RequestStatus.ERROR) {
          showErrorToast("something went wrong");
          return;
        }

        await queryClient.invalidateQueries({ queryKey: ["cart"] });

        showSuccessToast("order is placed");
        navigate("/success");
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

  if (!cart) {
    return <Navigate to={"/cart"} />;
  }

  return (
    <div className="bg-white rounded-md shadow-sm border p-4 space-y-8 mx-auto flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <section className="flex flex-col space-y-2">
            <h2 className="font-bold text-lg flex">Shipping Address</h2>
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
                label="City"
                type="text"
                error={errors.city?.message}
                {...register("city")}
              />
              <Input
                label="Pincode"
                type="string"
                error={errors.pincode?.message}
                {...register("pincode")}
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
