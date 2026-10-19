import Link from "next/link";

// Hardcoded sample data — will be replaced with Supabase query on Tue.
const sampleItems = [
  {
    id: "1",
    name: "Cappuccino",
    description: "Rich espresso with steamed milk foam",
    price: 120,
    category: "Beverages",
  },
  {
    id: "2",
    name: "Cold Coffee",
    description: "Chilled coffee blended with ice cream",
    price: 150,
    category: "Beverages",
  },
  {
    id: "3",
    name: "Veg Sandwich",
    description: "Grilled sandwich with fresh vegetables",
    price: 90,
    category: "Snacks",
  },
  {
    id: "4",
    name: "Brownie",
    description: "Warm chocolate brownie",
    price: 110,
    category: "Desserts",
  },
  {
    id: "5",
    name: "Masala Tea",
    description: "Traditional Indian spiced tea",
    price: 40,
    category: "Beverages",
  },
];

// Menu list page — shows all menu items in a grid.
// Today: hardcoded data. Tomorrow: fetched from Supabase.
export default function MenuPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Our Menu</h1>
        <Link href="/menu/add" className="btn btn-primary">
          + Add Item
        </Link>
      </div>

      <div className="menu-grid">
        {sampleItems.map((item) => (
          <div key={item.id} className="menu-card">
            <span className="category">{item.category}</span>
            <h3>{item.name}</h3>
            <p className="description">{item.description}</p>
            <p className="price">₹{item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
