'use client'

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import { forgetPasswordAction } from "@/actions/auth/forgetPasswordAction";
import { useState } from 'react';

const ForgotPasswordComponent = () => {

    const [isLoading, setIsloading] = useState(false);

    const initialData = {
        email: "",
    };

    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: initialData,
        mode: "onChange"
    });

    const router = useRouter();

    const onSubmit = async (data) => {
        setIsloading(true);
        const response = await forgetPasswordAction(data.email);
        setIsloading(false);
        if(response.status === 'CREATED'){
            router.push(`/verify-otp?email=${data.email}`)   
        }
        else{
            error(response.detail);
        }
        
    };

    function error(message){
        toast.error(message, {
            position: "top-center"
          });
    };

    return (
        <div className="absolute flex justify-center sm:pt-[200px] sm:pl-0 md:pl-[30%] lg:pl-[50%] lg:pt-[350px] w-full md:w-[70%] lg:w-[39%]">
            <ToastContainer autoClose={2000}/>
            <form className='mt-[238px] lg:mt-[20px] 2xl:mt-[50px] ' onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-5">
                
                    <h2 className="text-[20px] flex justify-center lg:mt-[-100px] mt-[10px] md:mt-6  text-center md:text-3xl leading-9 font-extrabold text-purple-text-head">
                        Forgot Password?
                    </h2>
                    <p className="flex justify-center greyUi mt-2 md:mt-6">Please enter your email to reset password</p>
                </div>

                <div className="lg:mt-[-1px] mt-6 sm:mt-16 2xl:mt-[40px]">
                    <label htmlFor="email" className="text-sm font-medium primary-text block mb-2">Email</label>
                    <div>
                        <input
                            type="text"
                            id="email"
                            className={`${errors.email ? "border-red-700 focus:border-red-600" : "border-gray-300"} w-full sm:w-[500px] shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block  p-3`}
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Enter a valid email address"
                                }
                            })}
                        />
                    </div>
                    {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
                </div>

                <div className="flex justify-center mt-10">
                    <button
                        id="continue"
                        className={`flex justify-center w-full bg-purple-text text-white font-medium text-sm rounded-3xl  py-3.5 shadow-md shadow-violet-400 ${!isValid ? "opacity-50 cursor-not-allowed" : "hover:bg-violet-500"}`}
                        disabled={!isValid}
                    >
                        {isLoading ? <div className='loader'></div> : <p>Continue</p> } 
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPasswordComponent;
