'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface OrderItem {
  name: string;
  category: string;
  menuType: string;
  quantity: number;
}

const menuItems = {
  babies: {
    regular: [
      "Awusaa Koko (no sugar) with mashed bread",
      "Rice & Wheat Porridge (no sugar) with mashed bread",
      "Oat Porridge (no sugar) with mashed bread"
    ],
    vip: [
      "Awusaa Koko with milk and mashed bread",
      "Rice & Wheat Porridge with milk and mashed bread",
      "Oat Porridge with milk/groundnut and mashed bread",
      "Mini fruit purée (banana or pawpaw)"
    ]
  },
  diabetesFree: {
    regular: [
      "Awusaa Koko with koose or bread",
      "Rice & Wheat Porridge with koose or bread",
      "Oat Porridge with koose or bread",
      "Toasted/plain bread with koose or fried egg",
      "Hot Lipton tea with sugar and milk"
    ],
    vip: [
      "Awusaa Koko with milk & groundnut, bread or koose",
      "Rice & Wheat Porridge with milk & groundnut",
      "Oat Porridge with milk & fruit topping",
      "Toasted bread with koose & egg",
      "Hot Lipton tea with milk & snack box"
    ]
  },
  diabetic: {
    regular: [
      "Awusaa Koko (no sugar) with unsweetened groundnut",
      "Rice & Wheat Porridge (no sugar) with unsweetened groundnut",
      "Oat Porridge (no sugar) with unsweetened groundnut",
      "Wheat bread (2-4 slices) with boiled or low-oil egg",
      "Hot Lipton tea (no sugar), lemon optional"
    ],
    vip: [
      "Awusaa Koko with skimmed milk and unsweetened groundnut",
      "Rice & Wheat Porridge with skimmed milk",
      "Oat Porridge with skimmed milk & fruit topping",
      "Toasted wheat bread with boiled egg & vegetables",
      "Herbal tea (no sugar)",
      "Special Diabetic Care Box"
    ]
  }
};

