
const Features = () => {
  const features = [
    {
      title: "Authentication & Users",
      description: "Complete auth system with social logins, email verification, and user management.",
      icon: "🔐"
    },
    {
      title: "Payment Integration",
      description: "Stripe payments, subscriptions, and billing management built-in and ready to use.",
      icon: "💳"
    },
    {
      title: "Database & API",
      description: "PostgreSQL database with Prisma ORM and REST/GraphQL APIs pre-configured.",
      icon: "🗄️"
    },
    {
      title: "Modern Tech Stack",
      description: "Next.js, TypeScript, Tailwind CSS, and the latest tools for modern development.",
      icon: "⚡"
    },
    {
      title: "One-Click Deploy",
      description: "Deploy to Vercel, Netlify, or Railway with a single command. CI/CD included.",
      icon: "🚀"
    },
    {
      title: "Developer Experience",
      description: "Hot reload, TypeScript, ESLint, Prettier, and debugging tools pre-configured.",
      icon: "🛠️"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything you need to ship fast
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stop wasting time on boilerplate. Focus on your unique features and 
            let us handle the boring stuff.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 border border-gray-100 rounded-lg hover:shadow-lg transition-shadow bg-white"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
