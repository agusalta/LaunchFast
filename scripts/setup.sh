#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Iniciando configuración de Launch Spark MVP...${NC}\n"

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado. Por favor, instala Node.js v16 o superior.${NC}"
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado. Por favor, instala npm.${NC}"
    exit 1
fi

# Instalar dependencias
echo -e "${BLUE}📦 Instalando dependencias...${NC}"
npm install

# Verificar si Supabase CLI está instalado
if ! command -v supabase &> /dev/null; then
    echo -e "${BLUE}📦 Instalando Supabase CLI...${NC}"
    npm install -g supabase
fi

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo -e "${BLUE}📝 Creando archivo .env...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Archivo .env creado. Por favor, completa las variables de entorno.${NC}"
fi

# Iniciar Supabase localmente
echo -e "${BLUE}🚀 Iniciando Supabase localmente...${NC}"
supabase start

# Aplicar migraciones
echo -e "${BLUE}🔄 Aplicando migraciones de la base de datos...${NC}"
supabase db reset

# Desplegar funciones
echo -e "${BLUE}🚀 Desplegando funciones de Supabase...${NC}"
echo -e "${BLUE}⚠️  Por favor, asegúrate de haber configurado las variables de entorno en Supabase.${NC}"

# Preguntar si el usuario quiere desplegar las funciones
read -p "¿Deseas desplegar las funciones de Supabase? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Ingresa tu project-ref de Supabase: " project_ref
    
    echo -e "${BLUE}🔗 Vinculando proyecto...${NC}"
    supabase link --project-ref $project_ref

    echo -e "${BLUE}🚀 Desplegando funciones...${NC}"
    supabase functions deploy create-checkout-session
    supabase functions deploy stripe-webhook
    supabase functions deploy stripe-portal
    supabase functions deploy stripe-refund
    supabase functions deploy refresh-subscription
fi

echo -e "\n${GREEN}✅ Configuración completada!${NC}"
echo -e "\n${BLUE}📝 Próximos pasos:${NC}"
echo "1. Completa las variables de entorno en el archivo .env"
echo "2. Configura tu cuenta de Stripe y obtén las credenciales"
echo "3. Configura los webhooks de Stripe"
echo "4. Ejecuta 'npm run dev' para iniciar el servidor de desarrollo"
echo -e "\n${BLUE}📚 Documentación:${NC}"
echo "- Revisa README.md para más detalles"
echo "- Consulta la documentación de Supabase y Stripe" 