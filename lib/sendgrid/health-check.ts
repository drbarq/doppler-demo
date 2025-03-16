import sgMail from "@sendgrid/mail";

export const checkSendGridConnection = async () => {
  try {
    const sendgridKey = process.env.SENDGRID_API_KEY;
    const fromEmail = process.env.SENDGRID_FROM_EMAIL;

    if (!sendgridKey || !fromEmail) {
      return {
        isConnected: false,
        error: "SendGrid credentials are missing",
      };
    }

    sgMail.setApiKey(sendgridKey);

    // We'll just verify the API key is valid by getting the sender verification status
    await sgMail.get({
      url: "/v3/verified_senders",
      method: "GET",
    });

    return {
      isConnected: true,
    };
  } catch (error) {
    return {
      isConnected: false,
      error: `Failed to connect to SendGrid: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};
