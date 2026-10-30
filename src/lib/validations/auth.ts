import { z } from "zod";

// Zod schemas for authentication forms.
// Used on BOTH client (before submit) and server (inside the server action).
// Jira: CMS-8 (Register Account), CMS-10 (Validate Inputs).

// Email: required and must look like a valid email address
export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email");

// Password: 6 to 64 characters
export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(64, "Password must be at most 64 characters");

// Full name: 2 to 50 characters
export const fullNameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be at most 50 characters");

// Register form: full name + email + password + confirm password
export const registerSchema = z
  .object({
    fullName: fullNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

// Helper: turn zod issues into a simple { fieldName: "first error message" } object
export function toFieldErrors(
  issues: { path: PropertyKey[]; message: string }[]
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of issues) {
    const field = String(issue.path[0]);
    if (!errors[field]) errors[field] = issue.message;
  }
  return errors;
}
