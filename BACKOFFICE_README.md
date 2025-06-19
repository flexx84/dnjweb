# Backoffice Usage

`backoffice/index.html` opens the administration interface.

Default login password is `admin123`.

## Features

- **Login Required**: the server verifies your password and maintains a session.
- **Page Editor**: pick a page from the list and toggle design mode to edit it directly in the browser, then click "저장" to save.
- **공지 발송**: send an email to all addresses in `data/employees.csv`.

These scripts remain simplified. Add proper user management and input validation for real deployments.
