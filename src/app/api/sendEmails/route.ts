import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

interface Recipient {
  name: string;
  email: string;
}

// Helper function to create a delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: Request) {
  const {
    recipients,
    subject,
    text,
  }: { recipients: Recipient[]; subject: string; text: string } =
    await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    // Loop through recipients and send emails with throttling
    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];
      const mailOptions = {
        from: process.env.EMAIL,
        to: recipient.email,
        subject,
        text: `Dear ${recipient.name},\n\n${text}`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${recipient.email}`);

      // Throttle to 20 emails per minute (3000 ms delay after every email)
      if ((i + 1) % 20 === 0) {
        console.log("Waiting for 1 minute to send the next batch...");
        await sleep(60000); // 1-minute delay every 20 emails
      } else {
        await sleep(3000); // 3-second delay between each email
      }
    }

    return NextResponse.json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { message: "Failed to send emails." },
      { status: 500 }
    );
  }
}
