# Bug Tracking Log — Cafe Management System

Local mirror of Jira bugs. Each entry matches a Jira Bug issue.

| Bug ID | Description | Steps to Reproduce | Severity / Priority | Status | Resolution |
|---|---|---|---|---|---|
| CMS-24 | Add Menu Item page is accessible without login | 1. Open the app without logging in. 2. Go to /menu/add. 3. Fill Name "Test Item" and Price 100, then click Add Item. Expected: user is redirected to /login. Actual: the item is saved without any login. | High | Fixed / Retested | Fixed on 30 Oct 2026 in commit "CMS-24: protect /menu/add, redirect to /login when not logged in". The /menu/add page and its server action now check login and redirect to /login; new items save created_by = logged-in user id. Retested via TC-23 (logged out → redirected to /login) and TC-24 (logged in → item added): both Pass. |

<!-- More bugs will be logged here as they are found during testing. -->
