"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Search, User, ChevronDown } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  hasDropdown: boolean;
}

const Navbar: React.FC = () => {
  const [language, setLanguage] = useState('English');
  const [cartItemCount, setCartItemCount] = useState(0);
  
  // Navigation items
  const navItems: NavItem[] = [
    { name: 'Home', path: '/', hasDropdown: false },
    { name: 'Our Service', path: '/pages/OurServices', hasDropdown: false },
    { name: 'Shop', path: '/pages/Shop', hasDropdown: false },
    { name: 'News', path: '/pages/News', hasDropdown: false },
    { name: 'Dashboard', path: '/pages/Dashboard', hasDropdown: false },
    { name: 'Contact', path: '/contact', hasDropdown: false },
  ];
  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = localStorage.getItem('coffeeShopCart');
      if (storedCart) {
        const cartItems = JSON.parse(storedCart);
        const totalItems = cartItems.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);
        setCartItemCount(totalItems);
      }
    };
    
    // Initial cart load
    updateCartCount();
    
    // Add event listener for storage changes
    window.addEventListener('storage', updateCartCount);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'English' ? 'Indonesia' : 'English');
  };

  return (
    <header className="w-full bg-white">
      {/* Top bar */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center text-sm">
            <div className="flex items-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Surabaya, Jawa Timur</span>
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-blue-800 font-medium mr-4">#RootsToRoast</span>
            
            <div className="relative group mr-4">
              <button 
                className="flex items-center text-sm font-medium text-yellow-600"
                onClick={toggleLanguage}
              >
                {language} 
                <ChevronDown size={14} className="ml-1" />
              </button>
              <div className="hidden  group-hover:block absolute right-0 top-full bg-white shadow-md z-10 w-28">
                <button 
                  className="block text-cyan-900 w-full px-4 py-2 text-left text-sm hover:bg-yellow-400"
                  onClick={() => setLanguage('English')}
                >
                  English
                </button>
                <button 
                  className="block text-cyan-900 w-full px-4 py-2 text-left text-sm hover:bg-yellow-400"
                  onClick={() => setLanguage('Indonesia')}
                >
                  Indonesia
                </button>
              </div>
            </div>

            <div className="flex space-x-3 max-md:hidden">
              <Link href="#" className="text-gray-700 hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="4.93" x2="19.07" y1="4.93" y2="19.07"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto py-4 flex justify-between items-center px-16 max-md:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Co Nation Logo"
            width={150}
            height={60}
            className="object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <Link 
                href={item.path} 
                className="flex items-center text-gray-800 font-medium hover:text-blue-800"
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown size={16} className="ml-1" />
                )}
              </Link>
              {item.hasDropdown && (
                <div className="hidden group-hover:block absolute left-0 top-full bg-white shadow-md z-10 w-40 py-2">
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Submenu 1
                  </Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Submenu 2
                  </Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Submenu 3
                  </Link>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link 
            href="/quote" 
            className="bg-blue-800 text-white px-4 py-2 font-medium hover:bg-blue-900 transition duration-300"
          >
            Sign In
          </Link>
          
          <button className="text-gray-700 hover:text-blue-800">
            <Search size={20} />
          </button>
          
          <Link href="/account" className="text-gray-700 hover:text-blue-800">
            <User size={20} />
          </Link>
          
          <Link href="/cart" className="text-gray-700 hover:text-blue-800 relative">
        <ShoppingCart size={20} />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cartItemCount}
          </span>
        )}
      </Link>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden flex justify-end p-4">
        <button className="text-gray-700 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;