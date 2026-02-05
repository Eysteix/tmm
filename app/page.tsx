import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header - Mobile Responsive */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center space-x-2 sm:space-x-3">
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
            </div>
            <Link href="/order" className="btn-primary text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6 min-h-[44px] flex items-center">
              Order Now
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section - Mobile Responsive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Healthy Homemade Breakfast Delivered Daily
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8">
              Traditional Ghanaian breakfast with modern convenience. Nutritious,
              affordable, and made with care - just like home.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/order" className="btn-primary text-center min-h-[44px] flex items-center justify-center">
                Start Your Order
              </Link>
              <Link href="/menu" className="btn-secondary text-center min-h-[44px] flex items-center justify-center">
                View Menu
              </Link>
            </div>
          </div>
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
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

      {/* Features Section - Mobile Responsive */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why Choose TMM?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h4 className="text-lg sm:text-xl font-semibold mb-3 text-brand-primary">Homemade Quality</h4>
              <p className="text-sm sm:text-base text-gray-600">
                Every meal is prepared with the same care and love as a mother's cooking
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">💚</div>
              <h4 className="text-lg sm:text-xl font-semibold mb-3 text-brand-primary">Health Focused</h4>
              <p className="text-sm sm:text-base text-gray-600">
                Specialized menus for babies, diabetes-free customers, and diabetic patients
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h4 className="text-lg sm:text-xl font-semibold mb-3 text-brand-primary">Daily Delivery</h4>
              <p className="text-sm sm:text-base text-gray-600">
                Fresh breakfast delivered between 6:30 AM - 9:30 AM every morning
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Hours - Mobile Responsive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="card max-w-2xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-brand-primary">Operating Hours</h3>
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base lg:text-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
              <span className="font-semibold">Ordering Hours:</span>
              <span>Daily 10:00 AM - 9:30 PM</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
              <span className="font-semibold">Delivery Hours:</span>
              <span>Daily 6:30 AM - 9:30 AM</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
              <span className="font-semibold">Home-Cooking Service:</span>
              <span>Fri & Sat (2+ days notice)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Mobile Responsive */}
      <section className="bg-brand-primary text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Get In Touch</h3>
          <div className="space-y-2 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
            <p>📞 +233 500 863 154 | +233 248 928 928</p>
            <p>📧 tastemummiemade@gmail.com</p>
            <p>📍 Ho, Ghana</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 max-w-md mx-auto">
            <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Payment Options</h4>
            <p className="text-sm sm:text-base">MTN MoMo: 0248928928</p>
            <p className="text-sm sm:text-base">Telecel Cash: 0500863154</p>
            <p className="text-xs sm:text-sm mt-2">Name: Atakey Christopher</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            © 2026 Taste Mummies Made Restaurant. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 italic">
            "We believe food should feel like home"
          </p>
        </div>
      </footer>
    </div>
  );
}
