import { z } from "zod";

// Zod schema for adding a menu item.
// Used on BOTH client (form validation) and server (server action).
// Rules come from the PBL coding requirements.

export const menuItemSchema = z.object({
  // Item name: required, 2 to 50 characters
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  // Description: optional, at most 200 characters
  description: z
    .string()
    .trim()
    .max(200, "Description must be at most 200 characters")
    .optional()
    .or(z.literal("")),

  // Price: required, must be > 0 and <= 10000
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .gt(0, "Price must be greater than 0")
    .lte(10000, "Price must be at most 10000"),

  // Category: optional free text
  category: z.string().trim().optional().or(z.literal("")),
});

// TypeScript type inferred from the schema
export type MenuItemInput = z.infer<typeof menuItemSchema>;
