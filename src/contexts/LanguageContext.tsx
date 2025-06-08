
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'es';
  toggleLanguage: () => void;
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
    'hero.title': 'Launch Your SaaS in Days, Not Months',
    'hero.subtitle': 'Complete React boilerplate with authentication, payments, and deployment ready. Focus on building features, not infrastructure.',
    'hero.cta': 'Start Building Now',
    'hero.secondary': 'View Live Demo',

    // Features
    'features.title': 'Everything You Need to Launch',
    'features.subtitle': 'Built with modern technologies and best practices',
    'features.auth.title': 'Authentication Ready',
    'features.auth.description': 'Complete user authentication with Supabase Auth including social logins',
    'features.payments.title': 'Payment Integration',
    'features.payments.description': 'Stripe integration for subscriptions and one-time payments',
    'features.database.title': 'Database & API',
    'features.database.description': 'PostgreSQL database with real-time subscriptions and auto-generated APIs',
    'features.ui.title': 'Modern UI Components',
    'features.ui.description': 'Beautiful, responsive components built with Tailwind CSS and shadcn/ui',
    'features.deployment.title': 'Deploy Anywhere',
    'features.deployment.description': 'Deploy to Vercel, Netlify, or any static hosting platform',
    'features.typescript.title': 'TypeScript Ready',
    'features.typescript.description': 'Fully typed codebase for better development experience',

    // Pricing
    'pricing.title': 'Simple, Transparent Pricing',
    'pricing.subtitle': 'Choose the plan that fits your needs',
    'pricing.popular': 'Most Popular',
    'pricing.free.name': 'Starter',
    'pricing.free.price': 'Free',
    'pricing.free.period': 'forever',
    'pricing.free.description': 'Perfect for getting started',
    'pricing.free.cta': 'Get Started',
    'pricing.pro.name': 'Pro',
    'pricing.pro.price': '$7.99',
    'pricing.pro.period': 'month',
    'pricing.pro.description': 'Best for growing businesses',
    'pricing.pro.cta': 'Start Pro Trial',
    'pricing.team.name': 'Team',
    'pricing.team.price': '$24.99',
    'pricing.team.period': 'month',
    'pricing.team.description': 'For larger teams',
    'pricing.team.cta': 'Contact Sales',
    'pricing.features.free.boilerplate': 'Complete React boilerplate',
    'pricing.features.free.auth': 'Basic authentication',
    'pricing.features.free.projects': 'Up to 3 projects',
    'pricing.features.free.support': 'Community support',
    'pricing.features.free.docs': 'Documentation access',
    'pricing.features.pro.boilerplate': 'Everything in Starter',
    'pricing.features.pro.auth': 'Advanced authentication',
    'pricing.features.pro.projects': 'Unlimited projects',
    'pricing.features.pro.components': 'Premium components',
    'pricing.features.pro.support': 'Priority support',
    'pricing.features.pro.deployment': 'Deployment guides',
    'pricing.features.pro.updates': 'Regular updates',
    'pricing.features.team.everything': 'Everything in Pro',
    'pricing.features.team.collaboration': 'Team collaboration',
    'pricing.features.team.whitelabel': 'White-label options',
    'pricing.features.team.integrations': 'Custom integrations',
    'pricing.features.team.onboarding': 'Personal onboarding',
    'pricing.features.team.components': 'Custom components',
    'pricing.features.team.license': 'Commercial license',

    // Footer
    'footer.description': 'Launch your SaaS faster with our complete React boilerplate.',
    'footer.product': 'Product',
    'footer.features': 'Features',
    'footer.pricing': 'Pricing',
    'footer.documentation': 'Documentation',
    'footer.company': 'Company',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy',
    'footer.developers': 'Developers',
    'footer.guides': 'Guides',
    'footer.support': 'Support',
    'footer.rights': 'All rights reserved.',

    // CTA
    'cta.title': 'Ready to Launch Your SaaS?',
    'cta.subtitle': 'Join thousands of developers who have accelerated their projects with our boilerplate.',
    'cta.primary': 'Start Building Today',
    'cta.secondary': 'View Documentation',

    // Dashboard
    'dashboard.welcome': 'Welcome to your dashboard',
    'dashboard.subscription': 'Subscription Status',
    'dashboard.analytics': 'Analytics',
    'dashboard.profile': 'Profile Settings',

    // Auth
    'auth.signin': 'Sign In',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    'auth.signInHere': 'Sign in here',
    'auth.signUpHere': 'Sign up here',

    // Profile Settings
    'profile.title': 'Profile Settings',
    'profile.subtitle': 'Manage your account information and preferences',
    'profile.firstName': 'First Name',
    'profile.lastName': 'Last Name',
    'profile.email': 'Email Address',
    'profile.emailNotifications': 'Email Notifications',
    'profile.emailNotificationsDesc': 'Receive notifications about account activity',
    'profile.updating': 'Updating...',
    'profile.updateProfile': 'Update Profile',
    'profile.success': 'Profile updated successfully',
    'profile.error': 'Failed to update profile',
    'profile.firstNamePlaceholder': 'Enter your first name',
    'profile.lastNamePlaceholder': 'Enter your last name',

    // Analytics
    'analytics.title': 'Analytics Overview',
    'analytics.description': 'Your account usage and activity summary',
    'analytics.totalLogins': 'Total Logins',
    'analytics.lastLogin': 'Last Login',
    'analytics.totalPayments': 'Total Payments',
    'analytics.lastPayment': 'Last Payment',
    'analytics.currentSubscription': 'Current Subscription',
    'analytics.notAvailable': 'N/A',

    // Subscription
    'subscription.noActivePlan': 'No Active Plan',
    'subscription.choosePlan': 'Choose a plan to get started with premium features.',
    'subscription.viewPlans': 'View Plans',
    'subscription.currentPlan': 'Current Plan',
    'subscription.manageSubscription': 'Manage your subscription and billing information.',
    'subscription.active': 'Active',
    'subscription.trialEnds': 'Trial ends',
    'subscription.refresh': 'Refresh',
    'subscription.changePlan': 'Change Plan',
    'subscription.free': 'Free',
    'subscription.notAvailable': 'N/A',
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
    'hero.title': 'Lanza tu SaaS en Días, No en Meses',
    'hero.subtitle': 'Plantilla completa de React con autenticación, pagos y despliegue listo. Enfócate en construir características, no en infraestructura.',
    'hero.cta': 'Empezar a Construir',
    'hero.secondary': 'Ver Demo en Vivo',

    // Features
    'features.title': 'Todo lo que Necesitas para Lanzar',
    'features.subtitle': 'Construido con tecnologías modernas y mejores prácticas',
    'features.auth.title': 'Autenticación Lista',
    'features.auth.description': 'Autenticación completa de usuarios con Supabase Auth incluyendo logins sociales',
    'features.payments.title': 'Integración de Pagos',
    'features.payments.description': 'Integración con Stripe para suscripciones y pagos únicos',
    'features.database.title': 'Base de Datos y API',
    'features.database.description': 'Base de datos PostgreSQL con suscripciones en tiempo real y APIs auto-generadas',
    'features.ui.title': 'Componentes de UI Modernos',
    'features.ui.description': 'Componentes hermosos y responsivos construidos con Tailwind CSS y shadcn/ui',
    'features.deployment.title': 'Despliega en Cualquier Lugar',
    'features.deployment.description': 'Despliega en Vercel, Netlify o cualquier plataforma de hosting estático',
    'features.typescript.title': 'Listo para TypeScript',
    'features.typescript.description': 'Código base completamente tipado para una mejor experiencia de desarrollo',

    // Pricing
    'pricing.title': 'Precios Simples y Transparentes',
    'pricing.subtitle': 'Elige el plan que se adapte a tus necesidades',
    'pricing.popular': 'Más Popular',
    'pricing.free.name': 'Iniciador',
    'pricing.free.price': 'Gratis',
    'pricing.free.period': 'para siempre',
    'pricing.free.description': 'Perfecto para empezar',
    'pricing.free.cta': 'Comenzar',
    'pricing.pro.name': 'Pro',
    'pricing.pro.price': '$7.99',
    'pricing.pro.period': 'mes',
    'pricing.pro.description': 'Mejor para negocios en crecimiento',
    'pricing.pro.cta': 'Iniciar Prueba Pro',
    'pricing.team.name': 'Equipo',
    'pricing.team.price': '$24.99',
    'pricing.team.period': 'mes',
    'pricing.team.description': 'Para equipos más grandes',
    'pricing.team.cta': 'Contactar Ventas',
    'pricing.features.free.boilerplate': 'Plantilla completa de React',
    'pricing.features.free.auth': 'Autenticación básica',
    'pricing.features.free.projects': 'Hasta 3 proyectos',
    'pricing.features.free.support': 'Soporte de la comunidad',
    'pricing.features.free.docs': 'Acceso a documentación',
    'pricing.features.pro.boilerplate': 'Todo lo del Iniciador',
    'pricing.features.pro.auth': 'Autenticación avanzada',
    'pricing.features.pro.projects': 'Proyectos ilimitados',
    'pricing.features.pro.components': 'Componentes premium',
    'pricing.features.pro.support': 'Soporte prioritario',
    'pricing.features.pro.deployment': 'Guías de despliegue',
    'pricing.features.pro.updates': 'Actualizaciones regulares',
    'pricing.features.team.everything': 'Todo lo del Pro',
    'pricing.features.team.collaboration': 'Colaboración en equipo',
    'pricing.features.team.whitelabel': 'Opciones de marca blanca',
    'pricing.features.team.integrations': 'Integraciones personalizadas',
    'pricing.features.team.onboarding': 'Incorporación personal',
    'pricing.features.team.components': 'Componentes personalizados',
    'pricing.features.team.license': 'Licencia comercial',

    // Footer
    'footer.description': 'Lanza tu SaaS más rápido con nuestra plantilla completa de React.',
    'footer.product': 'Producto',
    'footer.features': 'Características',
    'footer.pricing': 'Precios',
    'footer.documentation': 'Documentación',
    'footer.company': 'Empresa',
    'footer.about': 'Acerca de',
    'footer.contact': 'Contacto',
    'footer.privacy': 'Privacidad',
    'footer.developers': 'Desarrolladores',
    'footer.guides': 'Guías',
    'footer.support': 'Soporte',
    'footer.rights': 'Todos los derechos reservados.',

    // CTA
    'cta.title': '¿Listo para Lanzar tu SaaS?',
    'cta.subtitle': 'Únete a miles de desarrolladores que han acelerado sus proyectos con nuestra plantilla.',
    'cta.primary': 'Empezar a Construir Hoy',
    'cta.secondary': 'Ver Documentación',

    // Dashboard
    'dashboard.welcome': 'Bienvenido a tu panel',
    'dashboard.subscription': 'Estado de Suscripción',
    'dashboard.analytics': 'Analíticas',
    'dashboard.profile': 'Configuración de Perfil',

    // Auth
    'auth.signin': 'Iniciar Sesión',
    'auth.signup': 'Registrarse',
    'auth.email': 'Correo Electrónico',
    'auth.password': 'Contraseña',
    'auth.confirmPassword': 'Confirmar Contraseña',
    'auth.forgotPassword': '¿Olvidaste tu contraseña?',
    'auth.noAccount': '¿No tienes una cuenta?',
    'auth.hasAccount': '¿Ya tienes una cuenta?',
    'auth.signInHere': 'Inicia sesión aquí',
    'auth.signUpHere': 'Regístrate aquí',

    // Profile Settings
    'profile.title': 'Configuración de Perfil',
    'profile.subtitle': 'Gestiona la información de tu cuenta y preferencias',
    'profile.firstName': 'Nombre',
    'profile.lastName': 'Apellido',
    'profile.email': 'Dirección de Correo',
    'profile.emailNotifications': 'Notificaciones por Correo',
    'profile.emailNotificationsDesc': 'Recibir notificaciones sobre actividad de la cuenta',
    'profile.updating': 'Actualizando...',
    'profile.updateProfile': 'Actualizar Perfil',
    'profile.success': 'Perfil actualizado exitosamente',
    'profile.error': 'Error al actualizar el perfil',
    'profile.firstNamePlaceholder': 'Ingresa tu nombre',
    'profile.lastNamePlaceholder': 'Ingresa tu apellido',

    // Analytics
    'analytics.title': 'Resumen de Analíticas',
    'analytics.description': 'Resumen de uso y actividad de tu cuenta',
    'analytics.totalLogins': 'Total de Inicios de Sesión',
    'analytics.lastLogin': 'Último Inicio de Sesión',
    'analytics.totalPayments': 'Total de Pagos',
    'analytics.lastPayment': 'Último Pago',
    'analytics.currentSubscription': 'Suscripción Actual',
    'analytics.notAvailable': 'N/D',

    // Subscription
    'subscription.noActivePlan': 'Sin Plan Activo',
    'subscription.choosePlan': 'Elige un plan para comenzar con las características premium.',
    'subscription.viewPlans': 'Ver Planes',
    'subscription.currentPlan': 'Plan Actual',
    'subscription.manageSubscription': 'Gestiona tu suscripción e información de facturación.',
    'subscription.active': 'Activo',
    'subscription.trialEnds': 'Prueba termina',
    'subscription.refresh': 'Actualizar',
    'subscription.changePlan': 'Cambiar Plan',
    'subscription.free': 'Gratis',
    'subscription.notAvailable': 'N/D',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
