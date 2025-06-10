# 📚 Ejemplos de Uso

Este directorio contiene ejemplos detallados de cómo usar las diferentes funcionalidades de Launch Spark MVP.

## 🛍️ Ejemplos de Checkout

### 1. Crear una sesión de checkout básica

```typescript
import { useCheckout } from "@/hooks/use-checkout";

const CheckoutButton = () => {
  const { handlePlanSelection } = useCheckout();

  const plan = {
    name: "Plan Pro",
    priceId: "price_xxx",
    price: 29.99,
    features: ["Feature 1", "Feature 2", "Feature 3"],
  };

  return (
    <button onClick={() => handlePlanSelection(plan)}>
      Suscribirse al Plan Pro
    </button>
  );
};
```

### 2. Manejar un plan gratuito

```typescript
const FreePlanButton = () => {
  const { handlePlanSelection } = useCheckout();

  const freePlan = {
    name: "Plan Gratuito",
    isFree: true,
    features: ["Feature 1", "Feature 2"],
  };

  return (
    <button onClick={() => handlePlanSelection(freePlan)}>
      Activar Plan Gratuito
    </button>
  );
};
```

## 💳 Ejemplos de Stripe

### 1. Configurar productos en Stripe

```bash
# Crear un producto
stripe products create \
  --name "Plan Pro" \
  --description "Plan profesional con todas las características"

# Crear un precio
stripe prices create \
  --product prod_xxx \
  --unit-amount 2999 \
  --currency usd \
  --recurring[interval] month
```

### 2. Configurar webhook de Stripe

```bash
# Crear un endpoint de webhook
stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook

# En producción
stripe webhook-endpoints create \
  --url https://[YOUR_PROJECT_REF].supabase.co/functions/v1/stripe-webhook \
  --events checkout.session.completed customer.subscription.updated customer.subscription.deleted
```

## 🔐 Ejemplos de Autenticación

### 1. Configurar autenticación con Supabase

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Iniciar sesión
const { data, error } = await supabase.auth.signInWithPassword({
  email: "usuario@ejemplo.com",
  password: "contraseña",
});

// Registrarse
const { data, error } = await supabase.auth.signUp({
  email: "usuario@ejemplo.com",
  password: "contraseña",
  options: {
    data: {
      first_name: "Nombre",
      last_name: "Apellido",
    },
  },
});
```

### 2. Proteger rutas

```typescript
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
```

## 📊 Ejemplos de Base de Datos

### 1. Consultar suscripciones

```typescript
const { data: subscriptions, error } = await supabase
  .from("subscriptions")
  .select("*")
  .eq("user_id", user.id)
  .single();

if (error) {
  console.error("Error al obtener suscripción:", error);
  return;
}

console.log("Suscripción actual:", subscriptions);
```

### 2. Actualizar perfil

```typescript
const { data, error } = await supabase
  .from("profiles")
  .update({
    first_name: "Nuevo Nombre",
    last_name: "Nuevo Apellido",
    email_notifications: true,
  })
  .eq("id", user.id);

if (error) {
  console.error("Error al actualizar perfil:", error);
  return;
}

console.log("Perfil actualizado:", data);
```

## 🔧 Ejemplos de Configuración

### 1. Configuración de entorno

```env
# Supabase
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Aplicación
VITE_APP_URL=http://localhost:3000
```

### 2. Configuración de Supabase

```toml
# config.toml
project_id = "tu-project-id"

[api]
enabled = true
port = 54321

[auth]
enabled = true
site_url = "http://localhost:3000"
```

## 🚀 Ejemplos de Despliegue

### 1. Desplegar en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### 2. Desplegar en Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Desplegar
netlify deploy
```

## 📱 Ejemplos de UI

### 1. Componente de Precios

```typescript
const PricingCard = ({ plan }) => {
  const { handlePlanSelection } = useCheckout();

  return (
    <div className="pricing-card">
      <h3>{plan.name}</h3>
      <p className="price">${plan.price}/mes</p>
      <ul>
        {plan.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button onClick={() => handlePlanSelection(plan)}>
        Seleccionar Plan
      </button>
    </div>
  );
};
```

### 2. Componente de Perfil

```typescript
const ProfileCard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(data);
    };
    fetchProfile();
  }, [user]);

  return (
    <div className="profile-card">
      <h2>Perfil de Usuario</h2>
      {profile && (
        <>
          <p>
            Nombre: {profile.first_name} {profile.last_name}
          </p>
          <p>Email: {profile.email}</p>
        </>
      )}
    </div>
  );
};
```
