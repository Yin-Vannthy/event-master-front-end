// TableHead.js

import React from "react";

const TableHeadMaterial = ({ selectAllChecked, handleSelectAllChange }) => {
  return (
    <thead className="uppercase dark:text-gray-400 text-sm font-normal h-10 drop-shadow text-primary-text bg-[#F0F1F3]">
      <tr className="text-[14px] font-semibold rounded-2xl">
        <th className="w-4 p-4 rounded-l-2xl">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectAllChecked}
              onChange={handleSelectAllChange}
              id="select-all-checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="select-all-checkbox" className="sr-only">
              Select all
            </label>
          </div>
        </th>
        <th scope="col" className="py-5 text-primary-text px-0">
          NO
        </th>
        <th scope="col" className="py-3 text-primary-text px-6">
          ITEM NAME
        </th>
        <th scope="col" className="py-3 text-primary-text px-2">
          QTY
        </th>
        <th scope="col" className="py-3 text-primary-text px-2">
          UNIT
        </th>
        <th scope="col" className="py-3 text-primary-text px-2">
          DUE DATE
        </th>
        <th scope="col" className="py-3 text-primary-text">
          HANDLER
        </th>
        <th scope="col" className="py-3 text-primary-text">
          SUPPORTERS
        </th>
        <th scope="col" className="px-2 py-3 text-primary-text">
          STATUS
        </th>
        <th scope="col" className="py-3 pr-2 pl-0 text-primary-text rounded-r-2xl">
          ACTION
        </th>
      </tr>
    </thead>
  );
};

export default TableHeadMaterial;
