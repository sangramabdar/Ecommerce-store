import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import NavBar from "../components/NavBar";
import Products from "../components/Products";

function ProductsPage() {
  return (
    <NavBar>
      <MountAndUnmountAnimation>
        <Products />
      </MountAndUnmountAnimation>
    </NavBar>
  );
}

export default ProductsPage;
