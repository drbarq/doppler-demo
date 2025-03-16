import Stripe from "stripe";

export const checkStripeConnection = async () => {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return {
        isConnected: false,
        error: "Stripe secret key is missing",
      };
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Just check if we can access the Stripe API by making a simple request
    await stripe.balance.retrieve();

    return {
      isConnected: true,
    };
  } catch (error) {
    return {
      isConnected: false,
      error: `Failed to connect to Stripe: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
};
