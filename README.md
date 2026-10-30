# Cafe Management System

## Problem Statement

A small cafe needs a simple system to manage its menu items (view, add, edit, delete) and user accounts (register, login). This project builds two modules to solve that problem.

## Modules

### Module 1: Menu & Order Management (Epic CMS-1)

- **View Menu** (`/menu`) — Shows all menu items from Supabase with name, description, price, and category. Anyone can view it.
- **Add Menu Item** (`/menu/add`) — Logged-in users can add a new item. The form is checked with zod in the browser and again on the server. The item is saved with `created_by` = the logged-in user's id.
- **Edit / Delete Menu Item** — (Optional, not built.)

**Functional Requirements:**

- Menu items are stored in a Supabase Postgres database.
- Anyone can view the menu (public read).
- Only logged-in users can add items (protected route + database RLS policy).
- Input validation: name (2–50 chars), price (>0, ≤10 000), description (≤200 chars).

### Module 2: User Login & Registration (Epic CMS-2)

- **Register** (`/register`) — Create an account with full name, email, password and confirm password. The full name is saved in Supabase user metadata, and a database trigger copies it into the `profiles` table. After registering, the user is logged in and sent to `/menu`.
- **Login** (`/login`) — Log in with email and password using Supabase `signInWithPassword`. Wrong email or password shows "Invalid credentials".
- **Logout** — The Logout button in the navbar ends the session and returns to the home page.
- **Navbar** — Shows Login / Register when logged out, and "Hi, <name>" + Logout when logged in.

**Functional Requirements:**

- Uses Supabase Auth (email + password). Passwords are never stored by us.
- Validation: email (valid format, required), password (6–64 chars), full name (2–50 chars), passwords must match.
- Clear error messages: "Email already exists", "Enter a valid email", "Password must be at least 6 characters", "Passwords do not match", "Invalid credentials".

### Integration

The **Add Menu Item** page (`/menu/add`) is protected. If a user is not logged in, they are redirected to `/login`. The check runs in two places: when the page loads, and inside the server action that saves the item. This connects the two modules (fix for bug CMS-24).

## Tech Stack

| Layer    | Technology                       |
| -------- | -------------------------------- |
| Frontend | Next.js 15 (App Router), React 19 |
| Styling  | Tailwind CSS v4                  |
| Language | TypeScript                       |
| Backend  | Supabase (Postgres + Auth)       |
| Testing  | Vitest, manual test cases        |

## How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Rohit-998/Cafe-Management-System.git
cd Cafe-Management-System

# 2. Install dependencies
npm install

# 3. Create your env file
cp .env.example .env.local
# Then edit .env.local and add your Supabase URL and anon key.

# 4. Set up the database
# Go to your Supabase dashboard → SQL Editor → paste supabase/schema.sql → Run.

# 5. Turn off email confirmation (for local testing)
# Supabase dashboard → Authentication → Sign In / Providers → Email → turn OFF "Confirm email" → Save.

# 6. Start the dev server
npm run dev

# Open http://localhost:3000
```

### Run the unit tests

```bash
npm test
```

This runs the Vitest tests for the zod validators (`src/lib/validations/*.test.ts`). All tests should pass.

### Production build

```bash
npm run build
npm start
```

## Jira Mapping

| Jira Key | Type    | Title                        | Maps To                   |
| -------- | ------- | ---------------------------- | ------------------------- |
| CMS-1    | Epic    | Menu & Order Management      | `/menu`, `/menu/add`      |
| CMS-2    | Epic    | User Login & Registration    | `/login`, `/register`     |
| CMS-3    | Story   | View Cafe Menu               | `/menu` page              |
| CMS-4    | Story   | Add Menu Item                | `/menu/add` page          |
| CMS-5    | Story   | Edit or Delete Menu Item     | (optional)                |
| CMS-8    | Story   | Register Account             | `/register` page          |
| CMS-9    | Story   | Login                        | `/login` page             |
| CMS-10   | Story   | Validate Inputs              | Zod schemas, form errors  |
| CMS-11   | Story   | Logout                       | Navbar logout button      |
| CMS-24   | Bug     | Add Menu Item page accessible without login | Login check in `/menu/add` page + action |

## Project Structure

```
src/
  middleware.ts           ← Keeps the Supabase login session fresh on every request
  app/
    layout.tsx            ← Root layout with navbar
    page.tsx              ← Home page
    menu/
      page.tsx            ← Menu list (CMS-3)
      add/
        page.tsx          ← Login check, then shows the form (CMS-4, CMS-24)
        AddMenuItemForm.tsx ← Add item form (client)
        actions.ts        ← Server action: login check + validate + insert
    login/
      page.tsx            ← Login form (CMS-9)
      actions.ts          ← Server actions: login + logout (CMS-22, CMS-11)
    register/
      page.tsx            ← Register form (CMS-8)
      actions.ts          ← Server action: sign up (CMS-19)
  components/
    Navbar.tsx            ← Shows Login/Register or name + Logout
  lib/
    supabase/
      client.ts           ← Browser Supabase client
      server.ts           ← Server Supabase client
    validations/
      menu.ts             ← Zod rules for menu items
      auth.ts             ← Zod rules for register/login
      menu.test.ts        ← Vitest unit tests (menu)
      auth.test.ts        ← Vitest unit tests (auth)
supabase/
  schema.sql              ← Database schema, RLS, seeds
docs/
  test-cases.md           ← PBL test case table
  bugs.md                 ← Bug tracking mirror
```
