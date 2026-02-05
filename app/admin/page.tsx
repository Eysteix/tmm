'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  menuItemId: string;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  deliveryDate: string;
  totalAmount: number;
  paymentProof: string;
  status: string;
  notes: string;
  createdAt: string;
  orderItems: OrderItem[];
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  menuType: string;
  price: number;
  available: boolean;
}

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
  const [menuForm, setMenuForm] = useState({
    name: '',
    description: '',
    category: 'babies',
    menuType: 'regular',
    price: '',
    available: true,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authenticated) {
      if (activeTab === 'orders') {
        fetchOrders();
      } else {
        fetchMenuItems();
      }
    }
  }, [activeTab, authenticated]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth');
      if (response.ok) {
        setAuthenticated(true);
      } else {
        router.push('/admin/signin');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/signin');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.push('/admin/signin');
    } catch (error) {
      console.error('Signout error:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/menu');
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menuForm),
      });
      if (response.ok) {
        setShowAddMenu(false);
        resetMenuForm();
        fetchMenuItems();
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const handleUpdateMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMenu) return;
    try {
      const response = await fetch('/api/menu', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingMenu.id, ...menuForm }),
      });
      if (response.ok) {
        setEditingMenu(null);
        resetMenuForm();
        fetchMenuItems();
      }
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const handleDeleteMenu = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    try {
      const response = await fetch(`/api/menu?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchMenuItems();
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const resetMenuForm = () => {
    setMenuForm({
      name: '',
      description: '',
      category: 'babies',
      menuType: 'regular',
      price: '',
      available: true,
    });
  };

  const startEdit = (item: MenuItem) => {
    setEditingMenu(item);
    setMenuForm({
      name: item.name,
      description: item.description,
      category: item.category,
      menuType: item.menuType,
      price: item.price.toString(),
      available: item.available,
    });
  };

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(order => order.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                <h1 className="text-2xl font-bold text-brand-primary">TMM Admin</h1>
                <p className="text-sm text-gray-600">{activeTab === 'orders' ? 'Order Management' : 'Menu Management'}</p>
              </div>
            </Link>
            <div className="flex gap-3">
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                Sign Out
              </button>
              <Link href="/" className="btn-secondary">
                Back to Site
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'orders'
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              📦 Orders
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'menu'
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              🍽️ Menu Items
            </button>
          </div>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Orders</div>
            <div className="text-3xl font-bold text-gray-900">{orders.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'pending').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Confirmed</div>
            <div className="text-3xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'confirmed').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Delivered</div>
            <div className="text-3xl font-bold text-green-600">
              {orders.filter(o => o.status === 'delivered').length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-brand-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'confirmed'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setFilter('preparing')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'preparing'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Preparing
            </button>
            <button
              onClick={() => setFilter('delivered')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'delivered'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Delivered
            </button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{order.customerName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>📞 {order.customerPhone}</p>
                        {order.customerEmail && <p>📧 {order.customerEmail}</p>}
                        <p>📍 {order.deliveryAddress}</p>
                        <p>📅 Delivery: {formatDate(order.deliveryDate)}</p>
                        <p>🕐 Ordered: {formatDate(order.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-brand-primary">
                        GH₵ {order.totalAmount.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {order.orderItems.length} item(s)
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold mb-2 text-gray-700">Order Items:</h4>
                    <div className="space-y-2">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-700">{item.menuItemId}</span>
                          <span className="text-gray-900 font-semibold">
                            {item.quantity}x @ GH₵{item.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {order.notes && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 rounded">
                      <p className="text-sm text-blue-900">
                        <strong>Notes:</strong> {order.notes}
                      </p>
                    </div>
                  )}

                  {/* Payment Proof */}
                  {order.paymentProof && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2 text-gray-700">Payment Proof:</h4>
                      <a
                        href={order.paymentProof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200 transition-colors"
                      >
                        📎 View Payment Screenshot
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        </>
        )}

        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Menu Items</h2>
              <button
                onClick={() => {
                  setShowAddMenu(true);
                  resetMenuForm();
                }}
                className="btn-primary"
              >
                + Add Menu Item
              </button>
            </div>

            {/* Add/Edit Menu Form */}
            {(showAddMenu || editingMenu) && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">
                  {editingMenu ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h3>
                <form onSubmit={editingMenu ? handleUpdateMenu : handleAddMenu}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={menuForm.name}
                        onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Price (GH₵) *</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={menuForm.price}
                        onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Category *</label>
                      <select
                        required
                        value={menuForm.category}
                        onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="babies">Babies (6+ months)</option>
                        <option value="diabetes-free">Diabetes-Free</option>
                        <option value="diabetic">Diabetic Care</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Menu Type *</label>
                      <select
                        required
                        value={menuForm.menuType}
                        onChange={(e) => setMenuForm({ ...menuForm, menuType: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="regular">Regular</option>
                        <option value="vip">VIP</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Description</label>
                    <textarea
                      value={menuForm.description}
                      onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={menuForm.available}
                        onChange={(e) => setMenuForm({ ...menuForm, available: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-semibold">Available</span>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="btn-primary">
                      {editingMenu ? 'Update' : 'Add'} Menu Item
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddMenu(false);
                        setEditingMenu(null);
                        resetMenuForm();
                      }}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Menu Items List */}
            <div className="space-y-6">
              {['babies', 'diabetes-free', 'diabetic'].map((category) => {
                const items = menuItems.filter((item) => item.category === category);
                if (items.length === 0) return null;

                return (
                  <div key={category} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="bg-brand-primary text-white px-6 py-3">
                      <h3 className="text-lg font-bold">
                        {category === 'babies' && '👶 Babies (6+ months)'}
                        {category === 'diabetes-free' && '🍽️ Diabetes-Free'}
                        {category === 'diabetic' && '💚 Diabetic Care'}
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className={`border rounded-lg p-4 ${
                              item.available ? 'border-gray-200' : 'border-red-200 bg-red-50'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                  <span
                                    className={`px-2 py-1 text-xs rounded ${
                                      item.menuType === 'vip'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}
                                  >
                                    {item.menuType.toUpperCase()}
                                  </span>
                                </div>
                                {item.description && (
                                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                )}
                                <p className="text-lg font-bold text-brand-primary mt-2">
                                  GH₵ {item.price.toFixed(2)}
                                </p>
                                {!item.available && (
                                  <p className="text-sm text-red-600 font-semibold mt-1">
                                    Unavailable
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <button
                                onClick={() => startEdit(item)}
                                className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteMenu(item.id)}
                                className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
