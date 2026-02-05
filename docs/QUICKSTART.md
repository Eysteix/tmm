# 🍽️ Taste Mummies Made Restaurant - Quick Start Guide

Welcome! This guide will help you get your Next.js ordering website up and running quickly.

## 📋 What You're Getting

A complete ordering website with:
- **Homepage** - Brand story, features, and contact info
- **Menu Page** - Full menu with categories (Babies, Regular, Diabetic Care)
- **Order Page** - Interactive ordering form with payment proof upload
- **Admin Dashboard** - View and manage orders

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies

```bash
cd /home/eysteix/Documents/Projects/chris
npm install
```

### Step 2: Check Database Connection

The `.env` file is already configured:
```
DATABASE_URL="postgres://marvel:marvel123@localhost:5432/tasty"
```

Make sure your PostgreSQL database is running!

### Step 3: Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# (Optional) Add sample menu items
npx tsx prisma/seed.ts
```

### Step 4: Start the Development Server

```bash
npm run dev
```

Visit: **http://localhost:3000** 🎉

## 📱 Key Pages

- **/** - Homepage with brand story
- **/menu** - View full menu
- **/order** - Place an order
- **/admin** - View all orders (admin dashboard)

## 💳 Payment Information

The site displays these payment details:
- **MTN MoMo**: 0248928928
- **Telecel Cash**: 0500863154
- **Name**: Atakey Christopher

Customers upload a screenshot of their payment when ordering.

## 📂 Project Structure

```
chris/
├── app/
│   ├── page.tsx          # Homepage
│   ├── menu/page.tsx     # Menu page
│   ├── order/page.tsx    # Order form
│   ├── admin/page.tsx    # Admin dashboard
│   └── api/orders/       # API for handling orders
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Sample data
├── public/
│   ├── uploads/          # Payment screenshots saved here
│   └── *.jpeg, *.webp    # Your brand images
└── lib/
    └── prisma.ts         # Database client
```

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  brand: {
    primary: '#8B4513',    // Main brown color
    secondary: '#D2691E',  // Lighter brown
    accent: '#F4A460',     // Accent color
  },
}
```

### Update Menu Items

Edit database directly or modify `/app/menu/page.tsx` and `/app/order/page.tsx`

### Modify Payment Info

Update contact details in:
- `/app/page.tsx` (Homepage)
- `/app/order/page.tsx` (Order form)

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Run production build

# Database
npx prisma studio       # Open visual database editor
npx prisma migrate dev  # Create new migration
npx prisma generate     # Regenerate client

# Deployment
npm run build && npm start  # Production mode
```

## 📊 Database Schema

### Order Model
- Customer info (name, phone, email, address)
- Delivery date
- Payment proof (uploaded image URL)
- Status (pending, confirmed, preparing, delivered, cancelled)
- Notes

### MenuItem Model
- Name, description
- Category (babies, diabetes-free, diabetic)
- Menu type (regular, vip)
- Price
- Availability

### OrderItem Model
- Links orders to menu items
- Quantity and price per item

## 🌐 Deployment Options

### Option 1: Vercel (Easiest)
1. Push code to GitHub
2. Import to Vercel
3. Add `DATABASE_URL` environment variable
4. Deploy!

### Option 2: DigitalOcean/Railway
1. Create app
2. Connect GitHub repo
3. Add environment variables
4. Deploy

### Option 3: VPS (Ubuntu)
```bash
# Install Node.js, PostgreSQL
npm run build
pm2 start npm --name "tmm" -- start
# Setup nginx reverse proxy
```

## 📞 Support

**Business Contact:**
- Email: tastemummiemade@gmail.com
- Phone: +233 500 863 154 | +233 248 928 928
- Location: Ho, Ghana

## ⏰ Operating Hours

- **Orders**: Daily 10:00 AM - 9:30 PM
- **Delivery**: Daily 6:30 AM - 9:30 AM
- **Home Cooking**: Fri & Sat (2+ days notice)

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Set up database
3. ✅ Run dev server
4. 📝 Test order flow
5. 🎨 Customize branding
6. 🚀 Deploy to production

## 💡 Tips

- Test the order flow before going live
- Check payment screenshots upload correctly
- Monitor the admin dashboard regularly
- Keep database backed up
- Consider adding email notifications

## 🐛 Troubleshooting

**Database connection error?**
- Check PostgreSQL is running
- Verify credentials in `.env`
- Run `npx prisma generate`

**Images not showing?**
- Ensure images are in `/public` folder
- Check image file names match code
- Try clearing Next.js cache: `rm -rf .next`

**Can't upload payment proof?**
- Check `/public/uploads` folder exists
- Verify write permissions
- Check file size limits

---

**Built with ❤️ for Taste Mummies Made Restaurant**  
*"Home in every spoon"*
