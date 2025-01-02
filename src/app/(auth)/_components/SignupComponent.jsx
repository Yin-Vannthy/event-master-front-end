// 'use client';
//
// import {useState} from 'react';
// import {useForm} from 'react-hook-form';
// import Image from 'next/image';
// import {useRouter} from 'next/navigation';
// import Link from 'next/link';
// import {getOrganizationDetails} from "@/services/login-signup/org.service";
// import signupAction from "@/actions/auth/signupAction";
// import {registerUserAction} from "@/actions/auth/registerUserAction";
// import {resendRegisterAction, registerVerifyAction} from "@/actions/auth/registerOtpAction";
//
// const SignupComponent = () => {
//     const initialData = {
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         phoneNumber: '',
//         organizationCode: '',
//     };
//
//     const [isAdminSelected, setIsAdminSelected] = useState(false);
//     const [isLocked, setIsLocked] = useState(true);
//     const [isKeyLocked, setIsKeyLocked] = useState(true);
//     const [orgDetails, setOrgDetails] = useState(null);
//     const [loading, setLoading] = useState(false);
//
//     const {
//         register,
//         handleSubmit,
//         formState: {errors, isValid},
//         watch,
//         reset,
//     } = useForm({
//         mode: 'onChange',
//         defaultValues: initialData,
//     });
//
//     const handleAdminClick = () => {
//         setIsAdminSelected(true);
//         reset(initialData);
//     };
//
//     const handleUserClick = () => {
//         setIsAdminSelected(false);
//         reset(initialData);
//     };
//
//     const handleLockClick = () => setIsLocked((prevState) => !prevState);
//     const handleKeyLockClick = () => setIsKeyLocked((prevState) => !prevState);
//
//     const router = useRouter();
//
//     const onSubmit = async (data) => {
//         setLoading(true);
//
//         if (data.password !== data.confirmPassword) {
//             alert("Passwords do not match. Please try again.");
//             setLoading(false);
//             return;
//         }
//
//         if (data?.organizationCode) {
//             await registerUserAction(data);
//         } else {
//             await signupAction(data);
//         }
//
//         if (!isAdminSelected) {
//             const orgData = await getOrganizationDetails(data.organizationCode);
//             setOrgDetails(orgData);
//
//             const modal = document.getElementById('my_modal_5');
//             if (modal) {
//                 modal.showModal();
//             } else {
//                 console.error('Modal element not found');
//             }
//         } else {
//             router.push('/verify-register');
//         }
//         setLoading(false);
//     };
//
//     return (
//         <div
//             className="w-[75%] h-auto p-8 mt-20 md:w-[55%] xl:left-6 xl:mt-32 xl:mx-[42%] 2xl:mt-[10%]  2xl:left-5 xl:w-[45%] bg-white rounded-[40px] shadow-md absolute">
//             <div className="flex justify-start p-6 pt-12 mx-8 focus:outline-none">
//                 <button
//                     type="button"
//                     id="admin-button"
//                     className={`font-medium text-sm rounded-[100px] px-12 py-3.5 -mr-10 ${isAdminSelected ? 'bg-purple-text text-white z-20' : 'shadow-sm bg-white border border-gray-300 primary-text z-10'}`}
//                     onClick={handleAdminClick}
//                 >
//                     ADMIN
//                 </button>
//                 <button
//                     type="button"
//                     id="user-button"
//                     className={`font-medium text-sm rounded-[100px] px-12 py-3.5 ${!isAdminSelected ? 'bg-purple-text text-white z-20' : 'shadow-sm bg-white border border-gray-300 primary-text z-10'}`}
//                     onClick={handleUserClick}
//                 >
//                     USER
//                 </button>
//             </div>
//             <div className="w-full h-full">
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="grid grid-cols-6 gap-6 px-3">
//                         <div className="col-span-6 md:col-span-3">
//                             <label htmlFor="name" className="text-sm font-medium primary-text block mb-2">
//                                 Full Name <span className="text-red-600 text-sm">*</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 id="name"
//                                 className={`${errors.name ? 'border-red-700 focus:border-red-600' : 'border-gray-300'} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
//                                 placeholder="Enter your full name"
//                                 {...register('name', {
//                                     required: 'Full Name is required',
//                                 })}
//                             />
//                             {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
//                         </div>
//
//                         <div className="col-span-6 md:col-span-3">
//                             <label htmlFor="email" className="text-sm font-medium primary-text block mb-2">
//                                 Email <span className="text-red-600 text-sm">*</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 id="email"
//                                 className={`${errors.email ? 'border-red-700 focus:border-red-600' : 'border-gray-300'} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
//                                 placeholder="Enter your email"
//                                 {...register('email', {
//                                     required: 'Email is required',
//                                     pattern: {
//                                         value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                                         message: 'Enter a valid email address',
//                                     },
//                                 })}
//                             />
//                             {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
//                         </div>
//
//                         <div className="col-span-6 md:col-span-3">
//                             <label htmlFor="password" className="text-sm font-medium primary-text block mb-2">
//                                 Password <span className="text-red-600">*</span>
//                             </label>
//                             <div className={'relative'}>
//                                 <input
//                                     type={isLocked ? 'password' : 'text'}
//                                     id="password"
//                                     className={`${errors.password ? 'border-red-700 focus:border-red-600' : 'border-gray-300'} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
//                                     placeholder="Enter your password"
//                                     {...register('password', {
//                                         required: 'Password is required',
//                                         minLength: {
//                                             value: 8,
//                                             message: 'Password requires at least 8 characters',
//                                         },
//                                     })}
//                                 />
//                                 <div className={'absolute top-4 right-3 cursor-pointer'} onClick={handleLockClick}>
//                                     <Image
//                                         src={`${isLocked ? '/icons/lock-slash.svg' : '/icons/unlock.svg'}`}
//                                         width={20}
//                                         height={20}
//                                         alt={isLocked ? 'lock icon' : 'unlock icon'}
//                                     />
//                                 </div>
//                             </div>
//                             {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
//                         </div>
//
//                         <div className="col-span-6 md:col-span-3">
//                             <label htmlFor="confirm-password" className="text-sm font-medium primary-text block mb-2">
//                                 Confirm Password <span className="text-red-600">*</span>
//                             </label>
//                             <div className={'relative'}>
//                                 <input
//                                     type={isKeyLocked ? 'password' : 'text'}
//                                     id="confirm-password"
//                                     className={`${errors.confirmPassword ? 'border-red-700 focus:border-red-600' : 'border-gray-300'} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
//                                     placeholder="Enter your confirm password"
//                                     {...register('confirmPassword', {
//                                         required: 'Confirm Password is required',
//                                         validate: (value) => value === watch('password') || 'Passwords do not match',
//                                     })}
//                                 />
//                                 <div className={'absolute top-4 right-3 cursor-pointer'} onClick={handleKeyLockClick}>
//                                     <Image
//                                         src={`${isKeyLocked ? '/icons/lock-slash.svg' : '/icons/unlock.svg'}`}
//                                         width={20}
//                                         height={20}
//                                         alt={isKeyLocked ? 'lock icon' : 'unlock icon'}
//                                     />
//                                 </div>
//                             </div>
//                             {errors.confirmPassword && (
//                                 <span className="text-red-600 text-sm">{errors.confirmPassword.message}</span>
//                             )}
//                         </div>
//
//                         {isAdminSelected && (
//                             <div className="col-span-6">
//                                 <label htmlFor="phone-number" className="text-sm font-medium primary-text block mb-2">
//                                     Phone Number <span className="text-red-600 text-sm">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="phone-number"
//                                     className={`${errors.phoneNumber ? 'border-red-700 focus:border-red-600' : 'border-gray-300'} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
//                                     placeholder="Enter your phone number"
//                                     {...register('phoneNumber', {
//                                         required: 'Phone Number is required',
//                                         pattern: {
//                                             value: /^0\d{8,}$/,
//                                             message: 'phone number must be number, start with 0, more than 8 digits',
//                                         },
//                                     })}
//                                 />
//                                 {errors.phoneNumber && (
//                                     <span className="text-red-600 text-sm">{errors.phoneNumber.message}</span>
//                                 )}
//                             </div>
//                         )}
//
//                         {!isAdminSelected && (
//                             <div
//                                 className="w-full col-span-6 flex flex-col h-full gap-6 md:flex-row md:flex-1 xl:justify-between">
//                                 <div className="grid grid-rows-1 w-full">
//                                     <label htmlFor="phone-number"
//                                            className="text-sm font-medium primary-text block mb-2">
//                                         Phone Number <span className="text-red-600 text-sm">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="phone-number"
//                                         className={`${errors.phoneNumber ? 'border-red-700 focus:border-red-600' : 'border-gray-300'} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block xl:w-full p-3.5`}
//                                         placeholder="Enter your phone number"
//                                         {...register('phoneNumber', {
//                                             required: 'Phone Number is required',
//                                         })}
//                                     />
//                                     {errors.phoneNumber && (
//                                         <span className="text-red-600 text-sm">{errors.phoneNumber.message}</span>
//                                     )}
//                                 </div>
//                                 <div className="w-full">
//                                     <label htmlFor="organization-code"
//                                            className="text-sm font-medium primary-text block mb-2 xl:col-span-3">
//                                         Organization Code <span className="text-red-600 text-sm">*</span>
//                                     </label>
//                                     <input
//                                         type="password"
//                                         id="organization-code"
//                                         className={`${errors.organizationCode ? 'border-red-700 focus:border-red-600' : 'border-gray-300'} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
//                                         placeholder="Enter your organization code"
//                                         {...register('organizationCode', {
//                                             required: 'Organization Code is required',
//                                         })}
//                                     />
//                                     {errors.organizationCode && (
//                                         <span className="text-red-600 text-sm">{errors.organizationCode.message}</span>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//
//                     <div className="flex justify-center p-6 pb-6 pt-12 mb-3">
//                         <div>
//                             <button
//                                 type="submit"
//                                 id="sign-up"
//                                 className={`bg-purple-text text-white font-medium text-sm rounded-3xl px-32 py-3.5 hover:bg-violet-500 shadow-md shadow-violet-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                 disabled={loading}
//                             >
//                                 {/*loading*/}
//                                 {loading ? <div className='loader'></div> : "Sign Up" }
//                             </button>
//                             <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
//                                 <div className="modal-box w-[360px] h-[400px]">
//                                     <h3 className="font-bold text-lg text-center">Organization Profile</h3>
//                                     <Image
//                                         className="mx-auto max-w-2xl md:text-center mt-5"
//                                         src={`/images/event-master-logo.png`}
//                                         alt={`logo`}
//                                         width={111}
//                                         height={111}
//                                         property=""
//                                     />
//                                     {orgDetails && (
//                                         <div className="modal-action">
//                                             <div method="dialog" className="w-[350px] m-auto">
//                                                 <div className="flex justify-between">
//                                                     <p className="font-medium text-base w-1/2">Organization Code</p>
//                                                     <p className="font-medium text-base w-1/2 pl-10">{orgDetails.code}</p>
//                                                 </div>
//
//                                                 <div className="flex justify-between mt-2">
//                                                     <p className="font-medium text-base w-1/2">Organization Name</p>
//                                                     <p className="font-medium text-base w-1/2 pl-10">{orgDetails.orgName}</p>
//                                                 </div>
//
//                                                 <div className="flex justify-between mt-2">
//                                                     <p className="font-medium text-base w-1/2">Address</p>
//                                                     <p className="font-medium text-base w-1/2 break-words pl-10">{orgDetails.address}</p>
//                                                 </div>
//
//                                                 <div className="flex justify-between w-[300px] m-auto mb-4 mt-4">
//                                                     <button
//                                                         className="border w-[110px] border-[#344054] h-10 rounded-3xl"
//                                                         onClick={() => document.getElementById('my_modal_5').close()}
//                                                     >
//                                                         <p className="font-semibold">Cancel</p>
//                                                     </button>
//
//                                                     <button className="border w-[110px] bg-[#8C59FE] h-10 rounded-3xl" value="confirm">
//                                                         <Link href={`/verify-register`} className="text-white font-semibold">Confirm</Link>
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </dialog>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };
//
// export default SignupComponent;


