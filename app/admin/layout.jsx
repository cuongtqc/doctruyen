import { Navbar } from "@/components/admin/Navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import { Footer } from "@/components/admin/Footer";
import { geistSans, geistMono } from "@/lib/ssr";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <Sidebar />
        <main className="w-full pl-64">
          <div className="p-4 rounded-lg">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
