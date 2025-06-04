
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Questions? Let's talk
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Need help choosing the right plan or have technical questions? 
              We're here to help you ship faster.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-green-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email us</h4>
                    <p className="text-gray-600 mb-2">
                      Quick questions or need support? Drop us a line.
                    </p>
                    <a 
                      href="mailto:hello@launchfast.dev" 
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      hello@launchfast.dev
                    </a>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Typical response time</h4>
                  <p className="text-gray-600 text-sm">
                    We usually respond within 2-4 hours during business days. 
                    For technical support, we aim for same-day resolution.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name"
                    type="text" 
                    placeholder="Your name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="your@email.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject"
                    type="text" 
                    placeholder="What's this about?"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your project or question..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  Send message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
