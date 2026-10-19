import Link from "next/link";

// Register form layout — no auth logic yet.
// Jira: CMS-8 (Register Account), sub-task CMS-18 (Design register form).
// Business logic (CMS-19) will be added on Thu.

export default function RegisterPage() {
  return (
    <div className="page-container">
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <h1 style={{ marginBottom: "1.5rem" }}>Register</h1>

        <div className="card">
          <form>
            {/* Full name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Your full name"
                required
              />
            </div>

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
                placeholder="At least 6 characters"
                required
              />
            </div>

            {/* Confirm password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                required
              />
            </div>

            {/* Submit button — does nothing today */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Create Account
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "1rem",
              fontSize: "0.9rem",
            }}
          >
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--primary)" }}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
