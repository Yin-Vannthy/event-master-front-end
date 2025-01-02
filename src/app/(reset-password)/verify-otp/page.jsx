'use client'
import VerifyOTPComponent from "@/app/(reset-password)/_components/VerifyOTPComponent";
import { useSearchParams } from "next/navigation";

const VerifyOTPPage = () => {
    const searchParams = useSearchParams()
    const email = searchParams.get('email')

    return (

        <div>
            <VerifyOTPComponent email = {email}/>
        </div>

    )
}
export default VerifyOTPPage