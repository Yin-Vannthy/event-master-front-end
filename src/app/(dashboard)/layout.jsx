import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { SidebarComponent } from "@/components/SidebarComponent";
import { NavbarComponent } from "@/components/NavbarComponent";
import { getServerSession } from "next-auth";
import SessionProvider from "../../components/SessionProvider";
import { Knock } from "@knocklabs/node";
import { authOption } from "../api/auth/[...nextauth]/route";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
  description:
    "EventMaster is a comprehensive, user-friendly event management system that streamlines every aspect of event planning and execution.",
  icons: {
    icon: "/images/event-master-2.png",
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOption);
  if (!session?.user?.token) redirect('/login')

  let userInfo = jwtDecode(session?.user?.token);
  const knockClient = new Knock(
    "sk_test_hguX-GMQzOK3VFeVkAPJLbNITMjkY_mxDc0H2IO35_g"
  );
  const knockUser = await knockClient.users.identify(userInfo?.sub, {
    name: userInfo?.role,
    email: userInfo?.sub,
  });

  return (
    <html lang="en">
      <body className={jakarta.className}>
        <ToastContainer autoClose={2000} />
        <SessionProvider session={session}>
          <div className="flex">
            <SidebarComponent className={`w-[13%] xl:w-[19%] 2xl:w-[17%]`} />
            <div className="w-[87%] xl:w-[81%] 2xl:w-[83%]">
              <NavbarComponent />
              <div
                data-theme="light"
                className="p-6 lg:px-14 bg-backgroundUi min-h-[92%] overflow-scroll"
              >
                {children}
              </div>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
