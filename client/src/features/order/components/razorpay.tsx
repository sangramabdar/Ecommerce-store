import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { postRequest } from "../../../services/requests";
import { BASE_URL, RequestStatus } from "../../../services/constants";
import { useAuthContext } from "../../../components/auth";
import { useNavigate, useParams } from "react-router-dom";
import { showSuccessToast } from "../../../utils/toast";
import { useQueryClient } from "@tanstack/react-query";

export default function RazorPay({ orderAddress }: any) {
  const [Razorpay] = useRazorpay();
  const queryClient = useQueryClient();

  const params = useParams();

  const navigate = useNavigate();

  const { user }: any = useAuthContext();

  const handlePayment = async () => {
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
        const result = await postRequest(
          BASE_URL + "/payments/verify",
          {
            ...response,
            razorpay_order_id: order.id,
          },
          {
            Authorization: "Bearer " + user.accessToken,
          }
        );

        if (result.status === RequestStatus.ERROR) {
        }

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

  return <div onClick={handlePayment}>Proceed to pay</div>;
}
