# Bug Tracking Log — Cafe Management System

Local mirror of Jira bugs. Each entry matches a Jira Bug issue.

| Bug ID | Description | Steps to Reproduce | Severity / Priority | Status | Resolution |
|---|---|---|---|---|---|
| CMS-24 | Add Menu Item page is accessible without login | 1. Open the app without logging in. 2. Go to /menu/add. 3. Fill Name "Test Item" and Price 100, then click Add Item. Expected: user is redirected to /login. Actual: the item is saved without any login. | High | Open | Pending. To be fixed on Friday 23 Oct when the login check is added to /menu/add (CMS-22), then retested. |

<!-- More bugs will be logged here as they are found during testing. -->
