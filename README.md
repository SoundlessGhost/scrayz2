# LinkedInAPI - Professional Data Intelligence Platform

A modern, production-ready frontend for LinkedIn data API services built with Next.js, TypeScript, and TailwindCSS.

## Features

- **Modern Landing Page** - Hero section with compelling messaging and code samples
- **Interactive API Playground** - Test endpoints in real-time with mock responses
- **Comprehensive Authentication** - Login/signup with validation and password strength
- **Professional Dashboard** - API key management, usage analytics, and billing
- **Detailed Pricing** - Three-tier pricing with feature comparison and FAQ
- **Developer Documentation** - Quickstart guides, code examples, and best practices
- **Responsive Design** - Mobile-first approach with smooth animations
- **Accessibility** - WCAG compliant with keyboard navigation and screen reader support

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 with semantic design tokens
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **Animations**: CSS transitions with Framer Motion support
- **Forms**: React Hook Form with Zod validation
- **State Management**: React hooks and context

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd linkedin-api-frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Add your environment variables:
\`\`\`env
NEXT_PUBLIC_API_BASE_URL=https://api.linkedinapi.com
LINKEDIN_API_KEY=your_api_key_here
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                   # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── login/             # Authentication pages
│   ├── signup/           
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   ├── ui/                # Reusable UI components
│   ├── navbar.tsx         # Navigation
│   ├── hero-section.tsx   # Landing page sections
│   └── ...
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── public/                # Static assets
\`\`\`

## Key Components

### Landing Page
- **Hero Section**: Compelling headline with dual CTAs and code sample
- **Features Grid**: Six key features with icons and descriptions
- **API Playground**: Interactive endpoint testing with mock responses
- **Use Cases**: Tabbed interface for different user personas
- **Pricing**: Three-tier pricing with comparison table and FAQ
- **Documentation**: Quickstart guide with code examples

### Authentication
- **Login Form**: Email/password with validation and remember me
- **Signup Form**: Multi-step form with password strength indicator
- **Form Validation**: Client-side validation with error handling

### Dashboard
- **Overview**: Usage statistics and quick actions
- **Analytics**: Endpoint usage and recent activity
- **API Keys**: Secure key management with copy/regenerate
- **Billing**: Plan details and account information

## Design System

### Colors
- **Primary**: Professional gray (#374151) for trust and reliability
- **Accent**: Blue (#6366f1) for interactive elements
- **Neutrals**: White, light gray, dark gray for hierarchy
- **Status**: Green (success), yellow (warning), red (error)

### Typography
- **Headings**: Geist Sans Bold for impact
- **Body**: Geist Sans Regular for readability
- **Code**: Geist Mono for technical content

### Layout
- **Mobile-first**: Responsive design starting from 320px
- **Flexbox**: Primary layout method for most components
- **Grid**: Used for complex 2D layouts (pricing, features)
- **Spacing**: Consistent 4px base unit with semantic tokens

## Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component with lazy loading
- **Bundle Analysis**: Webpack bundle analyzer for optimization
- **Lighthouse Score**: Target 90+ for all metrics

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
\`\`\`bash
npm run build
npm run start
\`\`\`

## Environment Variables

\`\`\`env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.linkedinapi.com
LINKEDIN_API_KEY=sk_live_your_api_key

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
\`\`\`

## Legal Compliance

This application includes proper legal disclaimers and compliance notices:

- **Terms of Service**: User responsibilities and API usage guidelines
- **Privacy Policy**: Data handling and user privacy protection
- **Compliance**: GDPR and data protection compliance notices
- **Disclaimer**: LinkedIn ToS compliance and user responsibility

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Documentation: [docs.linkedinapi.com](https://docs.linkedinapi.com)
- Email: support@linkedinapi.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)
