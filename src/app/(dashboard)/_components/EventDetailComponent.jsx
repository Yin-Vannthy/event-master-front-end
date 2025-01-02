"use client";
import React, { useEffect, useState } from "react";
import { UpdateEventButton } from "./UpdateEventButton";

export const EventDetail = ({ eventData }) => {
  const event = eventData;

  // if (!event) {
  //   return (
  //     <div class="flex justify-center items-center h-screen">
  //       <div class="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
  //     </div>
  //   );
  // }
  
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };
  

  return (
    <div className="m-auto w-full rounded-3xl h-[50%] bg-white py-5 ">
      <div
        className="w-[96%] ml-[2%] h-68 bg-cover bg-center rounded-2xl flex justify-end p-3 mb-4"
        style={{
          backgroundImage: `url(${event?.poster})`,
          height: "256px",
        }}
        alt="Event Photo"
      >
        <UpdateEventButton />
      </div>

      <div className="flex justify-between px-5 mb-3">
        <div className="text-primary-text font-semibold text-2xl w-[70%] text-wrap">
          {event?.eventName}
        </div>
        <div className="flex justify-center items-center ">
  <span
    className={`inline-block rounded-full px-4 py-1 text-sm font-medium ${
      event?.isOpen ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
    }`}
  >
    {event?.isOpen ? "Open" : "Closed"}
  </span>
</div>

      </div>
      <div className="ml-5 text-primary-text font-regular text-base w-[65%] ">
        {event?.description}
      </div>
      <p className="text-primary-text font-light ml-5 mt-5 w-[65%]">
        <span className="text-primary-text font-bold mr-2">Location:</span>
        {event?.address}
      </p>
      <button className="px-5 py-2 rounded-full bg-blue-200 text-[#215EE9] ml-5  mx-5  mt-5">
        {formatDate(event?.startDate)}
      </button>

    </div>
  );
};
