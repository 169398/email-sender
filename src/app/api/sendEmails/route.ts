import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

interface Recipient {
  name: string;
  email: string;
}

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
    for (const recipient of recipients) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: recipient.email,
        subject,
        text: `Dear ${recipient.name},\n\n${text}`,
      };

      await transporter.sendMail(mailOptions);
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
