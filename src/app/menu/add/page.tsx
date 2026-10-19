// Add Menu Item form layout — no logic yet.
// Jira: CMS-4 (Add Menu Item), sub-task CMS-15 (Design add item form).
// Business logic (CMS-16) will be added on Tue.

export default function AddMenuItemPage() {
  return (
    <div className="page-container">
      <h1 style={{ marginBottom: "1.5rem" }}>Add Menu Item</h1>

      <div className="card">
        <form>
          {/* Item name */}
          <div className="form-group">
            <label htmlFor="name">Item Name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Cappuccino"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={3}
              placeholder="Short description of the item"
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label htmlFor="price">Price (₹)</label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="e.g. 120.00"
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category">
              <option value="">Select a category</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>
              <option value="Desserts">Desserts</option>
              <option value="Main Course">Main Course</option>
            </select>
          </div>

          {/* Submit button — does nothing today */}
          <button type="submit" className="btn btn-primary">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}
