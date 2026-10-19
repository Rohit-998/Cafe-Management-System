# Cafe Management System

## Problem Statement

A small cafe needs a simple system to manage its menu items (view, add, edit, delete) and user accounts (register, login). This project builds two modules to solve that problem.

## Modules

### Module 1: Menu & Order Management (Epic CMS-1)

- **View Menu** — Display all menu items with name, description, price, and category.
- **Add Menu Item** — Authenticated users can add new items to the menu.
- **Edit / Delete Menu Item** — (Optional) Modify or remove existing items.

**Functional Requirements:**

- Menu items are stored in a Supabase Postgres database.
- Anyone can view the menu (public read).
- Only logged-in users can add items (protected route).
- Input validation: name (2–50 chars), price (>0, ≤10 000), description (≤200 chars).

### Module 2: User Login & Registration (Epic CMS-2)

- **Register** — Create a new account with full name, email, and password.
- **Login** — Authenticate with email and password.
- **Logout** — End the current session.

**Functional Requirements:**

- Uses Supabase Auth (email + password). Passwords are never stored by us.
- Validation: email (valid format), password (6–64 chars), full name (2–50 chars).
- Clear error messages for invalid input, duplicate email, wrong credentials.

### Integration

The **Add Menu Item** page (`/menu/add`) is protected. If a user is not logged in, they are redirected to `/login`. This connects the two modules.

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

# 5. Start the dev server
npm run dev

# Open http://localhost:3000
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

## Project Structure

```
src/
  app/
    layout.tsx          ← Root layout with navbar
    page.tsx            ← Home page
    menu/
      page.tsx          ← Menu list (CMS-3)
      add/
        page.tsx        ← Add item form (CMS-4)
    login/
      page.tsx          ← Login form (CMS-9)
    register/
      page.tsx          ← Register form (CMS-8)
  lib/
    supabase/
      client.ts         ← Browser Supabase client
      server.ts         ← Server Supabase client
supabase/
  schema.sql            ← Database schema, RLS, seeds
docs/
  test-cases.md         ← PBL test case table
  bugs.md               ← Bug tracking mirror
```
