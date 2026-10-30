# Test Cases — Cafe Management System

## Menu Module (CMS-1)

| Test Case ID | Module | Test Scenario | Test Data | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| TC-01 | Menu - View | View menu loads items from database | Open /menu with 5 seed items in DB | All 5 seed items displayed with name, price, category | 5 seed items displayed with name, price and category | Pass |
| TC-02 | Menu - Add | Add a valid menu item | Name: "Latte", Price: 130, Category: Beverages | Item saved and appears in /menu list | Latte (Rs 130, Beverages) saved and shown in /menu | Pass |
| TC-03 | Menu - Add | Submit with empty name | Name: "", Price: 100 | Error shown: "Name must be at least 2 characters", item not saved | Browser blocked submit with "Please fill out this field." Nothing saved | Pass |
| TC-04 | Menu - Add | Name with 1 character (BVA - below min) | Name: "A", Price: 100 | Error shown: "Name must be at least 2 characters" | Browser blocked submit with "Please lengthen this text to 2 characters or more (you are currently using 1 character)." Nothing saved | Pass |
| TC-05 | Menu - Add | Name with 2 characters (BVA - at min) | Name: "Ab", Price: 100 | Item saved successfully, appears in /menu | Item "Ab" (Rs 100) saved and shown in /menu | Pass |
| TC-06 | Menu - Add | Price 0 (BVA - at boundary) | Name: "Test Item", Price: 0 | Error shown: "Price must be greater than 0" | Validation behaved as expected | Pass |
| TC-07 | Menu - Add | Price 0.01 (BVA - just above min) | Name: "Test Item", Price: 0.01 | Item saved successfully, appears in /menu | Validation behaved as expected | Pass |
| TC-08 | Menu - Add | Price 10000 (BVA - at max) | Name: "Test Item", Price: 10000 | Item saved successfully, appears in /menu | Validation behaved as expected | Pass |
| TC-09 | Menu - Add | Price 10001 (BVA - above max) | Name: "Test Item", Price: 10001 | Error shown: "Price must be at most 10000" | Validation behaved as expected | Pass |
| TC-10 | Menu - Add | Description exceeds 200 characters | Name: "Test Item", Price: 100, Description: 201 chars of text | Error shown: "Description must be at most 200 characters" | Validation behaved as expected | Pass |

### Testing Techniques Used
- **Functional Testing**: TC-01, TC-02 (core features work)
- **Boundary Value Analysis (BVA)**: TC-04, TC-05 (name min), TC-06, TC-07 (price min), TC-08, TC-09 (price max), TC-10 (description max)
- **Equivalence Partitioning**: Valid class (TC-02, TC-05, TC-07, TC-08) vs Invalid class (TC-03, TC-04, TC-06, TC-09, TC-10)
- **Validation Testing**: TC-03, TC-04, TC-06, TC-09, TC-10 (input validation rules enforced)

### Test Summary
- **Total test cases**: 10
- **Passed**: 10
- **Failed**: 0
- **Tested by**: Rohit
- **Date**: 21 Oct 2026
- **Environment**: Next.js + Supabase running on localhost

> **Note:** TC-03 and TC-04 errors came from browser-level HTML validation (required/minlength); zod validation also runs on the server.

### Defects Found
- **CMS-24** — Add Menu Item page accessible without login (High, Open). Logged in Jira and docs/bugs.md. To be fixed on Fri 23 Oct and retested.

## Login & Registration Module (CMS-2)

| Test Case ID | Module | Test Scenario | Test Data | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| TC-11 | Register | Register with valid details | Name: "Test User", Email: test1@example.com, Password: "secret1", Confirm: "secret1" | Account created, redirected to /menu, navbar shows "Hi, Test User" and Logout; new row in profiles table with full_name "Test User" | | |
| TC-12 | Register | Register with an email that already exists | Name: "Test User", Email: test1@example.com (from TC-11), Password: "secret1", Confirm: "secret1" | Error under Email: "Email already exists", no new account created | | |
| TC-13 | Register | Register with invalid email format | Name: "Test User", Email: "abc", Password: "secret1", Confirm: "secret1" | Error under Email: "Enter a valid email", form not submitted | | |
| TC-14 | Register | Submit with all fields empty | All fields blank | Errors shown: "Name must be at least 2 characters", "Email is required", "Password must be at least 6 characters"; form not submitted | | |
| TC-15 | Register | Password 5 characters (BVA - below min) | Email: test2@example.com, Password/Confirm: "abcde" | Error under Password: "Password must be at least 6 characters" | | |
| TC-16 | Register | Password 6 characters (BVA - at min) | Name: "Six Char", Email: test3@example.com, Password/Confirm: "abcdef" | Account created, redirected to /menu | | |
| TC-17 | Register | Password 64 characters (BVA - at max) | Name: "Max Pass", Email: test4@example.com, Password/Confirm: "Abcdefgh" repeated 8 times (64 chars) | Account created, redirected to /menu | | |
| TC-18 | Register | Password 65 characters (BVA - above max) | Email: test5@example.com, Password/Confirm: "Abcdefgh" x8 + "X" (65 chars) | Error under Password: "Password must be at most 64 characters" | | |
| TC-19 | Register | Passwords do not match | Email: test6@example.com, Password: "secret1", Confirm: "secret2" | Error under Confirm Password: "Passwords do not match", no account created | | |
| TC-20 | Login | Login with valid credentials | Email: test1@example.com, Password: "secret1" | Redirected to /menu, navbar shows "Hi, Test User" and Logout | | |
| TC-21 | Login | Login with wrong password | Email: test1@example.com, Password: "wrong123" | Error: "Invalid credentials", user stays on /login, navbar still shows Login/Register | | |
| TC-22 | Logout | Logout while logged in | Logged in as test1@example.com, click Logout | Redirected to / (home), navbar shows Login and Register again | | |
| TC-23 | Integration | Open /menu/add while logged out (CMS-24 retest) | Logged out, type http://localhost:3000/menu/add in address bar | Redirected to /login, Add Menu Item form is NOT shown | | |
| TC-24 | Integration | Log in, then add a menu item | Login as test1@example.com / "secret1", open /menu/add, Name: "Masala Chai", Price: 40, Category: Beverages | Item saved, redirected to /menu, "Masala Chai" listed; in Supabase menu_items row created_by = test1's user id | | |

### Testing Techniques Used (Login & Registration)
- **Functional Testing**: TC-11, TC-20, TC-22 (register, login, logout work)
- **Boundary Value Analysis (BVA)**: TC-15, TC-16 (password min), TC-17, TC-18 (password max)
- **Equivalence Partitioning**: Valid class (TC-11, TC-16, TC-17, TC-20) vs Invalid class (TC-12, TC-13, TC-14, TC-15, TC-18, TC-19, TC-21)
- **Validation Testing**: TC-13, TC-14, TC-15, TC-18, TC-19
- **Integration Testing**: TC-23, TC-24 (Login module protects the Menu module)

### Unit Tests (Vitest)
Automated tests for the zod validators live in `src/lib/validations/auth.test.ts` and `src/lib/validations/menu.test.ts`. Run with `npm test`.
- Password: 5, 6, 64, 65 chars
- Name: 1, 2, 50, 51 chars
- Price: 0, 0.01, 10000, 10001, non-number
- Email: valid and invalid formats, empty
- Passwords do not match, all fields empty

