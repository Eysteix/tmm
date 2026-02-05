# 📂 Site Structure & Navigation Map

## Website Pages

```
Taste Mummies Made Restaurant Website
│
├── 🏠 Homepage (/)
│   └── Features:
│       ├── Hero section with tagline
│       ├── Brand story
│       ├── Features showcase
│       ├── Operating hours
│       └── Contact & payment info
│
├── 📋 Menu Page (/menu)
│   └── Categories:
│       ├── 👶 Babies (6+ months)
│       │   ├── Regular Menu
│       │   └── VIP Menu
│       ├── 🍽️ Diabetes-Free
│       │   ├── Regular Menu
│       │   └── VIP Menu
│       └── 💚 Diabetic Care
│           ├── Regular Menu
│           └── VIP Menu
│
├── 🛒 Order Page (/order)
│   └── Features:
│       ├── Category selector
│       ├── Menu type selector
│       ├── Item browser & cart
│       ├── Order summary sidebar
│       ├── Customer info form
│       ├── Payment proof upload ⭐
│       └── Order submission
│
└── 👨‍💼 Admin Dashboard (/admin)
    └── Features:
        ├── Order statistics
        ├── Status filters
        ├── Order list view
        ├── Customer details
        ├── Payment proof viewer
        └── Order items breakdown
```

## File Structure

```
chris/
│
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   │
│   ├── menu/
│   │   └── page.tsx              # Menu page
│   │
│   ├── order/
│   │   └── page.tsx              # Order form
│   │
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard
│   │
│   └── api/
│       └── orders/
│           └── route.ts          # Orders API
│
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Seed data script
│   └── migrations/               # Database migrations
│
├── lib/
│   └── prisma.ts                 # Prisma client
│
├── public/
│   ├── uploads/                  # Payment screenshots
│   ├── logo-black.webp           # Brand logos
│   ├── logo-white.webp
│   ├── koko_and_kose.jpeg        # Food images
│   └── ...                       # Other assets
│
├── Configuration Files
│   ├── package.json              # Dependencies
│   ├── tsconfig.json             # TypeScript config
│   ├── next.config.js            # Next.js config
│   ├── tailwind.config.ts        # Tailwind config
│   ├── postcss.config.js         # PostCSS config
│   ├── .env                      # Environment variables
│   └── .gitignore                # Git ignore rules
│
├── Documentation
│   ├── README.md                 # Quick overview
│   ├── QUICKSTART.md             # 5-min setup guide
│   ├── SETUP.md                  # Detailed tech docs
│   ├── PROJECT_COMPLETE.md       # This summary
│   └── project.md                # Original requirements
│
└── setup.sh                      # Automated setup script
```

## User Journey Map

### Customer Flow
```
1. Discover
   ↓
   Visit Homepage → Learn about TMM → View Menu
   
2. Browse
   ↓
   Select Category → Choose Regular/VIP → Browse Items
   
3. Order
   ↓
   Add to Cart → Fill Info → Make Payment → Upload Proof
   
4. Confirmation
   ↓
   Submit Order → Receive Confirmation → Await Delivery
```

### Admin Flow
```
1. Check Orders
   ↓
   Visit /admin → View Statistics → Filter by Status
   
2. Review Order
   ↓
   Click Order → Check Details → View Payment Proof
   
3. Process
   ↓
   Confirm Order → Prepare Meal → Mark as Delivered
```

## Key Components

### Homepage Components
- Hero section with CTA buttons
- Feature cards (3 columns)
- Operating hours card
- Contact section with payment details
- Footer

### Menu Components
- Category headers with emojis
- Menu section dividers (Regular/VIP)
- Menu item cards
- CTA section

### Order Components
- Category button group (3 options)
- Menu type toggle (Regular/VIP)
- Item list with "Add" buttons
- Order summary sidebar (sticky)
- Multi-step form
- File upload for payment proof
- Submit button

### Admin Components
- Statistics cards (4 cards)
- Filter buttons
- Order cards with expandable details
- Status badges (color-coded)
- Payment proof links

## Data Flow

```
User Creates Order
       ↓
Order Form Component
       ↓
Form Validation
       ↓
File Upload (Payment Screenshot)
       ↓
API Route (/api/orders)
       ↓
Save File to /public/uploads/
       ↓
Prisma Client
       ↓
PostgreSQL Database
       ↓
Return Success/Error
       ↓
Update UI
```

## Database Relationships

```
MenuItem (Menu Item Catalog)
    ↓ (One-to-Many)
OrderItem (Individual Items in Order)
    ↓ (Many-to-One)
Order (Customer Order)
    ↑
Contains:
- Customer Info
- Delivery Details
- Payment Proof URL
- Order Status
- Total Amount
```

## Technology Stack

```
Frontend:
├── React 18
├── Next.js 14 (App Router)
├── TypeScript
├── Tailwind CSS
└── Next.js Image Optimization

Backend:
├── Next.js API Routes
├── Prisma ORM
├── PostgreSQL
└── File System (uploads)

Development:
├── ESLint
├── PostCSS
├── TypeScript Compiler
└── Prisma CLI
```

## Environment Variables

```env
DATABASE_URL="postgres://user:password@host:port/database"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Port & URLs

- **Development**: http://localhost:3000
- **Homepage**: /
- **Menu**: /menu
- **Order**: /order
- **Admin**: /admin
- **API**: /api/orders

## Build Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)

# Production
npm run build           # Build optimized bundle
npm start               # Start production server

# Database
npx prisma studio       # Visual DB editor (port 5555)
npx prisma migrate dev  # Run migrations
npx prisma generate     # Generate client

# Quality
npm run lint            # Run ESLint
```

## Deployment Checklist

- [ ] Update environment variables
- [ ] Configure database connection
- [ ] Set up file upload storage (if using cloud)
- [ ] Test order submission
- [ ] Test payment proof upload
- [ ] Verify email delivery (if implemented)
- [ ] Add authentication to /admin
- [ ] Configure domain/DNS
- [ ] Set up SSL certificate
- [ ] Enable monitoring/logging
- [ ] Create database backups
- [ ] Test mobile responsiveness

## Color Scheme

```css
Brand Primary:   #8B4513  (Saddle Brown)
Brand Secondary: #D2691E  (Chocolate)
Brand Accent:    #F4A460  (Sandy Brown)

UI Colors:
├── Gray 50-900  (Tailwind defaults)
├── Green        (Success states)
├── Yellow       (Pending states)
├── Blue         (Info states)
└── Red          (Error states)
```

## Payment Methods

```
MTN Mobile Money
├── Number: 0248928928
└── Name: Atakey Christopher

Telecel Cash
├── Number: 0500863154
└── Name: Atakey Christopher
```

## Operating Schedule

```
Monday - Sunday
├── Ordering:   10:00 AM - 9:30 PM
└── Delivery:   6:30 AM - 9:30 AM

Friday - Saturday (Special)
└── Home Cooking: Available (2+ days advance notice)
```

## Contact Information

```
Business Name: Taste Mummies Made Restaurant
Owner: Mr. Christopher Selasi Y. Atakey
Email: tastemummiemade@gmail.com
Phone: +233 500 863 154
       +233 248 928 928
Location: Ho, Ghana
```

---

**Quick Access Links:**
- 📖 Setup Guide: `QUICKSTART.md`
- 🔧 Technical Docs: `SETUP.md`
- ✅ Completion Summary: `PROJECT_COMPLETE.md`
- 📋 Requirements: `project.md`

**Status:** ✅ Project Complete & Ready to Deploy

*"Home in every spoon"* 🍽️
