import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import ResetPasswordComponent from "@/app/(reset-password)/_components/ResetPasswordComponent";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
    title: "EventMaster",
    description: "EventMaster is a comprehensive, user-friendly event management system that streamlines every aspect of event planning and execution.",
    icons: {
        icon: "/images/event-master-2.png"
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={jakarta.className}>
                <div className="bg-primary-purple w-screen h-screen relative">
                    <ResetPasswordComponent />
                    {children}
                </div>
            </body>
        </html>
    );
}
