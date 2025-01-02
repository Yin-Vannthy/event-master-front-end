// MaterialRow.js

import React from "react";
import Dropdown from "./DropdownSupporterComponent"; // Ensure to import any necessary components
import { FaAngleDown } from "react-icons/fa";
import { MaterialActionButton } from "./MaterialActionButtton"; // Import your action button component here

const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#FBBC04";
      case "OnGoing":
        return "#551FFF";
      case "Done":
        return "#038446";
      case "Issue":
        return "#D72222";
      default:
        return "#000000";
    }
  };
  
const MaterialRow = ({ data, index, checkedRows, handleCheckboxChange, memberData }) => {
  const selectedSupporters = data.supporters || [];
  return (
    <tr key={data?.materialId} className="bg-white border-b hover:bg-gray-50 border border-black w-full">
      <td className="w-4 p-4 rounded-l-2xl">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={checkedRows.includes(data.materialId)}
            onChange={() => handleCheckboxChange(data.materialId)}
            id={`checkbox-table-${index + 1}`}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor={`checkbox-table-${index + 1}`} className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <td className="text-base text-primary-text pl-1">{index + 1}</td>
      <td className="text-sm font-normal text-primary-text px-2">
        <input
          type="text"
          name={`materialName-${index}`}
          className="border text-primary-text text-base px-2 w-32 h-10 rounded-xl font-normal focus:outline-none"
          value={data.materialName}
          readOnly
        />
      </td>
      <td className="text-sm font-normal text-primary-text px-2">
        <input
          type="text"
          name={`qty-${index}`}
          className="border text-primary-text text-base px-2 w-20 h-10 rounded-xl font-normal focus:outline-none"
          value={data.qty}
          readOnly
        />
      </td>
      <td className="text-sm font-normal text-primary-text px-2">
        <input
          type="text"
          name={`unit-${index}`}
          className="border text-primary-text text-base px-2 w-24 h-10 rounded-xl font-normal focus:outline-none"
          value={data.unit}
          readOnly
        />
      </td>
      <td className="px-2">
        <input
          type="date"
          name={`dueDate-${index}`}
          className="border text-gray-900 sm:text-sm rounded-xl block w-22 p-2 focus:outline-none placeholder:text-opacity-50"
          placeholder="dd/mm/yyyy"
          value={data.dueDate}
          readOnly
        />
      </td>
      <td className="px-2">
        <select
          name={`handler-${index}`}
          className="border text-black text-base sm:text-sm rounded-xl block w-28 p-2.5 focus:outline-none"
          value={data?.handlerId}
          readOnly
        >
          <option value=""></option>
          {memberData?.map((member, idx) => (
            <option key={idx} value={member.memberId}>
              {member?.memberName}
            </option>
          ))}
        </select>
      </td>
      <td className="px-2">
      <Dropdown selectedSupporters={selectedSupporters} />
      </td>
      <td className="px-2 w-36">
        <div className="bg-white p-[7px] border rounded-xl">
          <div className="cursor-pointer flex items-center">
            <span
              className="flex px-1 py-1 w-16 text-xs font-semibold justify-center rounded-full"
              style={{
                backgroundColor: getStatusColor(data.status),
                color: "white",
              }}
            >
              {data.status}
            </span>
            <FaAngleDown className="ml-2" />
          </div>
        </div>
      </td>
      <td className=" rounded-r-2xl">
        <MaterialActionButton data={data} />
      </td>
    </tr>
  );
};

export default MaterialRow;