export default function OrderPage() {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'babies' | 'diabetesFree' | 'diabetic'>('diabetesFree');
  const [selectedMenuType, setSelectedMenuType] = useState<'regular' | 'vip'>('regular');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [notes, setNotes] = useState('');
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const addOrderItem = (itemName: string) => {
    const existingItem = orderItems.find(
      item => item.name === itemName && item.category === selectedCategory && item.menuType === selectedMenuType
    );

    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.name === itemName && item.category === selectedCategory && item.menuType === selectedMenuType
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, {
        name: itemName,
        category: selectedCategory,
        menuType: selectedMenuType,
        quantity: 1
      }]);
    }
  };

  const removeOrderItem = (itemName: string, category: string, menuType: string) => {
    setOrderItems(orderItems.filter(
      item => !(item.name === itemName && item.category === category && item.menuType === menuType)
    ));
  };

  const updateQuantity = (itemName: string, category: string, menuType: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeOrderItem(itemName, category, menuType);
    } else {
      setOrderItems(orderItems.map(item =>
        item.name === itemName && item.category === category && item.menuType === menuType
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    if (orderItems.length === 0) {
      setSubmitMessage('Please add at least one item to your order');
      setIsSubmitting(false);
      return;
    }

    if (!paymentProof) {
      setSubmitMessage('Please upload payment proof screenshot');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('customerName', customerName);
      formData.append('customerPhone', customerPhone);
      formData.append('customerEmail', customerEmail);
      formData.append('deliveryAddress', deliveryAddress);
      formData.append('deliveryDate', deliveryDate);
      formData.append('notes', notes);
      formData.append('orderItems', JSON.stringify(orderItems));
      formData.append('paymentProof', paymentProof);

      const response = await fetch('/api/orders', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitMessage('Order submitted successfully! We will contact you soon to confirm.');
        // Reset form
        setCustomerName('');
        setCustomerPhone('');
        setCustomerEmail('');
        setDeliveryAddress('');
        setDeliveryDate('');
        setNotes('');
        setOrderItems([]);
        setPaymentProof(null);
      } else {
        setSubmitMessage('Error submitting order. Please try again or contact us directly.');
      }
    } catch (error) {
      setSubmitMessage('Error submitting order. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentMenuItems = menuItems[selectedCategory][selectedMenuType];

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
              <Link href="/menu" className="btn-secondary">
                Menu
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Order Form */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Place Your Order</h2>
          <p className="text-xl text-gray-600">
            Order now for tomorrow's fresh breakfast delivery (6:30 AM - 9:30 AM)
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu Selection */}
          <div className="lg:col-span-2">
            <div className="card mb-8">
              <h3 className="text-2xl font-bold mb-6 text-brand-primary">Select Your Meals</h3>

              {/* Category Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Customer Category</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('babies')}
                    className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                      selectedCategory === 'babies'
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-gray-300 hover:border-brand-primary'
                    }`}
                  >
                    👶 Babies
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('diabetesFree')}
                    className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                      selectedCategory === 'diabetesFree'
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-gray-300 hover:border-brand-primary'
                    }`}
                  >
                    🍽️ Regular
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('diabetic')}
                    className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                      selectedCategory === 'diabetic'
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-gray-300 hover:border-brand-primary'
                    }`}
                  >
                    💚 Diabetic
                  </button>
                </div>
              </div>

              {/* Menu Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Menu Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMenuType('regular')}
                    className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                      selectedMenuType === 'regular'
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-gray-300 hover:border-brand-primary'
                    }`}
                  >
                    Regular Menu
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMenuType('vip')}
                    className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                      selectedMenuType === 'vip'
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-gray-300 hover:border-brand-primary'
                    }`}
                  >
                    ⭐ VIP Menu
                  </button>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold mb-3">Available Items</label>
                {currentMenuItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm">{item}</span>
                    <button
                      type="button"
                      onClick={() => addOrderItem(item)}
                      className="bg-brand-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-brand-secondary transition-colors"
                    >
                      Add +
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Information Form */}
            <form onSubmit={handleSubmit} className="card">
              <h3 className="text-2xl font-bold mb-6 text-brand-primary">Delivery Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="+233 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email (Optional)</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Delivery Address *</label>
                  <textarea
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="Enter your full delivery address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Delivery Date *</label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                  <p className="text-xs text-gray-600 mt-1">Delivery between 6:30 AM - 9:30 AM</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Special Instructions (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="Any special requests or dietary notes..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Payment Proof Screenshot *</label>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                    <p className="text-sm text-blue-900 mb-2"><strong>Payment Details:</strong></p>
                    <p className="text-sm text-blue-800">MTN MoMo: 0248928928</p>
                    <p className="text-sm text-blue-800">Telecel Cash: 0500863154</p>
                    <p className="text-sm text-blue-800">Name: Atakey Christopher</p>
                  </div>
                  <input
                    type="file"
                    required
                    accept="image/*"
                    onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Please make payment first and upload screenshot as proof
                  </p>
                </div>
              </div>

              {submitMessage && (
                <div className={`mt-6 p-4 rounded-lg ${
                  submitMessage.includes('successfully') 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || orderItems.length === 0}
                className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h3 className="text-2xl font-bold mb-6 text-brand-primary">Order Summary</h3>

              {orderItems.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No items added yet</p>
              ) : (
                <div className="space-y-4">
                  {orderItems.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600">
                            {item.category === 'babies' ? '👶 Babies' :
                             item.category === 'diabetic' ? '💚 Diabetic' :
                             '🍽️ Regular'} - {item.menuType === 'vip' ? '⭐ VIP' : 'Regular'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeOrderItem(item.name, item.category, item.menuType)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.name, item.category, item.menuType, item.quantity - 1)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 w-8 h-8 rounded"
                        >
                          -
                        </button>
                        <span className="font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.name, item.category, item.menuType, item.quantity + 1)}
                          className="bg-brand-primary hover:bg-brand-secondary text-white w-8 h-8 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Total Items:</strong> {orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
                <p className="text-xs text-gray-500">
                  Final price will be confirmed after order review
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 Taste Mummies Made Restaurant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
