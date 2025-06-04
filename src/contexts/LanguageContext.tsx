
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
    'cta.benefits': '✓ No setup fees ✓ Cancel anytime ✓ 14-day free trial'
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
    'cta.benefits': '✓ Sin costos de configuración ✓ Cancela en cualquier momento ✓ Prueba gratuita de 14 días'
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
