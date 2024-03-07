import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import { IoCheckmarkOutline } from "react-icons/io5";
import cn from "../../utils/cn";

export default function _ListOptions({
  onChange,
  label,
  options,
  disabled = false,
  value,
  error,
}: {
  onChange: (value: any) => void;
  disabled?: boolean;
  label: string;
  options: any[];
  reset?: boolean;
  value: {
    label: string;
    value: any;
  };
  error?: string;
}) {
  return (
    <section className="mt-10">
      <h2 className="block text-sm font-medium text-gray-900">{label}</h2>
      <div className="sm:w-72 mt-2">
        <Listbox value={value} onChange={onChange} disabled={disabled}>
          <div className="relative mt-1">
            <Listbox.Button
              className={cn(
                "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm border focus:outline-none focus-visible:border-accent h-10",
                disabled && "opacity-50"
              )}
            >
              <span className="block truncate">{value?.label}</span>
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base border-spacing-2 shadow-sm ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {options.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-accent/80 text-white" : "text-gray-900"
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option?.label}
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
            {error ? (
              <span className="text-red-600/80 mt-4">{error}</span>
            ) : null}
          </div>
        </Listbox>
      </div>
    </section>
  );
}
