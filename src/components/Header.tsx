
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-bold text-xl text-gray-900">
          LaunchFast
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
            Pricing
          </a>
          <Button variant="outline" className="mr-2">
            Sign in
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            Start for free
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
