import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

function HomePage() {
  return (
    <div className="flex justify-center items-center m-28">
      <Link
        to="products"
        className="btn bg-accent rounded-md p-2 text-center text-white"
      >
        <Button>Start Shopping</Button>
      </Link>
    </div>
  );
}

export default HomePage;
