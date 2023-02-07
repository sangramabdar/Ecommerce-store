import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import NavBar from "../components/NavBar";
import ProductDescription from "../components/ProductDescription";

export default function ProductPage() {
  return (
    <NavBar>
      <MountAndUnmountAnimation>
        <ProductDescription />
      </MountAndUnmountAnimation>
    </NavBar>
  );
}
