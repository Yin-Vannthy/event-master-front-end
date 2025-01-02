"use client"

import { useState, useRef, useEffect } from "react";
import {
    KnockProvider,
    KnockFeedProvider,
    NotificationIconButton,
    NotificationFeedPopover,
} from "@knocklabs/react";
import { useSession } from "next-auth/react";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

import "@knocklabs/react/dist/index.css";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

export const NotificationMenu = () => {
    const [isVisible, setIsVisible] = useState(false);
    const notifButtonRef = useRef(null);
    const { status, data } = useSession(authOption);
    if (!data?.user?.token) redirect('/login')
    let userInfo = jwtDecode(data?.user?.token);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        isClient && status === 'authenticated' ? (
            <KnockProvider
                apiKey={'pk_test_JO65C9v8tNEf2aLZMMjjEbmp_c4Hos2D8U6wCHzzswI'}
                userId={userInfo?.sub}
            >
                <KnockFeedProvider feedId={'fc0460b0-11f7-46fa-bd57-6c9e31e53896'}>
                    <>
                        <NotificationIconButton
                            ref={notifButtonRef}
                            onClick={(e) => setIsVisible(!isVisible)}
                        />
                        <NotificationFeedPopover
                            buttonRef={notifButtonRef}
                            isVisible={isVisible}
                            onClose={() => setIsVisible(false)}
                        />
                    </>
                </KnockFeedProvider>
            </KnockProvider>)
            : ''
    );
};