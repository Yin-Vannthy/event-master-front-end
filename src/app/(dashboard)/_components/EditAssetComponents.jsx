"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { AddSquare, Edit } from "iconsax-react";
import { handleUpdateAsset } from "@/actions/assetAction/handleAssetInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EditAssetComponents = ({ assetEdit, name, qty, unit }) => {
  const notify = () => {
    toast.success("Updated Successful", {
      position: "top-center",
    });
  };

  const [handleName, setHandleName] = useState(name);
  const [handleQty, setHandleQty] = useState(qty);
  const [handleUnit, setHandleUnit] = useState(unit);
  const [isLoading, setIsLoading] = useState(false);

  const cancle = () => {
    setHandleName(name);
    setHandleQty(qty);
    setHandleUnit(unit);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const delay = (x) => new Promise((resolve) => setTimeout(resolve, x));

  const onSubmit = async (e) => {
    // console.log("data", e);
    setIsLoading(true);
    await handleUpdateAsset(assetEdit, e);
    await delay(1000);
    setIsLoading(false);
    notify();
    reset();
    document.getElementById(`my_modal_updateasset${assetEdit}`).close();
  };

  return (
    <div>
      <Edit
        className="cursor-pointer"
        onClick={() => {
          document
            .getElementById(`my_modal_updateasset${assetEdit}`)
            .showModal();
          reset();
        }}
        size="20"
        color="#16AE65"
      />
      <dialog id={`my_modal_updateasset${assetEdit}`} className="modal">
        <div className="modal-box w-11/12 md:w-1/2 max-w-5xl space-y-8">
          <div className="flex flex-row items-center text-primary-text">
            <h2 className="text-lg lg:text-xl font-semibold">Edit Asset</h2>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
          {/* <div className="w-11/12 md:w-1/2 max-w-5xl space-y-8"> */}
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className=" ">
              <div className="text-center  flex flex-col justify-start items-start">
                <label htmlFor="">
                  Asset Name <span className="text-redUi">*</span>
                </label>
                <input
                  value={handleName}
                  type="text"
                  id="assetName"
                  name="assetName"
                  className="sm:w-full mt-2 shadow-sm bg-white border border-gray-300 primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5"
                  placeholder="Enter asset name"
                  {...register("assetName", {
                    required: "asset name is required",
                    maxLength: {
                      value: 40,
                      message: "name cannot more than 40 characters",
                    },
                  })}
                  onChange={(e) => {
                    setHandleName(e.target.value);
                  }}
                />
                {errors.assetName && (
                  <div className="text-red-600 text-sm">
                    {errors.assetName.message}
                  </div>
                )}
              </div>
              <div className="flex gap-6 mt-4 items-start text-start justify-start ">
                <div className="w-full">
                  <label htmlFor="">Quantity</label>
                  <span className="text-redUi">*</span>
                  <input
                    value={handleQty}
                    type="number"
                    id="qty"
                    name="qty"
                    className="shadow-sm mt-2 bg-white border border-gray-300 primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5"
                    placeholder="Enter quantity"
                    {...register("qty", {
                      required: "quantity is required",
                      max: {
                        value: 9999,
                        message: "Value cannot more than 9999",
                      },
                    })}
                    onChange={(e) => setHandleQty(e.target.value)}
                  />
                  {errors.qty && (
                    <div className="text-red-600 text-sm">
                      {errors.qty.message}
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <label htmlFor="">Unit</label>
                  <span className="text-redUi">*</span>
                  <input
                    value={handleUnit}
                    type="text"
                    id="unit"
                    name="unit"
                    className="shadow-sm mt-2 bg-white border border-gray-300 primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5"
                    placeholder="Enter unit"
                    {...register("unit", {
                      required: "unit is required",
                      maxLength: {
                        value: 40,
                        message: "name cannot more than 40 characters",
                      },
                    })}
                    onChange={(e) => setHandleUnit(e.target.value)}
                  />
                  {errors.unit && (
                    <div className="text-red-600 text-sm">
                      {errors.unit.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-3 bg mt-8">
                <div
                  onClick={() => {
                    reset();
                    cancle();
                    // checkchange;
                    document
                      .getElementById(`my_modal_updateasset${assetEdit}`)
                      .close();
                  }}
                  className="px-6 py-3 rounded-2xl border-1px border-borderUi cursor-pointer"
                >
                  Cancel
                </div>
                <button
                  type="submit"
                  //onClick={() => (assetEdit)}
                  className="save border rounded-2xl min-w-32 bg-greenUi text-white flex justify-center text-center items-center px-4 gap-3 "
                >
                  {!isLoading ? (
                    <div className="flex gap-3">
                      <Image src={"/icons/edit.svg"} width={20} height={20} />
                      <span className=" text-white flex justify-center items-center">
                        <p>Update</p>
                      </span>
                    </div>
                  ) : (
                    <div className="loader"></div>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};
