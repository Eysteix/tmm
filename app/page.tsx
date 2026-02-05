import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
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
            </div>
            <Link href="/order" className="btn-primary">
              Order Now
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Healthy Homemade Breakfast Delivered Daily
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Traditional Ghanaian breakfast with modern convenience. Nutritious,
              affordable, and made with care - just like home.
            </p>
            <div className="flex gap-4">
              <Link href="/order" className="btn-primary">
                Start Your Order
              </Link>
              <Link href="/menu" className="btn-secondary">
                View Menu
              </Link>
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/koko_and_kose.jpeg"
              alt="Traditional Ghanaian breakfast"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose TMM?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h4 className="text-xl font-semibold mb-3 text-brand-primary">Homemade Quality</h4>
              <p className="text-gray-600">
                Every meal is prepared with the same care and love as a mother's cooking
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">💚</div>
              <h4 className="text-xl font-semibold mb-3 text-brand-primary">Health Focused</h4>
              <p className="text-gray-600">
                Specialized menus for babies, diabetes-free customers, and diabetic patients
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h4 className="text-xl font-semibold mb-3 text-brand-primary">Daily Delivery</h4>
              <p className="text-gray-600">
                Fresh breakfast delivered between 6:30 AM - 9:30 AM every morning
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Hours */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="card max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6 text-brand-primary">Operating Hours</h3>
          <div className="space-y-4 text-lg">
            <div className="flex justify-between">
              <span className="font-semibold">Ordering Hours:</span>
              <span>Daily 10:00 AM - 9:30 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Delivery Hours:</span>
              <span>Daily 6:30 AM - 9:30 AM</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Home-Cooking Service:</span>
              <span>Fri & Sat (2+ days notice)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-brand-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6">Get In Touch</h3>
          <div className="space-y-2 text-lg mb-8">
            <p>📞 +233 500 863 154 | +233 248 928 928</p>
            <p>📧 tastemummiemade@gmail.com</p>
            <p>📍 Ho, Ghana</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
            <h4 className="font-semibold mb-3">Payment Options</h4>
            <p>MTN MoMo: 0248928928</p>
            <p>Telecel Cash: 0500863154</p>
            <p className="text-sm mt-2">Name: Atakey Christopher</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 Taste Mummies Made Restaurant. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2 italic">
            "We believe food should feel like home"
          </p>
        </div>
      </footer>
    </div>
  );
}
