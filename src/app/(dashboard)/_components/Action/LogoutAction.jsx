'use client'

import { LogoutCurve } from "iconsax-react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { RxCross2 } from "react-icons/rx"

export const LogoutAction = () => {
    return (
        <div>
            {/* <Image className="cursor-pointer" onClick={() => document.getElementById('category_action').showModal()} src="/icons/trash.svg" width={20} height={20} /> */}
            <div onClick={() => document.getElementById('logout_action').showModal()} className={`cursor-pointer space-x-3 px-4 py-4 flex justify-center xl:justify-start rounded-radiusUi w-full items-center`}>
                <LogoutCurve size="20" color="#344054" variant="Bulk" />
                <p className="hidden xl:block text-base">Logout</p>
            </div>
            <dialog id="logout_action" className="modal">
                <div className="modal-box w-[310px] justity-center  ">
                    <form method="dialog" className="justify-end flex">
                        <button type="submit">
                            <RxCross2 className="absolute right-[20px] top-[20px] w-6 h-6 " />
                        </button>
                    </form>
                    <div className="justify-center flex">
                        <img src="/images/logout.svg" alt="delete" className="w-[58%] mb-3" />
                    </div>
                    <p className="justify-center w-full flex text-primary-text font-bold  text-lg  text-center">
                        Are you sure,you want to
                    </p>
                    <p className="justify-center w-full flex text-primary-text font-bold  text-lg  text-center">
                        logout?
                    </p>
                    <div className="modal-action ">
                        <form method="dialog" className=" flex justify-around w-full mb-4 mt-3 px-3">
                            <button className=" h-9 rounded-3xl bg-red-600  w-[100px] hover:bg-red-700" value="yes">
                                <p onClick={() => signOut()} className="text-white font-semibold">Yes</p>
                            </button>
                            <button className="h-9 rounded-3xl bg-[#888888] w-[100px] hover:bg-gray-500" value="cancel">
                                <p className="text-white font-semibold">No</p>
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}