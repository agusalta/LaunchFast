import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2025-05-28.basil",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

serve(async (req) => {
  const signature = req.headers.get("Stripe-Signature");

  if (!signature) {
    return new Response("No signature", { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET") || ""
    );

    console.log(`Webhook received: ${event.type}`);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout session completed:", session.id);

        if (session.mode === "subscription" && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          const userId = session.client_reference_id;
          const planName = session.metadata?.planName || "Unknown Plan";

          if (userId) {
            const { error } = await supabase.from("subscriptions").upsert(
              {
                user_id: userId,
                plan_name: planName,
                status: "active",
                price: subscription.items.data[0]?.price.unit_amount || 0,
                trial_ends_at: subscription.trial_end
                  ? new Date(subscription.trial_end * 1000).toISOString()
                  : null,
                updated_at: new Date().toISOString(),
              },
              {
                onConflict: "user_id",
              }
            );

            if (error) {
              console.error("Error updating subscription:", error);
            } else {
              console.log(
                "Subscription updated successfully for user:",
                userId
              );
            }
          }
        }
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) break;

        const email = (customer as Stripe.Customer).email;
        if (!email) break;

        const { error } = await supabase.from("subscriptions").upsert(
          {
            user_id: subscription.metadata?.userId,
            plan_name:
              subscription.items.data[0]?.price.nickname || "Unknown Plan",
            status: "active",
            price: subscription.items.data[0]?.price.unit_amount || 0,
            trial_ends_at: subscription.trial_end
              ? new Date(subscription.trial_end * 1000).toISOString()
              : null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id",
          }
        );

        if (error) {
          console.error("Error creating subscription:", error);
        } else {
          console.log("Subscription created successfully");
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) break;

        const email = (customer as Stripe.Customer).email;
        if (!email) break;

        const status = subscription.status === "active" ? "active" : "inactive";

        const { error } = await supabase
          .from("subscriptions")
          .update({
            status,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", subscription.metadata?.userId);

        if (error) {
          console.error("Error updating subscription status:", error);
        } else {
          console.log(`Subscription status updated to ${status}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(`Webhook error: ${error.message}`, { status: 400 });
  }
});
