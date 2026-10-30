"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { loginUser, type LoginResult } from "./actions";
import { loginSchema, toFieldErrors } from "@/lib/validations/auth";

// Login page — form + client-side zod check + server action.
// Jira: CMS-9 (Login), sub-tasks CMS-21 (Design) and CMS-22 (Code).

export default function LoginPage() {
  // Errors returned by the server action
  const [state, formAction, isPending] = useActionState<LoginResult | null, FormData>(
    loginUser,
    null
  );
  // Errors found in the browser before sending anything to the server
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  // Runs before the server action. If zod finds a problem, stop the submit.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const result = loginSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      e.preventDefault();
      setClientErrors(toFieldErrors(result.error.issues));
    } else {
      setClientErrors({});
    }
  }

  const errors = { ...state?.errors, ...clientErrors };

  return (
    <div className="page-container">
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <h1 style={{ marginBottom: "1.5rem" }}>Login</h1>

        <div className="card">
          {/* General error, e.g. "Invalid credentials" */}
          {state?.message && (
            <p className="error-text" style={{ marginBottom: "1rem" }}>
              {state.message}
            </p>
          )}

          {/* noValidate: let our zod messages show instead of browser popups */}
          <form action={formAction} onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="you@example.com" />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="Your password" />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            <button
              id="login-submit"
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" }}>
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
