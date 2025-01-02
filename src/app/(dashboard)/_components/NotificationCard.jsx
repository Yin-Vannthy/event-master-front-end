import Image from "next/image"
import data from "../../../data/notification.json"

export const NotificationCard = () => {
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="bg-[#F7F9FB] p-2 rounded-full hidden cursor-pointer lg:block">
                {/* <NotificationMenu /> */}
                <Image src={'/icons/icon.svg'} width={24} height={24} />
            </div>
            {/* <div tabIndex={0} role="button" className="btn m-1">Click</div> */}
            <ul tabIndex={0} className="dropdown-content z-[1] shadow-2xl menu bg-base-100 rounded-box w-96 p-0">
                <div className="flex justify-between items-center px-4 py-6">
                    <h2 className="text-xl font-semibold">Notifications</h2>
                    <p className="text-purple-text cursor-pointer">Mark as read</p>
                </div>
                {data.data.map((x, index) => (
                    <div key={index} className="flex space-x-3 p-4 even:bg-[#F1F6FC] odd:bg-white last:rounded-b-box relative ">
                        <Image src={x.image} className="w-12 h-12 rounded-full object-cover" width={48} height={48} />
                        <div className="flex flex-col space-y-2">
                            <h3 className="font-medium">
                                <span className="font-bold">{x.name} </span>
                                requested access to
                                <span className="font-bold"> {x.org}</span>
                            </h3>
                            <p className="text-slate-500 font-medium">{x.date}</p>
                        </div>
                        <div className="h-2 w-2 bg-blue-600 rounded-full absolute right-3"></div>
                    </div>
                ))}
            </ul>
        </div>
    )
}