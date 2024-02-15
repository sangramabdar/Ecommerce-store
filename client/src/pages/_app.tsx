import { Outlet } from "react-router-dom";
import Header from "../components/header";

function RootPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto m-28 px-4 sm:px-8 bg-primary">
        <Outlet />
      </main>
    </>
  );
}

export default RootPage;
