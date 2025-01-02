import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { NavbarComponent } from "./_componenets/NavbarComponent";
import { FooterComponent } from "./_componenets/FooterComponent";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer autoClose={2000} />
        <NavbarComponent />
        {children}
        <FooterComponent />
      </body>
    </html>
  );
}
