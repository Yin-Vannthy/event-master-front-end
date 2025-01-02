'use client'

import Image from "next/image";
import VerifyRegisterComponent from "@/app/(auth)/_components/VerifyRegisterComponent";
import {useSearchParams} from "next/navigation";


const VerifyRegisterPage = () => {
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    return (
        <div className="bg-primary-purple w-[100%] h-screen relative">
            <div className="absolute w-[49%] h-[83%] mt-20 left-[25%]">
                <Image className="absolute object-cover drop-shadow-lg"
                       src="images/verify-otp-rg.svg" alt="image" width={934} height={746} property=""
                />
            </div>
            {/*forgot password component*/}
            <VerifyRegisterComponent email = {email}/>
        </div>

    )
}
export default VerifyRegisterPage