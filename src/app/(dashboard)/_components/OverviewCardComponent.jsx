import { Calendar1, CalendarTick, People, Profile2User } from "iconsax-react"

export const OverviewCardComponent = ({ title, count, logo }) => {
    return (
        <div className={`space-y-5 overflow-hidden relative p-4 bg-gradient-to-r 
        ${logo == "event" ? 'from-violet-500 to-blue-300'
                : logo == "published" ? 'from-blue-300 to-blue-300/50'
                    : logo == "attendee" ? 'from-[#9288ff] to-[#948BFF]/50' : 'from-violet-400 to-violet-400/50'} rounded-2xl text-white`}
        >
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-full w-fit bg-white">
                    {logo == "event" ? <Calendar1 size="24" color="#7B61FF" variant="Bulk" />
                        : logo == "published" ? <CalendarTick size="24" color="#8BB4FF" variant="Bulk" />
                            : logo == "attendee" ? <People size="24" color="#948BFF" variant="Bulk" />
                                : <Profile2User size="24" color="#B08BFF" variant="Bulk" />}
                </div>
                <p className="text-base lg:text-base font-medium">{title}</p>
            </div>
            <h2 className="font-semibold text-2xl">{count}</h2>
            <div className="h-24 w-24 bg-white/25 rounded-full absolute -top-8 -right-14"></div>
            <div className="h-24 w-24 bg-white/25 rounded-full absolute -bottom-8 -right-2"></div>
        </div>
    )
}