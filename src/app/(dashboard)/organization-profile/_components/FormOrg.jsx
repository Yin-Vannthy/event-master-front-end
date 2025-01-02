"use client";

import { useState, useEffect } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { CgAddR } from "react-icons/cg";
import { TbEdit } from "react-icons/tb";


const FormOrg = () => {

  const [imageSrc, setImageSrc] = useState("/images/Avatar.png");
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [organizationCode] = useState("123456");
  const [organizationName, setOrganizationName] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({ organizationName: '', address: '' });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelChanges = () => {
    setOrganizationName('');
    setAddress('');
    // Implement the logic to cancel the changes
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    // Implement the logic to save the changes
    setIsEditing(false);
  };

  const handleOrganizationNameChange = (e) => {
    setOrganizationName(e.target.value);
  };

  // =========handle copy organization code===========
  const handleCopy = () => {
    navigator.clipboard
      .writeText(organizationCode) // Copy organization code to clipboard
      .then(() => setCopied(true)) // Set copied state to true if successful
      .catch((error) => console.error("Error copying text: ", error));

    setTimeout(() => {
      setCopied(false); // Reset copied state after 1 second
    }, 2000);
  };

  return (
    <div>
      {/* input field here */}
      <div className="mx-7 mt-40 sm:mt-40 md:mt-44 lg:mt-52 xl:mt-56 2xl:mt-60 my-auto sm:mx-24 md:mx-32 lg:mx-52 xl:mx-56 2xl:mx-64 z-10">
        <div className="mt-0 sm:mt-0 md:mt-5 lg:mt-16 xl:mt-24 2xl:mt-32">
          <label
            htmlFor="text"
            className="text-sm font-medium primary-text block mb-2"
          >
            Organization code <span className="text-red-600">*</span>
          </label>
          <div className="flex align-middle">
            <input
              type="number"
              id="text"
              className={`shadow-sm bg-gray-100 border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
              placeholder={organizationCode}
              readOnly
            />
            <FaRegCopy
              className="text-gray-600 w-5 h-5 mt-4  -ml-10 "
              onClick={() => {
                handleCopy();
              }}
            />
            {copied && (
              <div className="absolute right-6 sm:right-24 md:right-32 lg:right-52 xl:right-56 2xl:right-64 -mt-10">
                <div className="bg-white shadow-md rounded p-2">
                  <p className="text-green-500 text-sm">copied!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-7">
          <label
            htmlFor="text"
            className="text-sm font-medium primary-text block mb-2"
          >
            Organization name <span className="text-red-600">*</span>
          </label>
          <div>
            <input
              type="text"
              id="orgName"
              name="orgName"
              className={`shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
              placeholder="Enter full name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="mt-7">
          <label
            htmlFor="text"
            className="text-sm font-medium primary-text block mb-2"
          >
            Address <span className="text-red-600">*</span>
          </label>
          <div>
            <input
              type="text"
              id="orgAddress"
              name="orgAddress"
              className={`shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      {/* button here */}
      <div className="z-20 flex justify-end items-center w-full h-16 mb-24 sm:mb-20 md:mb-10 lg-mb-5 xl:mb-5 2xl:mb-5">
          {isEditing ? (
            <div className="mr-5 flex align-middle sm:mr-10 md:mr-14 lg:mr-20 xl:mr-24 xl:mr-28">
              <button
                className="btn btn-outlinen hover:bg-gray-300 border-solid border-1 border-primary-text text-lg w-20 sm:w-32 md:w-32 lg:w-32 xl:w-32 2xl:w-32"
                onClick={handleCancelChanges}
                type="button"
              >
                Cancel
              </button>
              <button
                className={`flex justify-center align-middle items-center rounded-lg bg-purple-text text-white text-lg ml-5 w-28 sm:w-32 md:w-32 lg:w-32 xl:w-32 2xl:w-32 
                  ${
                    !organizationName || !address
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-violet-500"
                  }`}
                onClick={handleSaveChanges}
                type="button"
                disabled={!organizationName || !address}
              >
                <CgAddR className="w-5 h-5 mr-2 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-6 lg:h-6 xl:w-6 xl:h-6 2xl:w-6 2xl:h-6" />
                Save
              </button>
            </div>
          ) : (
            <button
              className="btn btn-success text-white w-28 sm:w-32 md:w-32 lg:w-32 xl:w-32 2xl:w-32 text-lg mr-5 sm:mr-10 md:mr-14 lg:mr-20 xl:mr-24 xl:mr-28"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              <TbEdit className="w-6 h-6" />
              Edit
            </button>
          )}
        </div>
    </div>
  );
};

export default FormOrg;
