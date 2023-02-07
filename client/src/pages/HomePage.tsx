import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <MountAndUnmountAnimation>
      <div className="flex justify-center items-center m-28">
        <Link
          to="/products"
          className="btn bg-violet-600 rounded-md p-2 text-center text-white"
        >
          Start Shopping
        </Link>
      </div>
    </MountAndUnmountAnimation>
  );
}

export default HomePage;
