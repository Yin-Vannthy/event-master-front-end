// EmptyMaterialRow.js

import React from "react";
import DropdownSupporter from "./DropdownSupporterComponent"; // Ensure to import any necessary components

const EmptyMaterialRow = () => {
  return (
    <tbody className="drop-shadow rounded-radiusUi text-sm font-normal text-primary-text bg-[#ffffff] invisible">
      <tr className="bg-white border-b font-medium text-base hover:bg-gray-50 h-8 border border-black">
        <td className="w-4 p-4 rounded-l-2xl">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="sr-only">checkbox</label>
          </div>
        </td>
        <td className="text-base text-primary-text pl-1">1</td>
        <td className="text-sm font-normal text-primary-text px-2">
          <input
            type="text"
            className="border text-primary-text text-base px-2 w-32 h-10 font-normal focus:outline-none"
          />
        </td>
        <td className="text-sm font-normal text-primary-text px-2">
          <input
            type="text"
            className="border text-primary-text text-base px-2 w-20 h-10 rounded-xl font-normal focus:outline-none"
          />
        </td>
        <td className="text-sm font-normal text-primary-text px-2">
          <input
            type="text"
            className="border text-primary-text text-base px-2 w-24 h-10 rounded-xl font-normal focus:outline-none"
          />
        </td>
        <td className="px-2">
          <input
            type="date"
            className="border text-gray-900 sm:text-sm rounded-xl block w-22 p-2 focus:outline-none placeholder:text-opacity-50"
          />
        </td>
        <td className="px-2">
          <select
            id="handler"
            className="border text-black text-base sm:text-sm rounded-xl block w-28 p-2.5 focus:outline-none"
          >
            <option value=""></option>
          </select>
        </td>
        <td className="px-2">
          <DropdownSupporter />
        </td>
        <td className="px-2 w-36">
          <div className="bg-white p-[7px] border rounded-xl">
            <div className="cursor-pointer flex items-center">
              <span
                className="flex px-1 py-1 w-16 text-xs font-semibold justify-center rounded-full"
                style={{
                  color: "white",
                }}
              ></span>
              <div className="ml-2"></div>
            </div>
          </div>
        </td>
        <td className="pl-5 pr-2 rounded-r-2xl">
          <button className="flex hover:duration-300 transition-all justify-center items-center gap-1">
            <div className="w-8 h-8"></div>
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default EmptyMaterialRow;
