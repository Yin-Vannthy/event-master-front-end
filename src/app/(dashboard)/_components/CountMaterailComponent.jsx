"use client";
import { CiCircleRemove } from "react-icons/ci";
import { MaterialActionButton } from "./MaterialActionButtton";
import { HiOutlineSwatch } from "react-icons/hi2";
import { TiFlashOutline } from "react-icons/ti";
import { IoSearchOutline } from "react-icons/io5";
import { AddSquare } from "iconsax-react";
import Image from "next/image";

export function CountMaterialComponent({data}) {
  return (
    <div className="grid grid-cols-1 py-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
    <div className="w-auto bg-white rounded-3xl drop-shadow flex px-3.5 py-1">
      <div className="flex items-center">
        <div className="bg-[#624F9D] p-2.5 rounded-full">
          <Image
            className=""
            src="/icons/ranking.svg"
            alt="Total Material"
            width={30}
            height={30}
            priority
          />
        </div>
        <div className="pl-3">
          <p className="text-primary-text text-xs lg:text-sm font-medium">
            Total Material
          </p>
          <p className="text-primary-text text-xs lg:text-sm font-bold">
            {data?.total ?? 0}
          </p>
        </div>
      </div>
    </div>

    <div className="w-auto py-2 bg-white rounded-3xl drop-shadow flex px-3.5">
      <div className="flex items-center">
        <div className="bg-[#FBBC04] p-2.5 rounded-full">
          <HiOutlineSwatch size="30" color="#ffffff" />
        </div>
        <div className="pl-3">
          <p className="text-primary-text text-xs lg:text-sm font-medium">
            Pending Material
          </p>
          <p className="text-primary-text text-xs lg:text-sm font-bold">
            {data?.pending ?? 0}
          </p>
        </div>
      </div>
    </div>

    <div className="w-auto py-2 bg-white rounded-3xl drop-shadow flex px-3.5">
      <div className="flex items-center">
        <div className="bg-[#551FFF] p-2.5 rounded-full">
          <TiFlashOutline size="32" color="#ffffff" />
        </div>
        <div className="pl-3">
          <p className="text-primary-text text-xs lg:text-sm font-medium">
            On Going Material
          </p>
          <p className="text-primary-text text-xs lg:text-sm font-bold">
            {data?.onGoing ?? 0}
          </p>
        </div>
      </div>
    </div>

    <div className="w-auto py-2 bg-white rounded-3xl drop-shadow flex px-3.5">
      <div className="flex items-center">
        <div className="bg-[#038446] p-2.5 rounded-full">
          <Image
            className=""
            src="/icons/clipboard.svg"
            alt="Done Material"
            width={30}
            height={30}
            priority
          />
        </div>
        <div className="pl-3">
          <p className="text-primary-text text-xs lg:text-sm font-medium">
            Done Material
          </p>
          <p className="text-primary-text text-xs lg:text-sm font-bold">
            {data?.done ?? 0}
          </p>
        </div>
      </div>
    </div>

    <div className="w-auto py-2 bg-white rounded-3xl drop-shadow flex px-3.5">
      <div className="flex items-center">
        <div className="bg-[#D72222] p-2.5 rounded-full">
          <Image
            className=""
            src="/icons/warning-2.svg"
            alt="Issue Material"
            width={32}
            height={32}
            priority
          />
        </div>
        <div className="pl-3">
          <p className="text-primary-text text-xs lg:text-sm font-medium">
            Issue Material
          </p>
          <p className="text-primary-text text-xs lg:text-sm font-bold">
            {data?.issue ?? 0}
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}
