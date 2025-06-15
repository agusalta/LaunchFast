
import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUBLISHABLE_KEY = "pk_test_51NOGLbIeCmoKndoZy8gyo1OHPwlVAV67kl...replace_with_yours...";

export async function redirectToStripeCheckoutSession(sessionId: string) {
  // Use the hardcoded publishable key and handle redirection
  const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);

  if (!stripe) {
    throw new Error(
      "Failed to load Stripe. Please refresh the page and try again."
    );
  }

  const result = await stripe.redirectToCheckout({
    sessionId,
  });

  if (result.error) {
    if (result.error.type === "invalid_request_error") {
      throw new Error(
        "The checkout session has expired. Please try again."
      );
    } else if (result.error.type === "card_error") {
      throw new Error(
        "Payment method issue. Please try a different payment method."
      );
    }
    throw new Error(
      result.error.message || "Payment processing failed. Please try again."
    );
  }
}
