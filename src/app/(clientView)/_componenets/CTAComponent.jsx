import Image from "next/image"
import haloEmoji from "../../../../public/images/halo-emoji.png"
import sunglassEmoji from "../../../../public/images/sunglass-emoji.png"
import Link from "next/link"

export const CTAComponent = () => {
    return (
        <div className="relative py-10 w-full bg-noice bg-cover rounded-3xl space-y-6 text-center text-white mt-32">
            <h2 className="font-semibold text-2xl lg:text-4xl">Get Ready To Manage Your Event</h2>
            <p className="lg:text-xl font-semibold">Join Free Today</p>
            <Link href={'/signup'}>
                <button className="bg-white text-primary-text px-8 py-4 mt-4 rounded-full lg:text-lg font-semibold z-50">
                    Register now
                </button>
            </Link>
            <Image
                src={haloEmoji}
                className="absolute top-10 right-80 w-auto h-auto hidden xl:block"
                width={40}
                height={40}
                alt="icon"
            />
            <Image
                src={sunglassEmoji}
                className="absolute bottom-0 left-80 hidden w-auto h-auto xl:block"
                width={114}
                height={114}
                alt="icon"
            />
        </div>
    )
}