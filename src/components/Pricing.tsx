
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCheckout } from "@/hooks/use-checkout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AnimatedSection from './AnimatedSection';
import { useState } from 'react';

const Pricing = () => {
  const { t } = useLanguage();
  const { handlePlanSelection } = useCheckout();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handlePlanClick = async (plan: any) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    setLoadingPlan(plan.name);
    try {
      await handlePlanSelection(plan);
    } catch (error) {
      console.error('Plan selection failed:', error);
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      name: t('pricing.free.name'),
      price: t('pricing.free.price'),
      period: t('pricing.free.period'),
      description: t('pricing.free.description'),
      features: [
        t('pricing.features.free.boilerplate'),
        t('pricing.features.free.auth'),
        t('pricing.features.free.projects'),
        t('pricing.features.free.support'),
        t('pricing.features.free.docs')
      ],
      cta: t('pricing.free.cta'),
      popular: false,
      priceId: null,
      isFree: true
    },
    {
      name: t('pricing.pro.name'),
      price: t('pricing.pro.price'),
      period: t('pricing.pro.period'),
      description: t('pricing.pro.description'),
      features: [
        t('pricing.features.pro.boilerplate'),
        t('pricing.features.pro.auth'),
        t('pricing.features.pro.projects'),
        t('pricing.features.pro.components'),
        t('pricing.features.pro.support'),
        t('pricing.features.pro.deployment'),
        t('pricing.features.pro.updates')
      ],
      cta: t('pricing.pro.cta'),
      popular: true,
      priceId: 'price_1RXtEYIeCmoKndoZ4ycWThsi',
      isFree: false
    },
    {
      name: t('pricing.team.name'),
      price: t('pricing.team.price'),
      period: t('pricing.team.period'),
      description: t('pricing.team.description'),
      features: [
        t('pricing.features.team.everything'),
        t('pricing.features.team.collaboration'),
        t('pricing.features.team.whitelabel'),
        t('pricing.features.team.integrations'),
        t('pricing.features.team.onboarding'),
        t('pricing.features.team.components'),
        t('pricing.features.team.license')
      ],
      cta: t('pricing.team.cta'),
      popular: false,
      priceId: 'price_1RXtEzIeCmoKndoZCIn8A6UW',
      isFree: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('pricing.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <AnimatedSection 
              key={index}
              delay={index * 150}
              animation="fade-in-up"
            >
              <div 
                className={`group relative p-8 bg-white rounded-xl border-2 transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular 
                    ? 'border-green-500 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-green-300 hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium animate-pulse">
                      {t('pricing.popular')}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-green-600">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="flex items-start transform transition-all duration-200 hover:translate-x-1"
                    >
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    plan.popular 
                      ? 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl' 
                      : 'bg-gray-900 hover:bg-gray-800 hover:shadow-lg'
                  }`}
                  size="lg"
                  onClick={() => handlePlanClick(plan)}
                  disabled={(!user && !plan.isFree) || loadingPlan === plan.name}
                >
                  {loadingPlan === plan.name ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : !user && !plan.isFree ? (
                    'Sign in to subscribe'
                  ) : (
                    plan.cta
                  )}
                </Button>

                {!user && (
                  <p className="text-xs text-gray-500 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Sign in required for paid plans
                  </p>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
