import NavBar from "../components/NavBar";
import ProductDescription from "../components/ProductDescription";
import VariantAnimation from "../components/VariantAnimation";

export default function ProductPage() {
  return (
    <NavBar>
      <VariantAnimation>
        <ProductDescription />
      </VariantAnimation>
    </NavBar>
  );
}
