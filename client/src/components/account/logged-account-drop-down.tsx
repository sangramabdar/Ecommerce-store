import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import cn from "../../utils/cn";
import Button from "../ui/button";
import AccountIcon from "../icons/account-icon";
import { Link } from "react-router-dom";

function LoggedInAccountDropDown() {
  const handleLogOut = () => {
    localStorage.removeItem("user");
    location.replace("/");
  };

  return (
    <Menu as="div" className="relative flex">
      <Menu.Button className="focus:outline-none focus-visible:ring-10 focus-visible:ring-white/75 ">
        <AccountIcon />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 top-10 mt-2 w-52 divide-y divide-gray-00 rounded-md bg-secondary shadow-md ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={"/account/profile"}
                  className={cn(
                    "group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-900",
                    active && "bg-accent/10 ring-1 ring-accent"
                  )}
                >
                  Profile
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={"/account/orders"}
                  className={cn(
                    "group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-900",
                    active && "bg-accent/10 ring-1 ring-accent"
                  )}
                >
                  My Orders
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-2">
            <Menu.Item>
              {({ active }) => (
                <Button
                  onClick={handleLogOut}
                  className={cn(
                    "group flex w-fit items-center justify-center rounded-md px-4 py-2 text-sm ",
                    active && "bg-accent text-white"
                  )}
                >
                  Log out
                </Button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default LoggedInAccountDropDown;
