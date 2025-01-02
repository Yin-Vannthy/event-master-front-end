"use client";
import { useForm } from "react-hook-form";
import { AddSquare } from "iconsax-react";
import { CreateNewAsset } from "./Action/CreateNewAssetButton";
import { handleAsset } from "@/actions/assetAction/handleAssetInput";
import { useState } from "react";

export const PopUpChangeComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const delay = (x) => new Promise((resolve) => setTimeout(resolve, x));
  const onSubmit = async (e) => {
    setIsLoading(true);

    await handleAsset(e);
    await delay(2000);
    setIsLoading(false);
    reset();
    document.getElementById("my_modal_new").close();
  };

  return (
    <div>
      <CreateNewAsset />
      <dialog id="my_modal_new" className="modal">
        <div className="modal-box w-11/12 md:w-1/2 max-w-5xl space-y-8">
          <div className="flex flex-row items-center text-primary-text">
            <h2 className="text-lg lg:text-xl font-semibold">Create Asset</h2>
            <form method="dialog">
              <button
                onClick={() => {
                  reset();
                }}
                className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2`}
              >
                ✕
              </button>
            </form>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <div className="">
                <label htmlFor="">Asset Name</label>
                <span className="text-redUi">*</span>
                <input
                  type="text"
                  id="assetName"
                  name="assetName"
                  className="sm:w-full mt-2 shadow-sm bg-white border border-gray-300 primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5"
                  placeholder="Enter asset name"
                  {...register("assetName", {
                    required: "asset name is required",
                  })}
                />
                {errors.assetName && (
                  <div className="text-red-600 text-sm">
                    {errors.assetName.message}
                  </div>
                )}
              </div>
              <div className="flex gap-6 mt-4">
                <div className="w-full">
                  <label htmlFor="">Quantity</label>
                  <span className="text-redUi">*</span>
                  <input
                    type="number"
                    id=""
                    name="qty"
                    className="shadow-sm mt-2 bg-white border border-gray-300 primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5"
                    placeholder="Enter quantity"
                    {...register("qty", {
                      required: "quantity is required",
                    })}
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
                    type="text"
                    id=""
                    name="unit"
                    className="shadow-sm mt-2 bg-white border border-gray-300 primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5"
                    placeholder="Enter unit"
                    {...register("unit", {
                      required: "unit is required",
                    })}
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
                    document.getElementById("my_modal_new").close();
                    reset();
                  }}
                  className="px-6 py-3 rounded-2xl border-1px border-borderUi cursor-pointer"
                >
                  Cancel
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl border-1px border-borderUi flex space-x-2 bg-purple-text text-white"
                >
                  <AddSquare size="24" color="#FFFFFF" variant="Bold" />
                  {!isLoading ? <p>Save</p> : <div className="loader"></div>}
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};
