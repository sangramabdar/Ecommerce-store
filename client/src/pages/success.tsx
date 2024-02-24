import { Link } from "react-router-dom";
import Button from "../components/ui/button";

function SuccessPage() {
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <h1 className="text-6xl text-center max-w-xl mx-auto">
        Thank you for Ordering
      </h1>
      <Link to="/">
        <Button>Keep Shopping</Button>
      </Link>
    </div>
  );
}

export default SuccessPage;
