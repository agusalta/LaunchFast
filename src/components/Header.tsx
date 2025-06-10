
import { Button } from "@/components/ui/button";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();

  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 hover:bg-white/90">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-bold text-xl text-gray-900 transform transition-all duration-200 hover:scale-105">
          LaunchFast
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#features" 
            className="text-gray-600 hover:text-gray-900 transition-all duration-200 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-green-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            {t('header.features')}
          </a>
          <a 
            href="#pricing" 
            className="text-gray-600 hover:text-gray-900 transition-all duration-200 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-green-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            {t('header.pricing')}
          </a>
          <div className="transform transition-all duration-200 hover:scale-105">
            <LanguageToggle />
          </div>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button 
                  variant="outline" 
                  className="mr-2 transform transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
                >
                  {t('header.dashboard') || 'Dashboard'}
                </Button>
              </Link>
              <Button 
                variant="outline"
                onClick={signOut}
                className="text-red-600 border-red-200 hover:bg-red-50 transform transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {t('header.signOut') || 'Sign out'}
              </Button>
            </div>
          ) : (
            <>
              <Link to="/auth">
                <Button 
                  variant="outline" 
                  className="mr-2 transform transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
                >
                  {t('header.signin')}
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-green-600 hover:bg-green-700 transform transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95">
                  {t('header.startFree')}
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
