import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import cn from "../../utils/cn";
import AccountIcon from "../icons/account-icon";

function AccountDropDown() {
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
        <Menu.Items className="absolute right-[0] top-10 mt-2 w-52 divide-y divide-gray-00 rounded-md bg-secondary shadow-md ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={"/login"}
                  className={cn(
                    "group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold active:bg-accent",
                    active ? "bg-accent text-white" : "text-gray-900"
                  )}
                >
                  Login
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={"/signup"}
                  className={cn(
                    "group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold active:bg-accent",
                    active ? "bg-accent text-white" : "text-gray-900"
                  )}
                >
                  Sign Up
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default AccountDropDown;
