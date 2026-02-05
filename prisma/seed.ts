import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const menuItems = [
  // Babies Regular Menu
  {
    name: 'Awusaa Koko (Baby)',
    description: 'No sugar, with mashed bread and optional soft boiled egg',
    category: 'babies',
    menuType: 'regular',
    price: 8.0,
  },
  {
    name: 'Rice & Wheat Porridge (Baby)',
    description: 'No sugar, with mashed bread',
    category: 'babies',
    menuType: 'regular',
    price: 8.0,
  },
  {
    name: 'Oat Porridge (Baby)',
    description: 'No sugar, with mashed bread',
    category: 'babies',
    menuType: 'regular',
    price: 8.0,
  },

  // Babies VIP Menu
  {
    name: 'Awusaa Koko with Milk (Baby VIP)',
    description: 'With milk and mashed bread',
    category: 'babies',
    menuType: 'vip',
    price: 12.0,
  },
  {
    name: 'Rice & Wheat Porridge with Milk (Baby VIP)',
    description: 'With milk and mashed bread',
    category: 'babies',
    menuType: 'vip',
    price: 12.0,
  },
  {
    name: 'Oat Porridge Premium (Baby VIP)',
    description: 'With milk/groundnut and mashed bread',
    category: 'babies',
    menuType: 'vip',
    price: 12.0,
  },
  {
    name: 'Mini Fruit Purée',
    description: 'Banana or pawpaw',
    category: 'babies',
    menuType: 'vip',
    price: 5.0,
  },

  // Diabetes-Free Regular Menu
  {
    name: 'Awusaa Koko',
    description: 'With koose or bread (2-6 slices)',
    category: 'diabetes-free',
    menuType: 'regular',
    price: 10.0,
  },
  {
    name: 'Rice & Wheat Porridge',
    description: 'With koose or bread',
    category: 'diabetes-free',
    menuType: 'regular',
    price: 10.0,
  },
  {
    name: 'Oat Porridge',
    description: 'With koose or bread',
    category: 'diabetes-free',
    menuType: 'regular',
    price: 10.0,
  },
  {
    name: 'Toasted/Plain Bread',
    description: 'With koose or fried egg',
    category: 'diabetes-free',
    menuType: 'regular',
    price: 8.0,
  },
  {
    name: 'Hot Lipton Tea',
    description: 'With sugar and milk',
    category: 'diabetes-free',
    menuType: 'regular',
    price: 5.0,
  },

  // Diabetes-Free VIP Menu
  {
    name: 'Awusaa Koko Premium',
    description: 'With milk & groundnut, served with bread or koose',
    category: 'diabetes-free',
    menuType: 'vip',
    price: 15.0,
  },
  {
    name: 'Rice & Wheat Porridge Premium',
    description: 'With milk & groundnut, served with bread or koose',
    category: 'diabetes-free',
    menuType: 'vip',
    price: 15.0,
  },
  {
    name: 'Oat Porridge Deluxe',
    description: 'With milk & fruit topping',
    category: 'diabetes-free',
    menuType: 'vip',
    price: 15.0,
  },
  {
    name: 'Toasted Bread Special',
    description: 'With koose & egg',
    category: 'diabetes-free',
    menuType: 'vip',
    price: 12.0,
  },
  {
    name: 'Hot Lipton Tea Premium',
    description: 'With milk & snack box',
    category: 'diabetes-free',
    menuType: 'vip',
    price: 8.0,
  },

  // Diabetic Regular Menu
  {
    name: 'Awusaa Koko (Diabetic)',
    description: 'No sugar, with unsweetened groundnut',
    category: 'diabetic',
    menuType: 'regular',
    price: 10.0,
  },
  {
    name: 'Rice & Wheat Porridge (Diabetic)',
    description: 'No sugar, with unsweetened groundnut',
    category: 'diabetic',
    menuType: 'regular',
    price: 10.0,
  },
  {
    name: 'Oat Porridge (Diabetic)',
    description: 'No sugar, with unsweetened groundnut',
    category: 'diabetic',
    menuType: 'regular',
    price: 10.0,
  },
  {
    name: 'Wheat Bread',
    description: '2-4 slices with boiled or low-oil egg',
    category: 'diabetic',
    menuType: 'regular',
    price: 8.0,
  },
  {
    name: 'Hot Lipton Tea (Diabetic)',
    description: 'No sugar, lemon optional',
    category: 'diabetic',
    menuType: 'regular',
    price: 5.0,
  },

  // Diabetic VIP Menu
  {
    name: 'Awusaa Koko Special (Diabetic)',
    description: 'With skimmed milk and unsweetened groundnut',
    category: 'diabetic',
    menuType: 'vip',
    price: 15.0,
  },
  {
    name: 'Rice & Wheat Porridge Special (Diabetic)',
    description: 'With skimmed milk and unsweetened groundnut',
    category: 'diabetic',
    menuType: 'vip',
    price: 15.0,
  },
  {
    name: 'Oat Porridge Special (Diabetic)',
    description: 'With skimmed milk & fruit topping',
    category: 'diabetic',
    menuType: 'vip',
    price: 15.0,
  },
  {
    name: 'Toasted Wheat Bread (Diabetic)',
    description: 'With boiled egg & vegetables',
    category: 'diabetic',
    menuType: 'vip',
    price: 12.0,
  },
  {
    name: 'Herbal Tea',
    description: 'No sugar',
    category: 'diabetic',
    menuType: 'vip',
    price: 6.0,
  },
  {
    name: 'Special Diabetic Care Box',
    description: 'Carefully curated items for diabetic health',
    category: 'diabetic',
    menuType: 'vip',
    price: 20.0,
  },
];

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();

  console.log('Cleared existing data');

  // Seed menu items
  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: item,
    });
  }

  console.log(`Created ${menuItems.length} menu items`);
  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
