"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getProducts } from "@/utils/products";
import { ShoppingCart, Heart, Search, X, ChevronRight, ChevronLeft } from "lucide-react";

const CoffeeShop = () => {
  const [currentView, setCurrentView] = useState(0); 
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Ambil produk dari utils/products.ts
  const products = getProducts();
  const itemsPerPage = 6;

  // Kategori produk
  const categories = ["Arabica", "Robusta", "Liberica", "Excelsa", "Others", "Uncategorized"];

  // Format harga dengan koma
  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID");
  };

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Cart functions
  const addToCart = (product: any) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    setIsAddedToCart(true);
    setIsSidebarOpen(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Page navigation
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4">
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
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, products.length)} of {products.length} results
              </div>
            </div>

            {/* Products Grid View */}
            {currentView === 0 ? (
              <div className="flex flex-wrap -mx-2 text-black">
                {currentItems.map((product) => (
                  <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-6" key={product.id}>
                    <div className="relative border border-gray-200 rounded overflow-hidden hover:shadow-lg transition-shadow duration-300">
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

                        <div className="absolute bottom-0 left-0 right-0 flex justify-center transition-all duration-300 
                            opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0">
                          <div className="flex gap-1">
                            <button 
                              onClick={() => addToCart(product)}
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

                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 text-center">
                          <Link href={`/product/${product.id}`} className="hover:text-blue-600">{product.name}</Link>
                        </h3>
                        <div className="flex items-center justify-center">
                          <span className="text-lg font-bold text-blue-600">Rp {formatPrice(product.price)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4 text-black">
                {currentItems.map((product) => (
                  <div key={product.id} className="flex flex-col sm:flex-row border border-gray-200 rounded overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative sm:w-1/3">
                      <Link href={`/product/${product.id}`}>
                        <img src={product.image} alt={product.name} className="w-full h-48 sm:h-full object-cover" />
                      </Link>
                      {product.isNew && (
                        <span className="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded">NEW</span>
                      )}
                      {product.isHot && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">HOT</span>
                      )}
                    </div>
                    <div className="p-4 sm:w-2/3 flex flex-col">
                      <h3 className="text-lg font-semibold mb-2">
                        <Link href={`/product/${product.id}`} className="hover:text-blue-600">{product.name}</Link>
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra felis sed lorem commodo, in semper tortor gravida.
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-lg font-bold text-blue-600">Rp {formatPrice(product.price)}</span>
                        <button 
                          onClick={() => addToCart(product)}
                          className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 transition-colors flex items-center"
                        >
                          <ShoppingCart size={18} className="mr-2" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-1">
                  <button 
                    onClick={() => goToPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-1 border rounded ${
                        currentPage === page
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
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

              {/* Shopping Cart Summary */}
              <div className="bg-white rounded border border-gray-200 overflow-hidden">
                <h4 className="text-lg font-semibold p-4 border-b border-gray-200 text-black flex items-center">
                  <ShoppingCart size={20} className="mr-2" />
                  Shopping Cart
                </h4>
                <div className="p-4">
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-2">Your cart is empty</p>
                  ) : (
                    <div>
                      <p className="mb-2 text-gray-600">{cartItems.length} items in cart</p>
                      <p className="text-lg font-bold text-blue-600 mb-3">Total: Rp {formatPrice(getCartTotal())}</p>
                      <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
                      >
                        View Cart
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Top Rated Products */}
              <div className="bg-white rounded border border-gray-200 overflow-hidden">
                <h4 className="text-lg font-semibold p-4 border-b border-gray-200 text-black">Top Rated Products</h4>
                <div className="p-4 space-y-4">
                  {products.slice(0, 3).map((product) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <div className="w-16 h-16 flex-shrink-0">
                        <Link href={`/product/${product.id}`}>
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover rounded"
                          />
                        </Link>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          <Link href={`/product/${product.id}`} className="hover:text-blue-600">
                            {product.name}
                          </Link>
                        </h3>
                        <p className="text-blue-600 font-semibold">Rp {formatPrice(product.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Added to Cart Notification */}
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