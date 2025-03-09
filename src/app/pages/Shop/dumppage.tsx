"use client";
import React, { useState } from "react";
import Link from "next/link";
import { getProductById } from '@/utils/products';
import { ShoppingCart, Heart, Search, X } from "lucide-react";

const CoffeeShop = () => {
  const [currentView, setCurrentView] = useState(0); 
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  
  // Sample coffee products data
  const products = [
    {
      id: 1,
      name: "Arabica Jawa",
      price: 45260,
      oldPrice: 62000,
      rating: 3.5,
      image: "/images/product/1.png",
      isNew: true,
      category: "Arabica"
    },
    {
      id: 2,
      name: "Gayo",
      price: 68000,
      oldPrice: 85000,
      rating: 3,
      image: "/images/product/2.png",
      isNew: true,
      category: "Arabica"
    },
    {
      id: 3,
      name: "Robusta",
      price: 29600,
      oldPrice: 37000,
      rating: 4,
      image: "/images/product/3.png",
      isHot: true,
      category: "Robusta"
    },
    {
      id: 4,
      name: "Robusta",
      price: 29600,
      oldPrice: 37000,
      rating: 4,
      image: "/images/product/4.png",
      isHot: true,
      category: "Robusta"
    },
    {
      id: 5,
      name: "Arabica",
      price: 29600,
      oldPrice: 37000,
      rating: 4,
      image: "/images/product/5.png",
      isHot: true,
      category: "Robusta"
    },
    {
      id: 6,
      name: "Gayo Aceh",
      price: 29600,
      oldPrice: 37000,
      rating: 4,
      image: "/images/product/6.png",
      isHot: true,
      category: "Robusta"
    },
    // Add more products as needed
  ];

  const categories = [
    "Arabica",
    "Robusta",
    "Liberica",
    "Excelsa",
    "Others",
    "Uncategorized"
  ];

  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Render star ratings
  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="text-yellow-400"><i className="fas fa-star"></i></span>);
      } else if (i - 0.5 <= rating) {
        stars.push(<span key={i} className="text-yellow-400"><i className="fas fa-star-half-alt"></i></span>);
      } else {
        stars.push(<span key={i} className="text-gray-300"><i className="far fa-star"></i></span>);
      }
    }
    return stars;
  };

  // Handle add to cart
  const handleAddToCart = (product: any) => {
    // Check if product is already in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // If it exists, update quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      // If it's a new item, add to cart
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    // Show success message and open sidebar
    setIsAddedToCart(true);
    setIsSidebarOpen(true);
    
    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Calculate cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {/* Main Products Area */}
          <div className="w-full lg:w-2/3 px-4">
            {/* Shop Options Bar */}
            <div className="flex flex-wrap items-center justify-between p-4 mb-6 border border-gray-200 rounded">
              <div className="flex space-x-2 mb-2 sm:mb-0">
                <Link 
                  href="#" 
                  onClick={() => setCurrentView(0)}
                  className={`p-2 ${currentView === 0 ? "text-blue-600" : "text-black"}`}
                >
                  <i className="fas fa-th-large"></i>
                </Link>
                <Link 
                  href="#" 
                  onClick={() => setCurrentView(1)}
                  className={`p-2 ${currentView === 1 ? "text-blue-600" : "text-black"}`}
                >
                  <i className="fas fa-list"></i>
                </Link>
              </div>
              <div className="mb-2 sm:mb-0">
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="p-2 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="default">Default sorting</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
              <div className="text-sm text-gray-500">
                Showing 1-9 of 12 results
              </div>
            </div>

            {/* Products Grid View */}
            <div className={`${currentView === 0 ? "block" : "hidden"}`}>
              <div className="flex flex-wrap -mx-2 text-black">
                {products.map((product) => (
                  <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-6" key={product.id}>
                    <div className="relative border border-gray-200 rounded overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      {/* Product Image with Hover Options */}
                      <div className="relative group">
                        <Link href={`/product/${product.id}`}>
                          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                        </Link>
                        
                        {product.isNew && (
                          <span className="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded">NEW</span>
                        )}
                        {product.isHot && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">HOT</span>
                        )}
                        
                        {/* Action buttons - visible on hover */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center transition-all duration-300 
                             opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="flex gap-1">
                        <button 
                        onClick={() => handleAddToCart(product)}
                        className="bg-yellow-400 text-white p-2 rounded-full shadow-md hover:bg-yellow-500 transition-colors"
                        >
                        <ShoppingCart size={18} />
                        </button>
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                        <Heart size={18} />
                        </button>
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                        <Search size={18} />
                        </button>
                    </div>
                    </div>

                      </div>
                      
                      {/* Product Info */}
                      <div className="p-4">
                        <div className="flex mb-2 justify-center">
                          {renderRating(product.rating)}
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-center">
                          <Link href={`/product/${product.id}`} className="hover:text-blue-600">{product.name}</Link>
                        </h3>
                        <div className="flex items-center justify-center">
                          <span className="text-lg font-bold text-blue-600">Rp {formatPrice(product.price)}</span>
                          {product.oldPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">Rp {formatPrice(product.oldPrice)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Products List View */}
            <div className={`${currentView === 1 ? "block" : "hidden"}`}>
              {products.map((product) => (
                <div className="flex flex-col md:flex-row border border-gray-200 rounded mb-6 overflow-hidden hover:shadow-lg transition-shadow duration-300" key={product.id}>
                  <div className="relative w-full md:w-1/3">
                    <Link href={`/product/${product.id}`}>
                      <img src={product.image} alt={product.name} className="w-full h-64 md:h-full object-cover" />
                    </Link>
                    {product.isNew && (
                      <span className="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded">NEW</span>
                    )}
                    {product.isHot && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">HOT</span>
                    )}
                  </div>
                  <div className="p-6 w-full md:w-2/3">
                    <div className="flex mb-2">
                      {renderRating(product.rating)}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      <Link href={`/product/${product.id}`} className="hover:text-blue-600">{product.name}</Link>
                    </h3>
                    <div className="flex items-center mb-4">
                      <span className="text-xl font-bold text-blue-600">Rp {formatPrice(product.price)}</span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">Rp {formatPrice(product.oldPrice)}</span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">
                      Premium {product.name} coffee beans, freshly roasted and ready to brew. Enjoy the rich aroma and exceptional flavor of our carefully selected beans.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
                      >
                        <i className="fas fa-shopping-cart mr-2"></i> Add to Cart
                      </button>
                      <a href="#" className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-300">
                        <i className="fas fa-heart mr-2"></i> Wishlist
                      </a>
                      <a href="#" className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-300">
                        <i className="fas fa-search-plus mr-2"></i> Quick View
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center text-black">
              <nav className="flex items-center">
                <ul className="flex">
                  <li>
                    <a className="px-3 py-2 mx-1 border border-gray-300 rounded text-gray-500 bg-gray-100" href="#" tabIndex={-1}>
                      <i className="fas fa-angle-left"></i>
                    </a>
                  </li>
                  <li>
                    <a className="px-3 py-2 mx-1 border border-gray-300 rounded bg-blue-600 text-white" href="#">1</a>
                  </li>
                  <li>
                    <a className="px-3 py-2 mx-1 border border-gray-300 rounded hover:bg-gray-100" href="#">2</a>
                  </li>
                  <li>
                    <a className="px-3 py-2 mx-1 border border-gray-300 rounded hover:bg-gray-100" href="#">3</a>
                  </li>
                  <li>
                    <a className="px-3 py-2 mx-1 border border-gray-300 rounded hover:bg-gray-100" href="#">
                      <i className="fas fa-angle-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 px-4">
            <div className="space-y-8">
              {/* Categories */}
              <div className="bg-white rounded border border-gray-200 overflow-hidden">
                <h4 className="text-lg font-semibold p-4 border-b border-gray-200 text-black">Product Categories</h4>
                <ul>
                  {categories.map((category, index) => (
                    <li key={index} className="border-b border-gray-200 text-gray-800 last:border-b-0">
                      <Link 
                        href={`/category/${category.toLowerCase()}`} 
                        className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors duration-300"
                      >
                        <span>{category}</span>
                        <i className="fas fa-chevron-right text-gray-400"></i>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Filter */}
              <div className="bg-white rounded border border-gray-200 overflow-hidden">
                <h4 className="text-lg font-semibold p-4 border-b border-gray-200 text-black">
                  <i className="fas fa-filter mr-2 "></i>
                  Filter By Price
                </h4>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Your range:</span>
                    <button className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300">
                      Add Your Price
                    </button>
                  </div>
                  <input type="range" className="w-full" min="0" max="100" />
                </div>
              </div>

              {/* Top Rated Products (optional) */}
              <div className="bg-white rounded border border-gray-200 overflow-hidden">
                <h4 className="text-lg font-semibold p-4 border-b border-gray-200 text-black">Top Rated Products</h4>
                <div className="p-4">
                  {/* Top rated products would go here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isAddedToCart && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 flex items-center">
          <ShoppingCart size={20} className="mr-2" />
          <span>Product successfully added to cart!</span>
        </div>
      )}
      
      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4 text-black">
            <h2 className="text-lg font-bold text-black">Your Cart</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="text-center text-black py-8">
              <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-800">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-3 border-b">
                    <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-700">{item.name}</h3>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">{item.quantity} × Rp {formatPrice(item.price)}</span>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="text-red-500 text-sm hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t mt-auto">
                <div className="flex justify-between font-bold text-gray-700 mb-4">
                  <span>Total:</span>
                  <span>Rp {formatPrice(getCartTotal())}</span>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors mb-2">
                  Checkout
                </button>
                
                <button className="w-full border border-gray-300 text-gray-700 py-2 rounded font-medium hover:bg-gray-50 transition-colors">
                  View Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoffeeShop;