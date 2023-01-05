import React from "react";
import Products from "../components/Products";
import NavBar from "../components/NavBar";

function HomePage() {
  return (
    <NavBar>
      <Products />
    </NavBar>
  );
}

export default HomePage;
