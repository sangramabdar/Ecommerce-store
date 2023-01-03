import { getOrdersService } from "../store/order";
import { useAuthentication, useMounAndUnMount } from "../utils/hooks";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

function Order() {
  useAuthentication();
  useMounAndUnMount("order");
  const dispatch = useDispatch();
  const { orders } = useSelector<any, any>(state => state.order);
  const { user } = useSelector<any, any>(state => state.auth);

  return (
    <NavBar>
      <h1 className="font-bold md:ml-3">Orders</h1>
      {!orders ? (
        <Loading />
      ) : (
        orders.map((order: any) => {
          return <div key={order._id}>{order._id}</div>;
        })
      )}
    </NavBar>
  );
}

export default Order;
