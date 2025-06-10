# Supabase Setup Guide

This directory contains all the necessary files to set up the Supabase backend for the Launch Spark MVP.

## 📁 Directory Structure

```
supabase/
├── functions/           # Edge Functions
│   ├── create-checkout-session/
│   ├── stripe-webhook/
│   ├── stripe-portal/
│   ├── stripe-refund/
│   └── refresh-subscription/
├── migrations/         # Database migrations
└── config.toml        # Supabase configuration
```

## 🚀 Getting Started

### 1. Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in your project details
4. Save your project URL and anon key

### 2. Set Up Database

1. Run the initial migration:

```bash
supabase db reset
```

This will create:

- `profiles` table
- `subscriptions` table
- Row Level Security (RLS) policies
- User creation trigger

### 3. Deploy Edge Functions

1. Install Supabase CLI:

```bash
npm install -g supabase
```

2. Link your project:

```bash
supabase link --project-ref your-project-ref
```

3. Deploy functions:

```bash
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook
supabase functions deploy stripe-portal
supabase functions deploy stripe-refund
supabase functions deploy refresh-subscription
```

### 4. Configure Environment Variables

Set the following secrets for your functions:

```bash
supabase secrets set STRIPE_SECRET_KEY=your_stripe_secret_key
supabase secrets set STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
supabase secrets set SUPABASE_URL=your_supabase_url
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 5. Set Up Stripe Webhook

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Add a new endpoint
3. Set the URL to: `https://[YOUR_PROJECT_REF].supabase.co/functions/v1/stripe-webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

## 🔒 Security

- All tables have Row Level Security (RLS) enabled
- Users can only access their own data
- Edge Functions are protected with JWT verification
- Sensitive operations require authentication

## 📝 Database Schema

### Profiles Table

```sql
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    email_notifications BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Subscriptions Table

```sql
CREATE TABLE public.subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    plan_name TEXT NOT NULL,
    status TEXT NOT NULL,
    price NUMERIC,
    trial_ends_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🔄 Edge Functions

### create-checkout-session

Creates a Stripe checkout session for subscription purchase.

### stripe-webhook

Handles Stripe webhook events for subscription management.

### stripe-portal

Manages Stripe customer portal access.

### stripe-refund

Handles refund requests.

### refresh-subscription

Refreshes subscription status from Stripe.

## 🛠️ Development

To run functions locally:

```bash
supabase start
supabase functions serve
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Edge Functions Guide](https://supabase.com/docs/guides/functions)
