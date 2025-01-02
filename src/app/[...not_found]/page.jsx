import { ArrowLeft2 } from "iconsax-react";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div>
            <div className="bg-[url('/images/404.jpg')] w-screen h-screen bg-cover">
                <div className='bg-white p-4 w-fit rounded-xl absolute top-8 left-8'>
                    <Link href="/overview" className='flex font-medium'>
                        <ArrowLeft2 size="24" color="#222222" /> Go back to Home</Link>
                </div>
            </div>
        </div>
    )
}