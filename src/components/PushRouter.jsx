'use client'

import { useRouter } from "next/navigation"

export const PushRouter = ({ name }) => {
    const router = useRouter();
    router.replace(`${name}`, { scroll: false })
    return (
        <>
            {/* <PushRouter name={`/event-detail/${id}?name=${eventData?.payload?.eventName}`} /> */}
        </>
    )
}