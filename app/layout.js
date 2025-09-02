import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/public/Navbar";
import { geistSans, geistMono } from "@/lib/ssr";
import { Footer } from "@/components/public/Footer";
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
            <div className="rounded-lg">{children}</div>
          </main>
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
