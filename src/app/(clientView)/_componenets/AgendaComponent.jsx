export const AgendaComponent = ({ no, startTime, endTime, title, description, speaker }) => {
    return (
        <div className="flex rounded-3xl border-1px py-5 odd:bg-softwhiteUi even:bg-white">
            <div className="px-4">
                <div className={`w-[2.4px] ${no % 2 !== 0 ? "bg-green-500" : "bg-purple-text"} h-full`}></div>
            </div>
            <div className="space-y-4 w-full">
                <p className="font-light text-sm lg:text-base">{startTime} - {endTime}</p>
                <p className="font-medium lg:text-xl">{title}</p>
                {description &&
                    <div className="pr-8">
                        <hr />
                        <p className="w-2/3 font-light text-sm lg:text-base mt-4">
                            {description}
                        </p>
                        <p className={`${speaker ? "block" : "hidden"} mt-2`}><span className="font-medium">Speaker : </span>{speaker}</p>
                    </div>
                }
            </div>
        </div>
    )
}