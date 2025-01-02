'use client'

import { useState } from "react"

export const ToogleBtn = ({ func }) => {
    const [click, setClick] = useState(false);
    const handleChange = () => {
        setClick(!click)
        func(click)
    }

    return (
        <div className="flex items-center space-x-5">
            <div onClick={() => handleChange()} className={`w-9 duration-300 p-1 rounded-full ${click ? 'bg-purple-text' : 'bg-gray-200'}`}>
                <div className={`w-full flex ${click ? 'justify-end' : 'justify-start'} transition-all`}>
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
            </div>
            <p className={`${click && 'hidden'}`}>Private</p>
            <p className={`${!click && 'hidden'}`}>Public</p>
        </div>
    )
}