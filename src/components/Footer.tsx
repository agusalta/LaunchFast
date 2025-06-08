
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">LaunchFast</h3>
            <p className="text-gray-400 text-sm">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.product')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">{t('footer.features')}</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">{t('footer.pricing')}</a></li>
              <li><Link to="/docs" className="hover:text-white transition-colors">{t('footer.documentation') || 'Documentation'}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.about')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.contact')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.developers')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/docs" className="hover:text-white transition-colors">API {t('footer.documentation') || 'Documentation'}</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.guides')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.support')}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 LaunchFast. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
