'use client'
import SetNewPasswordComponent from "@/app/(reset-password)/_components/SetNewPasswordComponent";
import { useSearchParams } from "next/navigation";

const SetNewPasswordPage = () => {
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const otp = searchParams.get('otp')
    return (
        
       

        <div>
            <SetNewPasswordComponent email = {email} otp = {otp}/>
        </div>

    )
}

export default SetNewPasswordPage