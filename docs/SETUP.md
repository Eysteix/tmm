# Taste Mummies Made Restaurant - Ordering Website

A Next.js-based ordering platform for Taste Mummies Made Restaurant, featuring healthy homemade breakfast delivery in Ho, Ghana.

## Features

- 🏠 **Homepage** - Brand story, features, and operating hours
- 📋 **Menu Page** - Categorized menus for Babies, Diabetes-Free, and Diabetic customers
- 🛒 **Order Page** - Interactive order form with:
  - Category selection (Babies, Regular, Diabetic)
  - Menu type selection (Regular, VIP)
  - Real-time order summary
  - Payment proof upload
  - Delivery scheduling
- 💳 **Payment Integration** - Support for MTN MoMo and Telecel Cash with proof upload
- 📱 **Responsive Design** - Mobile-friendly interface with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **File Upload**: Native Next.js file handling

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.example` to `.env` and configure:
   ```env
   DATABASE_URL="postgres://user:password@localhost:5432/dbname"
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Set up the database**:
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev --name init_ordering_system
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
chris/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── orders/        # Order management API
│   ├── menu/              # Menu page
│   ├── order/             # Order form page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── lib/                   # Utility functions
│   └── prisma.ts          # Prisma client singleton
├── prisma/                # Database schema and migrations
│   ├── schema.prisma      # Prisma schema
│   └── migrations/        # Database migrations
├── public/                # Static assets
│   ├── uploads/           # Payment proof uploads
│   └── *.jpeg, *.webp     # Brand images
└── package.json           # Dependencies and scripts
```

## Database Schema

### Models

- **MenuItem**: Menu items with categories and pricing
- **Order**: Customer orders with delivery information
- **OrderItem**: Individual items within an order

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)

## Menu Categories

### 1. Babies (6 Months & Above)
- Regular and VIP options
- No sugar, specially prepared for infants

### 2. Diabetes-Free Customers
- Traditional Ghanaian breakfast items
- Regular and VIP options with various accompaniments

### 3. Diabetic Patients (Special Care)
- Sugar-free options
- Specially curated for diabetic health management

## Payment Information

**MTN MoMo**: 0248928928  
**Telecel Cash**: 0500863154  
**Name**: Atakey Christopher

Customers must make payment and upload screenshot proof when placing orders.

## Operating Hours

- **Ordering**: Daily 10:00 AM - 9:30 PM
- **Delivery**: Daily 6:30 AM - 9:30 AM
- **Home-Cooking**: Fridays & Saturdays (2+ days advance notice required)

## Contact Information

**Name**: Mr. Christopher Selasi Y. Atakey  
**Business**: Taste Mummies Made Restaurant  
**Email**: tastemummiemade@gmail.com  
**Phone**: +233 500 863 154 | +233 248 928 928  
**Location**: Ho, Ghana

## Brand Philosophy

> "We believe food should feel like home. We believe in integrity, consistency, and care. We honor tradition while embracing modern technology. We are committed to health, nutrition, and affordability."

**Tagline**: *"Home in every spoon"*

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify

## License

© 2026 Taste Mummies Made Restaurant. All rights reserved.

## Support

For technical support or business inquiries:
- Email: tastemummiemade@gmail.com
- Phone: +233 500 863 154
