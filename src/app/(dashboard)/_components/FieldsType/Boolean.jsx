'use client'

import { useState } from "react"

export const Boolean = ({ name }) => {
    const [click, setClick] = useState(false);
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-primary-text block mb-1" htmlFor="">{name}</label>
            <div className="flex">
                <div className="p-1.5 flex bg-backgroundUi w-fit rounded-2xl cursor-pointer">
                    <div onClick={() => setClick(true)} className={`w-32 text-center  py-2 rounded-xl ${click && 'bg-white'}`}>Yes</div>
                    <div onClick={() => setClick(false)} className={`w-32 text-center py-2 rounded-xl ${!click && 'bg-white'}`}>No</div>
                </div>
                {click ?
                    <input type="text" name={`${name}`} value={"yes"} className="invisible" />
                    :
                    <input type="text" name={`${name}`} value={"no"} className="invisible" />}
            </div>
        </div>
    )
}   