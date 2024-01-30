import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import Products from "../features/products/components/Products";

function ProductsPage() {
  return (
    <MountAndUnmountAnimation>
      <Products />
    </MountAndUnmountAnimation>
  );
}

export default ProductsPage;
