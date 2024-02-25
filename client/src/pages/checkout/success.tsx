import { Link } from "react-router-dom";
import Button from "../../components/ui/button";

function SuccessPage() {
  return (
    <div className="flex flex-col justify-center items-center space-y-12">
      <h1 className="text-4xl md:text-6xl font-semibold text-center max-w-xl mx-auto">
        Thank you for shopping
      </h1>
      <Link to="/">
        <Button className="text-lg">Keep shopping</Button>
      </Link>
    </div>
  );
}

export default SuccessPage;
