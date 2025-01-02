"use client";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const SearchMemberComponent = () => {
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
    <div className="relative w-full lg:w-[650px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          value={searchInput}
          id="searchBar"
          name="searchBar"
          placeholder="Search by name"
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
