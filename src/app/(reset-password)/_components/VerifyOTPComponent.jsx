'use client'

import Link from "next/link";
import styles from "@/app/(reset-password)/style.module.css";
import OtpInput from "react18-input-otp";
import {useState} from "react";
import {useRouter} from "next/navigation";
import { forgetPasswordAction, verifyOtpAction } from "@/actions/auth/forgetPasswordAction";
import { ToastContainer, toast } from "react-toastify";

const VerifyOTPComponent = ({email}) => {
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const [isLoadingResendOTP, setIsloadingResendOTP] = useState(false);

    const handleChange = (enteredOtp) => {
        console.log("enteredOtp", enteredOtp)
        if (!/^\d+$/.test(enteredOtp)) {
            setOtp('');
            setErrorMessage("Please enter only numbers.");
            return;
        }
        setOtp(enteredOtp);
        setErrorMessage('');
    };


    const handleKeyDown = (event) => {
        if (event.key === 'Backspace') {
            event.preventDefault();
            setOtp(prev => prev.slice(0, -1));// Remove the last character
            const prevInput = event.target.previousElementSibling;
            if (prevInput) {
                prevInput.focus();
            }
        }
    }

    const router = useRouter();

    async function handleSubmit(){
        setIsloading(true);
        const response = await verifyOtpAction(email, otp);
        setIsloading(false);
        if(response.status === 'OK'){
            router.push(`/set-new-password?email=${email}&otp=${otp}`)
        }
        else{
            error(response.detail);
        }
    }

    function error(message){
        toast.error(message, {
            position: "top-center"
          });
    };

    function successSendingOTP(message){
        toast.success(message, {
            position: "top-center"
          });
    }

    async function handleResendOtp(){
        setIsloadingResendOTP(true);
        const response = await forgetPasswordAction(email);
        setIsloadingResendOTP(false);
        if(response.status === 'CREATED'){
            successSendingOTP(response.message);
        }
        else{
            error(response.detail);
        }
    }

    return (
        <div className="absolute flex justify-center sm:pt-[200px] md:pl-[30%] lg:pl-0 lg:pt-[330px] w-full md:w-[70%] lg:w-[39%] lg:left-[30%] h-[100%]">
            <ToastContainer autoClose={2000}/>
            <form className="mt-[235px] lg:mt-[20px] 2xl:mt-[100px]">
                <div className="lg:mt-[-100px] text-md mt-3 mb-8">
                    <h2 className=" text-center text-[20px] md:text-3xl leading-9 font-extrabold text-purple-text-head flex justify-center">
                        Enter 4 Digits Code
                    </h2>
                    <p className="flex justify-center greyUi mt-4">Enter the 4 digits code that received your email.</p>
                </div>

                <div className="pr-[4px]">
                    <OtpInput 
                        inputStyle={styles.inputStyle}
                        value={otp}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        numInputs={4}
                    />
                </div>

                {errorMessage && <p className="text-red-600 mt-3 ml-4">{errorMessage}</p>}
                <div className="flex justify-center pr-[8px] sm:mt-7 lg:mt-0">
                    <button
                        onClick={handleSubmit}
                        type="button"
                        id="continue"
                        className={`flex justify-center w-[320px] sm:w-full bg-purple-text text-white font-medium text-sm rounded-3xl px-[165px] py-3.5 mt-10 ml-2 shadow-md shadow-violet-400 ${otp.length !== 4 ? "opacity-50 cursor-not-allowed" : "hover:bg-violet-500"}`}
                        disabled={otp.length !== 4}
                    >
                        {isLoading ? <div className='loader'></div> : <p>Continue</p> }  
                    </button>
                </div>
                
                    <div className="mb-2 mr-6 cursor-pointer flex justify-end text-blueUi mt-3">
                        <div onClick={handleResendOtp}>
                        {isLoadingResendOTP ? <div className="flex gap-2">OTP is Sending <p className='loader_purple'></p> </div> : <span>Resend OTP</span> } 
                        </div>
                    </div>
            </form>


        </div>
    )
}
export default VerifyOTPComponent