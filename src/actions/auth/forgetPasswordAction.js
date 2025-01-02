'use server'

import { changePassword, resendOtp, verify } from "@/services/forgetPasswordService/forgetPasswordService";

export const forgetPasswordAction = async (email) =>{
    // calling service
    const data = await resendOtp(email);
    return data;
}

export const verifyOtpAction = async (email, otp) =>{
    // calling service
    const data = await verify(email, otp);
    return data;
}

export const changePasswordAction = async (email, otp, newPassword) =>{
    // calling service
    const data = await changePassword(email, otp, newPassword);
    return data;
}