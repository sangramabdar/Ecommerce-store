import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IoCheckmarkOutline } from "react-icons/io5";
import { HiChevronUpDown } from "react-icons/hi2";
import cn from "../../utils/cn";

const PAYMENT_MODES = [
  { name: "Cash", mode: "CASH" },
  { name: "Online", mode: "ONLINE" },
];

export default function PaymentOptions({
  onChangePaymentOption,
  disabled = false,
}: {
  onChangePaymentOption: Function;
  disabled?: boolean;
}) {
  const [selected, setSelected] = useState(PAYMENT_MODES[0]);

  useEffect(() => {
    onChangePaymentOption(selected);
  }, [selected]);

  return (
    <section className="mt-10">
      <h2 className="font-medium text-lg flex">Payment Mode</h2>
      <div className="sm:w-72 mt-2">
        <Listbox value={selected} onChange={setSelected} disabled={disabled}>
          <div className="relative mt-1">
            <Listbox.Button
              className={cn(
                "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm border focus:outline-none focus-visible:border-accent",
                disabled && "opacity-50"
              )}
            >
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <HiChevronUpDown
                  className="h-8 w-8 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base border-spacing-2 shadow-sm ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {PAYMENT_MODES.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-accent/80 text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span className="absolute  inset-y-0 left-0 flex items-center pl-3">
                            <IoCheckmarkOutline
                              className="h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </section>
  );
}
