import React, { useState } from 'react';
import { ShoppingCart, Eye, Heart } from 'lucide-react';

const ProductCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setIsSidebarOpen(true);
    
    // Auto-hide the success alert after 3 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  return (
    <div className="relative flex flex-col items-center max-w-xs mx-auto">
      {/* Product Card */}
      <div 
        className="w-full bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative">
          <img 
            src="/api/placeholder/400/320" 
            alt="Robusta Coffee" 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded font-bold text-sm">
            HOT
          </div>
        </div>
        
        {/* Action Buttons - visible on hover */}
        <div className={`flex justify-center items-center gap-2 -mt-6 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="bg-white p-2 rounded-full shadow-md">
            <Eye size={20} />
          </button>
          <button 
            onClick={handleAddToCart}
            className="bg-yellow-400 p-2 rounded-full shadow-md"
          >
            <ShoppingCart size={20} color="white" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md">
            <Heart size={20} />
          </button>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <div className="flex justify-center mb-2">
            <div className="flex">
              {[1, 2, 3, 4].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-center font-semibold text-lg mb-1">Robusta</h3>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span className="text-teal-600 font-bold text-lg">Rp 29,600</span>
              <span className="text-gray-400 line-through text-base">Rp 37,000</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Alert */}
      {isAddedToCart && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 flex items-center">
          <ShoppingCart size={20} className="mr-2" />
          <span>Product successfully added to cart!</span>
        </div>
      )}
      
      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Your Cart</h2>
            <button onClick={closeSidebar} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-16 h-16 bg-gray-100 rounded">
                <img 
                  src="/api/placeholder/100/100" 
                  alt="Robusta Coffee" 
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Robusta</h3>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">1 × Rp 29,600</span>
                  <button className="text-red-500 text-sm">Remove</button>
                </div>
              </div>
            </div>
            
            <div className="border-t py-3 mt-4">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>Rp 29,600</span>
              </div>
              
              <button className="w-full bg-teal-600 text-white py-2 rounded mt-4 font-medium hover:bg-teal-700 transition-colors">
                Checkout
              </button>
              
              <button className="w-full border border-gray-300 text-gray-700 py-2 rounded mt-2 font-medium hover:bg-gray-50 transition-colors">
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;