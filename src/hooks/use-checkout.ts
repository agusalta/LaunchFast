
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useCheckout = () => {
  const { user } = useAuth();
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
      console.error('Plan selection error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process plan selection",
        variant: "destructive",
      });
    }
  };

  const activateFreePlan = async (plan: any) => {
    const trialEndDate = plan.name.toLowerCase().includes('trial') 
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      : null;

    const { error } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: user!.id,
        plan_name: plan.name,
        status: 'active',
        price: 0,
        trial_ends_at: trialEndDate,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      console.error('Error activating free plan:', error);
      throw new Error('Failed to activate free plan');
    }

    toast({
      title: "Plan activated",
      description: `Welcome to ${plan.name}! Your plan has been activated.`,
    });

    window.location.href = '/dashboard?success=true';
  };

  const redirectToStripeCheckout = async (plan: any) => {
    if (!plan.priceId) {
      throw new Error('No price ID configured for this plan');
    }

    toast({
      title: "Redirecting to checkout",
      description: "Please wait while we prepare your checkout session...",
    });

    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        priceId: plan.priceId,
        userId: user!.id,
        planName: plan.name,
        successUrl: `${window.location.origin}/dashboard?success=true`,
        cancelUrl: `${window.location.origin}/#pricing?canceled=true`,
      },
    });

    if (error) {
      console.error('Checkout session error:', error);
      throw new Error(error.message || 'Failed to create checkout session');
    }

    if (data?.sessionId) {
      const stripe = await import('@stripe/stripe-js').then(m => m.loadStripe(
        'pk_test_51QrXJRAYxgNJmWTCfY5abSqlXQ5dOnhzfUjHjCFdKC8tT0zF5sUPWoW5G0lf3K5rRKZjSaZqxI3yfOb0yOHhWA8R00r0UhUZLV'
      ));
      
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      
      if (result.error) {
        throw new Error(result.error.message);
      }
    } else {
      throw new Error('No session ID returned from checkout creation');
    }
  };

  return { handlePlanSelection };
};
