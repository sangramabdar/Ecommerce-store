import React from "react";
import NavBar from "../components/NavBar";
import Checkout from "../components/Checkout";

function CheckoutPage() {
  return (
    <NavBar>
      <div>
        <h1 className="font-bold mb-5">Checkout Page</h1>
        <Checkout />
      </div>
    </NavBar>
  );
}

export default CheckoutPage;
