import React from "react";
import NavBar from "../components/NavBar";
import Checkout from "../components/Checkout";
import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";

function CheckoutPage() {
  return (
    <NavBar>
      <MountAndUnmountAnimation>
        <h1 className="font-bold mb-5">Checkout</h1>
        <Checkout />
      </MountAndUnmountAnimation>
    </NavBar>
  );
}

export default CheckoutPage;
