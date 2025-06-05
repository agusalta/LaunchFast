
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
      if (!plan.priceId) {
        await activateFreePlan(plan);
      } else {
        await redirectToStripeCheckout(plan);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process plan selection",
        variant: "destructive",
      });
    }
  };

  const activateFreePlan = async (plan: any) => {
    const { error } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: user!.id,
        plan_name: plan.name,
        status: 'active',
        price: 0,
        trial_ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });

    if (error) throw error;

    toast({
      title: "Plan activated",
      description: `Welcome to ${plan.name}! Your free trial has started.`,
    });

    window.location.href = '/dashboard';
  };

  const redirectToStripeCheckout = async (plan: any) => {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: plan.priceId,
        userId: user!.id,
        planName: plan.name,
        successUrl: `${window.location.origin}/dashboard?success=true`,
        cancelUrl: `${window.location.origin}/pricing?canceled=true`,
      }),
    });

    const { sessionId, error } = await response.json();

    if (error) throw new Error(error);

    const stripe = await import('@stripe/stripe-js').then(m => m.loadStripe(
      'pk_test_51234567890123456789012345678901234567890123456789012345678901234567890123456789'
    ));
    
    await stripe?.redirectToCheckout({ sessionId });
  };

  return { handlePlanSelection };
};
