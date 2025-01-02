// 'use client'
//
// import Link from "next/link";
// import styles from "@/app/(reset-password)/style.module.css";
// import OtpInput from "react18-input-otp";
// import {useState} from "react";
// import {useRouter} from "next/navigation";
//
// const VerifyRegisterComponent = () => {
//
//     const [rgotp, setRgotp] = useState('');
//     const [errorMessage, setErrorMessage] = useState(null);
//
//     const handleChange = (enteredOtp) => {
//         setRgotp('');
//         if (!/^\d+$/.test(enteredOtp)) {
//             setErrorMessage("Please enter only numbers.");
//             return;
//         }
//         setRgotp(enteredOtp);
//         setErrorMessage('');
//     };
//
//     const router = useRouter();
//
//     return (
//         <div className="absolute mx-[29%] mt-[14%] left-[9.5%]">
//             <form>
//                 <div className="mt-5 mb-12">
//                     <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-purple-text-head flex justify-center">
//                         Enter 4 Digits Code
//                     </h2>
//                     <p className="flex justify-center greyUi mt-6">Enter the 4 digits code that received your email.</p>
//                 </div>
//
//                 <OtpInput inputStyle={styles.inputStyle}
//                           value={rgotp}
//                           onChange={handleChange}
//                           numInputs={4}
//                 />
//
//                 {errorMessage && <p className="text-red-600 mt-3 ml-4">{errorMessage}</p>}
//
//                 <button
//                     onClick={() => router.push('/login')}
//                     type="button"
//                     id="continue"
//                     className={`bg-purple-text text-white font-medium text-sm rounded-3xl px-44 py-3.5 mt-12 shadow-md shadow-violet-400 ${rgotp.length !== 4 ? "opacity-50 cursor-not-allowed" : "hover:bg-violet-500"}`}
//                     disabled={rgotp.length !== 4}
//                 >
//                     Continue
//                 </button>
//
//
//                 <Link href={`/verify-register`}>
//                     <p className="flex justify-end text-blueUi mt-5"><u>Resend Code</u>
//                     </p>
//                 </Link>
//             </form>
//
//
//         </div>
//     )
// }
// export default VerifyRegisterComponent
//

// async function handleSubmit(){
//     setIsLoading(true);
//     const response = await registerVerifyAction(email, otp);
//     setIsLoading(false);
//     if(response.status === 'OK'){
//         router.push(`/login`)
//     }
//     else{
//         error(response.detail);
//     }
// }
//
// function error(message){
//     toast.error(message, {
//         position: "top-center"
//     });
// };
//
// function successSendingOTP(message){
//     toast.success(message, {
//         position: "top-center"
//     });
// }
//
// async function handleResendOtp(){
//     setIsLoadingResendOTP(true);
//     const response = await resendRegisterAction(email);
//     setIsLoadingResendOTP(false);
//     if(response.status === 'CREATED'){
//         successSendingOTP(response.message);
//     }
//     else{
//         error(response.detail);
//     }
// }




'use client'

import Link from "next/link";
import styles from "@/app/(reset-password)/style.module.css";
import OtpInput from "react18-input-otp";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {resendRegisterAction, registerVerifyAction} from "@/actions/auth/registerOtpAction";


const VerifyRegisterComponent = ({email}) => {
    console.log("final email : ", email)
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingResendOTP, setIsLoadingResendOTP] = useState(false);

    const handleChange = (enteredOtp) => {
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
            setOtp(prev => prev.slice(0, -1)); // Remove the last character
            const prevInput = event.target.previousElementSibling;
            if (prevInput) {
                prevInput.focus();
            }
        }
    };

    const router = useRouter();

    async function handleSubmit( ) {
        setIsLoading(true);
        const response = await registerVerifyAction(email, otp);
        setIsLoading(false);
        if (response.status === "OK") {
            toast.success("OTP verified successfully!");
            router.push(`/login`);
        } else {
            toast.error(response.detail, {
                position: "top-center"
            });
        }
    }

    async function handleResendOtp() {
        setIsLoadingResendOTP(true);
        const response = await resendRegisterAction(email);
        setIsLoadingResendOTP(false);
        if (response.status === "OK") {
            toast.success(response.detail, {
                position: "top-center"
            });
        } else {
            toast.error(response.detail, {
                position: "top-center"
            });
        }
    }


    return (
        <div className="absolute mx-[29%] mt-[14%] left-[9.5%]">
            <ToastContainer autoClose={2000}/>
            <form>
                <div className="mt-5 mb-12">
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-purple-text-head flex justify-center">
                        Enter 4 Digits Code
                    </h2>
                    <p className="flex justify-center greyUi mt-6">Enter the 4 digits code that received your email.</p>
                </div>

                <OtpInput
                    inputStyle={styles.inputStyle}
                    value={otp}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    numInputs={4}
                />

                {errorMessage && <p className="text-red-600 mt-3 ml-4">{errorMessage}</p>}

                <button
                    onClick={handleSubmit}
                    type="button"
                    id="continue"
                    className={`bg-purple-text text-white font-medium text-sm rounded-3xl px-44 py-3.5 mt-12 shadow-md shadow-violet-400 ${otp.length !== 4 ? "opacity-50 cursor-not-allowed" : "hover:bg-violet-500"}`}
                    disabled={otp.length !== 4}
                >
                    {isLoading ? <div className='loader'></div> : <p>Continue</p>}
                </button>

                <div className="mb-2 mr-6 cursor-pointer flex justify-end text-blueUi mt-3">
                    <div onClick={handleResendOtp}>
                        {isLoadingResendOTP ?
                            <div className="flex gap-2">OTP is Sending <p className='loader_purple'></p></div> :
                            <span>Resend OTP</span>}
                    </div>
                </div>
            </form>
        </div>
    )
}
export default VerifyRegisterComponent
