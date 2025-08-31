import { Navbar } from "@/components/admin/Navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import { Footer } from "@/components/admin/Footer";

import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AdminLayout({ children }) {
  return (
    <html>
      <body
        className={`flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <Sidebar />
        <main className="w-full pt-14 pl-64">
          <div className="p-4 rounded-lg">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
