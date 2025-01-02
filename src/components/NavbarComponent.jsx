'use client'

import Image from "next/image"
import defaultProfile from "../../public/images/default-profile.jpg"
import { usePathname, useSearchParams } from "next/navigation"
import { NotificationMenu } from "./NotificationMenu"
import { CreateEventButton } from "@/app/(dashboard)/_components/Action/CreateEventButton"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { jwtDecode } from "jwt-decode"
import { getEventByIdAction } from "@/actions/eventAction"
import { useEffect, useState } from "react"
import { NotificationCard } from "@/app/(dashboard)/_components/NotificationCard"

export const NavbarComponent = ({ className }) => {
    const [eventName, setEventName] = useState();
    const pathname = usePathname();
    let url = pathname;
    let eId = url.split('/').pop()
    console.log(eId, 'check path')

    const param = useSearchParams()
    const eName = param.get('name')
    // searchParam for server 
    const eventId = pathname.split('/')[2];
    const { data: session, status } = useSession();
    let userInfo;

    if (status === 'authenticated' && session?.user?.token) {
        userInfo = jwtDecode(session.user.token);
    }

    const getEventById = async (id) => {
        const res = await getEventByIdAction(id);
        setEventName(res?.payload?.eventName)
    }

    useEffect(() => {
        if (pathname.startsWith('/event-detail') || pathname.startsWith('/attendees')) {
            getEventById(eId)
        }
    }, [pathname])

    const userRole = userInfo?.role;

    return (
        <div className={`${className} justify-between sticky top-0 z-50 bg-white flex lg:justify-between items-center py-3 px-3 lg:px-14 border-b-[1px]`}>
            {!pathname.startsWith('/event-detail') && !pathname.startsWith('/attendees') ?
                <h2 className="text-lg lg:text-xl font-semibold block">
                    {pathname === '/overview' ?
                        'Overview' :
                        pathname === '/members' ?
                            'Member' :
                            pathname === '/assets' ?
                                'Assets' :
                                pathname === '/events' || pathname.startsWith("/event-detail") || pathname === "/attendees" ?
                                    'Events' :
                                    pathname === '/user-request' ?
                                        'Notification' :
                                        pathname === '/organization-profile' ?
                                            "Organization Profile" :
                                            pathname === '/user-profile' ?
                                                "User Profile" :
                                                pathname === '/account-setting' ?
                                                    'Account Setting' :
                                                    'Default'}
                </h2>
                :
                <div>
                    <div className="hidden lg:flex text-sm breadcrumbs">
                        <ul className="">
                            <li>
                                <Link href={'/event-detail/1'}>{eventName ? eventName : '...'}</Link>
                            </li>
                            <li>
                                <Link href={`/attendees/${eventId}`}>Attendees</Link>
                            </li>
                            <li>
                                <Link href={'/events'}>
                                    Events
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex lg:hidden text-sm breadcrumbs">
                        <ul className="">
                            <li>
                                <Link href={'/attendees'}>Attendees</Link>
                            </li>
                            <li>
                                <Link href={'/events'}>
                                    Events
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            }
            <div className="space-x-10 flex items-center">
                <div className="bg-[#F7F9FB] p-2 rounded-full hidden cursor-pointer">
                    {/* <NotificationMenu /> */}
                    <Image src={'/icons/icon.svg'} width={24} height={24} />
                </div>
                <NotificationCard />
                {/* <div tabIndex={0} role="button" className="bg-[#F7F9FB] p-1 rounded-full hidden cursor-pointer lg:block">
                    <NotificationMenu />
                </div> */}
                {userRole === "ROLE_ADMIN" || userRole === "ROLE_SUB_ADMIN" ? <CreateEventButton /> : ''}
                <Link href={'/user-profile'}>
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:block">
                            <p className="font-semibold text-end text-sm">{userInfo?.organization?.orgName}</p>
                            <p className="text-xs text-greyUi">{userInfo?.sub}</p>
                        </div>
                        <div className="w-[48px] h-48px] hidden lg:block">
                            <Image
                                className="rounded-full"
                                src={userInfo?.organization?.logo && /^(http|https):\/\//.test(userInfo.organization.logo) ? userInfo.organization.logo : defaultProfile}
                                height={48}
                                width={48}
                            />
                        </div>
                        <div className="w-[32px] h-[32px] block lg:hidden">
                            <Image
                                className="rounded-full"
                                src={userInfo?.organization?.logo && /^(http|https):\/\//.test(userInfo.organization.logo) ? userInfo.organization.logo : defaultProfile}
                                height={48}
                                width={48}
                            />
                            {/* <Image className="rounded-full" src={userInfo?.organization?.logo != "" ? userInfo?.organization?.logo : defaultProfile} height={32} width={32} /> */}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}