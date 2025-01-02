'use client'
import React, { useRef, useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import styles from "./MyComponent.module.css"
import { LiaUserEditSolid } from "react-icons/lia";
import { useSession } from "next-auth/react"
import { jwtDecode } from "jwt-decode"


// import { CiLock } from "react-icons/ci";
function FormComponent({ className, getAllMember }) {
  console.log("Get all member in prop", getAllMember)

  const ref = useRef();
  const [isLock, setLocked] = useState(true);
  const [isChange, setChange] = useState(true);

  const [profileImage, setProfileImage] = useState("/images/Avatar.png");
  const [userName, setUserName] = useState(getAllMember.memberName);
  const [address, setAddress] = useState(getAllMember.address)
  const [email, setEmail] = useState(getAllMember.email);
  const [password, setPassword] = useState("")
  const [phone, setPhoneNumber] = useState(getAllMember.phone);

  const { data: session, status } = useSession();
  let userInfo;

  if (status === 'authenticated' && session?.user?.token) {
    userInfo = jwtDecode(session.user.token);
  }
  const userRole = userInfo?.role
  console.log("User role: ", userRole)

  const displayRole = (userRole) => {
    if (userRole == "ROLE_ADMIN") {
      return "Admin"
    }
    else if (userRole == "ROLE_USER") {
      return "User"
    }
    else {
      return "Unknow"
    }
  }

  const handleSaveChange = async () => {
    const memberData = {
      memberName: userName,
      address: address,
      logo: profileImage,
      email: email,
      phoneNumber: phone,
      password: password
    };
    try {
      const updatedMember = await updateProfileMemberById(getAllMember.memberId, memberData); // Assuming getAllMember.id is the member ID
      console.log("Updated member data:", updatedMember);
      setLocked(true);
    } catch (errors) {
      console.error(errors);
    }

  }

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const toggleShowPassword = (field) => {
    setShowPasswords((prevState) => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  const lock = () => {
    setLocked(!isLock)
  }

  const change = () => {
    setChange(!isChange)
  }

  function handleUpdateClick() {
    setLocked(!isLock)
  }

  const initialData = {
    name: getAllMember.memberName,
    gender: getAllMember.gender || "other",
    email: getAllMember.email,
    date: getAllMember.dateOfBirth,
    phoneNumber: getAllMember.phone,
    address: getAllMember.address,
    currentPassword: "1234",
    newPassword: "12345678",
    confirmPassword: "12345678"
  };

  const {
    register, handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    defaultValues: initialData
  });

  const onSubmit = (data) => {
    // setLocked(isLock);
    console.log("checking submit", data);
    const upperData = {
      memberName: "",
      gender: "",
      phone: "",
      address: "",
      picture: "",
      dateOfBirth: ""
    }

    const belowData = {
      oldPassword: "",
      password: "",
      confirmPassword: ""
    }

    if (isChange) {
      //call api and pass upperData object to api body
      // http://34.124.203.109:8081/api/profiles/update-member/56
    }

    if (!isChange) {
      //call 2 api and pass upperData and belowData object to each api body
      // http://34.124.203.109:8081/api/profiles/update-member/56 for upperData
      // http://34.124.203.109:8081/api/profiles/change-password for belowData
    }

    // handleSaveChange()
    // reset();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <>
      <form action="#" className='mx-auto mt-5 w-[92%] z-20' ref={ref} method="post" onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">

        <div className={`flex justify-between ${styles.container}`}>
          {/* Profile  */}
          <div className={`profile w-[20%] ${styles.profile}`}>
            <div className={`rounded-full sm:mt-10  mx-auto min-w-[80px] max-w-[150px] relative`}>
              <img src={profileImage} alt="logo" className='rounded-full' id="picture" />
              <label htmlFor="image-upload" className={`${styles.icon} absolute top-28 right-3 w-8 h-8 bg-slate-100  rounded-full flex justify-center items-center p-1 duration-300 hover:bg-slate-200 cursor-pointer`}>
                <LiaUserEditSolid className="w-7 h-7 text-gray-700" />
                <input type="file" id="image-upload" className='hidden' onChange={handleImageUpload} />
              </label>
            </div>
            <div className='mt-2 mx-auto mx-w-[100px] flex flex-col items-center'>
              <h1 className='text-slate-400 font-semibold'>{getAllMember.memberName}</h1>
              <p className='underline font-semibold'>{displayRole(userRole)}</p>
            </div>
            {/* <PictureComponent/> */}
          </div>

          {/* Form */}

          <div className='w-[75%]'>
            <div className='grid md:grid-cols-2 gap-2 gap-x-6 w-full sm:grid-cols-1'>

              <div className="w-full mb-2 group flex flex-col">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name <span className='text-red-500'>*</span></label>
                <input type="text" id="name" name='name' className={`${errors.name ? "border-red-700 focus:border-red-600" : "border-gray-300"} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
                  placeholder="Enter your name" onChange={(e) => setUserName(e.target.value)} value={userName}
                  disabled={isLock}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
              </div>

              <div className="w-full mb-2 group">
                <label htmlFor="gender" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Gender <span className='text-red-500'>*</span></label>
                <div className='relative'>
                  <select className={`${errors.gender ? "border-red-700 focus:border-red-600" : "border-gray-300"} border-gray-300"} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`} id='gender' disabled={isLock}
                    {...register('gender',
                      {
                        required: 'Gender is required'
                      })}>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other" selected>Other</option>
                  </select>
                </div>
                {errors.gender && <span className='text-red-500 text-sm'>{errors.gender.message}</span>}
              </div>

              <div className="w-full mb-2 group flex flex-col">
                <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email <span className='text-red-500'>*</span></label>
                <div className="relative">
                  <input type="email" id="email" name='email' className={`${errors.email ? "border-red-700 focus:border-red-600" : "border-gray-300"} border-gray-300"} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
                    placeholder="Enter your email" disabled={isLock} value={getAllMember.email}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Enter a valid email address"
                      }
                    })} />
                  {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
                </div>
              </div>

              <div className="w-full mb-2 group flex flex-col">
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date <span className='text-red-500'>*</span></label>
                <input type="date" id="date" name='date' className={`${errors.date ? "border-red-700 focus:border-red-600" : "border-gray-300"} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
                  disabled={isLock} value={getAllMember.dateOfBirth}
                  {...register('date', { required: 'Date is required' })}
                />
                {errors.date && <span className='text-red-500 text-sm'>{errors.date.message}</span>}
              </div>

              <div className="w-full mb-2 group flex flex-col">
                <label htmlFor="phone" className='mb-1 text-sm font-medium'>Phone Number <span className='text-red-500'>*</span></label>
                <input type="text" placeholder="Phone number" name='phone' className={`${errors.phoneNumber ? "border-red-700 focus:border-red-600" : "border-gray-300"} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`} id='phone'
                  disabled={isLock} value={getAllMember.phone}
                  {...register('phoneNumber', {
                    required: 'Phone number is required',
                    minLength: {
                      value: 9,
                      message: "Phone Number requires at least 8 characters"
                    }
                  }
                  )}
                />
                {errors.phoneNumber && <span className='text-red-500 text-sm'>{errors.phoneNumber.message}</span>}
              </div>

              <div className="w-full mb-2 group flex flex-col">
                <label htmlFor="address" className='mb-1 text-sm font-medium'>Address <span className='text-red-500'>*</span></label>
                <input type="text" placeholder="" name='address' className={`${errors.address ? "border-red-700 focus:border-red-600" : "border-gray-300"} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`} id='address'
                  disabled={isLock} value={getAllMember.address}
                  {...register('address', { required: 'Address is required' })}
                />
                {errors.address && <span className='text-red-500 text-sm'>{errors.address.message}</span>}
              </div>
            </div>


            {/* below is password section */}
            {/* Change Password Fields */}
            <div className='change-field'>
              <div className='block mb-5 mt-4'>
                <button type='button' className='btn bg-purple text-white rounded-3xl hover:bg-purple-text-head' onClick={change}>
                  Change Password
                </button>
              </div>
            </div>

            <div className="w-full mb-5 group flex flex-col">
              <label htmlFor="current-password" className={`${isChange ? 'opacity-35' : 'opacity-100'} duration-150 mb-1 text-sm font-medium`}>Current Password <span className='text-red-500'>*</span></label>
              <div className='relative'>
                <input type={showPasswords.currentPassword ? "text" : "password"} className={`${isChange ? 'opacity-35' : 'opacity-100'} duration-150 ${errors.currentPassword ? "border-red-700 focus:border-red-600" : "border-gray-300"} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`} placeholder="Enter your current password" id='current-password'
                  disabled={isChange}
                  {...register('currentPassword', { required: 'Current password is required' })}
                />
                <div className={"absolute top-4 right-3 cursor-pointer"} onClick={() => toggleShowPassword("currentPassword")}>
                  {showPasswords.currentPassword ? <CiUnlock /> : <CiLock />}
                </div>
              </div>
              {errors.currentPassword && <span className='text-red-500 text-sm'>{errors.currentPassword.message}</span>}
            </div>

            <div className="w-full mb-5 group flex flex-col">
              <label htmlFor="new-password" className={`${isChange ? 'opacity-35' : 'opacity-100'} duration-150 mb-1 text-sm font-medium`}>New Password <span className='text-red-500'>*</span></label>
              <div className='relative'>
                <input type={showPasswords.newPassword ? "text" : "password"} className={`${isChange ? 'opacity-35' : 'opacity-100'} duration-150 ${errors.newPassword ? "border-red-700 focus:border-red-600" : "border-gray-300"} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
                  placeholder="Enter your new password" disabled={isChange}
                  {...register('newPassword', { required: 'New password is required' })}
                />
                <div className={"absolute top-4 right-3 cursor-pointer"} onClick={() => toggleShowPassword("newPassword")}>
                  {showPasswords.newPassword ? <CiUnlock /> : <CiLock />}
                </div>
              </div>
              {errors.newPassword && <span className='text-red-500 text-sm'>{errors.newPassword.message}</span>}
            </div>

            <div className="w-full md:mb-10 group flex flex-col">
              <label htmlFor="confirm-password" className={`${isChange ? 'opacity-35' : 'opacity-100'} duration-150 mb-1 text-sm font-medium`}>Confirm Password <span className='text-red-500'>*</span></label>
              <div className='relative'>
                <input type={showPasswords.confirmPassword ? "text" : "password"} className={`${isChange ? 'opacity-35' : 'opacity-100'} duration-150 ${errors.confirmPassword ? "border-red-700 focus:border-red-600" : "border-gray-300"} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`} placeholder="Confirm your new password" id='confirm-password'
                  disabled={isChange}
                  {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    validate: (value) => value === watch('newPassword') || 'Passwords do not match'
                  })}
                />
                <div className={"absolute top-4 right-3 cursor-pointer"} onClick={() => toggleShowPassword("confirmPassword")}>
                  {showPasswords.confirmPassword ? <CiUnlock /> : <CiLock />}
                </div>
              </div>
              {errors.confirmPassword && <span className='text-red-500 text-sm'>{errors.confirmPassword.message}</span>}
            </div>

            <div className='flex justify-end my-3 w-full'>
              {isLock ? (
                <>
                  <button type='submit' className='btn btn-success text-white flex items-center rounded-2xl text-lg sm:text-sm w-40 lg:w-32 lg:text-base ' onClick={handleUpdateClick}>
                    <FiEdit />Edit
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-outline border-solid border-1 border-primary-text text-lg w-40 lg:w-32 lg:text-base rounded-2xl" onClick={lock}>
                    Cancel
                  </button>
                  <button className="btn btn-primary text-white w-40 text-lg lg:w-32 lg:text-base ml-5 rounded-2xl" type='submit'>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.69 2H8.31C4.67 2 2.5 4.17 2.5 7.81V16.18C2.5 19.83 4.67 22 8.31 22H16.68C20.32 22 22.49 19.83 22.49 16.19V7.81C22.5 4.17 20.33 2 16.69 2ZM16.5 12.75H13.25V16C13.25 16.41 12.91 16.75 12.5 16.75C12.09 16.75 11.75 16.41 11.75 16V12.75H8.5C8.09 12.75 7.75 12.41 7.75 12C7.75 11.59 8.09 11.25 8.5 11.25H11.75V8C11.75 7.59 12.09 7.25 12.5 7.25C12.91 7.25 13.25 7.59 13.25 8V11.25H16.5C16.91 11.25 17.25 11.59 17.25 12C17.25 12.41 16.91 12.75 16.5 12.75Z" fill="white" />
                    </svg>
                    Save
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default FormComponent