import Link from "next/link";

// Login form layout — no auth logic yet.
// Jira: CMS-9 (Login), sub-task CMS-21 (Design login form).
// Business logic (CMS-22) will be added on Thu.

export default function LoginPage() {
  return (
    <div className="page-container">
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <h1 style={{ marginBottom: "1.5rem" }}>Login</h1>

        <div className="card">
          <form>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Your password"
                required
              />
            </div>

            {/* Submit button — does nothing today */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Login
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "1rem",
              fontSize: "0.9rem",
            }}
          >
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color: "var(--primary)" }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
