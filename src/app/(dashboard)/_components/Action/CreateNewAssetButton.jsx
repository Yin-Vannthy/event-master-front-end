"use client";
import React from "react";
import { AddSquare } from "iconsax-react";

export const CreateNewAsset = () => {

  return (
      <button
        // type="submit"
        onClick={() => document.getElementById("my_modal_new").showModal()}
        className="hover:bg-purple-text hover:duration-300 transition-all hover:text-white border-1px border-purple-text h-11 w-11 justify-center text-purple-text rounded-3xl md:px-4 md:py-2.5 flex items-center space-x-3 md:w-40"
      >
        <AddSquare size="20" variant="Bold" className="" />
        <p className="text-xs lg:text-base hidden md:block">New Assset</p>
      </button>
  );
};
