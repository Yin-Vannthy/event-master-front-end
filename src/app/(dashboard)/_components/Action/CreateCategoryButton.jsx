"use client";

import { addNewCategoryAction } from "@/actions/categoryAction";
import { AddSquare } from "iconsax-react";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateCategoryButton = () => {
    const [categoryName, setCategoryName] = useState('');
    const [isSend, setIsSend] = useState(false);
    const [showMsg, setShowMsg] = useState(false);

    const notify = (status, detail) => {
        if (status == "CREATED") {
            toast.success("Sucessfully created category", {
                position: "top-center"
            });
        }
        if (status == 400) {
            toast.error(`Can't create category, ${detail}`, {
                position: "top-center"
            });
        }
    }

    const handleSubmit = async () => {
        setIsSend(true)
        if (categoryName == '') {
            setShowMsg(true)
            setIsSend(false);
            return
        }
        setShowMsg(false)
        const res = await addNewCategoryAction(categoryName);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCategoryName('');
        setIsSend(false)
        notify(res?.status, res?.detail)
        document.getElementById("my_modal_category").close()
    }
    return (
        <>
            <button
                onClick={() => document.getElementById('my_modal_category').showModal()}
                className="hover:bg-purple-text hover:text-white duration-300 transition-all border-1px border-purple-text text-purple-text rounded-full p-2 md:px-4 md:py-2.5 flex items-center space-x-3"
            >
                <AddSquare size="20" variant="Bold" />
                <p className="text-xs lg:text-base hidden md:block">New Category</p>
            </button>
            <dialog id="my_modal_category" className="modal">
                <div className="modal-box w-11/12 md:w-1/3 max-w-5xl space-y-8">
                    <div className="flex flex-row items-center text-primary-text">
                        <h2 className="text-lg lg:text-xl font-semibold">Create Category</h2>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="category"
                            id="category"
                            className="shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5"
                            placeholder="Category" required=""
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <p className={`${showMsg ? 'block' : 'hidden'} text-red-500 text-sm mt-2`}>Input can't be empty</p>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <div onClick={() => { document.getElementById("my_modal_category").close(); setCategoryName('') }} className="px-6 py-3 rounded-2xl border-1px border-borderUi cursor-pointer">Cancel</div>
                        <button onClick={() => handleSubmit()} type="submit" className="save border min-w-32 rounded-2xl bg-purple-text text-white flex justify-center text-center items-center px-4 gap-3 ">
                            {!isSend ?
                                <div className="flex justify-center text-center items-center gap-3">
                                    <AddSquare size="20" color="#FFFFFF" variant="Bold" />
                                    <span className="h-12 text-white flex justify-center items-center">Create</span>
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

export default CreateCategoryButton;
