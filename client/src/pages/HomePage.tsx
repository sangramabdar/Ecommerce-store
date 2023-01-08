import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <NavBar>
      <div className="flex justify-center items-center m-28">
        <Link
          to="/products"
          className="btn bg-violet-600 rounded-md p-2 text-white"
        >
          Start Shopping
        </Link>
      </div>
    </NavBar>
  );
}

export default HomePage;
