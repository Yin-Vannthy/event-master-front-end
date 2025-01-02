'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import VerifyComponent from "@/app/(reset-password)/_components/VerifyComponent";
import Image from "next/image";

const VerifyPage = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/login');
        }, 1000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div>
            <div>
                <Image
                    className="absolute left-[50%] top-[35%] sm:top-[40%] lg:top-[32%] transform -translate-x-[50%] size-[230px] sm:size-[290px] 2xl:size-[300px]"
                    src="/images/verify-success.gif"
                    alt="Verification success image"
                    width={400}
                    height={200}
                />
            </div>

            <VerifyComponent />
        </div>
    );
}

export default VerifyPage;
