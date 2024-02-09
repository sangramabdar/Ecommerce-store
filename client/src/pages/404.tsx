import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

function NotFoundPage() {
  return (
    <section className="flex justify-center items-center flex-col gap-4 h-[500px]">
      <h1 className="text-7xl md:text-8xl text-accent">404</h1>
      <h2 className="font-bold text-3xl text-accent">Page Not Found.</h2>
      <p className="text-accent text-center text-xl">
        Sorry, we can't find the page you are looking for.
      </p>
      <Link to={"/"}>
        <Button className="rounded-3xl mt-8">Back to Home </Button>
      </Link>
    </section>
  );
}

export default NotFoundPage;
