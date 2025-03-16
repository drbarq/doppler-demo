import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export async function GET() {
  try {
    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    const senderEmail = process.env.SENDGRID_SENDER_EMAIL;

    if (!sendgridApiKey || !senderEmail) {
      return NextResponse.json({
        isConnected: false,
        error: "Missing SendGrid credentials",
      });
    }

    sgMail.setApiKey(sendgridApiKey);

    // Test the API key by getting email statistics
    // This is a lightweight call that doesn't send any emails
    await sgMail.client.stats.get({
      aggregated_by: "day",
      start_date: new Date(Date.now() - 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    });

    return NextResponse.json({ isConnected: true });
  } catch (error) {
    return NextResponse.json({
      isConnected: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to connect to SendGrid",
    });
  }
}
