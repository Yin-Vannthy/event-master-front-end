import { Box1, CalendarTick, Notification, ProfileTick } from "iconsax-react"

export const AboutCardComponent = ({ title, detail, logo }) => {
    return (
        <div className="space-y-5 p-6 rounded-3xl border-2 border-slate-100 bg-white z-20">
            {logo == "one" ? <ProfileTick size="32" color="#344054" variant="Bold" />
                : logo == "two" ? <Notification size="32" color="#344054" variant="Bold" />
                    : logo == "three" ? <Box1 size="32" color="#344054" variant="Bold" />
                        : <CalendarTick size="32" color="#344054" variant="Bold" />}
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-sm lg:text-lg font-light text-slate-500">
                {detail}
            </p>
        </div>
    )
}