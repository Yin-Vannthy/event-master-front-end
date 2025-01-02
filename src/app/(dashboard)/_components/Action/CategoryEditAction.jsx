'use client'

import { updateCategoryAction } from "@/actions/categoryAction"
import { Edit } from "iconsax-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const CategoryEditAction = ({ cateId, name }) => {
    const notify = (status, detail) => {
        if (status == "OK") {
            toast.success("Category has been modify successfully", {
                position: "top-center"
            });
        }
        if (status == 400) {
            toast.error(`Can't update category, ${detail}`, {
                position: "top-center"
            });
        }
    }
    const [categoryName, setCategoryName] = useState();
    const [isSend, setIsSend] = useState(false);
    const handleUpdate = async () => {
        setIsSend(true)
        const res = await updateCategoryAction(cateId, categoryName);
        console.log('checking res', res)
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCategoryName('');
        setIsSend(false)
        document.getElementById(`update_category_${cateId}`).close()
        notify(res?.status, res?.detail);
    }
    useEffect(() => {
        setCategoryName(name)
    }, [])
    return (
        <>
            <Edit className="cursor-pointer" onClick={() => document.getElementById(`update_category_${cateId}`).showModal()} size="20" color="#16AE65" />
            <dialog id={`update_category_${cateId}`} className="modal">
                <div className="modal-box w-11/12 md:w-1/3 max-w-5xl space-y-8">
                    <div className="flex flex-row items-center text-primary-text">
                        <h2 className="text-lg lg:text-xl font-semibold">Update Category</h2>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                    </div>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        className="shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5"
                        placeholder="Category" required=""
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <div className="flex justify-end space-x-3">
                        <div onClick={() => document.getElementById(`update_category_${cateId}`).close()} className="flex items-center px-6 py-3 rounded-2xl border-1px border-borderUi cursor-pointer">Cancel</div>
                        <button onClick={() => handleUpdate()} type="submit" className="min-w-32 save border rounded-2xl bg-greenUi text-white flex justify-center text-center items-center px-4 gap-3">
                            {!isSend ?
                                <div className="flex justify-center text-center items-center gap-3">
                                    <Image
                                        src={"/icons/edit.svg"}
                                        width={20}
                                        height={20}
                                    />
                                    <span className="h-12 text-white flex justify-center items-center"> Update</span>
                                </div>
                                :
                                <div className="loader"></div>
                            }
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    )
}