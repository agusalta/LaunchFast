import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/hooks/use-subscription';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, CreditCard, Package } from 'lucide-react';

const SubscriptionStatus = () => {
  const { subscription, loading, refreshSubscription } = useSubscription();
  const { t } = useLanguage();

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

        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshSubscription}>
            {t('subscription.refresh') || 'Refresh'}
          </Button>
          <Button onClick={() => window.location.href = '/#pricing'}>
            {t('subscription.changePlan') || 'Change Plan'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionStatus;
