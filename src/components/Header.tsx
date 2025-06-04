
import { Button } from "@/components/ui/button";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-bold text-xl text-gray-900">
          LaunchFast
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
            {t('header.features')}
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
            {t('header.pricing')}
          </a>
          <LanguageToggle />
          <Button variant="outline" className="mr-2">
            {t('header.signin')}
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            {t('header.startFree')}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
