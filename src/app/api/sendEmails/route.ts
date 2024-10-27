import nodemailer from "nodemailer";
import { NextResponse, NextRequest } from "next/server";
import { OutputData } from '@editorjs/editorjs';
import { convertToHtml } from "@/utils/editorjsParser";

interface Recipient {
  name: string;
  email: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    senderEmail,
    senderPassword,
    recipients,
    subject,
    text,
    emailProvider,
    useGreeting, // Add this line
  }: {
    senderEmail: string;
    senderPassword: string;
    recipients: Recipient[];
    subject: string;
    text: string;
    emailProvider: "gmail" | "outlook";
    useGreeting: boolean; // Add this line
  } = body;

  // Parse the Editor.js JSON data
  const editorData: OutputData = JSON.parse(text);
  
  // Convert to HTML
  const htmlContent = convertToHtml(editorData);

  // Determine SMTP host based on email provider
  const host =
    emailProvider === "gmail" ? "smtp.gmail.com" : "smtp.office365.com";

  const transporter = nodemailer.createTransport({
    host: host,
    port: 587,
    secure: false,
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  const MAX_RETRIES = 3;

  // Create a ReadableStream to send progress
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const total = recipients.length;
        let sent = 0;
        let failed = 0;
        const failedEmails: string[] = [];

        for (let i = 0; i < recipients.length; i++) {
          const recipient = recipients[i];
          const mailOptions = {
            from: senderEmail,
            to: recipient.email,
            subject,
            html: useGreeting
              ? `<p>Dear ${recipient.name},</p>${htmlContent}`
              : htmlContent,
            attachments: editorData.blocks
              .filter(block => block.type === 'image')
              .map(block => ({
                filename: `image-${block.id}.png`,
                content: block.data.file.url.split(',')[1],
                encoding: 'base64',
                cid: block.id
              }))
          };

          let attempt = 0;
          let success = false;
          let errorMsg = "";

          while (attempt < MAX_RETRIES && !success) {
            try {
              await transporter.sendMail(mailOptions);
              sent += 1;
              success = true;
              // Send progress update
              controller.enqueue(
                encoder.encode(
                  JSON.stringify({
                    status: "success",
                    email: recipient.email,
                    sent,
                    total,
                  }) + "\n"
                )
              );
            } catch (error) {
              attempt += 1;
              errorMsg = (error as Error).message;
              if (attempt >= MAX_RETRIES) {
                failed += 1;
                failedEmails.push(recipient.email);
                // Send progress update
                controller.enqueue(
                  encoder.encode(
                    JSON.stringify({
                      status: "error",
                      email: recipient.email,
                      error: errorMsg,
                      sent,
                      total,
                    }) + "\n"
                  )
                );
              }
              // Wait before retrying
              await new Promise((resolve) => setTimeout(resolve, 2000));
            }
          }

          // Throttle to 20 emails per minute (3000 ms delay after every email)
          if ((i + 1) % 20 === 0) {
            console.log("Waiting for 1 minute to send the next batch...");
            await new Promise((resolve) => setTimeout(resolve, 60000)); // 1-minute delay every 20 emails
          } else {
            await new Promise((resolve) => setTimeout(resolve, 3000)); // 3-second delay between each email
          }
        }

        // Send final summary
        controller.enqueue(
          encoder.encode(
            JSON.stringify({ status: "complete", sent, failed, failedEmails }) +
              "\n"
          )
        );

        controller.close();
      } catch (error) {
        controller.error(error as Error);
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });
}
