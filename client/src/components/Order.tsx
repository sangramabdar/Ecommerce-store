import { getOrdersService } from "../store/order";
import { useAuthentication } from "../utils/hooks";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

function Order() {
  useAuthentication();
  const dispatch = useDispatch();
  const { orders } = useSelector<any, any>(state => state.order);
  const { user } = useSelector<any, any>(state => state.auth);

  useEffect(() => {
    if (!user) return;

    if (orders) return;

    dispatch<any>(getOrdersService());
  }, [user]);

  return (
    <NavBar>
      {!orders ? (
        <Loading />
      ) : (
        orders.map((order: any) => {
          console.log(order);
          return <div key={order._id}>{order._id}</div>;
        })
      )}
    </NavBar>
  );
}

export default Order;
