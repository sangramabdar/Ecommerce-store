import React from "react";
import Order from "../components/Order";
import NavBar from "../components/NavBar";

function OrderPage() {
  return (
    <NavBar>
      <div>
        <h1 className="font-bold mb-5">Cart</h1>
        <Order />
      </div>
    </NavBar>
  );
}

export default OrderPage;
