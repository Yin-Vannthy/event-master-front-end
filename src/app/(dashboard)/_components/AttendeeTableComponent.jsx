import React from "react";
import { DeleteAttendeeComponent } from "./Action/DeleteAttendeeComponent";
import Image from "next/image";

const AttendeeTableComponent = ({
  parentData,
  userRole,
  attendeeInEvent,
  isSearch,
  header,
}) => {
  let attendees = parentData?.payload || [];
  let temp = header;

  if (attendees.length > 0) {
    let nameIndex = temp.indexOf("name");
    if (nameIndex !== -1) {
      [temp[0], temp[nameIndex]] = [temp[nameIndex], temp[0]];
    }
  }
  let tableHeaders = ["NO", ...temp];
  if (userRole !== "ROLE_USER") {
    tableHeaders.push("ACTION");
  }

  header = attendees.length > 0 ? Object.keys(attendees[0].data) : [];

  if (attendees.length > 0) {
    let nameIndex = header.indexOf("name");
    if (nameIndex !== -1) {
      [header[0], header[nameIndex]] = [header[nameIndex], header[0]];
    }
  }

  // Limit header to only 5 fields
  // header = header.slice(0, 5);
  return (
    <div className="overflow-y-auto h-[600px]">
      <table className="table w-full px-1 border-separate border-spacing-y-3 mt-5">
        {(attendees.length > 0 || (isSearch && attendees.length === 0)) && (
          <thead className="h-14 shadow-soft text-primary-text rounded-radiusUi bg-[#FFFFFF] uppercase">
            <tr className="text-xs lg:text-base">
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className={`px-5 py-2 font-medium ${
                    index === 0
                      ? "rounded-l-radiusUi"
                      : index === tableHeaders.length - 1
                      ? "rounded-r-radiusUi"
                      : ""
                  }`}
                >
                  {header.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {isSearch && attendees.length === 0 && (
            <tr>
              <td colSpan={tableHeaders.length}>
                <div className="justify-center w-full h-[595px] content-center space-y-2 pb-10 flex flex-col items-center">
                  <Image
                    src="/images/Search.gif"
                    alt="empty image"
                    width={180}
                    height={180}
                    priority
                  />
                  <p className="text-center text-2xl font-semibold text-primary-text">
                    No results found
                  </p>
                  <p className="text-center text-xl text-gray-500">
                    Please try another search!
                  </p>
                </div>
              </td>
            </tr>
          )}
          {!isSearch && attendeeInEvent === 0 && (
            <tr>
              <td colSpan={tableHeaders.length}>
                <div className="justify-center w-full h-[595px] content-center space-y-2 pb-10 flex flex-col items-center">
                  <Image
                    src="/images/Search.gif"
                    alt="empty image"
                    width={180}
                    height={180}
                    priority
                  />
                  <p className="text-center text-2xl font-semibold text-primary-text">
                    No attendees found for this event
                  </p>
                </div>
              </td>
            </tr>
          )}
          {attendees.length > 0 &&
            attendees.map((attendeeWrapper, index) => {
              const attendee = attendeeWrapper?.data;
              return (
                <tr
                  key={attendeeWrapper.attendeeId}
                  className={`h-14 shadow-soft rounded-radiusUi odd:bg-softwhiteUi even:bg-white text-primary-text`}
                >
                  <td className="px-5 py-2 text-xs xl:text-base rounded-l-radiusUi">
                    {index + 1}
                  </td>
                  {header.map((field, fieldIndex) => (
                    <td
                      key={fieldIndex}
                      className="px-5 py-2 text-xs lg:text-base"
                    >
                      {attendee[field]}
                    </td>
                  ))}
                  {userRole !== "ROLE_USER" && (
                    <td className="px-5 py-2 text-xs lg:text-base rounded-r-radiusUi">
                      <DeleteAttendeeComponent
                        attendeeId={attendeeWrapper.attendeeId}
                        userRole={userRole}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendeeTableComponent;
