"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { registerSchema, toFieldErrors } from "@/lib/validations/auth";

export type RegisterResult = {
  errors?: Record<string, string>; // field-level errors
  message?: string;                // general error (e.g. email already exists)
};

// Server action: validates the form again on the server, then creates the
// account with Supabase Auth. Supabase stores and hashes the password —
// we never save passwords ourselves.
// Jira: CMS-8 (Register Account), sub-task CMS-19 (Code register).
export async function registerUser(
  _prevState: RegisterResult | null,
  formData: FormData
): Promise<RegisterResult> {
  // 1. Read form values
  const rawData = {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  };

  // 2. Validate with zod (never trust the browser alone)
  const parsed = registerSchema.safeParse(rawData);
  if (!parsed.success) {
    return { errors: toFieldErrors(parsed.error.issues) };
  }

  // 3. Create the user in Supabase Auth.
  //    full_name goes into user metadata; the DB trigger copies it into profiles.
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: { data: { full_name: parsed.data.fullName } },
  });

  if (error) {
    if (error.code === "user_already_exists" || /already registered/i.test(error.message)) {
      return { errors: { email: "Email already exists" } };
    }
    if (error.code === "weak_password") {
      return { errors: { password: "Password must be at least 6 characters" } };
    }
    console.error("Supabase signUp error:", error);
    return { message: "Registration failed. Please try again." };
  }

  // If "Confirm email" is ON, Supabase hides duplicates by returning a user
  // with no identities instead of an error. Treat that as a duplicate too.
  if (data.user && data.user.identities?.length === 0) {
    return { errors: { email: "Email already exists" } };
  }

  // 4. Success: user is now logged in, go to the menu
  redirect("/menu");
}
