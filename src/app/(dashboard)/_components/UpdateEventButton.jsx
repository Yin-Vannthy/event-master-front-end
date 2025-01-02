"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ToogleBtn } from "./Action/ToogleBtn";
import { SelectDropdown } from "./SelectDropdownComponent";
import { SelectModifyV2 } from "./Action/SelectModifyV2";
import { SelectModify } from "./Action/SelectModify";

export const UpdateEventButton = () => {
  const [hide, setHide] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(""); // Added state htmlFor image preview source

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-indigo-600");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-indigo-600");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-indigo-600");
    const file = e.dataTransfer.files[0];
    displayPreview(file);
    setHide(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    displayPreview(file);
    setHide(true);
  };

  const displayPreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSrc(reader.result); // Update previewSrc state
    };
  };

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const start = watch("startDate");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <button
        className="bg-white rounded-full bg-opacity-80 right-5 w-10 h-10 items-center flex flex-row justify-center"
        value="update"
        onClick={() => document.getElementById("updateEventCard").showModal()}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.0378 0.720099C17.0731 -0.240546 15.5097 -0.239958 14.5457 0.721415L7.0903 8.15835C6.49401 8.75305 6.14344 9.54915 6.10796 10.3891L6.00182 12.9018C5.9535 14.046 6.87116 14.9998 8.02025 14.9999L10.4924 15C11.4 15 12.2692 14.6349 12.9029 13.9874L20.2984 6.40804C21.2425 5.44344 21.2326 3.90152 20.2761 2.94907L18.0378 0.720099ZM15.4985 1.67018C15.9366 1.23319 16.6473 1.23293 17.0858 1.66958L19.3241 3.89856C19.7588 4.33149 19.7634 5.03236 19.3342 5.47082L17.8489 6.98837L14.0046 3.16008L15.4985 1.67018ZM13.0526 4.10956L8.04304 9.10711C7.68526 9.46393 7.47492 9.9416 7.45363 10.4456L7.3475 12.9583C7.33139 13.3397 7.63728 13.6576 8.02031 13.6576L10.4924 13.6577C11.037 13.6578 11.5585 13.4387 11.9388 13.0502L16.9084 7.94931L13.0526 4.10956Z"
            fill="#344054"
          />
          <path
            d="M19 11V15C19 17.7614 16.7614 20 14 20H6C3.23858 20 1 17.7614 1 15V7C1 4.23858 3.23858 2 6 2H10"
            stroke="#344054"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <dialog id="updateEventCard" className="modal !m-0">
        <div className="modal-box w-11/12 lg:w-1/2 lg:max-w-5xl p-8">
          <div className="flex justify-between">
            <h3 className="font-bold text-xl">Update Event</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
          <div className="modal-action">
            <form
              action=""
              className="w-full space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div
                className="w-full relative border-2 border-gray-300 border-dashed rounded-lg p-8"
                id="dropzone"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 z-50"
                  id="file-upload"
                  onChange={handleFileChange}
                />
                <div className={`text-center ${hide && "hidden"}`}>
                  <Image
                    src={"/icons/upload-icon.svg"}
                    className="mx-auto h-16 w-16"
                    height={48}
                    width={48}
                  />
                  <h3 className="mt-2 text-lg font-medium">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer"
                    >
                      <span className="text-purple-text">Upload</span>
                      <span className="text-[#8790A0]">
                        {" "}
                        or drag and drop files here
                      </span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </h3>
                </div>
                {previewSrc && ( // Conditionally render the image preview
                  <img
                    src={previewSrc}
                    className="mt-4 mx-auto h-80 w-full object-cover"
                    id="preview"
                    alt="Preview"
                  />
                )}
              </div>

              {/* input field  */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium primary-text block mb-2"
                  >
                    Event Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register("name", {
                      required: "name is required",
                    })}
                    type="text"
                    name="name"
                    id="name"
                    className={`${errors.name
                      ? "border-red-700 focus:border-red-600"
                      : "border-gray-300"
                      } shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5`}
                    placeholder="Enter event name"
                  />
                  {errors.name && (
                    <div className="text-red-600 text-sm mt-2">
                      {errors.name.message}
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <SelectModifyV2
                    {...register("category")}
                    label={`!font-medium`}
                    height={`!rounded-borderUi !h-[49.82px] !rounded-2xl shadow-sm bg-white !ring-gray-300 !border-gray-300 primary-text sm:text-sm focus:outline-none !focus:border-purple-text block w-full p-3.5`}
                  />
                  {errors.category && (
                    <span className="text-red-600 text-sm">
                      {errors.category.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium primary-text block mb-2"
                  >
                    Start Date Time <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register("startDate", {
                      required: "start date is required",
                    })}
                    type="datetime-local"
                    name="startDate"
                    id="startdate"
                    className={`${errors.startDate
                      ? "border-red-700 focus:border-red-600"
                      : "border-gray-300"
                      } shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5`}
                    placeholder="MM/DD/YYYY 6:00 AM"
                    required=""
                  />
                  {errors.startDate && (
                    <div className="text-red-600 text-sm mt-2">
                      {errors.startDate.message}
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium primary-text block mb-2"
                  >
                    End Date Time <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register("endDate", {
                      required: "end date is required",
                      validate: (v) => {
                        if (v < start) {
                          return "end date isn't valid to create event";
                        }
                      },
                    })}
                    type="datetime-local"
                    name="endDate"
                    id="enddate"
                    className={`${errors.endDate
                      ? "border-red-700 focus:border-red-600"
                      : "border-gray-300"
                      } shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5`}
                    placeholder="MM/DD/YYYY 6:00 AM"
                    required=""
                  />
                  {errors.endDate && (
                    <div className="text-red-600 text-sm mt-2">
                      {errors.endDate.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium primary-text block mb-2"
                  >
                    Duration <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register("duration", {
                      required: "duration is required",
                    })}
                    type="number"
                    name="duration"
                    id="duration"
                    className={`${errors.duration
                      ? "border-red-700 focus:border-red-600"
                      : "border-gray-300"
                      } shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5`}
                    placeholder="Enter duration"
                    required=""
                  />
                  {errors.duration && (
                    <div className="text-red-600 text-sm mt-2">
                      {errors.duration.message}
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium primary-text block mb-2"
                  >
                    Maximum Attendee <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register("maxAttendee", {
                      required: "maximum attendees is required",
                    })}
                    type="number"
                    name="maxAttendee"
                    id="max"
                    className={`${errors.maxAttendee
                      ? "border-red-700 focus:border-red-600"
                      : "border-gray-300"
                      } shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5`}
                    placeholder="Enter maximum attendee"
                    required=""
                  />
                  {errors.maxAttendee && (
                    <div className="text-red-600 text-sm mt-2">
                      {errors.maxAttendee.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium primary-text block mb-2"
                  >
                    Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register("address", {
                      required: "address is required",
                    })}
                    type="test"
                    name="address"
                    id="address"
                    className={`${errors.address
                      ? "border-red-700 focus:border-red-600"
                      : "border-gray-300"
                      } shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5`}
                    placeholder="Enter address"
                    required=""
                  />
                  {errors.address && (
                    <div className="text-red-600 text-sm mt-2">
                      {errors.address.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium primary-text block mb-2"
                  >
                    Description <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    {...register("description", {
                      required: "description is required",
                    })}
                    rows={5}
                    type="text"
                    name="description"
                    id="description"
                    className={`${errors.description
                      ? "border-red-700 focus:border-red-600"
                      : "border-gray-300"
                      } shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5`}
                    placeholder="Enter description..."
                    required=""
                  />
                  {errors.description && (
                    <div className="text-red-600 text-sm mt-2">
                      {errors.description.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-5">
                <p>Create this event as :</p>
                <div>
                  <ToogleBtn />
                </div>
              </div>

              <div className="flex justify-end space-x-3 w-full mb-4 gap-2">
                <button
                  className="py-3 px-6 rounded-2xl border-1px border-borderUi   bg-white hover:border-gray-500 hover:bg-white"
                  onClick={() => document.getElementById("updateEvent").close()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-3 px-6 rounded-2xl border-1px border-borderUi flex items-center justify-center gap-2  bg-green-700  hover:bg-green-800"
                  onClick={handleSubmit}
                >
                  <Image src="/icons/edit.svg" alt="" width={24} height={24} />
                  <p className="text-white">Update</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};





