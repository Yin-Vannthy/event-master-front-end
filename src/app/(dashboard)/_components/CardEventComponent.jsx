import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Location } from "iconsax-react";
import { EventActionButton } from "./EventActionButton";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" }).toUpperCase();
  return { day, month };
};

export default function CardEventComponent({ eventData }) {
  console.log("event ",eventData);
  return (
    <div className="gap-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:gap-6 lg:gap-5 md:gap-2 w-sm sm:gap-4 xs:gap-2 2xl:grid-cols-4">
      {eventData.map((data, index) => {
        const { day, month } = formatDate(data.startDate);
        return (
          <div key={index}>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              {/* <MegaImage
                src={data.poster}
              /> */}
              <div
                className="w-auto h-60 bg-cover bg-center sm:h-[200px] md:h-[220px] lg:h-[220px] xl:h-[230px] 2xl:[250px]"
                style={{
                  backgroundImage:
                    `url(${data.poster})` ??
                    `url(https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg)`,
                }}
                alt="Event Photo"
              >
                <div className="w-full flex justify-between pt-3 pl-3 pr-3">
                  <div className="text-sm bg-white text-primary-text rounded-xl h-11 w-10 py-2 flex flex-col items-center justify-center">
                    <span className="font-semibold">{day}</span>
                    <small className="text-red-500 font-semibold">
                      {month}
                    </small>
                  </div>
                  <EventActionButton poster={data.poster} eventName={data.eventName} category={data.category} startDate={data.startDate} endDate={data.endDate}
                   duration={data.duration} maxAttendee={data.maxAttendee} address={data.address} description={data.description} isPost={data.isPost} eventId={data.eventId} />
                </div>
              </div>

              <div className="px-3 w-full">
                <div className="flex gap-3 justify-between mt-5">
                  <div className="font-bold primary-text w-[70%] line-clamp-1">
                    {data.eventName}
                  </div>
                  <span
                    className={`inline-block rounded-full w-16 text-center py-1 text-sm font-semibold ${data.isOpen ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                      }`}
                  >
                    {data.isOpen ? "Open" : "Closed"}
                  </span>
                </div>

                <p className="text-gray-700 text-sm px-1 mt-3 flex items-center gap-2">
                  <Location size="20" color="#7A44FF" variant="Bold" />
                  <span className="mt-2 line-clamp-1">{data.address}</span>
                </p>
              </div>
              <div className="flex lg:gap-4 md:gap-2 px-4 pt-4 pb-7 mt-6 sm:gap-2">
                <Link
                  href={`/attendees/${data.eventId}`}
                  className="flex-1 flex items-center justify-center rounded-full border-purple-text border-[1px] text-purple-text antialiased py-2 text-sm transition duration-300 ease-in-out hover:scale-[102%]"
                >
                  <button className="mx-auto">View all attendees</button>
                </Link>
                <Link
                  href={`/event-detail/${data.eventId}`}
                  className="flex hover:bg-violet-700 active:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-500 items-center justify-center flex-1 rounded-full bg-[#7939EF] text-white antialiased py-2 text-sm transition duration-300 ease-in-out hover:scale-[102%]"
                >
                  <button className="mx-auto">View event detail</button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
