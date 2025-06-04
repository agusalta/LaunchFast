
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out LaunchFast",
      features: [
        "Basic boilerplate setup",
        "Authentication templates",
        "1 project",
        "Community support",
        "Basic documentation"
      ],
      cta: "Start for free",
      popular: false
    },
    {
      name: "Pro",
      price: "$49",
      period: "one-time",
      description: "Everything you need to ship fast",
      features: [
        "Complete boilerplate package",
        "Auth + Payments + Database",
        "Unlimited projects",
        "Premium components library",
        "Priority support",
        "Deployment guides",
        "Lifetime updates"
      ],
      cta: "Get Pro",
      popular: true
    },
    {
      name: "Team",
      price: "$149",
      period: "one-time",
      description: "For agencies and teams",
      features: [
        "Everything in Pro",
        "Team collaboration tools",
        "White-label options",
        "Custom integrations",
        "1-on-1 onboarding call",
        "Custom components",
        "Extended license"
      ],
      cta: "Get Team",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, one-time pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            No subscriptions, no monthly fees. Pay once, ship forever.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 bg-white rounded-xl border-2 ${
                plan.popular 
                  ? 'border-green-500 shadow-lg scale-105' 
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
                size="lg"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
