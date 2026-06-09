import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CompareDrawer } from "@/components/compare/CompareDrawer";
import { QueryProvider } from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CollegeQuest — Discover Your Perfect College",
  description: "Find, compare, and choose from thousands of colleges across India. Search by location, fees, rating, and more.",
  keywords: ["college search", "India colleges", "IIT", "NIT", "college comparison", "admission"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-gray-50 antialiased`}>
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CompareDrawer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
