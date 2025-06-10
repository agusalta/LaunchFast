# Supabase Edge Functions

This directory contains the Edge Functions for handling Stripe integration and subscription management.

## 📦 Available Functions

### 1. create-checkout-session

Creates a Stripe checkout session for subscription purchase.

```typescript
// Example usage
const { data, error } = await supabase.functions.invoke(
  "create-checkout-session",
  {
    body: {
      priceId: "price_xxx",
      userId: "user_xxx",
      planName: "Pro Plan",
      successUrl: "https://your-domain.com/success",
      cancelUrl: "https://your-domain.com/cancel",
    },
  }
);
```

### 2. stripe-webhook

Handles Stripe webhook events. Configure in Stripe Dashboard:

```bash
# Webhook URL
https://[YOUR_PROJECT_REF].supabase.co/functions/v1/stripe-webhook

# Events to listen for
- checkout.session.completed
- customer.subscription.updated
- customer.subscription.deleted
```

### 3. stripe-portal

Manages Stripe customer portal access.

```typescript
// Example usage
const { data, error } = await supabase.functions.invoke("stripe-portal", {
  headers: {
    Authorization: `Bearer ${session.access_token}`,
  },
});
```

### 4. stripe-refund

Handles refund requests.

```typescript
// Example usage
const { data, error } = await supabase.functions.invoke("stripe-refund", {
  headers: {
    Authorization: `Bearer ${session.access_token}`,
  },
});
```

### 5. refresh-subscription

Refreshes subscription status from Stripe.

```typescript
// Example usage
const { data, error } = await supabase.functions.invoke(
  "refresh-subscription",
  {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  }
);
```

## 🔧 Configuration

Each function requires specific environment variables:

```bash
# Required for all functions
STRIPE_SECRET_KEY=sk_test_xxx
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx

# Required for webhook
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

## 🚀 Deployment

Deploy all functions:

```bash
# Vincular el proyecto
supabase link --project-ref tu-project-ref

# Desplegar las funciones
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook
supabase functions deploy stripe-portal
supabase functions deploy stripe-refund
supabase functions deploy refresh-subscription
```

## 🔒 Security

- All functions require JWT authentication except `stripe-webhook`
- Functions use Row Level Security (RLS) policies
- Sensitive operations are protected
- Webhook signature verification is implemented

## 📝 Error Handling

All functions return standardized error responses:

```typescript
{
  error: string;
  details?: any;
}
```

## 🧪 Testing

Test functions locally:

```bash
# Start Supabase locally
supabase start

# Serve functions
supabase functions serve

# Test webhook
curl -X POST http://localhost:54321/functions/v1/stripe-webhook \
  -H "Content-Type: application/json" \
  -d '{"type":"checkout.session.completed"}'
```

## 📚 Additional Resources

- [Supabase Edge Functions Documentation](https://supabase.com/docs/guides/functions)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Stripe Customer Portal](https://stripe.com/docs/customer-portal)
