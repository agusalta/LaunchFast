
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
    const { priceId, userId, planName, successUrl, cancelUrl } = await req.json();

    // Enhanced validation
    if (!priceId) {
      console.error('Missing price ID in request');
      throw new Error('Price ID is required');
    }

    if (!priceId.startsWith('price_')) {
      console.error('Invalid price ID format:', priceId);
      throw new Error('Invalid price ID format');
    }

    if (!userId) {
      console.error('Missing user ID in request');
      throw new Error('User ID is required');
    }

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY environment variable not set');
      throw new Error('Stripe configuration error');
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-05-28.basil",
    });

    // Create Supabase client for user verification
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Verify user authentication
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
      if (userError || !userData.user) {
        console.error('User authentication failed:', userError?.message);
        throw new Error("User not authenticated");
      }
      console.log('User authenticated successfully:', userData.user.id);
    } else {
      console.error('No authorization header provided');
      throw new Error("Authorization required");
    }

    console.log('Creating checkout session for price:', priceId, 'user:', userId);

    // Validate the price exists in Stripe before creating session
    try {
      const price = await stripe.prices.retrieve(priceId);
      console.log('Price validated successfully:', price.id, 'amount:', price.unit_amount);
    } catch (priceError) {
      console.error('Price validation failed:', priceError);
      throw new Error(`Invalid price ID: ${priceId}. Please contact support.`);
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";
    
    // Check if customer already exists
    const customers = await stripe.customers.list({
      limit: 1,
      email: userData.user?.email
    });

    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log('Existing customer found:', customerId);
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${origin}/dashboard?success=true`,
      cancel_url: cancelUrl || `${origin}/#pricing?canceled=true`,
      client_reference_id: userId,
      metadata: {
        userId,
        planName: planName || 'Unknown Plan',
      },
      // Only set customer if one exists, otherwise let Stripe create one
      ...(customerId ? { customer: customerId } : { customer_email: userData.user?.email }),
      // Set billing address collection
      billing_address_collection: 'required',
      // Set automatic tax calculation
      automatic_tax: {
        enabled: false,
      },
      // Add expires_at to prevent indefinite sessions
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes from now
    });

    console.log('Checkout session created successfully:', session.id);
    console.log('Session URL:', session.url);

    return new Response(JSON.stringify({ 
      sessionId: session.id,
      url: session.url 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // Return specific error messages for common issues
    let errorMessage = 'Failed to create checkout session';
    let statusCode = 500;
    
    if (error.message?.includes('No such price')) {
      errorMessage = 'Invalid pricing plan selected';
      statusCode = 400;
    } else if (error.message?.includes('authentication') || error.message?.includes('Authorization')) {
      errorMessage = 'Authentication required';
      statusCode = 401;
    } else if (error.message?.includes('Price ID is required') || error.message?.includes('Invalid price ID')) {
      errorMessage = error.message;
      statusCode = 400;
    } else if (error.message?.includes('Stripe configuration')) {
      errorMessage = 'Payment system temporarily unavailable';
      statusCode = 503;
    }
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: error.message 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: statusCode,
    });
  }
});
