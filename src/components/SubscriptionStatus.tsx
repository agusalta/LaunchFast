
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/hooks/use-subscription';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, CreditCard, Package, RefreshCw } from 'lucide-react';
import { useState } from 'react';

const SubscriptionStatus = () => {
  const { subscription, loading, refreshSubscription } = useSubscription();
  const { t } = useLanguage();
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const [redirectingToPortal, setRedirectingToPortal] = useState(false);
  const [processingRefund, setProcessingRefund] = useState(false);

  const handleRefresh = async () => {
    if (!user || !session) return;
    
    setRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke('refresh-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      
      if (error) throw error;
      
      // Refresh the local subscription data
      refreshSubscription();
      
      toast({
        title: "Subscription refreshed",
        description: "Your subscription status has been updated.",
      });
    } catch (error) {
      console.error('Error refreshing subscription:', error);
      toast({
        title: "Error",
        description: "Failed to refresh subscription status",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleChangePlan = async () => {
    if (!user || !session) return;
    
    setRedirectingToPortal(true);
    try {
      const { data, error } = await supabase.functions.invoke('stripe-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      
      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No portal URL returned');
      }
    } catch (error) {
      console.error('Error accessing portal:', error);
      toast({
        title: "Error",
        description: "Failed to access billing portal",
        variant: "destructive",
      });
      setRedirectingToPortal(false);
    }
  };

  const handleRequestRefund = async () => {
    if (!user || !session) return;
    
    setProcessingRefund(true);
    try {
      const { data, error } = await supabase.functions.invoke('stripe-refund', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      
      if (error) throw error;
      
      if (data?.success) {
        toast({
          title: "Refund processed",
          description: `Refund of $${(data.refund.amount / 100).toFixed(2)} has been processed successfully.`,
        });
        // Refresh subscription status after refund
        refreshSubscription();
      } else {
        throw new Error('Refund processing failed');
      }
    } catch (error) {
      console.error('Error processing refund:', error);
      toast({
        title: "Refund failed",
        description: error.message || "Failed to process refund",
        variant: "destructive",
      });
    } finally {
      setProcessingRefund(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {t('subscription.noActivePlan') || 'No Active Plan'}
          </CardTitle>
          <CardDescription>
            {t('subscription.choosePlan') || 'Choose a plan to get started with premium features.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => window.location.href = '/#pricing'}>
            {t('subscription.viewPlans') || 'View Plans'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const formatPrice = (price: number | null) => {
    if (price === null || price === 0) return t('subscription.free') || 'Free';
    return `$${(price / 100).toFixed(2)}`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('subscription.notAvailable') || 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          {t('subscription.currentPlan') || 'Current Plan'}
        </CardTitle>
        <CardDescription>
          {t('subscription.manageSubscription') || 'Manage your subscription and billing information.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-lg font-semibold">{subscription.plan_name}</p>
            <p className="text-sm text-gray-600">{formatPrice(subscription.price)}/month</p>
          </div>
          <Badge 
            variant={subscription.status === 'active' ? 'default' : 'secondary'}
            className={subscription.status === 'active' ? 'bg-green-500' : ''}
          >
            {subscription.status === 'active' ? t('subscription.active') || 'Active' : subscription.status}
          </Badge>
        </div>

        {subscription.trial_ends_at && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{t('subscription.trialEnds') || 'Trial ends'}: {formatDate(subscription.trial_ends_at)}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : t('subscription.refresh') || 'Refresh'}
          </Button>
          
          <Button 
            size="sm"
            onClick={handleChangePlan}
            disabled={redirectingToPortal}
          >
            {redirectingToPortal ? 'Redirecting...' : t('subscription.changePlan') || 'Change Plan'}
          </Button>
          
          {subscription.status === 'active' && subscription.price && subscription.price > 0 && (
            <Button 
              variant="destructive"
              size="sm"
              onClick={handleRequestRefund}
              disabled={processingRefund}
            >
              {processingRefund ? 'Processing...' : 'Request Refund'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionStatus;
