import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function RootPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-7xl mx-auto mt-20 px-4 sm:px-8">
        <Outlet />
      </main>
      <footer className="max-w-7xl mx-auto mt-20 px-4 sm:px-8">
        <div>Footer</div>
      </footer>
    </>
  );
}

export default RootPage;
