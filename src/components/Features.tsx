
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedSection from './AnimatedSection';

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      title: t('features.auth.title'),
      description: t('features.auth.description'),
      icon: "🔐"
    },
    {
      title: t('features.payment.title'),
      description: t('features.payment.description'),
      icon: "💳"
    },
    {
      title: t('features.database.title'),
      description: t('features.database.description'),
      icon: "🗄️"
    },
    {
      title: t('features.tech.title'),
      description: t('features.tech.description'),
      icon: "⚡"
    },
    {
      title: t('features.deploy.title'),
      description: t('features.deploy.description'),
      icon: "🚀"
    },
    {
      title: t('features.dx.title'),
      description: t('features.dx.description'),
      icon: "🛠️"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection 
              key={index} 
              delay={index * 100}
              animation="fade-in-up"
            >
              <div className="group p-6 border border-gray-100 rounded-lg transition-all duration-300 hover:shadow-lg hover:border-green-200 hover:-translate-y-2 bg-white">
                <div className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-green-600">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
