
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.getInTouch')}</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-green-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('contact.emailUs')}</h4>
                    <p className="text-gray-600 mb-2">
                      {t('contact.emailDescription')}
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
                  <h4 className="font-semibold text-gray-900 mb-2">{t('contact.responseTime')}</h4>
                  <p className="text-gray-600 text-sm">
                    {t('contact.responseDescription')}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name">{t('contact.form.name')}</Label>
                  <Input 
                    id="name"
                    type="text" 
                    placeholder={t('contact.form.namePlaceholder')}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t('contact.form.email')}</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder={t('contact.form.emailPlaceholder')}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                  <Input 
                    id="subject"
                    type="text" 
                    placeholder={t('contact.form.subjectPlaceholder')}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message">{t('contact.form.message')}</Label>
                  <Textarea
                    id="message"
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {t('contact.form.send')}
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
