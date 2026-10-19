import type { Metadata } from "next";
import Link from "next/link";
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
        {/* Shared navbar shown on every page */}
        <nav className="navbar">
          <Link href="/" className="navbar-brand">
            ☕ Cafe Management
          </Link>

          <ul className="navbar-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </ul>
        </nav>

        {children}
      </body>
    </html>
  );
}
