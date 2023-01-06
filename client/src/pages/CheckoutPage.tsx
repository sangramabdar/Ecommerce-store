import React from "react";
import NavBar from "../components/NavBar";
import Checkout from "../components/Checkout";

function CheckoutPage() {
  return (
    <NavBar>
      <h1 className="font-bold mb-5">Checkout Page</h1>
      <Checkout />
    </NavBar>
  );
}

export default CheckoutPage;
