'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  menuType: string;
  price: number;
  available: boolean;
}

interface OrderItem extends MenuItem {
  quantity: number;
}

function OrderPageContent() {
  const searchParams = useSearchParams();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMenuType, setSelectedMenuType] = useState<string>('all');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [notes, setNotes] = useState('');
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    const itemId = searchParams.get('item');
    if (itemId && menuItems.length > 0) {
      const item = menuItems.find(m => m.id === itemId);
      if (item) {
        addToOrder(item);
      }
    }
  }, [searchParams, menuItems]);

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

  const addToOrder = (item: MenuItem) => {
    const existing = orderItems.find(oi => oi.id === item.id);
    if (existing) {
      setOrderItems(orderItems.map(oi =>
        oi.id === item.id ? { ...oi, quantity: oi.quantity + 1 } : oi
      ));
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, change: number) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (id: string) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const getTotalAmount = () => {
    return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const filteredMenuItems = menuItems.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedMenuType !== 'all' && item.menuType !== selectedMenuType) return false;
    return true;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (orderItems.length === 0) {
      setSubmitMessage('Please add at least one item to your order');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const formData = new FormData();
      formData.append('customerName', customerName);
      formData.append('customerPhone', customerPhone);
      formData.append('customerEmail', customerEmail);
      formData.append('deliveryAddress', deliveryAddress);
      formData.append('deliveryDate', deliveryDate);
      formData.append('notes', notes);
      formData.append('orderItems', JSON.stringify(orderItems.map(item => ({
        name: item.name,
        menuItemId: item.id,
        quantity: item.quantity,
        price: item.price
      }))));
      
      if (paymentProof) {
        formData.append('paymentProof', paymentProof);
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitMessage('Order placed successfully! Order ID: ' + result.orderId);
        // Reset form
        setCustomerName('');
        setCustomerPhone('');
        setCustomerEmail('');
        setDeliveryAddress('');
        setDeliveryDate('');
        setNotes('');
        setPaymentProof(null);
        setOrderItems([]);
      } else {
        setSubmitMessage('Error placing order. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setSubmitMessage('Error placing order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
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
              <Link href="/" className="btn-secondary text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6">
                Home
              </Link>
              <Link href="/menu" className="btn-secondary text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6">
                Menu
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4 text-gray-900">Place Your Order</h2>
          <p className="text-base sm:text-lg text-gray-600">Select your items and complete your order</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Menu Selection - 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Select Items</h3>
              
              {/* Filters */}
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold min-h-[44px] ${
                        selectedCategory === 'all' ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setSelectedCategory('babies')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold min-h-[44px] ${
                        selectedCategory === 'babies' ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      👶 Babies
                    </button>
                    <button
                      onClick={() => setSelectedCategory('diabetes-free')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold min-h-[44px] ${
                        selectedCategory === 'diabetes-free' ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      🍽️ Diabetes-Free
                    </button>
                    <button
                      onClick={() => setSelectedCategory('diabetic')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold min-h-[44px] ${
                        selectedCategory === 'diabetic' ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      💚 Diabetic
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Type</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedMenuType('all')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold min-h-[44px] ${
                        selectedMenuType === 'all' ? 'bg-brand-secondary text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setSelectedMenuType('regular')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold min-h-[44px] ${
                        selectedMenuType === 'regular' ? 'bg-brand-secondary text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      Regular
                    </button>
                    <button
                      onClick={() => setSelectedMenuType('vip')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold min-h-[44px] ${
                        selectedMenuType === 'vip' ? 'bg-brand-secondary text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      ⭐ VIP
                    </button>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-3">
                {filteredMenuItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-brand-primary transition-colors">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{item.name}</h4>
                          <span className={`px-2 py-0.5 text-xs rounded ${
                            item.menuType === 'vip' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {item.menuType === 'vip' ? 'VIP' : 'Regular'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">{item.description}</p>
                        <p className="text-lg sm:text-xl font-bold text-brand-primary">GH₵ {item.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => addToOrder(item)}
                        className="bg-brand-primary hover:bg-brand-secondary text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap min-h-[44px]"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Form - 1 column on large screens, sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Cart */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Your Order ({orderItems.length} items)</h3>
              
              {orderItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8 text-sm">No items added yet</p>
              ) : (
                <div className="space-y-3 mb-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-600">GH₵ {item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 w-8 h-8 rounded flex items-center justify-center min-h-[44px] min-w-[44px]"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="bg-brand-primary hover:bg-brand-secondary text-white w-8 h-8 rounded flex items-center justify-center min-h-[44px] min-w-[44px]"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800 ml-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-brand-primary">GH₵ {getTotalAmount().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-4">Delivery Details</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-base min-h-[44px]"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-base min-h-[44px]"
                    placeholder="0XXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email (Optional)</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-base min-h-[44px]"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Delivery Address *</label>
                  <textarea
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-base"
                    placeholder="Your delivery address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Delivery Date *</label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={getTomorrowDate()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-base min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Additional Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-base"
                    placeholder="Any special instructions?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Payment Proof (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-base"
                  />
                  <p className="text-xs text-gray-500 mt-1">Upload your MoMo/Telecel Cash screenshot</p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || orderItems.length === 0}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg min-h-[48px]"
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>

                {submitMessage && (
                  <div className={`p-4 rounded-lg text-sm ${
                    submitMessage.includes('success') 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            © 2026 Taste Mummies Made Restaurant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}


export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <OrderPageContent />
    </Suspense>
  );
}
