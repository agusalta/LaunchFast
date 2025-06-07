import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAnalytics } from '@/hooks/use-analytics';
import { useSubscription } from '@/hooks/use-subscription';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart3, Calendar, CreditCard, User } from 'lucide-react';

const Analytics: React.FC = () => {
  const { analytics, loading } = useAnalytics();
  const { subscription } = useSubscription();
  const { t } = useLanguage();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('analytics.notAvailable') || 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatAmount = (amount: number | null) => {
    if (amount === null) return t('analytics.notAvailable') || 'N/A';
    return `$${(amount / 100).toFixed(2)}`;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            {t('analytics.title') || 'Analytics Overview'}
          </CardTitle>
          <CardDescription>
            {t('analytics.description') || 'Your account usage and activity summary'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <User className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {t('analytics.totalLogins') || 'Total Logins'}
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {analytics?.login_count || 0}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {t('analytics.lastLogin') || 'Last Login'}
                </p>
                <p className="text-sm font-semibold text-green-600">
                  {formatDate(analytics?.last_login_at)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
              <CreditCard className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {t('analytics.totalPayments') || 'Total Payments'}
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {analytics?.payment_count || 0}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
              <CreditCard className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {t('analytics.lastPayment') || 'Last Payment'}
                </p>
                <p className="text-sm font-semibold text-orange-600">
                  {formatAmount(analytics?.last_payment_amount)}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(analytics?.last_payment_at)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {subscription && (
        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.currentSubscription') || 'Current Subscription'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{subscription.plan_name}</p>
                <p className="text-sm text-gray-600 capitalize">{subscription.status}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ${subscription.price ? (subscription.price / 100).toFixed(2) : '0.00'}/month
                </p>
                {subscription.trial_ends_at && (
                  <p className="text-xs text-gray-500">
                    Trial ends: {formatDate(subscription.trial_ends_at)}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Analytics;
