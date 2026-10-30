import { describe, it, expect } from "vitest";
import { menuItemSchema } from "./menu";

// Unit tests for the menu item validator (Boundary Value Analysis).
// These match manual test cases TC-04 to TC-10.
// Jira: CMS-20 (unit tests), CMS-10 (Validate Inputs).
// Run with: npm test

// A valid item we can change one field at a time
const validItem = { name: "Latte", description: "", price: 130, category: "Beverages" };

function firstError(result: { success: boolean; error?: { issues: { message: string }[] } }) {
  return result.error?.issues[0]?.message;
}

describe("menu item price (> 0 and <= 10000)", () => {
  it("rejects 0 (at lower boundary)", () => {
    const r = menuItemSchema.safeParse({ ...validItem, price: 0 });
    expect(r.success).toBe(false);
    expect(firstError(r)).toBe("Price must be greater than 0");
  });

  it("accepts 0.01 (just above lower boundary)", () => {
    expect(menuItemSchema.safeParse({ ...validItem, price: 0.01 }).success).toBe(true);
  });

  it("accepts 10000 (at max)", () => {
    expect(menuItemSchema.safeParse({ ...validItem, price: 10000 }).success).toBe(true);
  });

  it("rejects 10001 (just above max)", () => {
    const r = menuItemSchema.safeParse({ ...validItem, price: 10001 });
    expect(r.success).toBe(false);
    expect(firstError(r)).toBe("Price must be at most 10000");
  });

  it("rejects a non-number price", () => {
    const r = menuItemSchema.safeParse({ ...validItem, price: Number("abc") });
    expect(r.success).toBe(false);
    expect(firstError(r)).toBe("Price must be a number");
  });
});

describe("menu item name (2 to 50 characters)", () => {
  it("rejects 1 character", () => {
    const r = menuItemSchema.safeParse({ ...validItem, name: "A" });
    expect(r.success).toBe(false);
    expect(firstError(r)).toBe("Name must be at least 2 characters");
  });

  it("accepts 2 characters", () => {
    expect(menuItemSchema.safeParse({ ...validItem, name: "Ab" }).success).toBe(true);
  });
});

describe("menu item description (max 200 characters)", () => {
  it("accepts 200 characters", () => {
    expect(menuItemSchema.safeParse({ ...validItem, description: "a".repeat(200) }).success).toBe(true);
  });

  it("rejects 201 characters", () => {
    const r = menuItemSchema.safeParse({ ...validItem, description: "a".repeat(201) });
    expect(r.success).toBe(false);
    expect(firstError(r)).toBe("Description must be at most 200 characters");
  });
});
