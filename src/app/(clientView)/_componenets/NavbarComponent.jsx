'use client'

import Image from "next/image"
import Link from "next/link"
import image from "../../../../public/images/event-master.png"
import { usePathname } from "next/navigation";
import { HambergerMenu } from "iconsax-react";

export const NavbarComponent = () => {
    const pathname = usePathname();
    return (
        <div className="flex justify-between py-4 container items-center sticky top-0 z-50 bg-white">
            <Link className="flex items-center gap-4" href={'/'}>
                <Image src={image} height={192} width={192} alt="logoImage" />
                {/* <h2 className="text-xl hidden lg:block font-bold">EventMaster</h2> */}
            </Link>
            <div className="gap-8 items-center hidden lg:flex">
                <div className="space-x-8">
                    <Link prefetch={true} href={'/'}>
                        <span className={`py-3 ${pathname == "/" && 'border-b-2'} border-purple-text font-medium`}>Home</span>
                    </Link>
                    <Link prefetch={true} href={'/about'}>
                        <span className={`py-3 ${pathname == "/about" && 'border-b-2'} border-purple-text font-medium`}>About</span>
                    </Link>
                </div>
                <Link href={'/login'} className="text-white bg-purple-text font-semibold px-10 py-2 rounded-full">
                    Login
                </Link>
            </div>
            <button className="btn lg:hidden" onClick={() => document.getElementById('my_modal_2').showModal()}>
                <HambergerMenu size="32" color="#344054" />
            </button>
            <dialog id="my_modal_2" className="modal lg:hidden">
                <div className="modal-box">
                    <div className="flex flex-col justify-center space-y-8 items-center">
                        <Link href={'/'}>Home</Link>
                        <Link href={'/about'}>About</Link>
                        <Link href={'/signup'} className="text-white bg-purple-text text-sm font-semibold px-14 py-3 rounded-full">
                            Login
                        </Link>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}