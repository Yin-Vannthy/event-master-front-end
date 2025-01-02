'use client'

import Image from "next/image"
// import logo from "../../public/images/event-master-logo.png"
import logo from "../../public/images/event-master.png"
import { ArrowDown2, Buildings2, Calendar1, I3Dcube, Layer, LogoutCurve, Notification, People, Personalcard, Setting2 } from "iconsax-react"
import { usePathname } from "next/navigation";
import Link from "next/link";
import sideBarData from "../data/sidebar.json"
import { useEffect, useState } from "react";
import { LogoutAction } from "@/app/(dashboard)/_components/Action/LogoutAction";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

export const SidebarComponent = ({ className }) => {
    const [loadData, setLoadData] = useState(sideBarData);
    const [data, setData] = useState();
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const [click, setClick] = useState(false);
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.token) {
            setUserInfo(jwtDecode(session.user.token));
        }
        const userRole = userInfo?.role;
        if (userRole === "ROLE_USER") {
            setData({
                "data": [
                    {
                        "link": "/overview",
                        "name": "Overview",
                        "icon": "overview"
                    }, ,
                    {
                        "link": "/members",
                        "name": "Members",
                        "icon": "members"
                    },
                    {
                        "link": "/assets",
                        "name": "Assets",
                        "icon": "assets"
                    },
                    {
                        "link": "/events",
                        "name": "Events",
                        "icon": "events"
                    }
                ]
            });
        } else if (userRole === "ROLE_ADMIN" || userRole === "ROLE_SUB_ADMIN") {
            setData(loadData)
        }
    }, [session, status]);

    return (
        <div className={`${className} space-y-4 flex lg:block flex-col items-center lg:p-4 2xl:p-5 border-r-1px sticky top-0 h-screen`}>
            <Link prefetch={true} href={'/overview'}>
                <div className="p-2 lg:p-2 flex items-center gap-4">
                    <Image src={logo} height={192} width={192} />
                    {/* <h2 className="hidden xl:block text-xl font-semibold">EventMaster</h2> */}
                </div>
            </Link>
            <hr />
            <div className="w-full flex xl:block flex-col items-center xl:items-start justify-center">
                {data?.data?.map((x, index) => (
                    <Link prefetch={true} onClick={() => setClick(false)} href={x.link} key={index}>
                        <div className={`space-x-3 px-3 lg:px-4 py-3 flex justify-center xl:justify-start rounded-radiusUi w-fit xl:!w-full items-center 
                            ${pathname === x.link && "text-white bg-purple-text"} 
                            ${x.name == "Events" && pathname === "/attendees" ? "text-white bg-purple-text" : ""}
                            ${x.name == "Events" && pathname.startsWith("/event-detail") ? "text-white bg-purple-text" : ""}
                            ${x.name == "Events" && pathname.startsWith("/attendees") ? "text-white bg-purple-text" : ""}`}
                        >
                            {x.icon == 'overview' ? <Layer size="20" color={`${pathname === "/overview" ? "#FFFFFF" : '#344054'}`} variant="Bulk" />
                                : x.icon == "members" ? <People size="20" color={`${pathname === "/members" ? '#FFFFFF' : '#344054'}`} variant="Bulk" />
                                    : x.icon == 'assets' ? <I3Dcube size="20" color={`${pathname === "/assets" ? '#FFFFFF' : '#344054'}`} variant="Bulk" />
                                        : x.icon == "events" ? <Calendar1 size="20" color={`${pathname === "/events" || pathname === "/attendees" || pathname.startsWith("/event-detail") || pathname.startsWith("/attendees") ? '#FFFFFF' : '#344054'}`} variant="Bulk" />
                                            : x.icon == "request" ? <Notification size="20" color={`${pathname === "/user-request" ? '#FFFFFF' : '#344054'}`} variant="Bulk" />
                                                : x.icon == "setting" ? <Setting2 size="20" color={`${pathname === "/account-setting" ? '#FFFFFF' : '#344054'}`} variant="Bulk" />
                                                    : x.icon == "logout" ? <LogoutCurve size="20" color="#344054" variant="Bulk" /> : <LogoutCurve size="24" color="#344054" variant="Bulk" />}
                            <p className="hidden xl:block text-base">{x.name}</p>
                        </div>
                    </Link>
                ))}
                {/* dropdown sidebar  */}
                <ul className={`w-full p-0 w-ful cursor-pointer rounded-radiusUi hidden xl:block`}>
                    {/* <h2 onClick={() => setClick(!click)} className={`menu-title flex justify-center xl:justify-start items-center gap-3 rounded-radiusUi px-4 py-3 ${pathname === "/organization-profile" || pathname === "/user-profile" ? "text-white bg-purple-text" : ''}`}> */}
                    <h2 onClick={() => setClick(!click)} className={`menu-title flex justify-between xl:justify-between items-center gap-3 rounded-radiusUi px-4 py-3`}>
                        <div className="flex items-center space-x-3">
                            <Setting2 size="20" color={`${pathname === "/organization-profile" || pathname === "/user-profile" ? '#344054' : '#344054'}`} variant="Bulk" />
                            <div className="flex items-center justify-between">
                                <p className={`text-base hidden w-[124px] xl:block font-normal ${pathname === "/organization-profile" || pathname === "/user-profile" ? "text-primary-text" : 'text-primary-text'}`}>
                                    Account Setting
                                </p>
                            </div>
                        </div>
                        <ArrowDown2 className={`${click && 'rotate-180 duration-300'} duration-300`} size="20" color="#344054" variant="Outline" />
                    </h2>
                    <ul className={`${!click && 'hidden'}`}>
                        <li className={`${userInfo?.role == 'ROLE_USER' || userInfo?.role == 'ROLE_SUB_ADMIN' ? '!hidden' : 'flex'}`}>
                            <Link prefetch={true} className={`rounded-radiusUi w-full flex gap-3 pl-12 py-3 !text-base ${pathname === "/organization-profile" ? "text-white bg-purple-text" : ''}`} href={'/organization-profile'}>
                                {/* <Buildings2 size="20" color={`${pathname === "/organization-profile" ? '#FFFFFF' : '#344054'}`} variant="Bulk" /> */}
                                Organization Profile
                            </Link>
                        </li>
                        <li className="flex">
                            <Link prefetch={true} className={`rounded-radiusUi w-full flex gap-3 hover:!bg-none pl-12 py-3 !text-base ${pathname === "/user-profile" ? "text-white bg-purple-text" : ''}`} href={'/user-profile'}>
                                {/* <Personalcard size="20" color={`${pathname === "/user-profile" ? '#FFFFFF' : '#344054'}`} variant="Bulk" /> */}
                                User Profile
                            </Link>
                        </li>
                    </ul>
                </ul>
                {/* dropdown sidebar on mobile */}
                <div className="block xl:hidden">
                    <Link prefetch={true} onClick={() => setClick(false)} href={'/organization-profile'}>
                        <div className={`flex justify-center mx-auto items-center rounded-radiusUi px-3 w-fit py-3 ${pathname == "/organization-profile" && "text-white bg-purple-text"}`}>
                            <Buildings2 size="20" color={`${pathname === "/organization-profile" ? '#FFFFFF' : '#344054'}`} variant="Bulk" />
                        </div>
                    </Link>
                    <Link prefetch={true} onClick={() => setClick(false)} href={'/user-profile'}>
                        <div className={`flex justify-center mx-auto items-center rounded-radiusUi px-3 w-fit py-3 ${pathname == "/user-profile" && "text-white bg-purple-text"}`}>
                            <Personalcard size="20" color={`${pathname === "/user-profile" ? '#FFFFFF' : '#344054'}`} variant="Bulk" />
                        </div>
                    </Link>
                </div>
                <LogoutAction />
            </div>
        </div>
    )
}