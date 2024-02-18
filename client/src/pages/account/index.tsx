import { NavLink, Outlet } from "react-router-dom";

import cn from "../../utils/cn";

function AccountPage() {
  return (
    <>
      <h1>Account</h1>
      <div className={cn("flex gap-8 mt-10")}>
        <div className={cn("flex flex-col")}>
          <NavLink
            className={({ isActive }) => cn(isActive && "font-bold")}
            to="profile"
          >
            Profile
          </NavLink>
          <NavLink
            className={({ isActive }) => cn(isActive && "font-bold")}
            to="orders"
          >
            Orders
          </NavLink>
        </div>

        {/*nested route */}
        <Outlet />
      </div>
    </>
  );
}
export default AccountPage;
