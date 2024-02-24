import { Link } from "react-router-dom";
import Button from "../components/ui/button";

function NotFoundPage() {
  return (
    <section className="grid min-h-full place-items-center px-6 py-24 sm:py-32 sm:px-8 space-y-4">
      <h1 className="text-7xl md:text-8xl text-accent">404</h1>
      <h2 className="font-bold text-3xl text-accent">Page Not Found.</h2>
      <p className="text-accent text-center text-xl">
        Sorry, we can't find the page you are looking for.
      </p>
      <Link to={"/"}>
        <Button className="mt-8">Back to Home </Button>
      </Link>
    </section>
  );
}

export default NotFoundPage;
