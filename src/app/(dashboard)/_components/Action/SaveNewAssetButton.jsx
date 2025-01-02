"use client";
import React from "react";
import { AddSquare } from "iconsax-react";

export const SaveNewAssetButton = () => {
  return (
    <button type="submit"
      onClick={() => document.getElementById("my_modal_new").close()}
      className="px-6 py-3 rounded-2xl border-1px border-borderUi flex space-x-2 bg-purple-text text-white"
    >
      <AddSquare size="24" color="#FFFFFF" variant="Bold" />
      <p>Save</p>
    </button>
  );
};
