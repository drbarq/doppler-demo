import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { Attachment } from "../../../lib/email/mock-attachment";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const apiKey = process.env.SENDGRID_API_KEY;
    const senderEmail = process.env.SENDGRID_SENDER_EMAIL;

    if (!apiKey || !senderEmail) {
      return NextResponse.json(
        { error: "SendGrid configuration is missing" },
        { status: 500 }
      );
    }

    sgMail.setApiKey(apiKey);

    const msg = {
      to: email,
      from: senderEmail,
      subject: "Test Email from Doppler Demo",
      text: "This is a test email sent from the Doppler Demo application.",
      html: "<strong>This is a test email sent from the Doppler Demo application.</strong>",
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SendGrid error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
