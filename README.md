# 🚀 Launch Spark MVP

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
</div>

## 📋 Description

Launch Spark MVP is a modern SaaS platform designed to help entrepreneurs and startups launch their products efficiently. Our platform offers intuitive and powerful tools to manage the complete product launch cycle.

## ✨ Key Features

- 🎯 **Product Management**: Manage all your products in one place
- 📊 **Real-time Analytics**: Get valuable insights about your launch performance
- 👥 **User Management**: Robust authentication and authorization system
- 🎨 **Modern Interface**: Clean and professional design with Tailwind CSS and shadcn/ui
- 📱 **Responsive Design**: Perfect experience across all devices

## 🛠️ Technologies Used

- **Frontend**:

  - React 18
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - Vite

- **Backend & Services**:
  - Supabase (Authentication & Database)
  - Stripe (Payments)
  - Node.js
  - Express
  - MongoDB
  - JWT Authentication

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- Supabase account
- Stripe account

### Quick Start

1. Clone the repository:

```bash
git clone https://github.com/your-username/launch-spark-mvp.git
cd launch-spark-mvp
```

2. Run the setup script:

```bash
# Make the script executable
chmod +x scripts/setup.sh

# Run the setup script
./scripts/setup.sh
```

The setup script will:

- Install dependencies
- Set up Supabase locally
- Create necessary database tables
- Deploy Edge Functions
- Guide you through the configuration process

### Required Configuration Steps

After running the setup script, you need to complete these essential configuration steps:

1. **Configure Environment Variables**:

   - Copy `.env.example` to `.env` (if not already done by the setup script)
   - Fill in the following variables:

     ```env
     # Supabase Configuration
     VITE_SUPABASE_URL=your-supabase-project-url
     VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

     # Stripe Configuration
     VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
     STRIPE_SECRET_KEY=your-stripe-secret-key
     STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

     # Application Configuration
     VITE_APP_URL=http://localhost:3000
     ```

2. **Set up Supabase**:

   - Create a Supabase account at https://supabase.com
   - Create a new project
   - Get your project URL and anon key from the project settings
   - Configure authentication settings in the Supabase dashboard

3. **Set up Stripe**:

   - Create a Stripe account at https://stripe.com
   - Create your products and pricing plans in the Stripe dashboard
   - Get your API keys from the Stripe dashboard
   - Configure webhook endpoints in Stripe:
     - Go to Developers > Webhooks
     - Add endpoint: `https://[YOUR_PROJECT_REF].supabase.co/functions/v1/stripe-webhook`
     - Select events to listen for:
       - `checkout.session.completed`
       - `customer.subscription.updated`
       - `customer.subscription.deleted`
     - Save the webhook signing secret

4. **Deploy Supabase Functions** (if not done during setup):

   ```bash
   # Link your project
   supabase link --project-ref your-project-ref

   # Deploy functions
   supabase functions deploy create-checkout-session
   supabase functions deploy stripe-webhook
   supabase functions deploy stripe-portal
   supabase functions deploy stripe-refund
   supabase functions deploy refresh-subscription
   ```

5. **Start the Development Server**:
   ```bash
   npm run dev
   ```

For detailed examples of each configuration step, check the `examples/` directory.

### Manual Installation

If you prefer to set up manually:

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

   - Copy `.env.example` to `.env`
   - Fill in your environment variables

3. Set up Supabase:

   - Create a new Supabase project
   - Run the database migrations
   - Configure authentication settings

4. Set up Stripe:

   - Create a Stripe account
   - Set up your products and pricing plans
   - Configure webhook endpoints

5. Start the development server:

```bash
npm run dev
```

## 📚 Examples

Check out the `examples/` directory for detailed examples of:

- Checkout implementation
- Stripe integration
- Authentication flows
- Database operations
- UI components
- Deployment configurations

## 📦 Project Structure

```
launch-spark-mvp/
├── src/                # Source code
├── supabase/          # Supabase configuration
│   ├── functions/     # Edge Functions
│   └── migrations/    # Database migrations
├── examples/          # Usage examples
├── scripts/           # Utility scripts
└── public/           # Static files
```

## 🔧 Configuration

### Environment Variables

```env
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# Application Configuration
VITE_APP_URL=http://localhost:3000
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run tests with coverage
npm run test:coverage
```

## 📈 Deployment

### Production

```bash
# Build for production
npm run build

# Preview the build
npm run preview
```

### Docker

```bash
# Build the image
docker build -t launch-spark-mvp .

# Run the container
docker run -p 3000:3000 launch-spark-mvp
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/launch-spark-mvp/issues).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@launchspark.com or join our [Discord](https://discord.gg/launchspark).

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing components
- [Tailwind CSS](https://tailwindcss.com/) for the CSS framework
- [Vite](https://vitejs.dev/) for the fast bundler

---

<div align="center">
  <sub>Built by Agustín Altamirano</sub>
</div>
