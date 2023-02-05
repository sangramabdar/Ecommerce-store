import NavBar from "../components/NavBar";
import Products from "../components/Products";
import VariantAnimation from "../components/VariantAnimation";

function ProductsPage() {
  return (
    <NavBar>
      <VariantAnimation>
        <Products />
      </VariantAnimation>
    </NavBar>
  );
}

export default ProductsPage;
