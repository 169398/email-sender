# Want to send 100 emails at once  with Next.js 15 

This application allows you to send personalized emails to multiple recipients in batches, using Next.js 15 App Router, TypeScript, and Nodemailer. Each recipient receives a customized greeting, while the email body remains the same for all.

## Features

- Bulk email sending with personalized greetings.
- Throttling emails to avoid SMTP limits (20 emails per minute).
- Configured to work with Outlook SMTP, requiring app passwords or Microsoft Graph if additional permissions are required.

## Prerequisites

- **Node.js** (v16+)
- **Next.js 15 or any **
- **TypeScript**
- **G-mail account** with app password enabled or SMTP access configured (see configuration below).
- **Outlook account** with app password enabled or SMTP access configured (see configuration below).

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/169398/email-sender
```
cd your-repo
2. Install Dependencies
bash
Copy code
npm install
3. Configure Environment Variables
Create a .env.local file in the root of your project with the following variables:

plaintext
```bash
EMAILtestidris@gmail.com
EMAIL_PASSWORD=your_outlook_app_password_or_smtp_password
```
Note: For an Outlook email, use either the app password (if MFA is enabled) or SMTP credentials. Refer to the Microsoft SMTP Configuration Guide if you encounter authentication errors.

4. Run the Application
To run the app in development mode, use:

```bash
npm run dev
The application should now be accessible at http://localhost:3000.
```
## Usage

To send a batch of emails:

- Send a `POST` request to the `/api/sendEmails` endpoint with the following payload:
- Don't worry; you will have a user interface to send the emails.

```json
{
  "recipients": [
    { "name": "John Doe", "email": "john.doe@example.com" },
    { "name": "Jane Smith", "email": "jane.smith@example.com" }
  ],
  "subject": "Your Subject Here",
  "text": "Your email body content here"
}

```





