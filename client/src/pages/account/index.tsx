import { NavLink, Outlet } from "react-router-dom";

import cn from "../../utils/cn";

function AccountPage() {
  return (
    <>
      <h1>Account</h1>
      <div className={cn("flex gap-8 mt-10")}>
        <div
          className={cn(
            "flex flex-col p-4 w-32 gap-2 h-[500px] bg-secondary border-gray-600 border rounded-lg"
          )}
        >
          <NavLink
            className={({ isActive }) =>
              cn(isActive && "text-gray-900 font-semibold")
            }
            to="profile"
          >
            Profile
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              cn(isActive && "text-gray-900 font-semibold")
            }
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
