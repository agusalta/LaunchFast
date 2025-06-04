
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.features': 'Features',
    'header.pricing': 'Pricing',
    'header.signin': 'Sign in',
    'header.startFree': 'Start for free',
    
    // Hero
    'hero.title': 'Ship your MVP in',
    'hero.titleHighlight': 'days',
    'hero.titleEnd': ', not months',
    'hero.subtitle': 'The all-in-one boilerplate for indie developers. Authentication, payments, database, and deployment — all configured and ready to go.',
    'hero.ctaPrimary': 'Start building for free',
    'hero.ctaSecondary': 'View demo',
    'hero.noCredit': 'No credit card required • 14-day free trial • Cancel anytime',
    'hero.stat1': '10x',
    'hero.stat1Label': 'Faster development',
    'hero.stat2': '$0',
    'hero.stat2Label': 'Setup cost',
    'hero.stat3': '1 day',
    'hero.stat3Label': 'To first deployment',
    
    // Features
    'features.title': 'Everything you need to ship fast',
    'features.subtitle': 'Stop wasting time on boilerplate. Focus on your unique features and let us handle the boring stuff.',
    'features.auth.title': 'Authentication & Users',
    'features.auth.description': 'Complete auth system with social logins, email verification, and user management.',
    'features.payment.title': 'Payment Integration',
    'features.payment.description': 'Stripe payments, subscriptions, and billing management built-in and ready to use.',
    'features.database.title': 'Database & API',
    'features.database.description': 'PostgreSQL database with Prisma ORM and REST/GraphQL APIs pre-configured.',
    'features.tech.title': 'Modern Tech Stack',
    'features.tech.description': 'Next.js, TypeScript, Tailwind CSS, and the latest tools for modern development.',
    'features.deploy.title': 'One-Click Deploy',
    'features.deploy.description': 'Deploy to Vercel, Netlify, or Railway with a single command. CI/CD included.',
    'features.dx.title': 'Developer Experience',
    'features.dx.description': 'Hot reload, TypeScript, ESLint, Prettier, and debugging tools pre-configured.',
    
    // Screenshots
    'screenshots.title': 'See it in action',
    'screenshots.subtitle': 'Clean, modern templates that you can customize and ship immediately.',
    
    // Pricing
    'pricing.title': 'Simple, one-time pricing',
    'pricing.subtitle': 'No subscriptions, no monthly fees. Pay once, ship forever.',
    'pricing.popular': 'Most Popular',
    'pricing.free.name': 'Free',
    'pricing.free.price': '$0',
    'pricing.free.period': 'forever',
    'pricing.free.description': 'Perfect for trying out LaunchFast',
    'pricing.free.cta': 'Start for free',
    'pricing.pro.name': 'Pro',
    'pricing.pro.price': '$49',
    'pricing.pro.period': 'one-time',
    'pricing.pro.description': 'Everything you need to ship fast',
    'pricing.pro.cta': 'Get Pro',
    'pricing.team.name': 'Team',
    'pricing.team.price': '$149',
    'pricing.team.period': 'one-time',
    'pricing.team.description': 'For agencies and teams',
    'pricing.team.cta': 'Get Team',
    
    // Testimonials
    'testimonials.title': 'Loved by indie builders',
    'testimonials.subtitle': 'Real feedback from developers who shipped real products.',
    
    // Contact
    'contact.title': 'Questions? Let\'s talk',
    'contact.subtitle': 'Need help choosing the right plan or have technical questions? We\'re here to help you ship faster.',
    'contact.getInTouch': 'Get in touch',
    'contact.emailUs': 'Email us',
    'contact.emailDescription': 'Quick questions or need support? Drop us a line.',
    'contact.responseTime': 'Typical response time',
    'contact.responseDescription': 'We usually respond within 2-4 hours during business days. For technical support, we aim for same-day resolution.',
    'contact.form.name': 'Name',
    'contact.form.namePlaceholder': 'Your name',
    'contact.form.email': 'Email',
    'contact.form.emailPlaceholder': 'your@email.com',
    'contact.form.subject': 'Subject',
    'contact.form.subjectPlaceholder': 'What\'s this about?',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Tell us more about your project or question...',
    'contact.form.send': 'Send message',
    
    // CTA
    'cta.title': 'Ready to ship your next big idea?',
    'cta.subtitle': 'Join 1000+ indie developers who\'ve shipped their MVPs faster with LaunchFast.',
    'cta.button': 'Start building now',
    'cta.benefits': '✅ 14-day free trial      ✅ No setup fees      ✅ Cancel anytime',
  },
  es: {
    // Header
    'header.features': 'Características',
    'header.pricing': 'Precios',
    'header.signin': 'Iniciar sesión',
    'header.startFree': 'Empezar gratis',
    
    // Hero
    'hero.title': 'Lanza tu MVP en',
    'hero.titleHighlight': 'días',
    'hero.titleEnd': ', no meses',
    'hero.subtitle': 'El boilerplate todo-en-uno para desarrolladores indie. Autenticación, pagos, base de datos y despliegue — todo configurado y listo para usar.',
    'hero.ctaPrimary': 'Empezar a construir gratis',
    'hero.ctaSecondary': 'Ver demo',
    'hero.noCredit': 'No se requiere tarjeta de crédito • Prueba gratuita de 14 días • Cancela en cualquier momento',
    'hero.stat1': '10x',
    'hero.stat1Label': 'Desarrollo más rápido',
    'hero.stat2': '$0',
    'hero.stat2Label': 'Costo de configuración',
    'hero.stat3': '1 día',
    'hero.stat3Label': 'Al primer despliegue',
    
    // Features
    'features.title': 'Todo lo que necesitas para lanzar rápido',
    'features.subtitle': 'Deja de perder tiempo en boilerplate. Enfócate en tus características únicas y déjanos manejar lo aburrido.',
    'features.auth.title': 'Autenticación y Usuarios',
    'features.auth.description': 'Sistema de autenticación completo con logins sociales, verificación de email y gestión de usuarios.',
    'features.payment.title': 'Integración de Pagos',
    'features.payment.description': 'Pagos Stripe, suscripciones y gestión de facturación integrados y listos para usar.',
    'features.database.title': 'Base de Datos y API',
    'features.database.description': 'Base de datos PostgreSQL con Prisma ORM y APIs REST/GraphQL preconfiguradas.',
    'features.tech.title': 'Stack Tecnológico Moderno',
    'features.tech.description': 'Next.js, TypeScript, Tailwind CSS y las herramientas más recientes para desarrollo moderno.',
    'features.deploy.title': 'Despliegue con Un Clic',
    'features.deploy.description': 'Despliega en Vercel, Netlify o Railway con un solo comando. CI/CD incluido.',
    'features.dx.title': 'Experiencia de Desarrollador',
    'features.dx.description': 'Recarga en caliente, TypeScript, ESLint, Prettier y herramientas de debugging preconfiguradas.',
    
    // Screenshots
    'screenshots.title': 'Míralo en acción',
    'screenshots.subtitle': 'Plantillas limpias y modernas que puedes personalizar y lanzar inmediatamente.',
    
    // Pricing
    'pricing.title': 'Precios simples, de una sola vez',
    'pricing.subtitle': 'Sin suscripciones, sin tarifas mensuales. Paga una vez, lanza para siempre.',
    'pricing.popular': 'Más Popular',
    'pricing.free.name': 'Gratis',
    'pricing.free.price': '$0',
    'pricing.free.period': 'para siempre',
    'pricing.free.description': 'Perfecto para probar LaunchFast',
    'pricing.free.cta': 'Empezar gratis',
    'pricing.pro.name': 'Pro',
    'pricing.pro.price': '$49',
    'pricing.pro.period': 'una vez',
    'pricing.pro.description': 'Todo lo que necesitas para lanzar rápido',
    'pricing.pro.cta': 'Obtener Pro',
    'pricing.team.name': 'Equipo',
    'pricing.team.price': '$149',
    'pricing.team.period': 'una vez',
    'pricing.team.description': 'Para agencias y equipos',
    'pricing.team.cta': 'Obtener Equipo',
    
    // Testimonials
    'testimonials.title': 'Amado por constructores indie',
    'testimonials.subtitle': 'Comentarios reales de desarrolladores que lanzaron productos reales.',
    
    // Contact
    'contact.title': '¿Preguntas? Hablemos',
    'contact.subtitle': '¿Necesitas ayuda para elegir el plan correcto o tienes preguntas técnicas? Estamos aquí para ayudarte a lanzar más rápido.',
    'contact.getInTouch': 'Ponte en contacto',
    'contact.emailUs': 'Envíanos un email',
    'contact.emailDescription': '¿Preguntas rápidas o necesitas soporte? Escríbenos.',
    'contact.responseTime': 'Tiempo de respuesta típico',
    'contact.responseDescription': 'Normalmente respondemos en 2-4 horas durante días laborables. Para soporte técnico, apuntamos a resolución el mismo día.',
    'contact.form.name': 'Nombre',
    'contact.form.namePlaceholder': 'Tu nombre',
    'contact.form.email': 'Email',
    'contact.form.emailPlaceholder': 'tu@email.com',
    'contact.form.subject': 'Asunto',
    'contact.form.subjectPlaceholder': '¿De qué se trata?',
    'contact.form.message': 'Mensaje',
    'contact.form.messagePlaceholder': 'Cuéntanos más sobre tu proyecto o pregunta...',
    'contact.form.send': 'Enviar mensaje',
    
    // CTA
    'cta.title': '¿Listo para lanzar tu próxima gran idea?',
    'cta.subtitle': 'Únete a más de 1000 desarrolladores indie que han lanzado sus MVPs más rápido con LaunchFast.',
    'cta.button': 'Empezar a construir ahora',
    'cta.benefits': '✅ Prueba gratuita de 14 días      ✅ Sin costos de configuración      ✅ Cancela en cualquier momento',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
