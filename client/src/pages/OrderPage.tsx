import React from "react";
import Order from "../components/Order";
import NavBar from "../components/NavBar";

function OrderPage() {
  return (
    <NavBar>
      <h1 className="font-bold md:ml-3">Orders</h1>
      <Order />
    </NavBar>
  );
}

export default OrderPage;
