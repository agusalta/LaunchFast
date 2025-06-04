
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Screenshots from "@/components/Screenshots";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Screenshots />
      <Pricing />
      <Testimonials />
      <Contact />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
