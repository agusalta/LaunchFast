
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from './AnimatedSection';

const StatCard = ({ value, label }: { value: string; label: string }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref} 
      className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 transform transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1"
    >
      <div className="text-3xl font-bold text-gray-900 mb-2">
        {inView ? (
          <CountUp
            end={parseInt(value.replace(/[^0-9]/g, ''))}
            duration={2.5}
            separator=","
            suffix={value.replace(/[0-9]/g, '')}
            enableScrollSpy
            scrollSpyOnce={false}
          />
        ) : (
          '0'
        )}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {t('hero.title')}{" "}
              <span className="text-green-600 relative">
                {t('hero.titleHighlight')}
                <div className="absolute inset-0 bg-green-100 -skew-y-1 -z-10 opacity-30"></div>
              </span>
              {t('hero.titleEnd')}
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-up" delay={200}>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-up" delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {user ? (
                <Link to="/dashboard">
                  <Button 
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4 transform transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
                  >
                    {t('hero.goToDashboard') || 'Go to Dashboard'}
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth">
                    <Button 
                      size="lg" 
                      className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4 transform transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                      {t('hero.ctaPrimary')}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-lg px-8 py-4 transform transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
                  >
                    {t('hero.ctaSecondary')}
                  </Button>
                </>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={600}>
            <div className="text-sm text-gray-500 mb-16">
              {t('hero.noCredit')}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-up" delay={800}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <StatCard value={t('hero.stat1')} label={t('hero.stat1Label')} />
              <StatCard value={t('hero.stat2')} label={t('hero.stat2Label')} />
              <StatCard value={t('hero.stat3')} label={t('hero.stat3Label')} />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;
