"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addMenuItem } from "./actions";
import type { AddMenuItemResult } from "./actions";

// Add Menu Item form — client component with validation and server action.
// Jira: CMS-4 (Add Menu Item), sub-tasks CMS-15 (Design) and CMS-16 (Code).
// Login protection will be added on Friday (CMS-10 integration).

export default function AddMenuItemPage() {
  const router = useRouter();

  // useActionState connects the form to the server action.
  // It gives us the current state (errors/success) and a form action to use.
  const [state, formAction, isPending] = useActionState<AddMenuItemResult | null, FormData>(
    addMenuItem,
    null
  );

  // When the server action returns success, redirect to the menu page
  useEffect(() => {
    if (state?.success) {
      router.push("/menu");
    }
  }, [state?.success, router]);

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: "1.5rem" }}>Add Menu Item</h1>

      <div className="card">
        {/* Show general error (e.g. database failure) */}
        {state?.message && !state.success && (
          <p className="error-text" style={{ marginBottom: "1rem" }}>
            {state.message}
          </p>
        )}

        <form action={formAction}>
          {/* Item name */}
          <div className="form-group">
            <label htmlFor="name">Item Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Cappuccino"
              required
              minLength={2}
              maxLength={50}
            />
            {state?.errors?.name && (
              <p className="error-text">{state.errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Short description of the item (max 200 chars)"
              maxLength={200}
            />
            {state?.errors?.description && (
              <p className="error-text">{state.errors.description}</p>
            )}
          </div>

          {/* Price */}
          <div className="form-group">
            <label htmlFor="price">Price (₹) *</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0.01"
              max="10000"
              placeholder="e.g. 120.00"
              required
            />
            {state?.errors?.price && (
              <p className="error-text">{state.errors.price}</p>
            )}
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category">
              <option value="">Select a category</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>
              <option value="Desserts">Desserts</option>
              <option value="Main Course">Main Course</option>
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add Item"}
          </button>
        </form>
      </div>
    </div>
  );
}
