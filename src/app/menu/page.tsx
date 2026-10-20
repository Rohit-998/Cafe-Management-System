import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

// Menu page — fetches menu items from Supabase and displays them.
// This is a server component, so the query runs on the server (no "use client").
// Jira: CMS-3 (View Cafe Menu), sub-task CMS-13 (Code menu display).

export default async function MenuPage() {
  const supabase = await createClient();

  // Fetch all menu items, sorted by newest first
  const { data: items, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Our Menu</h1>
        <Link href="/menu/add" className="btn btn-primary">
          + Add Item
        </Link>
      </div>

      {/* Show error message if the query failed */}
      {error && (
        <div className="card" style={{ borderColor: "var(--error)" }}>
          <p style={{ color: "var(--error)", margin: 0 }}>
            ⚠ Could not load menu items. Please try again later.
          </p>
        </div>
      )}

      {/* Show friendly message if no items exist */}
      {!error && (!items || items.length === 0) && (
        <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ fontSize: "1.1rem", color: "#666" }}>
            No menu items yet. Be the first to add one!
          </p>
          <Link href="/menu/add" className="btn btn-primary">
            + Add Menu Item
          </Link>
        </div>
      )}

      {/* Render the menu items grid */}
      {items && items.length > 0 && (
        <div className="menu-grid">
          {items.map((item) => (
            <div key={item.id} className="menu-card">
              <span className="category">{item.category ?? "Uncategorised"}</span>
              <h3>{item.name}</h3>
              {item.description && (
                <p className="description">{item.description}</p>
              )}
              <p className="price">₹{Number(item.price).toFixed(2)}</p>
              {!item.is_available && (
                <p style={{ color: "var(--error)", fontSize: "0.85rem", margin: 0 }}>
                  Currently unavailable
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
