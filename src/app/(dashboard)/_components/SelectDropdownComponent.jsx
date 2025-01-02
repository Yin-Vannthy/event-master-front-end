"use client";
import { Fragment, useState } from "react";
import { Label, Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const options = [
  { id: 1, name: "Social Event" },
  { id: 2, name: "Conferece" },
  { id: 3, name: "Marathons" },
];

export const SelectDropdown = ({height, label}) => {
  const [selected, setSelected] = useState(null);
  const placeholder = "Choose category";

  const handleChange = (option) => {
    if (selected?.id === option.id) {
      setSelected(null);
    } else {
      setSelected(option);
    }
  };

  return (
    <div className="w-auto">
      <Listbox value={selected} onChange={handleChange}>
        {({ open }) => (
          <>
            <Label
              for="category"
              className={`text-sm ${label} font-semibold text-primary-text block mb-2`}
            >
              Event Category
            </Label>
            <Listbox.Button
              className={`relative ${height} h-[48px] bg-white cursor-default rounded-3xl pl-4 pr-8 w-full text-left ring-1 ring-inset ring-gray-200 focus:outline-none sm:text-sm sm:leading-6 ${
                !selected ? " text-gray-400" : "bg-white text-black"
              }`}
            >
              <span className="block truncate ">
                {selected ? selected.name : placeholder}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-3">
                <Image
                  src="/icons/dropdown.svg"
                  alt="Location"
                  width={15}
                  height={25}
                  priority
                />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1  overflow-auto rounded-2xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 hover:bg-blue-200 pl-8 p-[174px] ${
                        active ? " text-black" : "text-gray-900"
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={` ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option.name}
                        </span>
                        {/* <hr></hr> */}
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-black">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
};