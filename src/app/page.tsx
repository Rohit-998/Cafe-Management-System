import Link from "next/link";

// Home page — simple hero with links to the two modules.
export default function HomePage() {
  return (
    <div className="page-container">
      <div className="hero">
        <h1>☕ Cafe Management System</h1>
        <p>
          A simple system to manage the cafe menu and user accounts.
          <br />
          Built with Next.js, Supabase, and Tailwind CSS.
        </p>

        <div className="hero-links">
          <Link href="/menu" className="btn btn-primary">
            View Menu
          </Link>
          <Link href="/menu/add" className="btn btn-secondary">
            Add Menu Item
          </Link>
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
          <Link href="/register" className="btn btn-secondary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
