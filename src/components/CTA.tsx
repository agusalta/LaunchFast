
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const CTA = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('cta.subtitle')}
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4 mr-4">
            {t('cta.button')}
          </Button>
          <div className="mt-8 text-sm text-gray-400">
            {t('cta.benefits')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
