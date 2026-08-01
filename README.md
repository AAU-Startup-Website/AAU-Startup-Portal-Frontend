# AAU Startups Portal

A comprehensive platform designed to empower Addis Ababa University students with the tools, resources, and network needed to transform innovative ideas into successful startups.

## Overview

The AAU Startups Portal serves as a gateway for innovation at Addis Ababa University. Our mission is to prepare students for successful completion, employability, and job creation through entrepreneurship. The platform provides a complete ecosystem for startup development, from ideation to launch and scaling.

## Features

### Authentication & User Management

- User registration and login
- Role-based access control (Student, Founder, Investor, Mentor, Admin)
- Profile management with education and experience tracking

### Startup Application System

- **7-Step Application Process**:
  1. Problem Definition - Identify market problems and target audiences
  2. Solution & Product - Describe your solution and development stage
  3. Market Analysis - Market size, competitors, and revenue models
  4. Team & Expertise - Team composition and skill assessment
  5. Business Details - Company information and funding needs
  6. Documents - File uploads and additional materials
  7. Review & Submit - Final review and submission

### Dashboard & Analytics

- Personalized dashboards for different user roles
- Application tracking and status updates
- Analytics and insights for admins
- Progress monitoring for applicants

### Community Features

- **Announcements** - Stay updated with latest news and opportunities
- **Events** - Discover and register for entrepreneurship events
- **Mentorship** - Connect with experienced mentors
- **Networking** - Build connections with fellow entrepreneurs

### Resource Management

- **Bookings** - Reserve resources, meeting rooms, and equipment
- **Library** - Access to entrepreneurship resources and materials
- **Opportunities** - View available funding and partnership opportunities

### Multi-Role Support

- **Students** - Apply for startup programs and access resources
- **Founders** - Manage startup applications and track progress
- **Investors** - Browse opportunities and connect with startups
- **Mentors** - Guide and support aspiring entrepreneurs
- **Admins** - Manage the platform and review applications

## Technology Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **State Management**: React Context API

### Backend Integration

- **API**: RESTful API hosted on Render
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Token-based authentication
- **File Storage**: Integrated with backend services

### Development Tools

- **Package Manager**: pnpm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Build Tool**: Next.js built-in
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
AAU-Startup-Portal-Frontend/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── admin/                    # Admin-only pages
│   ├── analytics/                # Analytics dashboard
│   ├── announcements/            # Announcements page
│   ├── api/                      # API routes (mock implementations)
│   ├── apply/                    # Startup application form
│   ├── bookings/                 # Resource booking system
│   ├── cofounders/               # Co-founder matching
│   ├── dashboard/                # User dashboard
│   ├── events/                   # Events page
│   ├── founder/                  # Founder-specific pages
│   ├── investor/                 # Investor pages
│   ├── library/                  # Resource library
│   ├── me/                       # User profile page
│   ├── mentor/                   # Mentor pages
│   ├── messages/                 # Messaging system
│   ├── opportunities/            # Opportunities page
│   ├── resources/                # Resources page
│   ├── reviews/                  # Reviews page
│   ├── startups/                 # Startups management
│   ├── stories/                  # Success stories
│   ├── teams/                    # Team management
│   └── unauthorized/             # Access denied page
├── components/                   # Reusable UI components
│   ├── auth/                     # Authentication components
│   ├── booking/                  # Booking-related components
│   ├── forms/                    # Form components
│   ├── layout/                   # Layout components (header, footer)
│   ├── messaging/                # Messaging components
│   ├── notifications/            # Notification components
│   ├── startup/                  # Startup-related components
│   ├── ui/                       # shadcn/ui components
│   └── theme-provider.tsx        # Theme provider
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries
│   ├── api.ts                    # API client functions
│   ├── auth.ts                   # Authentication utilities
│   └── utils.ts                  # General utilities
├── public/                       # Static assets
├── styles/                       # Additional styles
├── components.json               # shadcn/ui configuration
├── docker-compose.yaml           # Production deployment
├── Dockerfile                    # Production container
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies and scripts
├── pnpm-lock.yaml               # Package lock file
├── postcss.config.mjs            # PostCSS configuration
├── public/                       # Static assets
├── README.md                     # Project documentation
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm package manager
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AAU-Startup-Website/AAU-Startup-Portal-Frontend.git
   cd AAU-Startup-Portal-Frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   # Add other environment variables as needed
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

## Configuration

### Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API base URL

### Next.js Configuration

- ESLint and TypeScript errors are ignored during builds for development flexibility
- Images are unoptimized for better compatibility

### Tailwind CSS

- Uses shadcn/ui design system
- Custom color scheme with primary blue theme
- Responsive design utilities

## Database Schema

The application uses Supabase with the following main tables:

- `users` - User accounts and authentication
- `profiles` - Extended user profile information
- `ideas` - Startup application submissions
- `announcements` - Platform announcements
- `events` - Entrepreneurship events
- `bookings` - Resource bookings
- `resources` - Available resources for booking

## Authentication Flow

1. Users register with email, password, and role selection
2. Email verification (handled by backend)
3. JWT token-based authentication
4. Role-based access control for different features
5. Automatic token refresh and session management

## API Integration

The frontend integrates with a Django REST Framework backend:

### Key Endpoints

- `POST /api/users/register/` - User registration
- `POST /api/users/login/` - User authentication
- `GET /api/users/profile/` - Get user profile
- `GET /api/ideas/` - Get user's startup applications
- `POST /api/ideas/` - Submit new application
- `PUT /api/ideas/{id}/` - Update application
- `DELETE /api/ideas/{id}/` - Delete application

## UI/UX Design

- **Design System**: shadcn/ui with New York style
- **Color Scheme**: Blue primary with neutral grays
- **Typography**: Geist Sans font family
- **Responsive**: Mobile-first design approach
- **Accessibility**: Built with accessibility best practices

## Testing

```bash
# Run linting
pnpm lint

# Type checking
pnpm build
```

## Deployment

### Docker Deployment (Recommended for Production)

The project includes Docker configuration for easy deployment.

#### Prerequisites

- Docker and Docker Compose installed

#### Quick Start with Docker

1. **Build and run the application**

   ```bash
   docker-compose up -d --build
   ```

2. **Access the application**
   - Frontend: http://localhost:3000

#### Docker Commands

```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild
docker-compose up -d --build
```

### Alternative Deployment Platforms

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Render**

### Manual Deployment Steps

1. Connect your repository to the deployment platform
2. Set environment variables
3. Configure build settings (if needed)
4. Deploy!

### Alternative Deployment Platforms

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Render**

### Manual Deployment Steps

1. Connect your repository to the deployment platform
2. Set environment variables
3. Configure build settings (if needed)
4. Deploy!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
