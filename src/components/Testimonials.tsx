import { useLanguage } from "@/contexts/LanguageContext";

const Testimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Alex Chen",
      role: t('testimonials.roles.indieDev'),
      avatar: "AC",
      content: t('testimonials.content.alex'),
      project: "TaskFlow"
    },
    {
      name: "Sarah Kim",
      role: t('testimonials.roles.freelancer'),
      avatar: "SK",
      content: t('testimonials.content.sarah'),
      project: "ClientPortal"
    },
    {
      name: "Marcus Rodriguez",
      role: t('testimonials.roles.soloFounder'),
      avatar: "MR",
      content: t('testimonials.content.marcus'),
      project: "DesignFeedback"
    },
    {
      name: "Emma Thompson",
      role: t('testimonials.roles.fullstack'),
      avatar: "ET",
      content: t('testimonials.content.emma'),
      project: "LocalEats"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-green-600 font-semibold">{testimonial.avatar}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-green-600 font-medium">{testimonial.project}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
