"use client"

import Image from "next/image"
import Link from "next/link"

export const MemberDeleteBtn = () => {
    return (
        <>
            <div>
                <button className="" onClick={() => document.getElementById('my_modal_4').showModal()}>
                    <Image src="/icons/trash.svg" width={20} height={20} />
                </button>
                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-80 h-[430px]">
                        <form method="dialog">
                            <button type="submit" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div className="h-full flex flex-col justify-between">
                            <img className="mx-auto" src="/images/reject.svg" alt="reject-image" />
                            <p className="py-4 text-center text-xl font-semibold mx-auto">Are you sure you want to remove this member?</p>
                            <div className="flex space-x-6 justify-center">
                                <Link className="bg-greenUi text-white rounded-full py-2 px-9" href={'#'}>Yes</Link>
                                <Link className="bg-redUi text-white rounded-full py-2 px-9" href={'#'}>No</Link>
                            </div>
                        </div>
                    </div>
                </dialog>
            </div>
        </>
    )
}