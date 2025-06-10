export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceId: string;
  features: string[];
  isPopular?: boolean;
}

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfecto para empezar",
    price: 0,
    priceId: "price_1RYVuSIeCmoKndoZy8j9irBg",
    features: [
      "Acceso básico a la plataforma",
      "Hasta 3 proyectos",
      "Soporte por email",
      "Actualizaciones básicas",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Para profesionales y equipos pequeños",
    price: 29.99,
    priceId: "price_1RXtEYIeCmoKndoZ4ycWThsi",
    features: [
      "Todo lo del plan Free",
      "Proyectos ilimitados",
      "Soporte prioritario",
      "Actualizaciones premium",
      "Integraciones avanzadas",
      "Análisis detallado",
    ],
    isPopular: true,
  },
  {
    id: "team",
    name: "Team",
    description: "Para equipos y empresas",
    price: 99.99,
    priceId: "price_1RXtEzIeCmoKndoZCIn8A6UW",
    features: [
      "Todo lo del plan Pro",
      "Múltiples usuarios",
      "Soporte 24/7",
      "API personalizada",
      "SLA garantizado",
      "Capacitación incluida",
    ],
  },
];
