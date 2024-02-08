import { Link, Outlet } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex justify-center items-center m-28">
      <Link
        to="/products"
        className="btn bg-tertiary rounded-md p-2 text-center text-white"
      >
        Start Shopping
      </Link>
    </div>
  );
}

export default HomePage;
