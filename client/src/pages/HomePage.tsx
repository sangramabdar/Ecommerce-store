import React from "react";
import Products from "../components/Products";
import NavBar from "../components/NavBar";

function HomePage() {
  return (
    <NavBar>
      <div>
        <Products />
      </div>
    </NavBar>
  );
}

export default HomePage;
