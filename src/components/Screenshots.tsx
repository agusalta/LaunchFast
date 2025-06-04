
import { useLanguage } from "@/contexts/LanguageContext";

const Screenshots = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t('screenshots.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('screenshots.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm">Authentication Flow</span>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <div className="h-4 bg-green-500 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-600 rounded mb-2 w-1/2"></div>
                <div className="h-3 bg-gray-600 rounded w-2/3"></div>
                <div className="mt-4 flex space-x-2">
                  <div className="h-8 bg-green-600 rounded w-20"></div>
                  <div className="h-8 bg-gray-600 rounded w-16"></div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm">Dashboard Template</span>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="h-12 bg-green-500 rounded"></div>
                  <div className="h-12 bg-blue-500 rounded"></div>
                  <div className="h-12 bg-purple-500 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-600 rounded w-full"></div>
                  <div className="h-2 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm">Payment Integration</span>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <div className="h-4 bg-blue-500 rounded mb-3 w-1/2"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-8 bg-gray-600 rounded"></div>
                  <div className="h-8 bg-gray-600 rounded"></div>
                </div>
                <div className="h-10 bg-green-600 rounded w-full"></div>
              </div>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm">API Documentation</span>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-3 bg-green-500 rounded"></div>
                    <div className="h-3 bg-gray-600 rounded flex-1"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-3 bg-blue-500 rounded"></div>
                    <div className="h-3 bg-gray-600 rounded flex-1"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-3 bg-yellow-500 rounded"></div>
                    <div className="h-3 bg-gray-600 rounded flex-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Screenshots;
