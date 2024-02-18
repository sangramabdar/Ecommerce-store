import { MdAccountCircle } from "react-icons/md";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import cn from "../../../utils/cn";
import Button from "../../../components/ui/button";
import { useAuthContext } from "../../../components/auth";

function AccountDropDown() {
  const { removeUser } = useAuthContext();

  const navigate = useNavigate();

  const ref = useRef();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    removeUser();
    navigate("/");
    location.reload();
  };

  return (
    <Menu as="div" className="relative flex">
      <Menu.Button className="focus:outline-none focus-visible:ring-10 focus-visible:ring-white/75 ">
        <MdAccountCircle className="w-8 h-8" />
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
                    "group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold",
                    active ? "bg-accent text-white" : "text-gray-900"
                  )}
                >
                  {/* {active ? (
                    <div className="mr-2 h-5 w-5" aria-hidden="true" />
                  ) : (
                    <div className="mr-2 h-5 w-5" aria-hidden="true" />
                  )} */}
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
                    "group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold",
                    active ? "bg-accent text-white" : "text-gray-900"
                  )}
                >
                  {/* {active ? (
                    <div
                      className="mr-2 h-5 w-5 text-violet-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <div
                      className="mr-2 h-5 w-5 text-violet-400"
                      aria-hidden="true"
                    />
                  )} */}
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
                    "group flex w-fit items-center justify-center rounded-md px-4 py-2 text-sm font-semibold",
                    active && "bg-accent text-white"
                  )}
                >
                  {/* {active ? (
                    <div
                      className="mr-2 h-5 w-5 text-violet-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <div
                      className="mr-2 h-5 w-5 text-violet-400"
                      aria-hidden="true"
                    />
                  )} */}
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

export default AccountDropDown;
