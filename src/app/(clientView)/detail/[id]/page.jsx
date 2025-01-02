import { RedirectBackComponent } from "@/app/(clientView)/_componenets/RedirectButtonComponent"
import Image from "next/image"
import { AgendaComponent } from "@/app/(clientView)/_componenets/AgendaComponent"
import Link from "next/link"
import { getEventById } from "@/services/clientPage/landingService"

const Page = async ({ params: { id } }) => {
    const data = await getEventById(id);
    const formatDate = dateString => new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const inputDate = data?.payload?.startDateTime;
    const formattedDate = formatDate(inputDate);
    const formated = formattedDate;
    const imageUrl = data?.payload?.poster;
    const isValidUrl = imageUrl?.startsWith('http://') || imageUrl?.startsWith('https://');

    console.log(data, 'detail data landing')

    return (
        <div className="container">
            <RedirectBackComponent link={'/'} />
            <section className="p-6 rounded-3xl border-2 border-slate-100 drop-shadow-sm bg-white">
                <div className="h-[350px] lgh-[450px] relative">
                    <Image src={isValidUrl ? imageUrl : `https://firebasestorage.googleapis.com/v0/b/cloud-storage-next-8e2cc.appspot.com/o/paolo-feser-d6UCfbY3zMc-unsplash.jpg?alt=media&token=9624e26d-387d-4aa2-a802-f4065464745f`}
                        className="h-[350px] lg:h-[450px] object-cover rounded-2xl"
                        fill
                        alt="blog-image"
                    />
                </div>
                <div className="space-y-6 mt-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl lg:text-2xl font-semibold">{data?.payload?.eventName}</h2>
                        <button className={`text-sm lg:text-base ${data?.payload?.isOpen ? 'bg-blue-200 text-blue-800' : 'bg-red-200 text-red-800'} px-6 py-1.5 rounded-full`}>
                            {data?.payload?.isOpen ? 'Open' : 'Close'}
                        </button>
                    </div>
                    <p className="text-sm lg:text-base w-full lg:w-2/3 font-light">
                        {data?.payload?.description}
                    </p>
                    <p>
                        <span className="text-sm lg:text-base font-semibold">Location:</span>   {data?.payload?.location}
                    </p>
                    <button className="bg-blue-200 text-blue-800 text-sm lg:text-base px-6 py-3 rounded-full">{formated}</button>
                </div>
            </section>
            <section className="py-8 space-y-6">
                <h2 className="text-xl lg:text-2xl font-semibold">Agenda Management</h2>
                {data?.payload?.agenda?.data?.agenda?.map((x, index) => (
                    <AgendaComponent
                        key={index}
                        no={index + 1}
                        startTime={x?.startTime}
                        endTime={x?.endTime}
                        title={x?.topic}
                        description={x?.description}
                        speaker={x?.speaker}
                    />
                ))}
                <div className="w-full text-end pt-8">
                    <Link href={`/register/${id}`} className={`${!data?.payload?.isOpen && 'hidden'} text-sm lg:text-base px-9 font-bold py-4 rounded-full bg-purple-text text-white`}>Join Event</Link>
                </div>
            </section>
        </div>
    )
}

export default Page