"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { registerUser, type RegisterResult } from "./actions";
import { registerSchema, toFieldErrors } from "@/lib/validations/auth";

// Register page — form + client-side zod check + server action.
// Jira: CMS-8 (Register Account), sub-tasks CMS-18 (Design) and CMS-19 (Code).

export default function RegisterPage() {
  // Errors returned by the server action
  const [state, formAction, isPending] = useActionState<RegisterResult | null, FormData>(
    registerUser,
    null
  );
  // Errors found in the browser before sending anything to the server
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  // Runs before the server action. If zod finds a problem, stop the submit.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const result = registerSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      e.preventDefault();
      setClientErrors(toFieldErrors(result.error.issues));
    } else {
      setClientErrors({});
    }
  }

  // Show client errors first, otherwise server errors
  const errors = { ...state?.errors, ...clientErrors };

  return (
    <div className="page-container">
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <h1 style={{ marginBottom: "1.5rem" }}>Register</h1>

        <div className="card">
          {state?.message && (
            <p className="error-text" style={{ marginBottom: "1rem" }}>
              {state.message}
            </p>
          )}

          {/* noValidate: let our zod messages show instead of browser popups */}
          <form action={formAction} onSubmit={handleSubmit} noValidate>
            {/* Full name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input id="fullName" name="fullName" type="text" placeholder="Your full name" />
              {errors.fullName && <p className="error-text">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="you@example.com" />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="At least 6 characters"
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            {/* Confirm password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && (
                <p className="error-text">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              id="register-submit"
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
              disabled={isPending}
            >
              {isPending ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" }}>
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
