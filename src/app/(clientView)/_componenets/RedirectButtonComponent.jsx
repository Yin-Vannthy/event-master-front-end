import { ArrowLeft2 } from "iconsax-react"
import Link from "next/link"

export const RedirectBackComponent = ({link}) => {
    return (
        <Link href={link} className='flex font-medium lg:text-sm items-center bg-white border-2 shadow-sm mb-8 mt-4 border-slate-50 p-3 w-fit rounded-full cursor-pointer drop-shadow-sm'>
            <ArrowLeft2 size="20" color="#222222" /> Go back to Home
        </Link>
    )
}