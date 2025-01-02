// 'use server'
//
// import {registerVerify, resendRegisterOtp} from "@/services/login-signup/registerOtpService";
//
// export const resendRegisterAction = async (email) =>{
//     // calling service
//     const data = await  resendRegisterOtp (email);
//     return data;
// }
//
// export const registerVerifyAction = async (email, otp) =>{
//     // calling service
//     const data = await registerVerify(email, otp);
//     return data;
// }
//


'use server'

import { registerVerify, resendRegisterOtp } from "@/services/login-signup/registerOtpService";

export const resendRegisterAction = async (email) => {
    // calling service
    const data = await resendRegisterOtp(email);
    return data;
}

export const registerVerifyAction = async (email, otp) => {
    // calling service
    const data = await registerVerify(email, otp);
    return data;
}
