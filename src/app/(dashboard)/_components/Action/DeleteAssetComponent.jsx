"use client";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
export const DeleteAssetComponent = () => {
  return (
    <div className="delete">
      <RiDeleteBin6Line
        color="red"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      />
      <dialog id="my_modal_5" className="modal w-[320px] h-[450px] m-auto">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="content">
            <div className="image flex justify-center items-center">
              <img src="/images/reject.svg" alt="" />
            </div>
            <div className=" align-middle flex justify-center items-center font-bold text-sm">
              {" "}
              <p className="text-center">
                Are you sure,you want to <br /> remove this asset?
              </p>
            </div>
            <div className="button flex justify-center items-center gap-4 mt-10 pb-4">
              <input
                className=" border w-28 h-9 rounded-full bg-redUi text-white font-bold text-sm cursor-pointer"
                type="button"
                value="Yes"
              />
              <form method="dialog">
                <button className="btn btn-sm border w-28 h-9 rounded-full bg-greyUi text-white font-bold text-sm cursor-pointer">
                  No
                </button>
              </form>
              {/* <input
                className=" border w-28 h-9 rounded-full bg-greyUi text-white font-bold text-sm cursor-pointer"
                type="button"
                value="No"
              /> */}
            </div>
          </div>
        </div>
      </dialog>
      <p className="hidden">sdfds</p>
    </div>
  );
};
