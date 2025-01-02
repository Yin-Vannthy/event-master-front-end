'use client'

import { Minus } from "iconsax-react"

export const InputCreate = ({ type, name, id, func }) => {
    const handleRemove = (id) => {
        func(id)
    }

    return (
        <div className="flex flex-col space-y-1">
            <label className="capitalize" htmlFor="">{name}</label>
            <div className="relative">
                <input
                    disabled
                    placeholder={`Please enter your ${name.toLowerCase()}`}
                    name={`${name}`}
                    className="px-4 border w-[100%] focus:outline-none text-sm rounded-2xl p-3.5 block"
                    type={type}
                />
                <div onClick={() => handleRemove(id)} className="cursor-pointer absolute -top-2 -right-2 bg-white rounded-full shadow-sm border-1px">
                    <Minus size="18" className="text-red-600" />
                </div>
            </div>
        </div>
    )
}