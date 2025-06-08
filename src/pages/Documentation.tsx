
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import { Code, Database, CreditCard, Key, Globe, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Documentation = () => {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'authentication', label: 'Authentication', icon: Key },
    { id: 'database', label: 'Database API', icon: Database },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'edge-functions', label: 'Edge Functions', icon: Code },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'es' ? 'Documentación Técnica' : 'Technical Documentation'}
          </h1>
          <p className="text-xl text-gray-600">
            {language === 'es' 
              ? 'Guía completa para desarrolladores sobre nuestra API y servicios'
              : 'Complete developer guide for our API and services'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'es' ? 'Tabla de Contenidos' : 'Table of Contents'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => scrollToSection(section.id)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {section.label}
                      </Button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-8">
                {/* Overview Section */}
                <section id="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Globe className="h-5 w-5 mr-2" />
                        {language === 'es' ? 'Visión General' : 'Overview'}
                      </CardTitle>
                      <CardDescription>
                        {language === 'es' 
                          ? 'Introducción a la arquitectura y tecnologías utilizadas'
                          : 'Introduction to architecture and technologies used'
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">
                          {language === 'es' ? 'Stack Tecnológico' : 'Technology Stack'}
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li><strong>Frontend:</strong> React, TypeScript, Tailwind CSS</li>
                          <li><strong>Backend:</strong> Supabase (PostgreSQL, Auth, Edge Functions)</li>
                          <li><strong>Payments:</strong> Stripe</li>
                          <li><strong>Deployment:</strong> Vercel/Netlify</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Base URL</h3>
                        <code className="bg-gray-100 p-2 rounded block">
                          https://pwgziryzjnwjzzljkzje.supabase.co
                        </code>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Authentication Section */}
                <section id="authentication">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Key className="h-5 w-5 mr-2" />
                        {language === 'es' ? 'Autenticación' : 'Authentication'}
                      </CardTitle>
                      <CardDescription>
                        {language === 'es' 
                          ? 'Sistema de autenticación basado en Supabase Auth'
                          : 'Supabase Auth-based authentication system'
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">
                          {language === 'es' ? 'Registro de Usuario' : 'User Registration'}
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">JavaScript Example:</p>
                          <pre className="text-sm overflow-x-auto">
{`const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword',
  options: {
    emailRedirectTo: '${window.location.origin}/'
  }
});`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">
                          {language === 'es' ? 'Inicio de Sesión' : 'User Login'}
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">JavaScript Example:</p>
                          <pre className="text-sm overflow-x-auto">
{`const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword'
});`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">
                          {language === 'es' ? 'Obtener Usuario Actual' : 'Get Current User'}
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">JavaScript Example:</p>
                          <pre className="text-sm overflow-x-auto">
{`const { data: { user } } = await supabase.auth.getUser();`}
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Database API Section */}
                <section id="database">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Database className="h-5 w-5 mr-2" />
                        Database API
                      </CardTitle>
                      <CardDescription>
                        {language === 'es' 
                          ? 'Endpoints y operaciones de base de datos disponibles'
                          : 'Available database endpoints and operations'
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">
                          {language === 'es' ? 'Tablas Principales' : 'Main Tables'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border rounded-lg p-4">
                            <h4 className="font-medium">profiles</h4>
                            <p className="text-sm text-gray-600">User profile information</p>
                            <ul className="text-xs text-gray-500 mt-2">
                              <li>• id (uuid)</li>
                              <li>• email (text)</li>
                              <li>• first_name (text)</li>
                              <li>• last_name (text)</li>
                            </ul>
                          </div>
                          <div className="border rounded-lg p-4">
                            <h4 className="font-medium">subscriptions</h4>
                            <p className="text-sm text-gray-600">User subscription data</p>
                            <ul className="text-xs text-gray-500 mt-2">
                              <li>• user_id (uuid)</li>
                              <li>• plan_name (text)</li>
                              <li>• status (text)</li>
                              <li>• price (numeric)</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">
                          {language === 'es' ? 'Operaciones CRUD' : 'CRUD Operations'}
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">
                              {language === 'es' ? 'Leer Datos' : 'Read Data'}
                            </h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <pre className="text-sm overflow-x-auto">
{`// Get user profile
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single();

// Get user subscription
const { data, error } = await supabase
  .from('subscriptions')
  .select('*')
  .eq('user_id', userId)
  .eq('status', 'active');`}
                              </pre>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">
                              {language === 'es' ? 'Actualizar Datos' : 'Update Data'}
                            </h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <pre className="text-sm overflow-x-auto">
{`// Update user profile
const { error } = await supabase
  .from('profiles')
  .update({ 
    first_name: 'John',
    last_name: 'Doe' 
  })
  .eq('id', userId);`}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Payments Section */}
                <section id="payments">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        {language === 'es' ? 'Sistema de Pagos' : 'Payment System'}
                      </CardTitle>
                      <CardDescription>
                        {language === 'es' 
                          ? 'Integración con Stripe para suscripciones y pagos'
                          : 'Stripe integration for subscriptions and payments'
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">
                          {language === 'es' ? 'Crear Sesión de Checkout' : 'Create Checkout Session'}
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">Edge Function Call:</p>
                          <pre className="text-sm overflow-x-auto">
{`const { data, error } = await supabase.functions.invoke('create-checkout-session', {
  body: {
    priceId: 'price_1234567890',
    userId: user.id,
    planName: 'Pro Plan',
    successUrl: '${window.location.origin}/dashboard?success=true',
    cancelUrl: '${window.location.origin}/#pricing?canceled=true'
  }
});

if (data?.sessionId) {
  const stripe = await loadStripe('pk_test_...');
  await stripe?.redirectToCheckout({ sessionId: data.sessionId });
}`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">
                          {language === 'es' ? 'Portal de Cliente' : 'Customer Portal'}
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">
                            {language === 'es' 
                              ? 'Acceder al portal de gestión de suscripciones:'
                              : 'Access subscription management portal:'
                            }
                          </p>
                          <pre className="text-sm overflow-x-auto">
{`const { data, error } = await supabase.functions.invoke('stripe-portal', {
  headers: {
    Authorization: \`Bearer \${session.access_token}\`
  }
});

if (data?.url) {
  window.location.href = data.url;
}`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">
                          {language === 'es' ? 'Solicitar Reembolso' : 'Request Refund'}
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <pre className="text-sm overflow-x-auto">
{`const { data, error } = await supabase.functions.invoke('stripe-refund', {
  headers: {
    Authorization: \`Bearer \${session.access_token}\`
  }
});

if (data?.success) {
  console.log('Refund processed:', data.refund);
}`}
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Edge Functions Section */}
                <section id="edge-functions">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Code className="h-5 w-5 mr-2" />
                        Edge Functions
                      </CardTitle>
                      <CardDescription>
                        {language === 'es' 
                          ? 'Funciones serverless disponibles'
                          : 'Available serverless functions'
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium">create-checkout-session</h4>
                          <p className="text-sm text-gray-600 mb-2">Creates Stripe checkout session</p>
                          <div className="text-xs">
                            <p><strong>Method:</strong> POST</p>
                            <p><strong>Auth:</strong> Required</p>
                            <p><strong>Body:</strong> priceId, userId, planName</p>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium">stripe-portal</h4>
                          <p className="text-sm text-gray-600 mb-2">Creates billing portal session</p>
                          <div className="text-xs">
                            <p><strong>Method:</strong> POST</p>
                            <p><strong>Auth:</strong> Required</p>
                            <p><strong>Returns:</strong> Portal URL</p>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium">stripe-refund</h4>
                          <p className="text-sm text-gray-600 mb-2">Processes payment refund</p>
                          <div className="text-xs">
                            <p><strong>Method:</strong> POST</p>
                            <p><strong>Auth:</strong> Required</p>
                            <p><strong>Returns:</strong> Refund details</p>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium">refresh-subscription</h4>
                          <p className="text-sm text-gray-600 mb-2">Refreshes subscription status</p>
                          <div className="text-xs">
                            <p><strong>Method:</strong> POST</p>
                            <p><strong>Auth:</strong> Required</p>
                            <p><strong>Returns:</strong> Updated subscription</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">
                          {language === 'es' ? 'Ejemplo de Llamada' : 'Function Call Example'}
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <pre className="text-sm overflow-x-auto">
{`// General pattern for calling edge functions
const { data, error } = await supabase.functions.invoke('function-name', {
  body: { 
    // request parameters
  },
  headers: {
    Authorization: \`Bearer \${session?.access_token}\`
  }
});

if (error) {
  console.error('Function error:', error);
} else {
  console.log('Function response:', data);
}`}
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
