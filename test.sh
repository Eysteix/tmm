#!/bin/bash

# Quick Test Script for TMM Website
# Run this to verify everything works before deployment

echo "🧪 Testing Taste Mummies Made Restaurant Website"
echo "================================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to check if a file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 exists"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $1 missing"
        ((FAILED++))
    fi
}

# Function to check if a directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 exists"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $1 missing"
        ((FAILED++))
    fi
}

echo "1. Checking Core Files..."
check_file "package.json"
check_file "next.config.js"
check_file "tsconfig.json"
check_file ".env"

echo ""
echo "2. Checking App Pages..."
check_file "app/page.tsx"
check_file "app/layout.tsx"
check_file "app/menu/page.tsx"
check_file "app/order/page.tsx"
check_file "app/admin/page.tsx"

echo ""
echo "3. Checking API Routes..."
check_file "app/api/orders/route.ts"

echo ""
echo "4. Checking Database Files..."
check_file "prisma/schema.prisma"
check_file "prisma/seed.ts"
check_file "lib/prisma.ts"

echo ""
echo "5. Checking Directories..."
check_dir "node_modules"
check_dir "public/uploads"

echo ""
echo "6. Checking Documentation..."
check_file "README.md"
check_file "QUICKSTART.md"
check_file "SETUP.md"

echo ""
echo "7. Testing Dependencies..."
if [ -d "node_modules" ]; then
    if [ -d "node_modules/next" ]; then
        echo -e "${GREEN}✓${NC} Next.js installed"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} Next.js not installed"
        ((FAILED++))
    fi

    if [ -d "node_modules/@prisma/client" ]; then
        echo -e "${GREEN}✓${NC} Prisma client installed"
        ((PASSED++))
    else
        echo -e "${YELLOW}⚠${NC} Prisma client not installed (run: npx prisma generate)"
        ((FAILED++))
    fi

    if [ -d "node_modules/react" ]; then
        echo -e "${GREEN}✓${NC} React installed"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} React not installed"
        ((FAILED++))
    fi
else
    echo -e "${RED}✗${NC} node_modules not found"
    echo -e "${YELLOW}⚠${NC} Run: npm install"
    ((FAILED++))
fi

echo ""
echo "8. Checking Environment Variables..."
if grep -q "DATABASE_URL" .env 2>/dev/null; then
    echo -e "${GREEN}✓${NC} DATABASE_URL configured"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} DATABASE_URL not found in .env"
    ((FAILED++))
fi

echo ""
echo "9. Checking Public Assets..."
if [ -f "public/logo-black.webp" ]; then
    echo -e "${GREEN}✓${NC} Logo found"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠${NC} Logo not found (may affect display)"
    ((FAILED++))
fi

echo ""
echo "================================================="
echo "Test Results:"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo "================================================="

if [ $FAILED -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ All tests passed!${NC}"
    echo ""
    echo "You can now run:"
    echo "  npm run dev    # Start development server"
    echo "  npm run build  # Build for production"
    echo ""
    echo "Then visit: http://localhost:3000"
    exit 0
else
    echo ""
    echo -e "${YELLOW}⚠️  Some tests failed.${NC}"
    echo ""
    echo "Quick fixes:"
    echo "  1. Run: npm install"
    echo "  2. Run: npx prisma generate"
    echo "  3. Check .env file exists with DATABASE_URL"
    echo ""
    echo "For detailed help, see: QUICKSTART.md"
    exit 1
fi
