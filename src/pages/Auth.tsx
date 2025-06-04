
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signIn, user } = useAuth();
  const { t } = useLanguage();

  // Redirect to dashboard if already authenticated
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        const { error } = await signIn(email, password);
        if (!error) {
          // Will be redirected by ProtectedRoute
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-bold text-gray-900">LaunchFast</h1>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {isSignUp ? t('auth.signUp') || 'Sign up for an account' : t('auth.signIn') || 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isSignUp ? (
              <>
                {t('auth.haveAccount') || 'Already have an account?'}{' '}
                <button
                  type="button"
                  className="text-green-600 hover:text-green-500 font-medium"
                  onClick={() => setIsSignUp(false)}
                >
                  {t('auth.signIn') || 'Sign in'}
                </button>
              </>
            ) : (
              <>
                {t('auth.noAccount') || "Don't have an account?"}{' '}
                <button
                  type="button"
                  className="text-green-600 hover:text-green-500 font-medium"
                  onClick={() => setIsSignUp(true)}
                >
                  {t('auth.signUp') || 'Sign up'}
                </button>
              </>
            )}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">{t('auth.email') || 'Email address'}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                placeholder={t('auth.emailPlaceholder') || 'Enter your email'}
              />
            </div>
            <div>
              <Label htmlFor="password">{t('auth.password') || 'Password'}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                placeholder={t('auth.passwordPlaceholder') || 'Enter your password'}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              isSignUp ? (t('auth.signUp') || 'Sign up') : (t('auth.signIn') || 'Sign in')
            )}
          </Button>

          <div className="text-center">
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← {t('auth.backToHome') || 'Back to home'}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
