import MountAndUnmountAnimation from "../../components/MountAndUnmountAnimation";
import ProductDescription from "../../features/products/components/ProductDescription";

export default function ProductPage() {
  return (
    <MountAndUnmountAnimation>
      <ProductDescription />
    </MountAndUnmountAnimation>
  );
}
