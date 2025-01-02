"use client";

import { Fragment, useState } from "react";
import { Label, Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { Add, AddSquare } from "iconsax-react";

export const SelectModifyV2 = ({ height, label, func }) => {
    const [selected, setSelected] = useState(null);
    const [newCategory, setNewCategory] = useState("");
    const [options, setOptions] = useState([
        { id: 1, name: "Social Event" },
        { id: 2, name: "Conference" },
        { id: 3, name: "Marathons" },
        { id: 999, name: "Create Category" }
    ]);
    const placeholder = "Choose category";
    const lastArray = options[options.length - 2];

    const handleChange = (option) => {
        if (selected?.id === option.id) {
            setSelected(null);
        } else {
            setSelected(option);
        }
    };

    const handleTrigger = () => {
        document.getElementById("updateEventCard").close();
        document.getElementById("my_modal_create_new_categoryV2").showModal();
    };

    // Remove "Create Category" option and add a new category
    const removeCategory = () => {
        const updatedOptions = options.filter((option) => option.id !== 999);
        setOptions([
            ...updatedOptions,
            { id: lastArray.id + 1, name: newCategory },
            { id: 999, name: "Create Category" }
        ]);
    };

    const handleCategorySave = () => {
        removeCategory();
        document.getElementById("my_modal_create_new_categoryV2").close();
        document.getElementById("updateEventCard").showModal();
    };

    const handleSelect = (option) => {
        if (option.id === 999) {
            handleTrigger();
        } else {
            setSelected(option); // Update selected option
            func(option); // Call parent function with selected option
        }
    };

    return (
        <div className="w-auto">
            <Listbox value={selected} onChange={handleChange}>
                {({ open }) => (
                    <>
                        <Label
                            htmlFor="category"
                            className={`text-sm ${label} font-semibold text-primary-text block mb-2`}
                        >
                            Event Category
                        </Label>
                        <Listbox.Button
                            className={`relative ${height} h-[42px] bg-white cursor-default rounded-3xl pl-4 pr-8 w-full text-left ring-1 ring-inset ring-gray-200 focus:outline-none sm:text-sm sm:leading-6 ${
                                !selected ? "text-gray-400" : "bg-white text-black"
                            }`}
                        >
                            <span className="block truncate">
                                {selected ? selected.name : placeholder}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-3">
                                <Image
                                    src="/icons/dropdown.svg"
                                    alt="Dropdown"
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
                            <Listbox.Options className="absolute z-10 mt-1 overflow-auto rounded-2xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {options.map((option) => (
                                    <Listbox.Option
                                        key={option.id}
                                        onClick={() => handleSelect(option)}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 hover:bg-blue-200 pl-8 p-[174px] ${
                                                active ? "text-black" : "text-gray-900"
                                            }`
                                        }
                                        value={option}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`${
                                                        selected ? "font-medium" : "font-normal"
                                                    } ${option.id === 999 ? "text-greenUi" : ""} h-full w-full`}
                                                >
                                                    {option.name}
                                                </span>
                                                {selected && (
                                                    <span className={`${option.id === 999 ? "hidden" : ""} absolute inset-y-0 left-0 flex items-center pl-2 text-black`}>
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                )}
                                                {option.id === 999 && (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-greenUi">
                                                        <Add size="20" />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </>
                )}
            </Listbox>
            <dialog id="my_modal_create_new_categoryV2" className="modal">
                <div className="modal-box w-11/12 md:w-1/3 max-w-5xl space-y-8">
                    <div className="flex flex-row items-center text-primary-text">
                        <h2 className="text-lg lg:text-xl font-semibold">Create Category</h2>
                        <button
                            onClick={() => {
                                document.getElementById("my_modal_create_new_categoryV2").close();
                                document.getElementById("updateEventCard").showModal();
                            }}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                            ✕
                        </button>
                    </div>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        className="shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5"
                        placeholder="Category"
                        required
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <div className="flex justify-end space-x-3">
                        <div
                            onClick={() => {
                                document.getElementById("my_modal_create_new_categoryV2").close();
                                document.getElementById("updateEventCard").showModal();
                            }}
                            className="px-6 py-3 rounded-2xl border-1px border-borderUi cursor-pointer"
                        >
                            Cancel
                        </div>
                        <div
                            onClick={handleCategorySave}
                            className="cursor-pointer save border rounded-2xl bg-purple-text text-white flex justify-center text-center items-center px-4 gap-3"
                        >
                            <AddSquare size="20" color="#FFFFFF" variant="Bold" />
                            <span className="h-12 text-white flex justify-center items-center">
                                Create
                            </span>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};
