"use client";

import { AddSquare } from "iconsax-react"
import Image from "next/image";
import { ToogleBtn } from "./ToogleBtn";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { SelectModify } from "./SelectModify";
import { addNewCategoryAction, addNewEventAction, storeImageAction } from "@/actions/categoryAction";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const CreateEventButton = () => {
    const notify = (status, message) => {
        if (status == "CREATED") {
            toast.success("Sucessfully created event", {
                position: "top-center"
            });
        }
        if (status == 400) {
            toast.error(`Can't create event, please check each field carefully ${message != undefined ? message : ''}`, {
                position: "top-center"
            });
        }
        if (status == 404) {
            toast.error(`Please select category again ${message != undefined ? message : ''}`, {
                position: "top-center"
            });
        }
    }

    const [events, setEvent] = useState({
        eventName: '',
        startDate: '',
        endDate: '',
        duration: '',
        maxAttendee: '',
        address: '',
        description: '',
    })


    const handleInput = (e) => {
        e.persist();
        setEvent({ ...events, [e.target.name]: e.target.value });
    }

    const saveEvents = (e) => {
        e.preventDefault();
        const data = {
            eventName: events.eventName,
            startDate: events.startDate,
            endDate: events.endDate,
            duration: events.duration,
            maxAttendee: events.maxAttendee,
            address: events.address,
            description: events.description,
        }
    }

    const [hide, setHide] = useState(false);
    const [isSend, setIsSend] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add("border-indigo-600");
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove("border-indigo-600");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove("border-indigo-600");
        const file = e.dataTransfer.files[0];
        displayPreview(file);
        setHide(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageLink(e.target.files[0]);
        displayPreview(file);
        setHide(true);
    };

    const displayPreview = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const preview = document.getElementById("preview");
            preview.src = reader.result;
            preview.classList.remove("hidden");
        };
    };

    const {
        watch,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const start = watch("startDate");

    const [eventCategory, setEventCategory] = useState();
    const [isPublic, setIsPublic] = useState(false);
    const [imageLink, setImageLink] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [diffChange, setDiffChange] = useState();
    const [random, setRandom] = useState(false);

    const triggerHourChange = () => {
        const sDate = new Date(`${startDate}`);
        const eDate = new Date(`${endDate}`);
        const timeDiff = eDate - sDate;
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        const roundedDiff = Math.round(hoursDiff * 100) / 100;
        setDiffChange(Number(roundedDiff));
    };

    const handleCategorySelect = (v) => setEventCategory(v)

    const handleEventType = (type) => setIsPublic(!type)

    const currentTime = new Date();

    //firebase research code
    const [uploading, setUploading] = useState(true);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadedImage, setUploadedImage] = useState();

    const onUpdate = async (imageLink) => {
        //upload new image
        onUpload(imageLink)
        //delete old image with url
        const desertRef = ref(storage, imageUrl);
        await deleteObject(desertRef);
    }

    const onSubmit = async (data) => {
        setIsSend(true);
        let cateId;
        //if category id = 88888 create new category base on categoryName
        console.log(eventCategory, 'checking event from select')
        if (eventCategory.categoryId == 88888) {
            const res = await addNewCategoryAction(eventCategory.categoryName)
            cateId = res.payload.categoryId;
        }
        //if category id isn't = 88888 calling api 
        if (eventCategory.categoryId != 88888) {
            cateId = eventCategory.categoryId;
        }

        let formData = new FormData()
        formData.append("file", imageLink)
        const uploadImage = await storeImageAction(formData)

        //firebase
        // setUploading(false)
        // if (imageLink == null) return;
        // const imageRef = ref(storage, `${imageLink.name + v4()}`);
        // await uploadBytes(imageRef, imageLink)
        // setUploading(true)
        // const url = await getDownloadURL(imageRef);
        // setUploadedImage(url);
        //firebase

        const submitData = {
            eventName: data.name,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            duration: diffChange,
            address: data.address,
            poster: uploadImage?.payload?.fileUrl,
            isPost: isPublic,
            maxAttendee: data.maxAttendee,
            categoryId: cateId
        }
        console.log('cheeck body', submitData)
        const okay = await addNewEventAction(submitData);
        console.log('create event', okay)
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSend(false);
        notify(okay?.status, okay?.Errors?.description || okay?.Errors?.poster);
        document.getElementById("my_modal_event_create").close()
        setStartDate('')
        setEndDate('')
        setHide(false)
        preview.src = ""
        preview.classList.add("hidden")
        reset();
        setRandom(!random);
    };

    const handleCloseForm = () => {
        setEvent({
            eventName: '',
            startDate: '',
            endDate: '',
            duration: '',
            maxAttendee: '',
            address: '',
            description: '',
        });
        document.getElementById("my_modal_event_create").close();
    }

    useEffect(() => {
        triggerHourChange();
    }, [startDate, endDate, random]);


    return (
        <>
            <div onClick={() => document.getElementById('my_modal_event_create').showModal()} className="cursor-pointer lg:flex items-center bg-[#F7F9FB] gap-2 py-3 px-3 lg:px-6 rounded-full">
                <AddSquare size="24" color="#344054" variant="Bold" />
                <p className="text-sm hidden lg:block">New Event</p>
            </div>
            <dialog id="my_modal_event_create" className="modal !m-0">
                <div className="modal-box w-11/12 lg:w-1/2 lg:max-w-5xl p-8">
                    <div className="flex justify-between">
                        <h3 className="font-bold text-xl">Create Event</h3>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                    </div>
                    <div className="modal-action">
                        <form action="" className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="w-full relative border-2 border-gray-300 border-dashed rounded-lg p-8" id="dropzone"
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}>
                                <input {...register("image")} accept="image/png,image/jpeg" type="file" className="absolute inset-0 w-full h-full opacity-0 z-50" id="file-upload" onChange={(e) => handleFileChange(e)} />
                                <div className={`text-center ${hide && 'hidden'}`}>
                                    <Image src={'/icons/upload-icon.svg'} className="mx-auto h-16 w-16" height={48} width={48} />
                                    <h3 className="mt-2 text-lg font-medium">
                                        <label htmlFor="file-upload" className="relative cursor-pointer">
                                            <span className="text-purple-text">Upload</span>
                                            <span className="text-[#8790A0]"> or drag and drop files here</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                    </h3>
                                </div>
                                <img src="" className="mx-auto h-80 w-full hidden object-cover" id="preview" alt="Preview" />
                            </div>

                            {/* input field  */}
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="w-full">
                                    <label htmlFor="password" className="text-sm font-medium primary-text block mb-2">
                                        Event Name <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        {...register("name", {
                                            required: "name is required",
                                        })}
                                        type="text"
                                        name="name"
                                        id="name"
                                        className={`${errors.name ? "border-red-700 focus:border-red-600" : "border-gray-300"} shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5`}
                                        placeholder="Enter event name"
                                    />
                                    {errors.name && <div className="text-red-600 text-sm mt-2">{errors.name.message}</div>}
                                </div>
                                <div className="w-full">
                                    <SelectModify
                                        func={handleCategorySelect}
                                        more={random}
                                        {...register("category")}
                                        label={`!font-medium`}
                                        height={`!rounded-borderUi !h-[49.82px] !rounded-2xl shadow-sm bg-white !ring-gray-300 !border-gray-300 primary-text sm:text-sm focus:outline-none !focus:border-purple-text block w-full p-3.5`}
                                    />
                                    {errors.category && <span className="text-red-600 text-sm">{errors.category.message}</span>}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="w-full">
                                    <label htmlFor="password" className="text-sm font-medium primary-text block mb-2">
                                        Start Date Time <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        {...register("startDate", {
                                            required: "start date is required",
                                            validate: {
                                                isNotPastDate: value => new Date(value) >= currentTime || "Start date cannot be in the past"
                                            }
                                        })}
                                        value={startDate}
                                        // onChange={handleInput}
                                        type="datetime-local"
                                        name="startDate"
                                        id="startdate"
                                        className={`${errors.startDate ? "border-red-700 focus:border-red-600" : "border-gray-300"} shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5`}
                                        placeholder="MM/DD/YYYY 6:00 AM"
                                        required=""
                                        onChange={(e) => { setStartDate(e.target.value); triggerHourChange() }}
                                    />
                                    {errors.startDate && <div className="text-red-600 text-sm mt-2">{errors.startDate.message}</div>}
                                </div>
                                <div className="w-full">
                                    <label htmlFor="password" className="text-sm font-medium primary-text block mb-2">
                                        End Date Time <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        {...register("endDate", {
                                            required: "end date is required",
                                            validate: (v) => {
                                                if (v < start) {
                                                    return "end date isn't valid to create event";
                                                }
                                            }
                                        })}
                                        value={endDate}
                                        // onChange={handleInput}
                                        type="datetime-local"
                                        name="endDate"
                                        id="enddate"
                                        className={`${errors.endDate ? "border-red-700 focus:border-red-600" : "border-gray-300"} shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5`}
                                        placeholder="MM/DD/YYYY 6:00 AM"
                                        required=""
                                        onChange={(e) => { setEndDate(e.target.value); triggerHourChange() }}
                                    />
                                    {errors.endDate && <div className="text-red-600 text-sm mt-2">{errors.endDate.message}</div>}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="w-full">
                                    <label htmlFor="password" className="text-sm font-medium primary-text block mb-2">
                                        Duration <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        value={diffChange}
                                        disabled
                                        // {...register("duration", {
                                        //     required: "duration is required",
                                        // })}
                                        type="number"
                                        name="duration"
                                        id="duration"
                                        className={`${errors.duration ? "border-red-700 focus:border-red-600" : "border-gray-300"} cursor-not-allowed shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5`}
                                        placeholder="Duration in hours"
                                        required=""
                                    />
                                    {errors.duration && <div className="text-red-600 text-sm mt-2">{errors.duration.message}</div>}
                                </div>
                                <div className="w-full">
                                    <label htmlFor="password" className="text-sm font-medium primary-text block mb-2">
                                        Maximum Attendee <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        {...register("maxAttendee", {
                                            required: "maximum attendees is required",
                                        })}
                                        type="number"
                                        name="maxAttendee"
                                        id="max"
                                        className={`${errors.maxAttendee ? "border-red-700 focus:border-red-600" : "border-gray-300"} shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5`}
                                        placeholder="Enter maximum attendee"
                                        required=""
                                    />
                                    {errors.maxAttendee && <div className="text-red-600 text-sm mt-2">{errors.maxAttendee.message}</div>}
                                </div>
                            </div>
                            <div className="flex gap-8">
                                <div className="w-full">
                                    <label htmlFor="password" className="text-sm font-medium primary-text block mb-2">
                                        Address <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        {...register("address", {
                                            required: "address is required",
                                        })}
                                        type="test"
                                        name="address"
                                        id="address"
                                        className={`${errors.address ? "border-red-700 focus:border-red-600" : "border-gray-300"} shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5`}
                                        placeholder="Enter address"
                                        required=""
                                    />
                                    {errors.address && <div className="text-red-600 text-sm mt-2">{errors.address.message}</div>}
                                </div>
                            </div>
                            <div className="flex gap-8">
                                <div className="w-full">
                                    <label htmlFor="password" className="text-sm font-medium primary-text block mb-2">
                                        Description <span className="text-red-600">*</span>
                                    </label>
                                    <textarea
                                        {...register("description", {
                                            required: "description is required",
                                        })}
                                        rows={5}
                                        type="text"
                                        name="description"
                                        id="description"
                                        className={`${errors.description ? "border-red-700 focus:border-red-600" : "border-gray-300"} shadow-sm bg-white border greyUi primary-text sm:text-sm focus:outline-none focus:border-purple-text rounded-2xl block w-full p-3.5`}
                                        placeholder="Enter description..."
                                        required=""
                                    />
                                    {errors.description && <div className="text-red-600 text-sm mt-2">{errors.description.message}</div>}
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <p>Create this event as :</p>
                                <div>
                                    <ToogleBtn func={handleEventType} />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <div onClick={() => handleCloseForm()} className="px-6 py-3 rounded-2xl border-1px border-borderUi cursor-pointer">Cancel</div>
                                <button type="submit" className="min-w-32 save border rounded-2xl bg-purple-text text-white flex justify-center text-center items-center px-4 gap-3 ">
                                    {!isSend ?
                                        <div className="flex justify-center items-center gap-3">
                                            <AddSquare size="20" color="#FFFFFF" variant="Bold" />
                                            <span className="h-12 text-white flex justify-center items-center">Create</span>
                                        </div>
                                        :
                                        <div className="loader"></div>
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </dialog >
        </>
    )
}