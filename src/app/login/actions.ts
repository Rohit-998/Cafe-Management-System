"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { loginSchema, toFieldErrors } from "@/lib/validations/auth";

export type LoginResult = {
  errors?: Record<string, string>; // field-level errors
  message?: string;                // general error (e.g. invalid credentials)
};

// Server action: validates the form, then logs in with Supabase Auth.
// Jira: CMS-9 (Login), sub-task CMS-22 (Code login).
export async function loginUser(
  _prevState: LoginResult | null,
  formData: FormData
): Promise<LoginResult> {
  // 1. Read form values
  const rawData = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  // 2. Validate with zod on the server
  const parsed = loginSchema.safeParse(rawData);
  if (!parsed.success) {
    return { errors: toFieldErrors(parsed.error.issues) };
  }

  // 3. Ask Supabase to check the email + password
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  // Wrong email or wrong password: same message for both,
  // so nobody can find out which emails are registered.
  if (error) {
    return { message: "Invalid credentials" };
  }

  // 4. Success: refresh the navbar and go to the menu
  revalidatePath("/", "layout");
  redirect("/menu");
}

// Server action: logs the user out and sends them to the home page.
// Jira: CMS-11 (Logout).
export async function logoutUser() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
