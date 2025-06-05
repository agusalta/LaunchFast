import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import SubscriptionStatus from '@/components/SubscriptionStatus';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSubscription } from '@/hooks/use-subscription';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const { refreshSubscription } = useSubscription();

  useEffect(() => {
    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      toast({
        title: "Payment successful!",
        description: "Your subscription has been activated.",
      });
      // Refresh subscription data
      refreshSubscription();
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [toast, refreshSubscription]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            LaunchFast Dashboard
          </Link>
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <Button
              variant="outline"
              onClick={signOut}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              {t('auth.signOut') || 'Sign out'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('dashboard.welcome') || 'Welcome to your dashboard!'}
            </h2>
            <p className="text-gray-600 mb-4">
              {t('dashboard.welcomeMessage') || 'You are successfully logged in. Here you can manage your account and access all features.'}
            </p>
            <div className="bg-gray-50 rounded-md p-4">
              <p className="text-sm text-gray-700">
                <strong>{t('dashboard.email') || 'Email'}:</strong> {user?.email}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <strong>{t('dashboard.userId') || 'User ID'}:</strong> {user?.id}
              </p>
            </div>
          </div>

          {/* Subscription Status */}
          <div className="mb-8">
            <SubscriptionStatus />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('dashboard.profile') || 'Profile Settings'}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {t('dashboard.profileDesc') || 'Manage your account settings and preferences.'}
              </p>
              <Button variant="outline" className="w-full">
                {t('dashboard.viewProfile') || 'View Profile'}
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('dashboard.analytics') || 'Analytics'}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {t('dashboard.analyticsDesc') || 'View your usage statistics and insights.'}
              </p>
              <Button variant="outline" className="w-full">
                {t('dashboard.viewAnalytics') || 'View Analytics'}
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('dashboard.support') || 'Support'}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {t('dashboard.supportDesc') || 'Get help and contact our support team.'}
              </p>
              <Button variant="outline" className="w-full">
                {t('dashboard.contactSupport') || 'Contact Support'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
