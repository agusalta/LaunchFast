
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Ship your MVP in{" "}
            <span className="text-green-600">days</span>, not months
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The all-in-one boilerplate for indie developers. Authentication, payments, 
            database, and deployment — all configured and ready to go.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
              Start building for free
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              View demo
            </Button>
          </div>
          <div className="text-sm text-gray-500 mb-16">
            No credit card required • 14-day free trial • Cancel anytime
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-gray-900 mb-2">10x</div>
              <div className="text-gray-600">Faster development</div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-gray-900 mb-2">$0</div>
              <div className="text-gray-600">Setup cost</div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-gray-900 mb-2">1 day</div>
              <div className="text-gray-600">To first deployment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
