"use client";

import { Trash } from "iconsax-react";
import Image from "next/image";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { handleDeleteAsset } from "@/actions/assetAction/handleAssetInput";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const DeleteAssetComponent = ({ assetIdprop }) => {
  const notify = () => {
    toast.success("Deleted Successful", {
      position: "top-center",
    });
  };
  //console.log("asset:", assetIdprop);
  const trigger = async (x) => {
    await handleDeleteAsset(x);
  };
  //handleDeleteAsset(assetIdprop);
  return (
    <div>
      <Trash
        onClick={() =>
          document.getElementById(`category_action_${assetIdprop}`).showModal()
        }
        className="cursor-pointer"
        size="20"
        color="#F4485D"
      />
      <dialog id={`category_action_${assetIdprop}`} className="modal">
        <div className="modal-box w-[310px] justity-center  ">
          <form method="dialog" className="justify-end flex">
            <button type="submit">
              <RxCross2 className="absolute right-[20px] top-[20px] w-6 h-6 " />
            </button>
          </form>
          <div className="justify-center flex">
            <Image
              src={`images/delete.svg`}
              alt={`delete`}
              width={0}
              height={0}
              className="w-[58%] mb-3"
              property=""
            />
          </div>
          <p className="justify-center w-full flex text-primary-text font-bold  text-lg  text-center">
            Are you sure,you want to
          </p>
          <p className="justify-center w-full flex text-primary-text font-bold  text-lg  text-center">
            remove this asset?
          </p>
          <div className="modal-action ">
            <form
              method="dialog"
              className=" flex justify-around w-full mb-4 mt-3 px-3"
            >
              <button
                onClick={() => {
                  trigger(assetIdprop);
                  notify();
                }}
                className=" h-9 rounded-3xl bg-red-600  w-[100px] hover:bg-red-700"
                value="Yes"
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
    </div>
  );
};
