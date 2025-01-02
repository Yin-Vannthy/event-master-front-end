"use client";

import { Fragment, useEffect, useState } from "react";
import { Label, Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { Add, AddSquare } from "iconsax-react";
import { allCategoryAction } from "@/actions/categoryAction";

export const SelectModify = ({ height, label, func, more }) => {

    const [selected, setSelected] = useState(null);
    const [newCategory, setNewCategory] = useState();
    const [trigger, setTrigger] = useState(false);
    const [options, setOptionData] = useState([
        { id: 1, name: "Social Event" },
        { id: 2, name: "Conferece" },
        { id: 3, name: "Marathons" },
        { id: 999, name: "Create Category" }
    ])
    const placeholder = "Choose category";
    const lastArray = options[options.length - 2];

    const handleChange = (option) => {
        if (selected?.categoryId === option.categoryId) {
            setSelected(null);
        } else {
            setSelected(option);
        }
    };

    const callApi = async () => {
        const res = await allCategoryAction();
        setOptionData(res.payload)
        setOptionData([...res.payload, { categoryId: 999, categoryName: "Create Category" }])
    }

    //remove create catgory and add back, just to make it behind all category.
    const removeCategory = () => {
        const updatedOptions = options.filter(option => option.categoryId !== 999);
        setOptionData(updatedOptions);
        setOptionData([...updatedOptions,
        { categoryId: 88888, categoryName: `${newCategory}` },
        { categoryId: 999, categoryName: "Create Category" }
        ]);
    }

    const handleTrigger = () => {
        document.getElementById('my_modal_event_create').close()
        document.getElementById('my_modal_create_new_category').showModal()
    }

    const handleCategorySave = () => {
        removeCategory()
        document.getElementById('my_modal_create_new_category').close()
        document.getElementById('my_modal_event_create').showModal();
        setTrigger(!trigger)
    }

    const handlePassToParent = (v) => {
        func(v)
    }

    //call get all cagetory from api
    useEffect(() => {
        callApi();
        removeCategory();
        setSelected(null)
    }, [more])

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
                            className={`relative ${height} h-[42px] bg-white cursor-default rounded-3xl pl-4 pr-8 w-full text-left ring-1 ring-inset ring-gray-200 focus:outline-none sm:text-sm sm:leading-6 ${!selected ? " text-gray-400" : "bg-white text-black"
                                }`}
                        >
                            <span className="block truncate ">
                                {selected ? selected.categoryName : placeholder}
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
                            <Listbox.Options className="absolute z-10 mt-1 h-fit max-h-[250px] overflow-auto rounded-2xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {options?.map((option) => (
                                    <Listbox.Option
                                        key={option.categoryId}
                                        onClick={() => { handlePassToParent(option); option.categoryId == 999 && handleTrigger() }}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 hover:bg-blue-200 pl-8 p-[174px] ${active ? " text-black" : "text-gray-900"
                                            }`
                                        }
                                        value={option}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`${selected ? "font-medium" : "font-normal"} ${option.categoryId == 999 && 'text-greenUi'} h-full w-full`}
                                                >
                                                    {option.categoryName}
                                                </span>
                                                {/* <hr></hr> */}
                                                {selected && (
                                                    <span className={`${option.categoryId == 999 && 'hidden'} absolute inset-y-0 left-0 flex items-center pl-2 text-black`}>
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                )}
                                                {option.categoryId == 999 &&
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-greenUi">
                                                        <Add size="20" />
                                                    </span>
                                                }
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </>
                )}
            </Listbox>
            <dialog id="my_modal_create_new_category" className="modal">
                <div className="modal-box w-11/12 md:w-1/3 max-w-5xl space-y-8">
                    <div className="flex flex-row items-center text-primary-text">
                        <h2 className="text-lg lg:text-xl font-semibold">Create Category</h2>
                        <button onClick={() => {
                            document.getElementById("my_modal_create_new_category").close();
                            document.getElementById('my_modal_event_create').showModal();
                        }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </div>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        className="shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5"
                        placeholder="Category" required=""
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <div className="flex justify-end space-x-3">
                        <div onClick={() => {
                            document.getElementById("my_modal_create_new_category").close();
                            document.getElementById('my_modal_event_create').showModal();
                        }} className="px-6 py-3 rounded-2xl border-1px border-borderUi cursor-pointer">Cancel</div>
                        <div onClick={() => handleCategorySave()} className="cursor-pointer save border rounded-2xl bg-purple-text text-white flex justify-center text-center items-center px-4 gap-3 ">
                            <AddSquare size="20" color="#FFFFFF" variant="Bold" />
                            <span className="h-12 text-white flex justify-center items-center">Create</span>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};
