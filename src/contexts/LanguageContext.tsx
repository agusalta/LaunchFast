import React, { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextType {
  language: "en" | "es";
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    "header.features": "Features",
    "header.pricing": "Pricing",
    "header.signin": "Sign In",
    "header.startFree": "Start Free",
    "header.dashboard": "Dashboard",
    "header.signOut": "Sign Out",

    // Hero
    "hero.title": "Launch Your SaaS in",
    "hero.titleHighlight": "Days",
    "hero.titleEnd": ", Not Months",
    "hero.subtitle":
      "Complete React boilerplate with authentication, payments, and deployment ready. Focus on building features, not infrastructure.",
    "hero.ctaPrimary": "Start Building Now",
    "hero.ctaSecondary": "View Live Demo",
    "hero.goToDashboard": "Go to Dashboard",
    "hero.noCredit": "No credit card required • Free forever",
    "hero.stat1": "1000+",
    "hero.stat1Label": "Happy Developers",
    "hero.stat2": "50+",
    "hero.stat2Label": "Components Included",
    "hero.stat3": "99%",
    "hero.stat3Label": "Uptime Guaranteed",

    // Features
    "features.title": "Everything You Need to Launch",
    "features.subtitle": "Built with modern technologies and best practices",
    "features.auth.title": "Authentication Ready",
    "features.auth.description":
      "Complete user authentication with Supabase Auth including social logins",
    "features.payment.title": "Payment Integration",
    "features.payment.description":
      "Stripe integration for subscriptions and one-time payments",
    "features.database.title": "Database & API",
    "features.database.description":
      "PostgreSQL database with real-time subscriptions and auto-generated APIs",
    "features.tech.title": "Modern Tech Stack",
    "features.tech.description":
      "Built with React, TypeScript, Tailwind CSS, and Vite for optimal performance",
    "features.deploy.title": "Deploy Anywhere",
    "features.deploy.description":
      "Deploy to Vercel, Netlify, or any static hosting platform",
    "features.dx.title": "Developer Experience",
    "features.dx.description":
      "Hot reload, TypeScript support, and excellent debugging tools",

    // Screenshots
    "screenshots.title": "See It in Action",
    "screenshots.subtitle":
      "Beautiful, responsive interfaces that work on all devices",

    // Testimonials
    "testimonials.title": "Loved by Developers",
    "testimonials.subtitle": "See what developers are saying about LaunchFast",
    "testimonials.roles.indieDev": "Indie Developer",
    "testimonials.roles.freelancer": "Freelance Developer",
    "testimonials.roles.soloFounder": "Solo Founder",
    "testimonials.roles.fullstack": "Full-Stack Developer",
    "testimonials.content.alex":
      "LaunchFast saved me weeks of setup time. The authentication and payment integration just works out of the box.",
    "testimonials.content.sarah":
      "As a freelancer, I can now deliver client projects much faster. The code quality is excellent and well-documented.",
    "testimonials.content.marcus":
      "Perfect for solo founders. I launched my SaaS in 3 days instead of 3 months. Highly recommended!",
    "testimonials.content.emma":
      "The React components are beautiful and the TypeScript support makes development a breeze.",

    // Contact
    "contact.title": "Get in Touch",
    "contact.subtitle": "Have questions? We'd love to hear from you.",
    "contact.getInTouch": "Get in Touch",
    "contact.emailUs": "Email Us",
    "contact.emailDescription":
      "Send us an email and we'll get back to you as soon as possible.",
    "contact.responseTime": "Quick Response",
    "contact.responseDescription":
      "We typically respond within 24 hours during business days.",
    "contact.form.name": "Name",
    "contact.form.namePlaceholder": "Your full name",
    "contact.form.email": "Email",
    "contact.form.emailPlaceholder": "your@email.com",
    "contact.form.subject": "Subject",
    "contact.form.subjectPlaceholder": "What is this about?",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Tell us more about your project...",
    "contact.form.send": "Send Message",

    // Pricing
    "pricing.title": "Simple, Transparent Pricing",
    "pricing.subtitle": "Choose the plan that fits your needs",
    "pricing.popular": "Most Popular",
    "pricing.free.name": "Starter",
    "pricing.free.price": "Free",
    "pricing.free.period": "forever",
    "pricing.free.description": "Perfect for getting started",
    "pricing.free.cta": "Get Started",
    "pricing.pro.name": "Pro",
    "pricing.pro.price": "$7.99",
    "pricing.pro.period": "month",
    "pricing.pro.description": "Best for growing businesses",
    "pricing.pro.cta": "Start Pro Trial",
    "pricing.team.name": "Team",
    "pricing.team.price": "$24.99",
    "pricing.team.period": "month",
    "pricing.team.description": "For larger teams",
    "pricing.team.cta": "Contact Sales",
    "pricing.features.free.boilerplate": "Complete React boilerplate",
    "pricing.features.free.auth": "Basic authentication",
    "pricing.features.free.projects": "Up to 3 projects",
    "pricing.features.free.support": "Community support",
    "pricing.features.free.docs": "Documentation access",
    "pricing.features.pro.boilerplate": "Everything in Starter",
    "pricing.features.pro.auth": "Advanced authentication",
    "pricing.features.pro.projects": "Unlimited projects",
    "pricing.features.pro.components": "Premium components",
    "pricing.features.pro.support": "Priority support",
    "pricing.features.pro.deployment": "Deployment guides",
    "pricing.features.pro.updates": "Regular updates",
    "pricing.features.team.everything": "Everything in Pro",
    "pricing.features.team.collaboration": "Team collaboration",
    "pricing.features.team.whitelabel": "White-label options",
    "pricing.features.team.integrations": "Custom integrations",
    "pricing.features.team.onboarding": "Personal onboarding",
    "pricing.features.team.components": "Custom components",
    "pricing.features.team.license": "Commercial license",

    // Footer
    "footer.description":
      "Launch your SaaS faster with our complete React boilerplate.",
    "footer.product": "Product",
    "footer.features": "Features",
    "footer.pricing": "Pricing",
    "footer.documentation": "Documentation",
    "footer.company": "Company",
    "footer.about": "About",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy",
    "footer.developers": "Developers",
    "footer.guides": "Guides",
    "footer.support": "Support",
    "footer.rights": "All rights reserved.",

    // CTA
    "cta.title": "Ready to Launch Your SaaS?",
    "cta.subtitle":
      "Join thousands of developers who have accelerated their projects with our boilerplate.",
    "cta.button": "Start Building Today",
    "cta.benefits": "No credit card required • 30-day money-back guarantee",

    // Dashboard
    "dashboard.welcome": "Welcome to your dashboard",
    "dashboard.welcomeMessage":
      "You are successfully logged in. Here you can manage your account and access all features.",
    "dashboard.email": "Email",
    "dashboard.userId": "User ID",
    "dashboard.subscription": "Subscription",
    "dashboard.analytics": "Analytics",
    "dashboard.profile": "Profile",
    "dashboard.support": "Support",
    "dashboard.supportDesc": "Get help and contact our support team.",
    "dashboard.contactSupport": "Contact Support",

    // Auth
    "auth.signin": "Sign In",
    "auth.signIn": "Sign In",
    "auth.signup": "Sign Up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.forgotPassword": "Forgot Password?",
    "auth.noAccount": "Don't have an account?",
    "auth.hasAccount": "Already have an account?",
    "auth.haveAccount": "Already have an account?",
    "auth.signInHere": "Sign in here",
    "auth.signUpHere": "Sign up here",
    "auth.emailPlaceholder": "Enter your email",
    "auth.passwordPlaceholder": "Enter your password",
    "auth.backToHome": "Back to home",
    "auth.signOut": "Sign Out",

    // Profile Settings
    "profile.title": "Profile Settings",
    "profile.subtitle": "Manage your account information and preferences",
    "profile.personalInfo": "Personal Information",
    "profile.personalInfoDesc":
      "Update your personal details and contact information",
    "profile.firstName": "First Name",
    "profile.lastName": "Last Name",
    "profile.email": "Email Address",
    "profile.emailNotifications": "Email Notifications",
    "profile.emailNotificationsDesc":
      "Receive notifications about account activity",
    "profile.updating": "Updating...",
    "profile.updateProfile": "Update Profile",
    "profile.saveChanges": "Save Changes",
    "profile.success": "Profile updated successfully",
    "profile.error": "Failed to update profile",
    "profile.firstNamePlaceholder": "Enter your first name",
    "profile.lastNamePlaceholder": "Enter your last name",
    "profile.changePassword": "Change Password",
    "profile.changePasswordDesc": "Update your account password",
    "profile.newPassword": "New Password",
    "profile.confirmPassword": "Confirm New Password",
    "profile.dangerZone": "Danger Zone",
    "profile.dangerZoneDesc": "Irreversible and destructive actions",
    "profile.deleteAccount": "Delete Account",
    "profile.confirmDelete": "Are you absolutely sure?",
    "profile.confirmDeleteDesc":
      "This action cannot be undone. This will permanently delete your account and remove all your data from our servers.",
    "profile.cancel": "Cancel",

    // Analytics
    "analytics.title": "Analytics Overview",
    "analytics.description": "Your account usage and activity summary",
    "analytics.totalLogins": "Total Logins",
    "analytics.lastLogin": "Last Login",
    "analytics.totalPayments": "Total Payments",
    "analytics.lastPayment": "Last Payment",
    "analytics.currentSubscription": "Current Subscription",
    "analytics.notAvailable": "N/A",

    // Subscription
    "subscription.noActivePlan": "No Active Plan",
    "subscription.choosePlan":
      "Choose a plan to get started with premium features.",
    "subscription.viewPlans": "View Plans",
    "subscription.currentPlan": "Current Plan",
    "subscription.manageSubscription":
      "Manage your subscription and billing information.",
    "subscription.active": "Active",
    "subscription.trialEnds": "Trial ends",
    "subscription.refresh": "Refresh",
    "subscription.changePlan": "Change Plan",
    "subscription.free": "Free",
    "subscription.notAvailable": "N/A",

    // Documentation
    "docs.title": "Technical Documentation",
    "docs.subtitle": "Complete guide to using our APIs and integrations",
    "docs.overview.title": "Overview",
    "docs.overview.description":
      "This documentation covers all the technical aspects of our platform including authentication, database operations, payment processing, and edge functions.",
    "docs.auth.title": "Authentication",
    "docs.auth.description": "User authentication powered by Supabase Auth",
    "docs.auth.signup": "Sign Up",
    "docs.auth.signin": "Sign In",
    "docs.auth.signout": "Sign Out",
    "docs.auth.getUser": "Get Current User",
    "docs.database.title": "Database API",
    "docs.database.description": "PostgreSQL database operations via Supabase",
    "docs.database.profiles": "User Profiles",
    "docs.database.subscriptions": "Subscriptions",
    "docs.database.analytics": "Analytics",
    "docs.payments.title": "Payment System",
    "docs.payments.description":
      "Stripe integration for subscriptions and payments",
    "docs.payments.checkout": "Create Checkout Session",
    "docs.payments.portal": "Customer Portal",
    "docs.payments.webhooks": "Webhooks",
    "docs.functions.title": "Edge Functions",
    "docs.functions.description": "Serverless functions for backend operations",
    "docs.functions.stripe": "Stripe Operations",
    "docs.functions.subscription": "Subscription Management",
    "docs.examples.request": "Request",
    "docs.examples.response": "Response",
    "docs.examples.curl": "cURL Example",
    "docs.examples.javascript": "JavaScript Example",
  },
  es: {
    // Header
    "header.features": "Características",
    "header.pricing": "Precios",
    "header.signin": "Iniciar Sesión",
    "header.startFree": "Empezar Gratis",
    "header.dashboard": "Panel",
    "header.signOut": "Cerrar Sesión",

    // Hero
    "hero.title": "Lanza tu SaaS en",
    "hero.titleHighlight": "Días",
    "hero.titleEnd": ", No en Meses",
    "hero.subtitle":
      "Plantilla completa de React con autenticación, pagos y despliegue listo. Enfócate en construir características, no en infraestructura.",
    "hero.ctaPrimary": "Empezar a Construir",
    "hero.ctaSecondary": "Ver Demo en Vivo",
    "hero.goToDashboard": "Ir al Panel",
    "hero.noCredit": "No se requiere tarjeta de crédito • Gratis para siempre",
    "hero.stat1": "1000+",
    "hero.stat1Label": "Desarrolladores Felices",
    "hero.stat2": "50+",
    "hero.stat2Label": "Componentes Incluidos",
    "hero.stat3": "99%",
    "hero.stat3Label": "Disponibilidad Garantizada",

    // Features
    "features.title": "Todo lo que Necesitas para Lanzar",
    "features.subtitle":
      "Construido con tecnologías modernas y mejores prácticas",
    "features.auth.title": "Autenticación Lista",
    "features.auth.description":
      "Autenticación completa de usuarios con Supabase Auth incluyendo logins sociales",
    "features.payment.title": "Integración de Pagos",
    "features.payment.description":
      "Integración con Stripe para suscripciones y pagos únicos",
    "features.database.title": "Base de Datos y API",
    "features.database.description":
      "Base de datos PostgreSQL con suscripciones en tiempo real y APIs auto-generadas",
    "features.tech.title": "Stack Tecnológico Moderno",
    "features.tech.description":
      "Construido con React, TypeScript, Tailwind CSS y Vite para rendimiento óptimo",
    "features.deploy.title": "Despliega en Cualquier Lugar",
    "features.deploy.description":
      "Despliega en Vercel, Netlify o cualquier plataforma de hosting estático",
    "features.dx.title": "Experiencia de Desarrollador",
    "features.dx.description":
      "Recarga en caliente, soporte de TypeScript y excelentes herramientas de depuración",

    // Screenshots
    "screenshots.title": "Míralo en Acción",
    "screenshots.subtitle":
      "Interfaces hermosas y responsivas que funcionan en todos los dispositivos",

    // Testimonials
    "testimonials.title": "Amado por Desarrolladores",
    "testimonials.subtitle":
      "Mira lo que dicen los desarrolladores sobre LaunchFast",
    "testimonials.roles.indieDev": "Desarrollador Independiente",
    "testimonials.roles.freelancer": "Desarrollador Freelance",
    "testimonials.roles.soloFounder": "Fundador Solo",
    "testimonials.roles.fullstack": "Desarrollador Full-Stack",
    "testimonials.content.alex":
      "LaunchFast me ahorró semanas de configuración. La autenticación e integración de pagos funciona perfectamente.",
    "testimonials.content.sarah":
      "Como freelancer, ahora puedo entregar proyectos de clientes mucho más rápido. La calidad del código es excelente y está bien documentada.",
    "testimonials.content.marcus":
      "Perfecto para fundadores solos. Lancé mi SaaS en 3 días en lugar de 3 meses. ¡Muy recomendado!",
    "testimonials.content.emma":
      "Los componentes de React son hermosos y el soporte de TypeScript hace que el desarrollo sea muy fácil.",

    // Contact
    "contact.title": "Ponte en Contacto",
    "contact.subtitle": "¿Tienes preguntas? Nos encantaría saber de ti.",
    "contact.getInTouch": "Ponte en Contacto",
    "contact.emailUs": "Envíanos un Email",
    "contact.emailDescription":
      "Envíanos un email y te responderemos lo antes posible.",
    "contact.responseTime": "Respuesta Rápida",
    "contact.responseDescription":
      "Típicamente respondemos dentro de 24 horas durante días laborales.",
    "contact.form.name": "Nombre",
    "contact.form.namePlaceholder": "Tu nombre completo",
    "contact.form.email": "Email",
    "contact.form.emailPlaceholder": "tu@email.com",
    "contact.form.subject": "Asunto",
    "contact.form.subjectPlaceholder": "¿De qué se trata esto?",
    "contact.form.message": "Mensaje",
    "contact.form.messagePlaceholder": "Cuéntanos más sobre tu proyecto...",
    "contact.form.send": "Enviar Mensaje",

    // Pricing
    "pricing.title": "Precios Simples y Transparentes",
    "pricing.subtitle": "Elige el plan que se adapte a tus necesidades",
    "pricing.popular": "Más Popular",
    "pricing.free.name": "Iniciador",
    "pricing.free.price": "Gratis",
    "pricing.free.period": "para siempre",
    "pricing.free.description": "Perfecto para empezar",
    "pricing.free.cta": "Comenzar",
    "pricing.pro.name": "Pro",
    "pricing.pro.price": "$7.99",
    "pricing.pro.period": "mes",
    "pricing.pro.description": "Mejor para negocios en crecimiento",
    "pricing.pro.cta": "Iniciar Prueba Pro",
    "pricing.team.name": "Equipo",
    "pricing.team.price": "$24.99",
    "pricing.team.period": "mes",
    "pricing.team.description": "Para equipos más grandes",
    "pricing.team.cta": "Contactar Ventas",
    "pricing.features.free.boilerplate": "Plantilla completa de React",
    "pricing.features.free.auth": "Autenticación básica",
    "pricing.features.free.projects": "Hasta 3 proyectos",
    "pricing.features.free.support": "Soporte de la comunidad",
    "pricing.features.free.docs": "Acceso a documentación",
    "pricing.features.pro.boilerplate": "Todo lo del Iniciador",
    "pricing.features.pro.auth": "Autenticación avanzada",
    "pricing.features.pro.projects": "Proyectos ilimitados",
    "pricing.features.pro.components": "Componentes premium",
    "pricing.features.pro.support": "Soporte prioritario",
    "pricing.features.pro.deployment": "Guías de despliegue",
    "pricing.features.pro.updates": "Actualizaciones regulares",
    "pricing.features.team.everything": "Todo lo del Pro",
    "pricing.features.team.collaboration": "Colaboración en equipo",
    "pricing.features.team.whitelabel": "Opciones de marca blanca",
    "pricing.features.team.integrations": "Integraciones personalizadas",
    "pricing.features.team.onboarding": "Incorporación personal",
    "pricing.features.team.components": "Componentes personalizados",
    "pricing.features.team.license": "Licencia comercial",

    // Footer
    "footer.description":
      "Lanza tu SaaS más rápido con nuestra plantilla completa de React.",
    "footer.product": "Producto",
    "footer.features": "Características",
    "footer.pricing": "Precios",
    "footer.documentation": "Documentación",
    "footer.company": "Empresa",
    "footer.about": "Acerca de",
    "footer.contact": "Contacto",
    "footer.privacy": "Privacidad",
    "footer.developers": "Desarrolladores",
    "footer.guides": "Guías",
    "footer.support": "Soporte",
    "footer.rights": "Todos los derechos reservados.",

    // CTA
    "cta.title": "¿Listo para Lanzar tu SaaS?",
    "cta.subtitle":
      "Únete a miles de desarrolladores que han acelerado sus proyectos con nuestra plantilla.",
    "cta.button": "Empezar a Construir Hoy",
    "cta.benefits":
      "No se requiere tarjeta de crédito • Garantía de devolución de 30 días",

    // Dashboard
    "dashboard.welcome": "Bienvenido a tu panel",
    "dashboard.welcomeMessage":
      "Has iniciado sesión exitosamente. Aquí puedes gestionar tu cuenta y acceder a todas las características.",
    "dashboard.email": "Email",
    "dashboard.userId": "ID de Usuario",
    "dashboard.subscription": "Suscripción",
    "dashboard.analytics": "Analíticas",
    "dashboard.profile": "Perfil",
    "dashboard.support": "Soporte",
    "dashboard.supportDesc":
      "Obtén ayuda y contacta nuestro equipo de soporte.",
    "dashboard.contactSupport": "Contactar Soporte",

    // Auth
    "auth.signin": "Iniciar Sesión",
    "auth.signIn": "Iniciar Sesión",
    "auth.signup": "Registrarse",
    "auth.email": "Correo Electrónico",
    "auth.password": "Contraseña",
    "auth.confirmPassword": "Confirmar Contraseña",
    "auth.forgotPassword": "¿Olvidaste tu contraseña?",
    "auth.noAccount": "¿No tienes una cuenta?",
    "auth.hasAccount": "¿Ya tienes una cuenta?",
    "auth.haveAccount": "¿Ya tienes una cuenta?",
    "auth.signInHere": "Inicia sesión aquí",
    "auth.signUpHere": "Regístrate aquí",
    "auth.emailPlaceholder": "Ingresa tu email",
    "auth.passwordPlaceholder": "Ingresa tu contraseña",
    "auth.backToHome": "Volver al inicio",
    "auth.signOut": "Cerrar Sesión",

    // Profile Settings
    "profile.title": "Configuración de Perfil",
    "profile.subtitle": "Gestiona la información de tu cuenta y preferencias",
    "profile.personalInfo": "Información Personal",
    "profile.personalInfoDesc":
      "Actualiza tus datos personales e información de contacto",
    "profile.firstName": "Nombre",
    "profile.lastName": "Apellido",
    "profile.email": "Dirección de Correo",
    "profile.emailNotifications": "Notificaciones por Correo",
    "profile.emailNotificationsDesc":
      "Recibir notificaciones sobre actividad de la cuenta",
    "profile.updating": "Actualizando...",
    "profile.updateProfile": "Actualizar Perfil",
    "profile.saveChanges": "Guardar Cambios",
    "profile.success": "Perfil actualizado exitosamente",
    "profile.error": "Error al actualizar el perfil",
    "profile.firstNamePlaceholder": "Ingresa tu nombre",
    "profile.lastNamePlaceholder": "Ingresa tu apellido",
    "profile.changePassword": "Cambiar Contraseña",
    "profile.changePasswordDesc": "Actualiza la contraseña de tu cuenta",
    "profile.newPassword": "Nueva Contraseña",
    "profile.confirmPassword": "Confirmar Nueva Contraseña",
    "profile.dangerZone": "Zona de Peligro",
    "profile.dangerZoneDesc": "Acciones irreversibles y destructivas",
    "profile.deleteAccount": "Eliminar Cuenta",
    "profile.confirmDelete": "¿Estás absolutamente seguro?",
    "profile.confirmDeleteDesc":
      "Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y removerá todos tus datos de nuestros servidores.",
    "profile.cancel": "Cancelar",

    // Analytics
    "analytics.title": "Resumen de Analíticas",
    "analytics.description": "Resumen de uso y actividad de tu cuenta",
    "analytics.totalLogins": "Total de Inicios de Sesión",
    "analytics.lastLogin": "Último Inicio de Sesión",
    "analytics.totalPayments": "Total de Pagos",
    "analytics.lastPayment": "Último Pago",
    "analytics.currentSubscription": "Suscripción Actual",
    "analytics.notAvailable": "N/D",

    // Subscription
    "subscription.noActivePlan": "Sin Plan Activo",
    "subscription.choosePlan":
      "Elige un plan para comenzar con las características premium.",
    "subscription.viewPlans": "Ver Planes",
    "subscription.currentPlan": "Plan Actual",
    "subscription.manageSubscription":
      "Gestiona tu suscripción e información de facturación.",
    "subscription.active": "Activo",
    "subscription.trialEnds": "Prueba termina",
    "subscription.refresh": "Actualizar",
    "subscription.changePlan": "Cambiar Plan",
    "subscription.free": "Gratis",
    "subscription.notAvailable": "N/D",

    // Documentation
    "docs.title": "Documentación Técnica",
    "docs.subtitle": "Guía completa para usar nuestras APIs e integraciones",
    "docs.overview.title": "Resumen",
    "docs.overview.description":
      "Esta documentación cubre todos los aspectos técnicos de nuestra plataforma incluyendo autenticación, operaciones de base de datos, procesamiento de pagos y funciones edge.",
    "docs.auth.title": "Autenticación",
    "docs.auth.description":
      "Autenticación de usuarios potenciada por Supabase Auth",
    "docs.auth.signup": "Registrarse",
    "docs.auth.signin": "Iniciar Sesión",
    "docs.auth.signout": "Cerrar Sesión",
    "docs.auth.getUser": "Obtener Usuario Actual",
    "docs.database.title": "API de Base de Datos",
    "docs.database.description":
      "Operaciones de base de datos PostgreSQL vía Supabase",
    "docs.database.profiles": "Perfiles de Usuario",
    "docs.database.subscriptions": "Suscripciones",
    "docs.database.analytics": "Analíticas",
    "docs.payments.title": "Sistema de Pagos",
    "docs.payments.description":
      "Integración con Stripe para suscripciones y pagos",
    "docs.payments.checkout": "Crear Sesión de Checkout",
    "docs.payments.portal": "Portal del Cliente",
    "docs.payments.webhooks": "Webhooks",
    "docs.functions.title": "Funciones Edge",
    "docs.functions.description":
      "Funciones serverless para operaciones backend",
    "docs.functions.stripe": "Operaciones de Stripe",
    "docs.functions.subscription": "Gestión de Suscripciones",
    "docs.examples.request": "Solicitud",
    "docs.examples.response": "Respuesta",
    "docs.examples.curl": "Ejemplo cURL",
    "docs.examples.javascript": "Ejemplo JavaScript",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<"en" | "es">("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  const t = (key: string): string => {
    const translation = translations[language][key];
    if (!translation) {
      console.warn(
        `Missing translation for key: ${key} in language: ${language}`
      );
      return key; // Fallback to key if translation is missing
    }
    return translation;
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
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
