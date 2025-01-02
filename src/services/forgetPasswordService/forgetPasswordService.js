import { headerToken } from "@/app/api/auth/headerToken";

export const resendOtp = async (email) => {
    const res = await fetch(`${process.env.API_URL}auth/resend?email=${email}`,
        {   
            method: 'POST'
        }
    )
    const data = await res.json();
    console.log(data)
    return data;
}

export const verify = async (email, otp) => { 
    const res = await fetch(`${process.env.API_URL}auth/verify?otp=${otp}&email=${email}`,
        {   
            method: 'PUT'
        }
    )
    const data = await res.json();
    return data;
}

export const changePassword = async (email, otp, newPassword) => { 
    const res = await fetch(`${process.env.API_URL}auth/set-new-password?otp=${otp}&email=${email}`,
        {   
            method: 'PUT',
            body: JSON.stringify(newPassword),
            headers : {
                "Content-Type": "application/json"
            }
        }
    )
    const data = await res.json();
    console.log(email, otp)
    console.log(JSON.stringify(newPassword))
    return data;
}