'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getOrganizationDetails } from "@/services/login-signup/org.service";
import signupAction from "@/actions/auth/signupAction";
import { registerUserAction } from "@/actions/auth/registerUserAction";
import { resendRegisterAction, registerVerifyAction } from "@/actions/auth/registerOtpAction";

const SignupComponent = () => {
    const initialData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        organizationCode: '',
    };

    const [isAdminSelected, setIsAdminSelected] = useState(false);
    const [isLocked, setIsLocked] = useState(true);
    const [isKeyLocked, setIsKeyLocked] = useState(true);
    const [orgDetails, setOrgDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        reset,
    } = useForm({
        mode: 'onChange',
        defaultValues: initialData,
    });

    const handleAdminClick = () => {
        setIsAdminSelected(true);
        reset(initialData);
    };

    const handleUserClick = () => {
        setIsAdminSelected(false);
        reset(initialData);
    };

    const handleLockClick = () => setIsLocked((prevState) => !prevState);
    const handleKeyLockClick = () => setIsKeyLocked((prevState) => !prevState);

    const router = useRouter();

    const onSubmit = async (data) => {

        setLoading(true);

        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match. Please try again.");
            setLoading(false);
            return;
        }

        if (data?.organizationCode) {
            await registerUserAction(data);
        } else {
            await signupAction(data);
        }

        // Send OTP code
        await resendRegisterAction(data.email);

        if (!isAdminSelected) {
            const orgData = await getOrganizationDetails(data.organizationCode);
            setOrgDetails(orgData);

            const modal = document.getElementById('my_modal_5');
            if (modal) {
                modal.showModal();
            } else {
                console.error('Modal element not found');
            }
        } else {
            router.push(`/verify-register/?email=${data.email}`);
        }
        setLoading(false);
    };

    return (
        <div className="w-[75%] h-auto p-8 mt-20 md:w-[55%] xl:left-6 xl:mt-32 xl:mx-[42%] 2xl:mt-[10%]  2xl:left-5 xl:w-[45%] bg-white rounded-[40px] shadow-md absolute">
            <div className="flex justify-start p-6 pt-12 mx-8 focus:outline-none">
                <button
                    type="button"
                    id="admin-button"
                    className={`font-medium text-sm rounded-[100px] px-12 py-3.5 -mr-10 ${isAdminSelected ? 'bg-purple-text text-white z-20' : 'shadow-sm bg-white border border-gray-300 primary-text z-10'}`}
                    onClick={handleAdminClick}
                >
                    ADMIN
                </button>
                <button
                    type="button"
                    id="user-button"
                    className={`font-medium text-sm rounded-[100px] px-12 py-3.5 ${!isAdminSelected ? 'bg-purple-text text-white z-20' : 'shadow-sm bg-white border border-gray-300 primary-text z-10'}`}
                    onClick={handleUserClick}
                >
                    USER
                </button>
            </div>
            <div className="w-full h-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-6 gap-6 px-3">
                        <div className="col-span-6 md:col-span-3">
                            <label htmlFor="name" className="text-sm font-medium primary-text block mb-2">
                                Full Name <span className="text-red-600 text-sm">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                className={`${errors.name ? 'border-red-700 focus:border-red-600' : 'border-gray-300'} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
                                placeholder="Enter your full name"
                                {...register('name', {
                                    required: 'Full Name is required',
                                })}
                            />
                            {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
                        </div>

                        <div className="col-span-6 md:col-span-3">
                            <label htmlFor="email" className="text-sm font-medium primary-text block mb-2">
                                Email <span className="text-red-600 text-sm">*</span>
                            </label>
                            <input
                                type="text"
                                id="email"
                                className={`${errors.email ? 'border-red-700 focus:border-red-600' : 'border-gray-300'} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
                                placeholder="Enter your email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Enter a valid email address',
                                    },
                                })}
                            />
                            {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
                        </div>

                        <div className="col-span-6 md:col-span-3">
                            <label htmlFor="password" className="text-sm font-medium primary-text block mb-2">
                                Password <span className="text-red-600">*</span>
                            </label>
                            <div className={'relative'}>
                                <input
                                    type={isLocked ? 'password' : 'text'}
                                    id="password"
                                    className={`${errors.password ? 'border-red-700 focus:border-red-600' : 'border-gray-300'} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
                                    placeholder="Enter your password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password requires at least 8 characters',
                                        },
                                    })}
                                />
                                <div className={'absolute top-4 right-3 cursor-pointer'} onClick={handleLockClick}>
                                    <Image
                                        src={`${isLocked ? '/icons/lock-slash.svg' : '/icons/unlock.svg'}`}
                                        width={20}
                                        height={20}
                                        alt={isLocked ? 'lock icon' : 'unlock icon'}
                                    />
                                </div>
                            </div>
                            {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
                        </div>

                        <div className="col-span-6 md:col-span-3">
                            <label htmlFor="confirm-password" className="text-sm font-medium primary-text block mb-2">
                                Confirm Password <span className="text-red-600">*</span>
                            </label>
                            <div className={'relative'}>
                                <input
                                    type={isKeyLocked ? 'password' : 'text'}
                                    id="confirm-password"
                                    className={`${errors.confirmPassword ? 'border-red-700 focus:border-red-600' : 'border-gray-300'} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
                                    placeholder="Enter your confirm password"
                                    {...register('confirmPassword', {
                                        required: 'Confirm Password is required',
                                        validate: (value) => value === watch('password') || 'Passwords do not match',
                                    })}
                                />
                                <div className={'absolute top-4 right-3 cursor-pointer'} onClick={handleKeyLockClick}>
                                    <Image
                                        src={`${isKeyLocked ? '/icons/lock-slash.svg' : '/icons/unlock.svg'}`}
                                        width={20}
                                        height={20}
                                        alt={isKeyLocked ? 'lock icon' : 'unlock icon'}
                                    />
                                </div>
                            </div>
                            {errors.confirmPassword && (
                                <span className="text-red-600 text-sm">{errors.confirmPassword.message}</span>
                            )}
                        </div>

                        {isAdminSelected && (
                            <div className="col-span-6">
                                <label htmlFor="phone-number" className="text-sm font-medium primary-text block mb-2">
                                    Phone Number <span className="text-red-600 text-sm">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="phone-number"
                                    className={`${errors.phoneNumber ? 'border-red-700 focus:border-red-600' : 'border-gray-300'} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
                                    placeholder="Enter your phone number"
                                    {...register('phoneNumber', {
                                        required: 'Phone Number is required',
                                        pattern: {
                                            value: /^0\d{8,}$/,
                                            message: 'phone number must be number, start with 0, more than 8 digits',
                                        },
                                    })}
                                />
                                {errors.phoneNumber && (
                                    <span className="text-red-600 text-sm">{errors.phoneNumber.message}</span>
                                )}
                            </div>
                        )}

                        {!isAdminSelected && (
                            <div className="w-full col-span-6 flex flex-col h-full gap-6 md:flex-row md:flex-1 xl:justify-between">
                                <div className="grid grid-rows-1 w-full">
                                    <label htmlFor="phone-number"
                                           className="text-sm font-medium primary-text block mb-2">
                                        Phone Number <span className="text-red-600 text-sm">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="phone-number"
                                        className={`${errors.phoneNumber ? 'border-red-700 focus:border-red-600' : 'border-gray-300'} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block xl:w-full p-3.5`}
                                        placeholder="Enter your phone number"
                                        {...register('phoneNumber', {
                                            required: 'Phone Number is required',
                                        })}
                                    />
                                    {errors.phoneNumber && (
                                        <span className="text-red-600 text-sm">{errors.phoneNumber.message}</span>
                                    )}
                                </div>
                                <div className="w-full">
                                    <label htmlFor="organization-code" className="text-sm font-medium primary-text block mb-2 xl:col-span-3">
                                        Organization Code <span className="text-red-600 text-sm">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="organization-code"
                                        className={`${errors.organizationCode ? 'border-red-700 focus:border-red-600' : 'border-gray-300'} shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
                                        placeholder="Enter your organization code"
                                        {...register('organizationCode', {
                                            required: 'Organization Code is required',
                                        })}
                                    />
                                    {errors.organizationCode && (
                                        <span className="text-red-600 text-sm">{errors.organizationCode.message}</span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center p-6 pb-6 pt-12 mb-3">
                        <div>
                            <button
                                type="submit"
                                id="sign-up"
                                className={`bg-purple-text text-white font-medium text-sm rounded-3xl px-32 py-3.5 hover:bg-violet-500 shadow-md shadow-violet-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? <div className='loader'></div> : "Sign Up" }
                            </button>
                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box w-[360px] h-[400px]">
                                    <h3 className="font-bold text-lg text-center">Organization Profile</h3>
                                    <Image
                                        className="mx-auto max-w-2xl md:text-center mt-5"
                                        src={`/images/event-master-logo.png`}
                                        alt={`logo`}
                                        width={111}
                                        height={111}
                                        property=""
                                    />
                                    {orgDetails && (
                                        <div className="modal-action">
                                            <div method="dialog" className="w-[350px] m-auto">
                                                <div className="flex justify-between">
                                                    <p className="font-medium text-base w-1/2">Organization Code</p>
                                                    <p className="font-medium text-base w-1/2 pl-10">{orgDetails.code}</p>
                                                </div>

                                                <div className="flex justify-between mt-2">
                                                    <p className="font-medium text-base w-1/2">Organization Name</p>
                                                    <p className="font-medium text-base w-1/2 pl-10">{orgDetails.orgName}</p>
                                                </div>

                                                <div className="flex justify-between mt-2">
                                                    <p className="font-medium text-base w-1/2">Address</p>
                                                    <p className="font-medium text-base w-1/2 break-words pl-10">{orgDetails.address}</p>
                                                </div>

                                                <div className="flex justify-between w-[300px] m-auto mb-4 mt-4">
                                                    <button
                                                        className="border w-[110px] border-[#344054] h-10 rounded-3xl"
                                                        onClick={() => document.getElementById('my_modal_5').close()}
                                                    >
                                                        <p className="font-semibold">Cancel</p>
                                                    </button>

                                                    <button className="border w-[110px] bg-[#8C59FE] h-10 rounded-3xl" value="confirm">
                                                        <Link href={`/verify-register`} className="text-white font-semibold">Confirm</Link>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </dialog>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupComponent;

