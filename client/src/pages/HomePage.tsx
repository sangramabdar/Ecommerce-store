import { Link } from "react-router-dom";
import MountAndUnmountAnimation from "../components/MountAndUnmountAnimation";

function HomePage() {
  return (
    <MountAndUnmountAnimation>
      <div className="flex justify-center items-center m-28">
        <Link
          to="/products"
          className="btn bg-tertiary rounded-md p-2 text-center text-white"
        >
          Start Shopping
        </Link>
      </div>
    </MountAndUnmountAnimation>
  );
}

export default HomePage;
