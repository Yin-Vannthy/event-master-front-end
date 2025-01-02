"use client";

import deleteAgenda from "@/app/actions/deleteAgendaAction";
import Image from "next/image";

export function DeleteButton({ id, onDeleteSuccess }) {

  const handleDelete = async () => {
    try {
      const res = await deleteAgenda(id);
      console.log("Delete response:", res);
      onDeleteSuccess(true); // Notify parent of the delete success
      document.getElementById("delete").close(); // Close the modal
    } catch (error) {
      console.error("Error deleting agenda:", error);
      onDeleteSuccess(false); // Notify parent of the failure
    }
  };

  return (
    <>
      <button
        className="btn rounded-2xl bg-red-600 w-32 hover:bg-red-700"
        value="delete"
        onClick={() => document.getElementById("delete").showModal()}
      >
        <Image src="/icons/delete.svg" alt="" width={24} height={24} />
        <p className="text-white">Delete</p>
      </button>
      <dialog id="delete" className="modal">
        <div className="modal-box w-[300px] justify-center rounded-3xl ">
          <form method="dialog" className="justify-end flex">
            <button>
              <Image src="/icons/cancel.svg" alt="" className="w-7 h-7" width={7} height={7} />
            </button>
          </form>
          <div className="justify-center flex">
            <Image
              src="/images/delete.jpg"
              alt="delete"
              width={150}
              height={180}
            />
          </div>
          <p className="justify-center w-full flex text-primary-text font-bold text-lg text-center ">
            Are you sure you want to <br /> remove this agenda?
          </p>
          <div className="modal-action ">
            <form
              method="dialog"
              className="flex justify-around w-full mb-4 mt-3 px-3"
            >
              <button
                className="h-9 rounded-3xl bg-red-600 w-[100px] hover:bg-red-700"
                value="yes"
                onClick={handleDelete}
              >
                <p className="text-white font-semibold">Yes</p>
              </button>
              <button
                className="h-9 rounded-3xl bg-[#888888] w-[100px] hover:bg-gray-500"
                value="cancel"
              >
                <p className="text-white font-semibold">No</p>
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default DeleteButton;
