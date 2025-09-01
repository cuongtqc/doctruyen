import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/public/Navbar";
import { geistSans, geistMono } from "@/lib/ssr";
export { metadata } from "@/lib/ssr";

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={`flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          <main className="w-full">
            <div className="p-4 rounded-lg">{children}</div>
          </main>
          {/* <Footer /> */}
        </body>
      </html>
    </SessionProvider>
  );
}
