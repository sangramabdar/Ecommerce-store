import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import NavBar from "../components/NavBar";
import ProductDescription from "../modules/products/components/ProductDescription";

export default function ProductPage() {
  return (
    <MountAndUnmountAnimation>
      <ProductDescription />
    </MountAndUnmountAnimation>
  );
}
