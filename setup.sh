#!/bin/bash

# Taste Mummies Made Restaurant - Setup Script
# This script will set up your Next.js ordering website

echo "🍽️  Setting up Taste Mummies Made Restaurant Ordering Website"
echo "============================================================"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

# Check if database URL is set
if ! grep -q "DATABASE_URL" .env 2>/dev/null; then
    echo "⚠️  Warning: DATABASE_URL not found in .env file"
    echo "   Please ensure your .env file exists with DATABASE_URL configured"
fi

echo ""
echo "Step 1/4: Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "Step 2/4: Generating Prisma Client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

echo ""
echo "Step 3/4: Running database migrations..."
npx prisma migrate dev --name init

if [ $? -ne 0 ]; then
    echo "⚠️  Database migration failed or was skipped"
    echo "   You may need to run: npx prisma migrate dev --name init"
fi

echo ""
echo "Step 4/4: (Optional) Seeding database with menu items..."
read -p "Do you want to seed the database with sample menu items? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npx tsx prisma/seed.ts
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the development server, run:"
echo "   npm run dev"
echo ""
echo "📱 Then open your browser to: http://localhost:3000"
echo ""
echo "📊 To view orders in the admin dashboard: http://localhost:3000/admin"
echo ""
echo "💡 Need help? Check QUICKSTART.md for detailed instructions"
