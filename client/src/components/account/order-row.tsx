import { Disclosure, Transition } from "@headlessui/react";
import RupeeIcon from "../icons/rupee-icon";
import cn from "../../utils/cn";

interface OrderProps {
  order: {
    _id: string;
    orderItems: any[];
    orderStatus: string;
    totalPrice: number;
    orderAddress: {
      address: string;
      city: string;
      state: string;
    };
  };
  index: number;
}

function OrderRow({ order, index }: OrderProps) {
  const { _id, totalPrice, orderAddress, orderStatus } = order;

  return (
    <Disclosure as="div" className={cn("bg-secondary w-full rounded-md")}>
      {({ open }) => {
        return (
          <>
            <Disclosure.Button
              className={cn(
                "w-full text-left rounded-md p-2",
                open && "bg-accent/40"
              )}
            >
              Order # {index}
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel as="div" className={"p-2 flex gap-1"}>
                Total price :
                <span className="flex gap-1">
                  <RupeeIcon /> {totalPrice}
                </span>
              </Disclosure.Panel>
            </Transition>
          </>
        );
      }}
    </Disclosure>
  );
}

export default OrderRow;
