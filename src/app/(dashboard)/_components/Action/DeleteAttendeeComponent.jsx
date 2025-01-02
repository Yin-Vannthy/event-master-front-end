"use client";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { deleteAttendeeAction } from "@/actions/attendeeDeleteAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function DeleteAttendeeComponent({ attendeeId, userRole }) {
  const isDeletable = userRole === "ROLE_ADMIN" || userRole === "ROLE_SUB_ADMIN";

  const [isLoading, setIsLoading] = useState(false);

  const notifySuccess = () => {
    toast.success("Deleted Successfully", {
      position: "top-center",
    });
  };

  const notifyUserCannotDelete = () => {
    toast.error("You can not delete this attendee", {
      position: "top-center",
    });
  };

  const handleDelete = async () => {
    if (isDeletable) {
      setIsLoading(true);
      try {
        await deleteAttendeeAction(attendeeId);
        notifySuccess();
        document.getElementById(`attendee_action_${attendeeId}`).close();
      } catch (error) {
        console.error(`Failed to delete attendee with ID: ${attendeeId}`, error);
        toast.error("Failed to delete attendee. Please try again.", {
          position: "top-center",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      notifyUserCannotDelete();
    }
  };

  return (
    <>
      <button
        className="rounded-2xl"
        value="delete"
        onClick={() => {
          if (isDeletable) {
            document.getElementById(`attendee_action_${attendeeId}`).showModal();
          } else {
            notifyUserCannotDelete();
          }
        }}
      >
        <Image
          src="/icons/deleteicon.svg"
          alt="delete icon"
          className="w-8 h-8 ml-3 mt-1"
          width={32}
          height={32}
        />
      </button>
      {isDeletable && (
        <dialog id={`attendee_action_${attendeeId}`} className="modal">
          <div className="modal-box w-[310px] justify-center">
            <form method="dialog" className="justify-end flex">
              <button type="submit">
                <RxCross2 className="absolute right-[20px] top-[20px] w-6 h-6" />
              </button>
            </form>
            <div className="justify-center flex">
              <Image
                src={`/images/delete.svg`}
                alt={`delete image`}
                className="w-[58%] mb-3"
                width={32}
                height={32}
              />
            </div>
            <p className="justify-center w-full flex text-primary-text font-bold text-lg text-center">
              Are you sure you want to
            </p>
            <p className="justify-center w-full flex text-primary-text font-bold text-lg text-center">
              remove this attendee?
            </p>
            <div className="modal-action">
              <div className="flex justify-around w-full mb-4 mt-3 px-3">
                <button
                  onClick={handleDelete}
                  className="h-9 rounded-3xl bg-red-600 w-[100px] hover:bg-red-700 flex justify-center items-center"
                  value="yes"
                >
                  {!isLoading ? (
                    <p className="text-white font-semibold">Yes</p>
                  ) : (
                    <div className="loader"></div>
                  )}
                </button>
                <button
                  onClick={() => {
                    document.getElementById(`attendee_action_${attendeeId}`).close();
                  }}
                  className="h-9 rounded-3xl bg-[#888888] w-[100px] hover:bg-gray-500"
                  value="cancel"
                >
                  <p className="text-white font-semibold">No</p>
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
