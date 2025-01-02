"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function MaterialActionButton({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [materialData, setMaterialData] = useState(data);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMaterialData(data);
  }, [data]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <div className="inline-block " ref={dropdownRef}>
        <button
          type="button"
          className="right-5 w-8 h-8 items-center flex flex-row justify-center z-0"
          onClick={toggleDropdown}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z"
              fill="#7A7A9D"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
              fill="#7A7A9D"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z"
              fill="#7A7A9D"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="origin-top-right absolute right-0 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <ul
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <li>
                <a
                  className="gap-5 flex px-5 py-2 text-sm hover:bg-gray-100 active:bg-gray-200 rounded-lg"
                  role="menuitem"
                  tabIndex="-1"
                  onClick={() => document.getElementById(materialData.materialId).showModal()}
                >
                  <Image
                    src="/icons/detail.svg"
                    alt="detail"
                    height={22}
                    width={22}
                  />
                  <p className="text-primary-text text-base font-semibold">
                    View detail
                  </p>
                </a>
              </li>
              <hr />
              <li>
                <a className="gap-5 flex px-5 py-2 text-sm hover:bg-gray-100 active:bg-gray-200 rounded-lg">
                  <Image
                    src="/icons/edit-blue.svg"
                    alt="edit"
                    height={24}
                    width={24}
                  />
                  <p className="text-primary-text text-base font-semibold">
                    Edit
                  </p>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {materialData && (
        <dialog id={materialData.materialId} className="modal">
          <div className="modal-box w-11/12 max-w-xl">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 mt-2 mr-2">
                <Image
                  src="/icons/cancel.svg"
                  alt="cancel"
                  className="w-7 h-7"
                  width={7}
                  height={7}
                />
              </button>
            </form>

            <div>
              <h3 className="text-xl font-semibold text-primary-text mb-8">
                Material Detail
              </h3>

              <div className="">
                <div className="flex mb-3 gap-8">
                  <div className="flex gap-4 text-sm font-semibold text-primary-text w-[30%]">
                    <Image
                      src="/icons/material.svg"
                      alt="headler"
                      className="h-5 w-5"
                      width={5}
                      height={5}
                    />
                    Material Name
                  </div>
                  <div className="text-large font-bold text-primary-text">
                    {materialData?.materialName}
                  </div>
                </div>
                <div className="flex mb-3 gap-8">
                  <div className="flex gap-4 text-sm font-semibold text-primary-text w-[30%]">
                    <Image
                      src="/icons/quantity.svg"
                      alt="qty"
                      className="h-5 w-5"
                      width={5}
                      height={5}
                    />
                    Quantity
                  </div>
                  <div className="text-large font-bold text-primary-text">
                    {materialData?.qty} {materialData?.unit}
                  </div>
                </div>
                <div className="flex mb-3 gap-8">
                  <div className="flex gap-4 text-sm font-semibold text-primary-text w-[30%]">
                    <Image
                      src="/icons/assign-date.svg"
                      alt="assignDate"
                      className="h-5 w-5"
                      width={5}
                      height={5}
                    />
                    Assign Date
                  </div>
                  <div className="text-large font-bold text-primary-text">
                    {materialData?.assignDate}
                  </div>
                </div>
                <div className="flex mb-3 gap-8">
                  <div className="flex gap-4 text-sm font-semibold text-primary-text w-[30%]">
                    <Image
                      src="/icons/due-date.svg"
                      alt="DueDate"
                      className="h-5 w-5"
                      width={5}
                      height={5}
                    />
                    Due Date
                  </div>
                  <div className="text-large font-bold text-primary-text">
                    {materialData?.dueDate}
                  </div>
                </div>
                <div className="flex mb-3 gap-8">
                  <div className="flex gap-4 text-sm font-semibold text-primary-text w-[30%]">
                    <Image
                      src="/icons/handler.svg"
                      alt="headler"
                      className="h-5 w-5"
                      width={5}
                      height={5}
                    />
                    Handler
                  </div>
                  <div className="inline-flex items-center content-center rounded-3xl bg-[#F8F2F2] pr-2 pt-[1px] pl-[2px]">
                    <Image
                      src="/images/sok.png"
                      alt="Handler image"
                      className="w-8 h-8 rounded-full"
                      width={50}
                      height={50}
                    />
                    <div className="ms-1">
                      <p className="text-sm font-bold text-gray-900 truncate dark:text-white max-w-36">
                        {materialData?.handlerName}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex mb-5 gap-8">
                  <div className="flex gap-4 text-sm font-semibold text-primary-text w-[30%] items-end">
                    <img src="/icons/supporter.svg" alt="" className="w-5 h-5" />
                    Supporter
                  </div>
                  <div className="gap-2 flex">
                    {Array.isArray(materialData?.supporters) && materialData?.supporters.map((supporter, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center content-center rounded-3xl bg-[#F8F2F2] pr-2 pt-[1px] pl-[2px]"
                      >
                        <Image
                          src="/images/sok.png"
                          alt="Supporter image"
                          className="w-8 h-8 rounded-full"
                          width={50}
                          height={50}
                        />
                        <div className="ms-1">
                          <p className="text-sm font-bold text-gray-900 truncate dark:text-white max-w-36">
                            {supporter?.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
