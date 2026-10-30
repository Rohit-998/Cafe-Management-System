import { describe, it, expect } from "vitest";
import { registerSchema, loginSchema, passwordSchema, fullNameSchema, emailSchema } from "./auth";

// Unit tests for the auth validators (Boundary Value Analysis).
// Jira: CMS-20 (Test register), CMS-10 (Validate Inputs).
// Run with: npm test

// Helper: make a string of n characters
const chars = (n: number) => "a".repeat(n);

// Helper: get the first error message from a failed parse
function firstError(result: { success: boolean; error?: { issues: { message: string }[] } }) {
  return result.error?.issues[0]?.message;
}

// A valid form we can change one field at a time
const validRegister = {
  fullName: "Rohit Agrawal",
  email: "rohit@example.com",
  password: "secret1",
  confirmPassword: "secret1",
};

describe("password (6 to 64 characters)", () => {
  it("rejects 5 characters (just below min)", () => {
    const r = passwordSchema.safeParse(chars(5));
    expect(r.success).toBe(false);
    expect(firstError(r)).toBe("Password must be at least 6 characters");
  });

  it("accepts 6 characters (at min)", () => {
    expect(passwordSchema.safeParse(chars(6)).success).toBe(true);
  });

  it("accepts 64 characters (at max)", () => {
    expect(passwordSchema.safeParse(chars(64)).success).toBe(true);
  });

  it("rejects 65 characters (just above max)", () => {
    const r = passwordSchema.safeParse(chars(65));
    expect(r.success).toBe(false);
    expect(firstError(r)).toBe("Password must be at most 64 characters");
  });
});

describe("full name (2 to 50 characters)", () => {
  it("rejects 1 character (just below min)", () => {
    const r = fullNameSchema.safeParse(chars(1));
    expect(r.success).toBe(false);
    expect(firstError(r)).toBe("Name must be at least 2 characters");
  });

  it("accepts 2 characters (at min)", () => {
    expect(fullNameSchema.safeParse(chars(2)).success).toBe(true);
  });

  it("accepts 50 characters (at max)", () => {
    expect(fullNameSchema.safeParse(chars(50)).success).toBe(true);
  });

  it("rejects 51 characters (just above max)", () => {
    const r = fullNameSchema.safeParse(chars(51));
    expect(r.success).toBe(false);
    expect(firstError(r)).toBe("Name must be at most 50 characters");
  });
});

describe("email", () => {
  it.each(["rohit@example.com", "a.b@college.edu.in", "  user@mail.com  "])(
    "accepts valid email %j",
    (email) => {
      expect(emailSchema.safeParse(email).success).toBe(true);
    }
  );

  it.each(["abc", "abc@", "@example.com", "rohit@example", "rohit example@mail.com"])(
    "rejects invalid email %j",
    (email) => {
      const r = emailSchema.safeParse(email);
      expect(r.success).toBe(false);
      expect(firstError(r)).toBe("Enter a valid email");
    }
  );

  it("rejects empty email with 'Email is required'", () => {
    const r = emailSchema.safeParse("");
    expect(r.success).toBe(false);
    expect(firstError(r)).toBe("Email is required");
  });
});

describe("register form", () => {
  it("accepts a fully valid form", () => {
    expect(registerSchema.safeParse(validRegister).success).toBe(true);
  });

  it("rejects passwords that do not match", () => {
    const r = registerSchema.safeParse({ ...validRegister, confirmPassword: "different1" });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0].path).toEqual(["confirmPassword"]);
    expect(firstError(r)).toBe("Passwords do not match");
  });

  it("rejects all-empty fields", () => {
    const r = registerSchema.safeParse({ fullName: "", email: "", password: "", confirmPassword: "" });
    expect(r.success).toBe(false);
    const fields = r.error?.issues.map((i) => i.path[0]);
    expect(fields).toContain("fullName");
    expect(fields).toContain("email");
    expect(fields).toContain("password");
  });
});

describe("login form", () => {
  it("accepts valid email and password", () => {
    expect(loginSchema.safeParse({ email: "rohit@example.com", password: "secret1" }).success).toBe(true);
  });

  it("rejects a 5-character password", () => {
    const r = loginSchema.safeParse({ email: "rohit@example.com", password: chars(5) });
    expect(r.success).toBe(false);
    expect(firstError(r)).toBe("Password must be at least 6 characters");
  });

  it("rejects an invalid email", () => {
    const r = loginSchema.safeParse({ email: "abc", password: "secret1" });
    expect(r.success).toBe(false);
    expect(firstError(r)).toBe("Enter a valid email");
  });
});
