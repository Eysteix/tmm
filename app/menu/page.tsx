'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  menuType: string;
  price: number;
  available: boolean;
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu');
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data.filter((item: MenuItem) => item.available));
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = menuItems.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedType !== 'all' && item.menuType !== selectedType) return false;
    return true;
  });

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'babies': return '👶 Babies (6+ months)';
      case 'diabetes-free': return '🍽️ Diabetes-Free';
      case 'diabetic': return '💚 Diabetic Care';
      default: return category;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobile Responsive */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <Image
                src="/logo-black.webp"
                alt="TMM Logo"
                width={40}
                height={40}
                className="sm:w-[50px] sm:h-[50px] rounded-lg"
              />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-brand-primary">Taste Mummies Made</h1>
                <p className="text-xs sm:text-sm text-gray-600 italic hidden sm:block">Home in every spoon</p>
              </div>
            </Link>
            <div className="flex gap-2 sm:gap-4">
              <Link href="/" className="btn-secondary text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6 min-h-[44px] flex items-center">
                Home
              </Link>
              <Link href="/order" className="btn-primary text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6 min-h-[44px] flex items-center">
                Order Now
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">Our Menu</h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Specialized meals for every need
          </p>
        </div>

        {/* Filters - Mobile Responsive with min 44px touch targets */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all min-h-[44px] ${
                  selectedCategory === 'all'
                    ? 'bg-brand-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('babies')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all min-h-[44px] ${
                  selectedCategory === 'babies'
                    ? 'bg-brand-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                👶 Babies
              </button>
              <button
                onClick={() => setSelectedCategory('diabetes-free')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all min-h-[44px] ${
                  selectedCategory === 'diabetes-free'
                    ? 'bg-brand-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🍽️ Diabetes-Free
              </button>
              <button
                onClick={() => setSelectedCategory('diabetic')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all min-h-[44px] ${
                  selectedCategory === 'diabetic'
                    ? 'bg-brand-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💚 Diabetic Care
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Type</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all min-h-[44px] ${
                  selectedType === 'all'
                    ? 'bg-brand-secondary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('regular')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all min-h-[44px] ${
                  selectedType === 'regular'
                    ? 'bg-brand-secondary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Regular
              </button>
              <button
                onClick={() => setSelectedType('vip')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all min-h-[44px] ${
                  selectedType === 'vip'
                    ? 'bg-brand-secondary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ⭐ VIP
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items Grid - Responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg">No items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-semibold ${
                            item.menuType === 'vip'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {item.menuType === 'vip' ? '⭐ VIP' : 'Regular'}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="text-2xl sm:text-3xl font-bold text-brand-primary">
                      GH₵ {item.price.toFixed(2)}
                    </div>
                    <Link
                      href={`/order?item=${item.id}`}
                      className="bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors min-h-[44px] flex items-center justify-center"
                    >
                      Add to Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <section className="text-center py-8 sm:py-12 mt-8 sm:mt-12">
          <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-xl shadow-lg p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Order?</h3>
            <p className="text-base sm:text-lg mb-4 sm:mb-6">
              Place your order now for tomorrow's fresh breakfast delivery
            </p>
            <Link
              href="/order"
              className="inline-block bg-white text-brand-primary font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-lg hover:bg-gray-100 transition-colors text-base sm:text-lg min-h-[44px]"
            >
              Place Your Order
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            © 2026 Taste Mummies Made Restaurant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
