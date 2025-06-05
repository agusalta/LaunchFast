
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user) {
      throw new Error("User not authenticated");
    }

    const user = userData.user;

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Get user's subscription from Supabase
    const { data: subscription, error: subError } = await supabaseClient
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (subError) {
      throw new Error(`Failed to fetch subscription: ${subError.message}`);
    }

    if (!subscription) {
      return new Response(JSON.stringify({ subscription: null }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // If we have a subscription, refresh it from Stripe
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      // No Stripe customer found, subscription might be free
      return new Response(JSON.stringify({ subscription }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;

    // Get active subscriptions from Stripe
    const stripeSubscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    let updatedSubscription = subscription;

    if (stripeSubscriptions.data.length > 0) {
      const stripeSubscription = stripeSubscriptions.data[0];
      
      // Update subscription in Supabase with latest Stripe data
      const { data: updated, error: updateError } = await supabaseClient
        .from('subscriptions')
        .update({
          status: 'active',
          trial_ends_at: stripeSubscription.trial_end 
            ? new Date(stripeSubscription.trial_end * 1000).toISOString() 
            : null,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) {
        throw new Error(`Failed to update subscription: ${updateError.message}`);
      }

      updatedSubscription = updated;
    } else {
      // No active subscription in Stripe, mark as inactive
      const { data: updated, error: updateError } = await supabaseClient
        .from('subscriptions')
        .update({
          status: 'inactive',
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) {
        throw new Error(`Failed to update subscription: ${updateError.message}`);
      }

      updatedSubscription = updated;
    }

    return new Response(JSON.stringify({ subscription: updatedSubscription }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Error refreshing subscription:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
