import { Outlet } from "react-router-dom";
import Header from "../components/header";

function RootPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto m-28 bg-primary px-4 md:px-8">
        <Outlet />
      </main>
    </>
  );
}

export default RootPage;
