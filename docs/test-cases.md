# Test Cases — Cafe Management System

## Menu Module (CMS-1)

| Test Case ID | Module | Test Scenario | Test Data | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| TC-01 | Menu - View | View menu loads items from database | Open /menu with 5 seed items in DB | All 5 seed items displayed with name, price, category | | |
| TC-02 | Menu - Add | Add a valid menu item | Name: "Latte", Price: 130, Category: Beverages | Item saved and appears in /menu list | | |
| TC-03 | Menu - Add | Submit with empty name | Name: "", Price: 100 | Error shown: "Name must be at least 2 characters", item not saved | | |
| TC-04 | Menu - Add | Name with 1 character (BVA - below min) | Name: "A", Price: 100 | Error shown: "Name must be at least 2 characters" | | |
| TC-05 | Menu - Add | Name with 2 characters (BVA - at min) | Name: "Ab", Price: 100 | Item saved successfully, appears in /menu | | |
| TC-06 | Menu - Add | Price 0 (BVA - at boundary) | Name: "Test Item", Price: 0 | Error shown: "Price must be greater than 0" | | |
| TC-07 | Menu - Add | Price 0.01 (BVA - just above min) | Name: "Test Item", Price: 0.01 | Item saved successfully, appears in /menu | | |
| TC-08 | Menu - Add | Price 10000 (BVA - at max) | Name: "Test Item", Price: 10000 | Item saved successfully, appears in /menu | | |
| TC-09 | Menu - Add | Price 10001 (BVA - above max) | Name: "Test Item", Price: 10001 | Error shown: "Price must be at most 10000" | | |
| TC-10 | Menu - Add | Description exceeds 200 characters | Name: "Test Item", Price: 100, Description: 201 chars of text | Error shown: "Description must be at most 200 characters" | | |

### Testing Techniques Used
- **Functional Testing**: TC-01, TC-02 (core features work)
- **Boundary Value Analysis (BVA)**: TC-04, TC-05 (name min), TC-06, TC-07 (price min), TC-08, TC-09 (price max), TC-10 (description max)
- **Equivalence Partitioning**: Valid class (TC-02, TC-05, TC-07, TC-08) vs Invalid class (TC-03, TC-04, TC-06, TC-09, TC-10)
- **Validation Testing**: TC-03, TC-04, TC-06, TC-09, TC-10 (input validation rules enforced)

<!-- Login/Registration test cases will be added on Friday. -->
