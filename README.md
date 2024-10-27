# Bulk Email Sender with Next.js 15

This application allows you to send personalized emails to multiple recipients in batches, using Next.js 15 App Router, TypeScript, and Nodemailer. Each recipient receives a customized greeting, while the email body remains the same for all.

## Features

- Bulk email sending with personalized greetings
- Throttling to avoid SMTP limits (20 emails per minute)
- Supports Gmail SMTP configuration
- User-friendly interface for sending emails

## Prerequisites

- Node.js (v16+)
- Next.js 15
- TypeScript
- Gmail account with app password enabled

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/email-sender
cd email-sender
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```plaintext
EMAIL=your-gmail@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

Note: You need to use an app password for your Gmail account. Follow these steps to set it up:
1. Go to your Google Account settings
2. Navigate to Security
3. Under "Signing in to Google," select "App Passwords"
4. Generate a new app password for "Mail" and "Other (Custom name)"
5. Use this generated password in your `.env.local` file

### 4. Run the Application

To run the app in development mode, use:

```bash
npm run dev
```

The application should now be accessible at http://localhost:3000.

## Usage

1. Open your browser and navigate to http://localhost:3000
2. You'll see a user interface with fields for:
   - Recipient email addresses (comma-separated)
   - Email subject
   - Email body
3. Fill in the required information
4. Click the "Send Emails" button to start the bulk email process
5. The application will send personalized emails to each recipient and display the results

## Important Notes

- The application uses Gmail's SMTP server, which has a limit of 500 emails per day for free accounts
- Emails are sent in batches to avoid rate limiting (20 emails per minute)
- Make sure your Gmail account has "Less secure app access" enabled or use an app password as described above

## Troubleshooting

If you encounter any issues with authentication or sending emails, double-check your Gmail app password and ensure it's correctly set in the `.env.local` file.

## Contributing

Feel free to submit issues or pull requests if you have suggestions for improvements or find any bugs.

## License

This project is open-source and available under the MIT License.
