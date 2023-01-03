import React from "react";
import Products from "../components/Products";
import NavBar from "../components/NavBar";

function HomePage() {
  return (
    <NavBar>
      <div>
        <h1 className="font-bold text-lg mb-5">
          Welcome to the Redux toolkit store
        </h1>
        <Products />
      </div>
    </NavBar>
  );
}

export default HomePage;
