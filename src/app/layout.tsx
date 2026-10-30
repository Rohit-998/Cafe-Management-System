import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cafe Management System",
  description:
    "A simple cafe management system to manage menu items and user accounts.",
};

// Root layout — wraps every page with the navbar and global styles.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Shared navbar shown on every page (changes when logged in) */}
        <Navbar />

        {children}
      </body>
    </html>
  );
}
