import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logoutUser } from "@/app/login/actions";

// Navbar — runs on the server, so it knows if someone is logged in
// before the page is sent to the browser.
// Logged out: shows Login and Register links.
// Logged in:  shows the user's name and a Logout button.
// Jira: CMS-9 (Login), CMS-11 (Logout).
export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Name saved at registration (user metadata), fall back to email
  const displayName = (user?.user_metadata?.full_name as string) || user?.email;

  return (
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

        {user ? (
          <>
            <li id="navbar-user">Hi, {displayName}</li>
            <li>
              {/* A form so the Logout button can call the server action */}
              <form action={logoutUser}>
                <button id="logout-button" type="submit" className="btn btn-secondary">
                  Logout
                </button>
              </form>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
