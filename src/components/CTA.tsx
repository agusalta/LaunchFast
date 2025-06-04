
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to ship your next big idea?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join 1000+ indie developers who've shipped their MVPs faster with LaunchFast.
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4 mr-4">
            Start building now
          </Button>
          <div className="mt-8 text-sm text-gray-400">
            ✅ 14-day free trial &nbsp;&nbsp; ✅ No setup fees &nbsp;&nbsp; ✅ Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
