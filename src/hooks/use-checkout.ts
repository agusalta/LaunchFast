import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { loadStripe } from "@stripe/stripe-js";

// HARDCODE your live/test Stripe publishable key here.
const STRIPE_PUBLISHABLE_KEY = "pk_test_51NOGLbIeCmoKndoZy8gyo1OHPwlVAV67kl...replace_with_yours...";

export const useCheckout = () => {
  const { user, session } = useAuth();
  const { toast } = useToast();

  const handlePlanSelection = async (plan: any) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to select a plan",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!plan.priceId || plan.isFree) {
        await activateFreePlan(plan);
      } else {
        await redirectToStripeCheckout(plan);
      }
    } catch (error) {
      console.error("Plan selection error:", error);
      toast({
        title: "Payment Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to process plan selection. Please try again.",
        variant: "destructive",
      });
    }
  };

  const activateFreePlan = async (plan: any) => {
    const trialEndDate = plan.name.toLowerCase().includes("trial")
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      : null;

    const { error } = await supabase.from("subscriptions").upsert(
      {
        user_id: user!.id,
        plan_name: plan.name,
        status: "active",
        price: 0,
        trial_ends_at: trialEndDate,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      }
    );

    if (error) {
      console.error("Error activating free plan:", error);
      throw new Error("Failed to activate free plan");
    }

    toast({
      title: "Plan activated",
      description: `Welcome to ${plan.name}! Your plan has been activated.`,
    });

    window.location.href = "/dashboard?success=true";
  };

  const redirectToStripeCheckout = async (plan: any) => {
    if (!plan.priceId) {
      throw new Error("No price ID configured for this plan");
    }

    // Validate price ID format
    if (!plan.priceId.startsWith("price_")) {
      throw new Error("Invalid price ID format");
    }

    if (!session?.access_token) {
      throw new Error("Authentication required. Please sign in again.");
    }

    toast({
      title: "Redirecting to checkout",
      description: "Please wait while we prepare your checkout session...",
    });

    try {
      console.log(
        "Creating checkout session for plan:",
        plan.name,
        "with price ID:",
        plan.priceId
      );

      const { data, error } = await supabase.functions.invoke(
        "create-checkout-session",
        {
          body: {
            priceId: plan.priceId,
            userId: user!.id,
            planName: plan.name,
            successUrl: `${window.location.origin}/dashboard?success=true`,
            cancelUrl: `${window.location.origin}/#pricing?canceled=true`,
          },
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      // Prefer OAUTH URL from backend if provided
      if (data?.url && typeof data.url === "string") {
        console.log("Opening Stripe checkout via URL in new tab:", data.url);
        window.open(data.url, "_blank");
        return;
      }

      if (!data?.sessionId) {
        throw new Error("No session ID received from server");
      }

      // Use the hardcoded publishable key.
      const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);

      if (!stripe) {
        throw new Error(
          "Failed to load Stripe. Please refresh the page and try again."
        );
      }

      console.log(
        "Redirecting to Stripe checkout with session:",
        data.sessionId
      );

      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        console.error("Stripe redirect error:", result.error);

        // Handle specific Stripe errors
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
    } catch (stripeError) {
      console.error("Stripe integration error:", stripeError);

      if (stripeError instanceof Error) {
        throw stripeError;
      } else {
        throw new Error(
          "Payment system temporarily unavailable. Please try again in a few minutes."
        );
      }
    }
  };

  return { handlePlanSelection };
};
