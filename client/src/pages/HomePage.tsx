import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import VariantAnimation from "../components/VariantAnimation";

function HomePage() {
  return (
    <NavBar>
      <div className="flex justify-center items-center m-28">
        <VariantAnimation>
          <Link
            to="/products"
            className="btn bg-violet-600 rounded-md p-2 text-center text-white"
          >
            Start Shopping
          </Link>
        </VariantAnimation>
      </div>
    </NavBar>
  );
}

export default HomePage;
