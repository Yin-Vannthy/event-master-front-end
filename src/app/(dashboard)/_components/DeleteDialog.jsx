import React from "react";
import Image from "next/image";

const DeleteDialog = ({ isOpen, onClose, onDelete }) => {
  return (
    isOpen && (
      <dialog id="delete" className="modal" open>
        <div className="modal-box w-[300px] justify-center rounded-3xl">
          <form method="dialog" className="justify-end flex" onClick={onClose}>
            <button>
              <Image
                src="/icons/cancel.svg"
                alt=""
                className="w-7 h-7"
                width={7}
                height={7}
              />
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
          <p className="justify-center w-full flex text-primary-text font-bold text-lg text-center">
            Are you sure you want to <br /> remove the material you selected?
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex justify-around w-full mb-4 mt-3 px-3">
              <button
                className="h-9 rounded-3xl bg-red-600 w-[100px] hover:bg-red-700"
                value="yes"
                onClick={onDelete}
              >
                <p className="text-white font-semibold">Yes</p>
              </button>
              <button
                className="h-9 rounded-3xl bg-[#888888] w-[100px] hover:bg-gray-500"
                value="cancel"
                onClick={onClose}
              >
                <p className="text-white font-semibold">No</p>
              </button>
            </form>
          </div>
        </div>
      </dialog>
    )
  );
};

export default DeleteDialog;
