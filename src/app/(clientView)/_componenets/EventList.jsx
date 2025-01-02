import Link from "next/link"
import { EventCardComponent } from "./EventCardComponent"
import { TitleComponent } from "./TitleComponent"

export const EventList = ({ title, data }) => {
    if (data.payload == null) {
        return
    }
    return (
        <div>
            <TitleComponent title={title} />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
                {data?.payload?.slice(0, 6)?.map((x, index) => {
                    const imageUrl = x?.poster;
                    const isValidUrl = imageUrl?.startsWith('http://') || imageUrl?.startsWith('https://');
                    return (
                        <EventCardComponent
                            key={index}
                            img={isValidUrl ? imageUrl : `https://firebasestorage.googleapis.com/v0/b/cloud-storage-next-8e2cc.appspot.com/o/paolo-feser-d6UCfbY3zMc-unsplash.jpg?alt=media&token=9624e26d-387d-4aa2-a802-f4065464745f`}
                            title={x?.eventName}
                            description={x?.description}
                            location={x?.address}
                            company={x?.orgName}
                            date={x?.startDate}
                            status={x?.isOpen}
                            id={x?.eventId}
                        />
                    )
                })}
            </div>
            <Link prefetch={true} href={`/events/${title}`}>
                <button className={`${data?.payload?.length >= 6 ? "block" : "hidden"} mx-auto mt-8 text-sm rounded-full bg-purple-text text-white px-6 py-3 border-1px border-purple-text`}>See more</button>
            </Link>
        </div>
    )
}