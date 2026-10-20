"use server";

import { createClient } from "@/lib/supabase/server";
import { menuItemSchema } from "@/lib/validations/menu";

// Server action result type
export type AddMenuItemResult = {
  success: boolean;
  errors?: Record<string, string>;  // field-level errors
  message?: string;                 // general error or success message
};

// Server action: validates input and inserts a new menu item into Supabase.
// Called by the form on /menu/add.
// Jira: CMS-4 (Add Menu Item), sub-task CMS-16 (Code add item).
export async function addMenuItem(
  _prevState: AddMenuItemResult | null,
  formData: FormData
): Promise<AddMenuItemResult> {
  // 1. Extract form values
  const rawData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    category: formData.get("category") as string,
  };

  // 2. Validate with zod (server-side check)
  const parsed = menuItemSchema.safeParse(rawData);

  if (!parsed.success) {
    // Convert zod errors into a simple { fieldName: "error message" } object
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { success: false, errors: fieldErrors };
  }

  // 3. Insert into Supabase
  const supabase = await createClient();

  const { error } = await supabase.from("menu_items").insert({
    name: parsed.data.name,
    description: parsed.data.description || null,
    price: parsed.data.price,
    category: parsed.data.category || null,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return {
      success: false,
      message: "Failed to add menu item. Please try again.",
    };
  }

  // 4. Success — the page component will redirect to /menu
  return { success: true, message: "Menu item added successfully!" };
}
