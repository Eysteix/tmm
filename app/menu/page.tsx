import Link from 'next/link';
import Image from 'next/image';

interface MenuItem {
  name: string;
  description: string;
  category: string;
}

const menuData = {
  babies: {
    regular: [
      { name: "Awusaa Koko", description: "No sugar, with mashed bread and optional soft boiled egg", category: "Babies 6+ months" },
      { name: "Rice & Wheat Porridge", description: "No sugar, with mashed bread", category: "Babies 6+ months" },
      { name: "Oat Porridge", description: "No sugar, with mashed bread", category: "Babies 6+ months" }
    ],
    vip: [
      { name: "Awusaa Koko with Milk", description: "With milk and mashed bread", category: "Babies 6+ months" },
      { name: "Rice & Wheat Porridge with Milk", description: "With milk and mashed bread", category: "Babies 6+ months" },
      { name: "Oat Porridge Premium", description: "With milk/groundnut and mashed bread", category: "Babies 6+ months" },
      { name: "Mini Fruit Purée", description: "Banana or pawpaw", category: "Babies 6+ months" }
    ]
  },
  diabetesFree: {
    regular: [
      { name: "Awusaa Koko", description: "With koose or bread (2-6 slices)", category: "Diabetes-Free" },
      { name: "Rice & Wheat Porridge", description: "With koose or bread", category: "Diabetes-Free" },
      { name: "Oat Porridge", description: "With koose or bread", category: "Diabetes-Free" },
      { name: "Toasted/Plain Bread", description: "With koose or fried egg", category: "Diabetes-Free" },
      { name: "Hot Lipton Tea", description: "With sugar and milk", category: "Diabetes-Free" }
    ],
    vip: [
      { name: "Awusaa Koko Premium", description: "With milk & groundnut, served with bread or koose", category: "Diabetes-Free" },
      { name: "Rice & Wheat Porridge Premium", description: "With milk & groundnut, served with bread or koose", category: "Diabetes-Free" },
      { name: "Oat Porridge Deluxe", description: "With milk & fruit topping", category: "Diabetes-Free" },
      { name: "Toasted Bread Special", description: "With koose & egg", category: "Diabetes-Free" },
      { name: "Hot Lipton Tea Premium", description: "With milk & snack box", category: "Diabetes-Free" }
    ]
  },
  diabetic: {
    regular: [
      { name: "Awusaa Koko", description: "No sugar, with unsweetened groundnut", category: "Diabetic Care" },
      { name: "Rice & Wheat Porridge", description: "No sugar, with unsweetened groundnut", category: "Diabetic Care" },
      { name: "Oat Porridge", description: "No sugar, with unsweetened groundnut", category: "Diabetic Care" },
      { name: "Wheat Bread", description: "2-4 slices with boiled or low-oil egg", category: "Diabetic Care" },
      { name: "Hot Lipton Tea", description: "No sugar, lemon optional", category: "Diabetic Care" }
    ],
    vip: [
      { name: "Awusaa Koko Special", description: "With skimmed milk and unsweetened groundnut", category: "Diabetic Care" },
      { name: "Rice & Wheat Porridge Special", description: "With skimmed milk and unsweetened groundnut", category: "Diabetic Care" },
      { name: "Oat Porridge Special", description: "With skimmed milk & fruit topping", category: "Diabetic Care" },
      { name: "Toasted Wheat Bread", description: "With boiled egg & vegetables", category: "Diabetic Care" },
      { name: "Herbal Tea", description: "No sugar", category: "Diabetic Care" },
      { name: "Special Diabetic Care Box", description: "Carefully curated items for diabetic health", category: "Diabetic Care" }
    ]
  }
};

function MenuSection({ title, items, type }: { title: string; items: MenuItem[]; type: string }) {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6 text-brand-primary flex items-center gap-3">
        <span className={`px-3 py-1 rounded-full text-sm ${type === 'vip' ? 'bg-yellow-100' : 'bg-gray-100'}`}>
          {type === 'vip' ? '⭐ VIP Menu' : 'Regular Menu'}
        </span>
        {title}
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={index} className="card hover:shadow-xl transition-shadow">
            <h4 className="font-semibold text-lg mb-2 text-gray-800">{item.name}</h4>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo-black.webp"
                alt="TMM Logo"
                width={50}
                height={50}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-brand-primary">Taste Mummies Made</h1>
                <p className="text-sm text-gray-600 italic">Home in every spoon</p>
              </div>
            </Link>
            <div className="flex gap-4">
              <Link href="/" className="btn-secondary">
                Home
              </Link>
              <Link href="/order" className="btn-primary">
                Order Now
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Menu Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Menu</h2>
          <p className="text-xl text-gray-600">
            Specialized meals for every need - from babies to diabetic care
          </p>
        </div>

        {/* Babies Menu */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl">👶</span>
            <h2 className="text-3xl font-bold text-gray-900">For Babies (6 Months & Above)</h2>
          </div>
          <MenuSection title="" items={menuData.babies.regular} type="regular" />
          <MenuSection title="" items={menuData.babies.vip} type="vip" />
        </section>

        {/* Diabetes-Free Menu */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl">🍽️</span>
            <h2 className="text-3xl font-bold text-gray-900">Diabetes-Free Customers</h2>
          </div>
          <MenuSection title="" items={menuData.diabetesFree.regular} type="regular" />
          <MenuSection title="" items={menuData.diabetesFree.vip} type="vip" />
        </section>

        {/* Diabetic Care Menu */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl">💚</span>
            <h2 className="text-3xl font-bold text-gray-900">Diabetic Patients (Special Care)</h2>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded">
            <p className="text-green-800">
              <strong>Special Care:</strong> All items are prepared with no added sugar and carefully selected
              ingredients to support diabetic health management.
            </p>
          </div>
          <MenuSection title="" items={menuData.diabetic.regular} type="regular" />
          <MenuSection title="" items={menuData.diabetic.vip} type="vip" />
        </section>

        {/* CTA Section */}
        <section className="text-center py-12">
          <div className="card max-w-2xl mx-auto bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Order?</h3>
            <p className="text-lg mb-6">
              Place your order now for tomorrow's fresh breakfast delivery
            </p>
            <Link href="/order" className="inline-block bg-white text-brand-primary font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Place Your Order
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 Taste Mummies Made Restaurant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
