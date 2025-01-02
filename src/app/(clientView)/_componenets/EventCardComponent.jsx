import Image from "next/image"
import Link from "next/link"
import image from "../../../../public/images/event-master-logo.png"

export const EventCardComponent = ({ img, title, location, description, company, date, id, status }) => {
    const formatDate = dateString => new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const inputDate = date;
    const formattedDate = formatDate(inputDate);
    const formated = formattedDate;
    return (
        <div className="shadow-md rounded-3xl">
            <div className="relative">
                <div className="relative !h-[300px] w-full object-cover rounded-t-3xl">
                    {/* <MegaImage
                        src={img}
                        className={'rounded-t-3xl !h-full object-cover'}
                    /> */}
                    <Image
                        src={img}
                        fill
                        className={'rounded-t-3xl !h-full object-cover'}
                    />
                </div>
                {/* <Image src={img} width={500} height={300} className="rounded-t-3xl h-[300px] w-full object-cover" alt="racingImage" /> */}
                <div className="absolute top-0 right-0 p-6 ">
                    <span className={`bg-white text-sm rounded-full py-2 px-4 font-semibold ${status ? 'text-blueUi' : 'text-redUi'}`}>
                        {status ? 'Open' : 'Close'}
                    </span>
                </div>
            </div>
            <div className="bg-white px-6 py-8 rounded-b-3xl flex flex-col justify-between h-[305.72px]">
                <div className="space-y-4">
                    <div className="flex gap-3 items-center">
                        <Image src={image} height={40} width={40} alt="orgImage" />
                        <p className="text-sm font-medium">{company}</p>
                    </div>
                    <div className="flex text-sm justify-between font-medium">
                        <p className="max-w-64 line-clamp-1">{location}</p>
                        <p>{formated}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h2 className="text-lg lg:text-xl font-bold max-w-64 line-clamp-1">{title}</h2>
                        <p className="text-sm lg:text-base line-clamp-2 font-medium">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <Link href={`/detail/${id}`} className="text-sm border-1px font-semibold rounded-full border-purple-text text-purple-text px-6 py-3">View Detail</Link>
                    <Link href={`/register/${id}`} className={`${!status && 'hidden'} text-sm rounded-full font-semibold bg-purple-text text-white px-6 py-3 border-1px border-purple-text`}>Join Event</Link>
                </div>
            </div>
        </div>
    )
}