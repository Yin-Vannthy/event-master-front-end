// SelectedItem.js
import React from 'react';

const SelectedItem = ({ item, removeItem }) => {
  return (
    <div className="selected-item flex items-center space-x-2 p-1 rounded bg-gray-200 dark:bg-gray-200">
      <span className=" text-primary-text">{item.label}</span>
      <svg
        className="w-4 h-4 text-gray-800 dark:text-gray-500 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => removeItem(item)}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  );
};

export default SelectedItem;
