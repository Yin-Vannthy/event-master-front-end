'use client'

import { Add, Minus } from "iconsax-react";
import { useState } from "react"

export const BooleanCreate = ({ name, id, func }) => {
    const [click, setClick] = useState(false);
    const handleRemove = (id) => {
        func(id)
    }
    return (
        <div className="flex flex-col space-y-1">
            <label className="capitalize" htmlFor="">{name}</label>
            <div className="flex">
                <div className="p-1.5 flex bg-backgroundUi w-fit rounded-2xl cursor-pointer relative">
                    <div onClick={() => setClick(true)} className={`w-32 text-center  py-2 rounded-xl ${click && 'bg-white'}`}>Yes</div>
                    <div onClick={() => setClick(false)} className={`w-32 text-center py-2 rounded-xl ${!click && 'bg-white'}`}>No</div>
                    <div className="cursor-pointer absolute -top-2 -right-2 bg-white shadow-sm rounded-full border-1px" onClick={() => handleRemove(id)}>
                        <Minus size="18" className="text-red-600" />
                    </div>
                </div>
                {click ?
                    <input type="text" name={`${name}`} value={"yes"} className="invisible" />
                    :
                    <input type="text" name={`${name}`} value={"no"} className="invisible" />}
            </div>
        </div>
    )
}   