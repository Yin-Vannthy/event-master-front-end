"use client";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Form, useForm } from "react-hook-form";
import { handleSearchAsset } from "@/actions/assetAction/handleAssetInput";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export const SearchAssetComponent = () => {
  const [searchInput, setSearchInput] = useState();
  const searchparams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (e) => {};
  const handlesearch = async (e) => {
    const params = new URLSearchParams(searchparams);
    if (e) {
      params.set("query", e);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className=" w-4/5 lg:w-[730px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          value={searchInput}
          type="text"
          name="searchBar"
          placeholder="Angkor"
          className="font-medium text-xs lg:text-base focus:outline-none focus:border-purple-text w-full h-11 border rounded-3xl pl-10"
          {...register("searchBar")}
          onChange={(e) => {
            handlesearch(e.target.value);
          }}
          defaultValue={searchparams.get("query")?.toString()}
        />
        <IoSearchOutline className="w-[24px] h-[24px] -mt-8 ml-3" />
      </form>
    </div>
  );
};
