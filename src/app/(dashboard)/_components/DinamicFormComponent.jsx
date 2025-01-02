import React from 'react'
import Image from 'next/image'

const DinamicFormComponent = () => {
    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box w-11/12 max-w-4xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="content">
                        <div className="title font-semibold text-2xl">Choose input field your form</div>
                        <div className="mb-4 mt-12 grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="text" className="font-semibold text-base">Text</label>
                                <input type="text" name="event-name" id="event-name" className="border text-primary-text sm:text-sm rounded-xl block w-full  mt-2 p-3.5 focus:outline-none" placeholder="Enter text" required="" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="number" className="font-semibold text-base">Number</label>
                                <input type="number" name="number" id="number" className="border text-primary-text sm:text-sm rounded-xl block w-full  mt-2 p-3.5 focus:outline-none" placeholder="Enter number" required="" />
                            </div>
                        </div>
                        <div className="mt-8 w-[48%]">
                            <div className="w-full">
                                <div className="mb-5">
                                    <label htmlFor="event-name" className="font-semibold text-base">Date </label>
                                    <input type="date" name="date" id="date"
                                        className="border text-primary-text sm:text-sm rounded-xl block w-full mt-2 p-3.5 focus:outline-none" />
                                </div>
                            </div>
                        </div>
                        <p className='text-sm text-primary-text mt-10'>You havn't choose any field yet</p>
                        <div className="buttons flex justify-end mt-11 gap-3">
                            <button
                                className="flex items-center justify-center gap-2 rounded-2xl w-36 bg-[#551FFF] text-white py-2" >
                                <Image
                                    src="images/add.svg"
                                    alt="Add Icon"
                                    width={20}
                                    height={20}
                                    priority
                                />
                                Add
                            </button>
                            <button
                                className="rounded-2xl w-36 border-[#551FFF] border-[1px] text-[#551FFF] antialiased py-2">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default DinamicFormComponent


export function UpdateButton() {
    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box w-11/12 max-w-4xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="content">
                        <div className="title font-semibold text-2xl">Add name For your chosen field</div>

                        <div className="mt-8 w-[48%]">
                            <div className="w-full">
                                <div className="mb-5">
                                    <label htmlFor="text" className="font-semibold text-base"></label>
                                    <input type="text" name="text" id="text"
                                        className="border text-primary-text sm:text-sm rounded-xl block w-full mt-2 p-3.5 focus:outline-none" />
                                </div>
                            </div>
                        </div>
                        <div className="buttons flex justify-end mt-11 gap-3">
                            <button
                                className="flex items-center justify-center gap-2 rounded-2xl w-36 bg-[#038446] text-white py-2">
                                <Image
                                    src="images/edit.svg"
                                    alt="Add Icon"
                                    width={20}
                                    height={20}
                                    priority
                                />
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
}