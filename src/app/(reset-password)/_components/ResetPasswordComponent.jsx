'use client'

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const ResetPasswordComponent = () => {

    const pathname = usePathname();

    function chooseImage() {
        if (pathname === '/forgot-password') {
            return 'forgot-pw-icon.svg'
        } else if (pathname === '/verify-otp') {
            return 'verify-otp-icon.svg'
        } else if (pathname === '/set-new-password') {
            return 'set-pw-icon.svg'
        } else if (pathname === '/verify') {
            return 'verify-success-icon.svg'
        }
    }

    const router = useRouter();


    return (
        <div className="absolute flex justify-center items-center w-full h-screen">
            <div className="relative w-full sm:w-[90%] md:w-[75%] lg:w-[59%] h-[73%] md:h-[65%] lg:h-[83%] rounded-3xl overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        className="absolute object-cover top-10"
                        src="/images/bg-forgotpw.svg"
                        alt="background image"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                <div
                    className="z-20 absolute top-[34px] sm:top-10 left-5 md:top-10 md:left-10 bg-violet-400 w-8 h-8 sm:w-10 md:h-10 rounded-full flex justify-center items-center hover:bg-purple-text-head"
                    onClick={() => router.back()}
                >
                    <Image src="/icons/arrowback-icon.svg" alt="back icon" width={20} height={20} />
                </div>
            

                <div className="relative z-10 flex flex-col items-center px-4 top-[70px] sm:top-28 lg:top-20">
                    <Image
                        src={`/icons/${chooseImage()}`}
                        alt="icon"
                        width={600}
                        height={200}
                    />
                    <div className="flex text-[13px] sm:text-[17px] md:inline-flex sm:flex-row md:flex-row justify-between sm:w-[550px] md: w-[100%] md:space-y-0 md:space-x-3">
                        <p className={`text-gray-600 ml-[-13px] sm:ml-[-13px] lg:ml-[-17px] ${pathname === '/forgot-password' ? 'text-purple-text' : ''}`}>
                            Forgot password
                        </p>
                        <p className={`text-gray-600 pr-[20px] sm:pr-[40px] lg:pr-[30px] ${pathname === '/verify-otp' ? 'text-purple-text' : ''}`}>
                            Verify OTP
                        </p>
                        <p className={`text-gray-600 pr-[17px] sm:pr-[30px] ${pathname === '/set-new-password' ? 'text-purple-text' : ''}`}>
                            New password
                        </p>
                        <p className={`text-gray-600 sm:!mr-[-8px] ${pathname === '/verify' ? 'text-purple-text' : ''}`}>
                            Success
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordComponent