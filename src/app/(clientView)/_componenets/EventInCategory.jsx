import { EventCardComponent } from "./EventCardComponent"

export const EventInCategory = ({ data }) => {
    return (
        <>
            {data ? (
                data?.map((x, index) => {
                    const imageUrl = x?.poster;
                    const isValidUrl = imageUrl?.startsWith('http://') || imageUrl?.startsWith('https://');
                    return (
                        <EventCardComponent
                            key={index}
                            img={isValidUrl ? imageUrl : `https://firebasestorage.googleapis.com/v0/b/cloud-storage-next-8e2cc.appspot.com/o/paolo-feser-d6UCfbY3zMc-unsplash.jpg?alt=media&token=9624e26d-387d-4aa2-a802-f4065464745f`}
                            title={x?.eventName}
                            description={x?.description}
                            location={x?.location}
                            company={x?.orgName}
                            date={x?.startDate}
                            status={x?.isOpen}
                            id={x?.eventId}
                        />
                    )
                })

            ) :
                ''
            }
        </>
    )
}