import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'header.features': 'Features',
    'header.pricing': 'Pricing',
    'header.signin': 'Sign In',
    'header.startFree': 'Start Free',
    'header.dashboard': 'Dashboard',
    'header.signOut': 'Sign Out',
    
    // Hero
    'hero.title': 'Launch Your SaaS',
    'hero.titleHighlight': 'Fast',
    'hero.titleEnd': ' and Scale',
    'hero.subtitle': 'The complete toolkit to build, deploy, and scale your SaaS application with modern technologies.',
    'hero.ctaPrimary': 'Get Started Free',
    'hero.ctaSecondary': 'View Demo',
    'hero.goToDashboard': 'Go to Dashboard',
    'hero.noCredit': 'No credit card required • Free 14-day trial',
    'hero.stat1': '10k+',
    'hero.stat1Label': 'Active Users',
    'hero.stat2': '99.9%',
    'hero.stat2Label': 'Uptime',
    'hero.stat3': '24/7',
    'hero.stat3Label': 'Support',
    
    // Features
    'features.title': 'Everything You Need to Launch',
    'features.subtitle': 'Built with the latest technologies and best practices for modern web applications.',
    'features.auth.title': 'Authentication & Authorization',
    'features.auth.description': 'Complete user management with secure authentication, role-based access control, and social login options.',
    'features.payment.title': 'Payment Processing',
    'features.payment.description': 'Integrated Stripe payments with subscription management, invoicing, and automated billing.',
    'features.database.title': 'Database & Storage',
    'features.database.description': 'PostgreSQL database with Supabase integration, real-time updates, and file storage capabilities.',
    'features.tech.title': 'Modern Tech Stack',
    'features.tech.description': 'Built with React, TypeScript, Tailwind CSS, and other cutting-edge technologies.',
    'features.deploy.title': 'Easy Deployment',
    'features.deploy.description': 'One-click deployment to Vercel, Netlify, or your preferred hosting platform.',
    'features.dx.title': 'Developer Experience',
    'features.dx.description': 'Hot reload, TypeScript support, ESLint, Prettier, and comprehensive documentation.',
    
    // Auth
    'auth.signUp': 'Sign Up',
    'auth.signIn': 'Sign In',
    'auth.signOut': 'Sign Out',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.emailPlaceholder': 'Enter your email',
    'auth.passwordPlaceholder': 'Enter your password',
    'auth.haveAccount': 'Already have an account?',
    'auth.noAccount': "Don't have an account?",
    'auth.backToHome': 'Back to home',
    
    // Dashboard
    'dashboard.welcome': 'Welcome to your dashboard!',
    'dashboard.welcomeMessage': 'You are successfully logged in. Here you can manage your account and access all features.',
    'dashboard.email': 'Email',
    'dashboard.userId': 'User ID',
    'dashboard.profile': 'Profile Settings',
    'dashboard.profileDesc': 'Manage your account settings and preferences.',
    'dashboard.viewProfile': 'View Profile',
    'dashboard.analytics': 'Analytics',
    'dashboard.analyticsDesc': 'View your usage statistics and insights.',
    'dashboard.viewAnalytics': 'View Analytics',
    'dashboard.support': 'Support',
    'dashboard.supportDesc': 'Get help and contact our support team.',
    'dashboard.contactSupport': 'Contact Support',
    
    // CTA
    'cta.title': 'Ready to Launch Your SaaS?',
    'cta.subtitle': 'Join thousands of developers who have already launched successful applications.',
    'cta.button': 'Start Building Today',
    'cta.benefits': '✓ No setup fees ✓ Cancel anytime ✓ 14-day free trial',
    
    // Pricing
    'pricing.title': 'Simple, Transparent Pricing',
    'pricing.subtitle': 'Choose the plan that best fits your needs',
    'pricing.popular': 'Most Popular',
    'pricing.free.name': 'Free',
    'pricing.free.price': '$0',
    'pricing.free.period': 'month',
    'pricing.free.description': 'Perfect for getting started',
    'pricing.free.cta': 'Get Started',
    'pricing.pro.name': 'Pro',
    'pricing.pro.price': '$29',
    'pricing.pro.period': 'month',
    'pricing.pro.description': 'For growing businesses',
    'pricing.pro.cta': 'Start Free Trial',
    'pricing.team.name': 'Team',
    'pricing.team.price': '$99',
    'pricing.team.period': 'month',
    'pricing.team.description': 'For teams and enterprises',
    'pricing.team.cta': 'Contact Sales',
    
    // Características de los planes
    'pricing.features.free.boilerplate': 'Basic boilerplate configuration',
    'pricing.features.free.auth': 'Authentication templates',
    'pricing.features.free.projects': '1 project',
    'pricing.features.free.support': 'Community support',
    'pricing.features.free.docs': 'Basic documentation',
    
    'pricing.features.pro.boilerplate': 'Complete boilerplate package',
    'pricing.features.pro.auth': 'Auth + Payments + Database',
    'pricing.features.pro.projects': 'Unlimited projects',
    'pricing.features.pro.components': 'Premium component library',
    'pricing.features.pro.support': 'Priority support',
    'pricing.features.pro.deployment': 'Deployment guides',
    'pricing.features.pro.updates': 'Lifetime updates',
    
    'pricing.features.team.everything': 'Everything in the Pro plan',
    'pricing.features.team.collaboration': 'Team collaboration tools',
    'pricing.features.team.whitelabel': 'White label options',
    'pricing.features.team.integrations': 'Custom integrations',
    'pricing.features.team.onboarding': '1-on-1 onboarding call',
    'pricing.features.team.components': 'Custom components',
    'pricing.features.team.license': 'Extended license',
    
    // Screenshots
    'screenshots.title': 'See it in Action',
    'screenshots.subtitle': 'Take a look at some of the key features and components included in the boilerplate.',
    
    // Testimonials
    'testimonials.title': 'What Our Users Say',
    'testimonials.subtitle': 'Join thousands of satisfied developers who have successfully launched their applications.',
    'testimonials.roles.indieDev': 'Indie Developer',
    'testimonials.roles.freelancer': 'Freelancer',
    'testimonials.roles.soloFounder': 'Solo Founder',
    'testimonials.roles.fullstack': 'Full-stack Dev',
    'testimonials.content.alex': 'Shipped my SaaS in 3 days instead of 3 months. The boilerplate is clean and the auth flow just works.',
    'testimonials.content.sarah': 'Finally, a boilerplate that doesn\'t feel bloated. Got my client\'s MVP live in a weekend.',
    'testimonials.content.marcus': 'The payment integration saved me weeks. Now I focus on features, not infrastructure.',
    'testimonials.content.emma': 'Best $49 I\'ve spent. The TypeScript setup alone is worth it. Everything just works.',

    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
    'contact.getInTouch': 'Get in Touch',
    'contact.emailUs': 'Email Us',
    'contact.emailDescription': 'Send us an email and we\'ll get back to you as soon as possible.',
    'contact.responseTime': 'Response Time',
    'contact.responseDescription': 'We typically respond to all inquiries within 24 hours during business days.',
    'contact.form.name': 'Name',
    'contact.form.namePlaceholder': 'Enter your name',
    'contact.form.email': 'Email',
    'contact.form.emailPlaceholder': 'Enter your email',
    'contact.form.subject': 'Subject',
    'contact.form.subjectPlaceholder': 'Enter the subject',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Enter your message',
    'contact.form.send': 'Send Message',

    // Footer
    'footer.description': 'The fastest way to build and ship your SaaS MVP. Focus on your unique features, we\'ll handle the boilerplate.',
    'footer.product.title': 'Product',
    'footer.product.features': 'Features',
    'footer.product.pricing': 'Pricing',
    'footer.product.documentation': 'Documentation',
    'footer.product.changelog': 'Changelog',
    'footer.product.roadmap': 'Roadmap',
    'footer.support.title': 'Support',
    'footer.support.contact': 'Contact',
    'footer.support.helpCenter': 'Help Center',
    'footer.support.discord': 'Discord Community',
    'footer.support.status': 'Status Page',
    'footer.copyright': '© 2024 LaunchFast. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  es: {
    // Header
    'header.features': 'Características',
    'header.pricing': 'Precios',
    'header.signin': 'Iniciar Sesión',
    'header.startFree': 'Empezar Gratis',
    'header.dashboard': 'Panel',
    'header.signOut': 'Cerrar Sesión',
    
    // Hero
    'hero.title': 'Lanza tu SaaS',
    'hero.titleHighlight': 'Rápido',
    'hero.titleEnd': ' y Escala',
    'hero.subtitle': 'El conjunto completo de herramientas para construir, desplegar y escalar tu aplicación SaaS con tecnologías modernas.',
    'hero.ctaPrimary': 'Empezar Gratis',
    'hero.ctaSecondary': 'Ver Demo',
    'hero.goToDashboard': 'Ir al Panel',
    'hero.noCredit': 'No se requiere tarjeta de crédito • Prueba gratuita de 14 días',
    'hero.stat1': '10k+',
    'hero.stat1Label': 'Usuarios Activos',
    'hero.stat2': '99.9%',
    'hero.stat2Label': 'Tiempo Activo',
    'hero.stat3': '24/7',
    'hero.stat3Label': 'Soporte',
    
    // Features
    'features.title': 'Todo lo que Necesitas para Lanzar',
    'features.subtitle': 'Construido con las últimas tecnologías y mejores prácticas para aplicaciones web modernas.',
    'features.auth.title': 'Autenticación y Autorización',
    'features.auth.description': 'Gestión completa de usuarios con autenticación segura, control de acceso basado en roles y opciones de login social.',
    'features.payment.title': 'Procesamiento de Pagos',
    'features.payment.description': 'Pagos integrados con Stripe con gestión de suscripciones, facturación y cobro automatizado.',
    'features.database.title': 'Base de Datos y Almacenamiento',
    'features.database.description': 'Base de datos PostgreSQL con integración Supabase, actualizaciones en tiempo real y capacidades de almacenamiento de archivos.',
    'features.tech.title': 'Stack Tecnológico Moderno',
    'features.tech.description': 'Construido con React, TypeScript, Tailwind CSS y otras tecnologías de vanguardia.',
    'features.deploy.title': 'Despliegue Fácil',
    'features.deploy.description': 'Despliegue con un clic a Vercel, Netlify o tu plataforma de hosting preferida.',
    'features.dx.title': 'Experiencia del Desarrollador',
    'features.dx.description': 'Recarga en caliente, soporte TypeScript, ESLint, Prettier y documentación completa.',
    
    // Auth
    'auth.signUp': 'Registrarse',
    'auth.signIn': 'Iniciar Sesión',
    'auth.signOut': 'Cerrar Sesión',
    'auth.email': 'Email',
    'auth.password': 'Contraseña',
    'auth.emailPlaceholder': 'Ingresa tu email',
    'auth.passwordPlaceholder': 'Ingresa tu contraseña',
    'auth.haveAccount': '¿Ya tienes una cuenta?',
    'auth.noAccount': '¿No tienes una cuenta?',
    'auth.backToHome': 'Volver al inicio',
    
    // Dashboard
    'dashboard.welcome': '¡Bienvenido a tu panel!',
    'dashboard.welcomeMessage': 'Has iniciado sesión exitosamente. Aquí puedes gestionar tu cuenta y acceder a todas las funciones.',
    'dashboard.email': 'Email',
    'dashboard.userId': 'ID de Usuario',
    'dashboard.profile': 'Configuración de Perfil',
    'dashboard.profileDesc': 'Gestiona la configuración de tu cuenta y preferencias.',
    'dashboard.viewProfile': 'Ver Perfil',
    'dashboard.analytics': 'Analíticas',
    'dashboard.analyticsDesc': 'Ve tus estadísticas de uso e insights.',
    'dashboard.viewAnalytics': 'Ver Analíticas',
    'dashboard.support': 'Soporte',
    'dashboard.supportDesc': 'Obtén ayuda y contacta a nuestro equipo de soporte.',
    'dashboard.contactSupport': 'Contactar Soporte',
    
    // CTA
    'cta.title': '¿Listo para Lanzar tu SaaS?',
    'cta.subtitle': 'Únete a miles de desarrolladores que ya han lanzado aplicaciones exitosas.',
    'cta.button': 'Empezar a Construir Hoy',
    'cta.benefits': '✓ Sin costos de configuración ✓ Cancela en cualquier momento ✓ Prueba gratuita de 14 días',
    
    // Pricing
    'pricing.title': 'Precios Simples y Transparentes',
    'pricing.subtitle': 'Elige el plan que mejor se adapte a tus necesidades',
    'pricing.popular': 'Más Popular',
    'pricing.free.name': 'Gratis',
    'pricing.free.price': '$0',
    'pricing.free.period': 'mes',
    'pricing.free.description': 'Perfecto para comenzar',
    'pricing.free.cta': 'Comenzar',
    'pricing.pro.name': 'Pro',
    'pricing.pro.price': '$29',
    'pricing.pro.period': 'mes',
    'pricing.pro.description': 'Para negocios en crecimiento',
    'pricing.pro.cta': 'Prueba Gratuita',
    'pricing.team.name': 'Equipo',
    'pricing.team.price': '$99',
    'pricing.team.period': 'mes',
    'pricing.team.description': 'Para equipos y empresas',
    'pricing.team.cta': 'Contactar Ventas',
    
    // Características de los planes
    'pricing.features.free.boilerplate': 'Configuración básica del boilerplate',
    'pricing.features.free.auth': 'Plantillas de autenticación',
    'pricing.features.free.projects': '1 proyecto',
    'pricing.features.free.support': 'Soporte comunitario',
    'pricing.features.free.docs': 'Documentación básica',
    
    'pricing.features.pro.boilerplate': 'Paquete completo de boilerplate',
    'pricing.features.pro.auth': 'Auth + Pagos + Base de datos',
    'pricing.features.pro.projects': 'Proyectos ilimitados',
    'pricing.features.pro.components': 'Biblioteca de componentes premium',
    'pricing.features.pro.support': 'Soporte prioritario',
    'pricing.features.pro.deployment': 'Guías de despliegue',
    'pricing.features.pro.updates': 'Actualizaciones de por vida',
    
    'pricing.features.team.everything': 'Todo lo del plan Pro',
    'pricing.features.team.collaboration': 'Herramientas de colaboración en equipo',
    'pricing.features.team.whitelabel': 'Opciones de marca blanca',
    'pricing.features.team.integrations': 'Integraciones personalizadas',
    'pricing.features.team.onboarding': 'Llamada de incorporación 1 a 1',
    'pricing.features.team.components': 'Componentes personalizados',
    'pricing.features.team.license': 'Licencia extendida',
    
    // Screenshots
    'screenshots.title': 'Véalo en Acción',
    'screenshots.subtitle': 'Eche un vistazo a algunas de las características y componentes clave incluidos en el boilerplate.',
    
    // Testimonials
    'testimonials.title': 'Lo que Dicen Nuestros Usuarios',
    'testimonials.subtitle': 'Únete a miles de desarrolladores satisfechos que han lanzado exitosamente sus aplicaciones.',
    'testimonials.roles.indieDev': 'Desarrollador Independiente',
    'testimonials.roles.freelancer': 'Freelancer',
    'testimonials.roles.soloFounder': 'Fundador Independiente',
    'testimonials.roles.fullstack': 'Desarrollador Full-stack',
    'testimonials.content.alex': 'Lancé mi SaaS en 3 días en lugar de 3 meses. El boilerplate es limpio y el flujo de autenticación funciona perfectamente.',
    'testimonials.content.sarah': 'Finalmente, un boilerplate que no se siente sobrecargado. Puse en marcha el MVP de mi cliente en un fin de semana.',
    'testimonials.content.marcus': 'La integración de pagos me ahorró semanas. Ahora me enfoco en las características, no en la infraestructura.',
    'testimonials.content.emma': 'Los mejores $49 que he gastado. Solo la configuración de TypeScript ya lo vale. Todo funciona perfectamente.',

    // Contact
    'contact.title': 'Contáctanos',
    'contact.subtitle': '¿Tienes preguntas? Nos encantaría escucharte. Envíanos un mensaje y te responderemos lo antes posible.',
    'contact.getInTouch': 'Ponte en Contacto',
    'contact.emailUs': 'Escríbenos',
    'contact.emailDescription': 'Envíanos un correo electrónico y te responderemos lo antes posible.',
    'contact.responseTime': 'Tiempo de Respuesta',
    'contact.responseDescription': 'Normalmente respondemos a todas las consultas dentro de las 24 horas en días laborables.',
    'contact.form.name': 'Nombre',
    'contact.form.namePlaceholder': 'Ingresa tu nombre',
    'contact.form.email': 'Correo Electrónico',
    'contact.form.emailPlaceholder': 'Ingresa tu correo electrónico',
    'contact.form.subject': 'Asunto',
    'contact.form.subjectPlaceholder': 'Ingresa el asunto',
    'contact.form.message': 'Mensaje',
    'contact.form.messagePlaceholder': 'Ingresa tu mensaje',
    'contact.form.send': 'Enviar Mensaje',

    // Footer
    'footer.description': 'La forma más rápida de construir y lanzar tu MVP SaaS. Enfócate en tus características únicas, nosotros manejamos la estructura básica.',
    'footer.product.title': 'Producto',
    'footer.product.features': 'Características',
    'footer.product.pricing': 'Precios',
    'footer.product.documentation': 'Documentación',
    'footer.product.changelog': 'Registro de cambios',
    'footer.product.roadmap': 'Hoja de ruta',
    'footer.support.title': 'Soporte',
    'footer.support.contact': 'Contacto',
    'footer.support.helpCenter': 'Centro de ayuda',
    'footer.support.discord': 'Comunidad Discord',
    'footer.support.status': 'Estado del servicio',
    'footer.copyright': '© 2024 LaunchFast. Todos los derechos reservados.',
    'footer.privacy': 'Política de privacidad',
    'footer.terms': 'Términos de servicio',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
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
