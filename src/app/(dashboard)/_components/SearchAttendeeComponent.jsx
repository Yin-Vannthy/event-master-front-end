"use client";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { useDebouncedCallback } from "use-debounce";

export default function SearchAttendeeComponent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const {replace} = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <div className="w-full flex justify-end lg:mt-0 mt-3">
        <div className="relative w-full lg:w-[450px]">
          <input
            type="text"
            id="search"
            placeholder="Search by name or phone number"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("query")?.toString() || ""}
            className="font-medium text-xs lg:text-base focus:outline-none focus:border-purple-text w-full h-11 border rounded-3xl pl-10"
          />
          <IoSearchOutline className="w-[24px] h-[24px] -mt-8 ml-3" />
        </div>
      </div>
    </div>
  );
}
