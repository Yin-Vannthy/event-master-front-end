"use client";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

export function ChangeRoleComponent({ role, onConfirm, onClose }) {
  return (
    <dialog open className="modal bg-black/40">
      <div className="modal-box w-[310px] h-[376.78px] justify-center duration-300">
        <form method="dialog" className="justify-end flex">
          <button type="button" onClick={onClose}>
            <RxCross2 className="absolute text-[#181818] right-[20px] top-[20px] w-6 h-6" />
          </button>
        </form>
        <div className="justify-center flex">
          <Image
            src="/images/Questions-pana.svg"
            alt="delete"
            className="w-[58%]  mb-3"
            width={0}
            height={0}
          />
        </div>
        <p className="justify-center w-full flex text-primary-text font-bold text-lg text-center mt-5">
          Do you want to change your role to {role.toLowerCase()}?
        </p>
        <div className="modal-action">
          <form
            method="dialog"
            className="flex justify-around px-3 w-full mb-4 mt-3"
          >
            <button
              type="button"
              className="h-9 rounded-3xl bg-[#038446] w-[100px] hover:bg-[#3e8563]"
              onClick={onConfirm}
            >
              <p className="text-white font-semibold">Yes</p>
            </button>
            <button
              type="button"
              className="h-9 rounded-3xl bg-[#D72222] w-[100px] hover:bg-[#b74b4b]"
              onClick={onClose}
            >
              <p className="text-white font-semibold">No</p>
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
