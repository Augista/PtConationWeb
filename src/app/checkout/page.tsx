"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

// Define the CartItem interface
interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  blend: string;
  image?: string;
  secondBeanImage?: string;
  isCustomBlend?: boolean;
  mainBean?: string;
  secondBean?: string;
  blendRatio?: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showQR, setShowQR] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('coffeeShopCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    
    // Generate unique order ID on load
    setOrderId("ORDER-" + new Date().getTime());
    
    // Check for payment status from URL params (after redirect back from Midtrans)
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    const transactionId = urlParams.get("transaction_id");
    
    if (status === "success" && transactionId) {
      // Payment was successful
      setIsOrderComplete(true);
      localStorage.removeItem('coffeeShopCart');
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  }, [router]);

  // Format price with comma
  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID");
  };

  // Calculate cart subtotal
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calculate shipping cost
  const getShippingCost = () => {
    return 15.00; // Fixed shipping cost
  };

  // Calculate VAT (10%)
  const getVAT = () => {
    return getSubtotal() * 0.1;
  };

  // Calculate grand total
  const getTotal = () => {
    return getSubtotal() + getShippingCost() + getVAT();
  };

  // Process Midtrans payment
  const processMidtransPayment = () => {
    setIsLoading(true);
    
    // In a real application, you would call your backend API here
    // which would then generate a Midtrans Snap token and redirect URL
    
    // For demo purposes, we'll create a mock redirect URL to the Midtrans sandbox payment page
    
    // Step 1: Construct the redirect URL for a demo
    const redirectUrl = "https://simulator.sandbox.midtrans.com/bca/va/index";
    
    // Step 2: Save order info to localStorage (so we can retrieve it after redirect)
    const orderInfo = {
      id: orderId,
      items: cartItems,
      total: getTotal(),
      paymentMethod: selectedPayment,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('pendingOrder', JSON.stringify(orderInfo));
    
    // Step 3: Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Step 4: Redirect to payment page (in production, this would be the actual Midtrans URL)
      window.location.href = redirectUrl;
    }, 1500);
  };

  // Handle order submission
  const handleOrder = () => {
    if (selectedPayment === "MbankingPay") {
      processMidtransPayment();
    } else if (selectedPayment === "paypal") {
      // Handle PayPal payment
      alert("PayPal integration would go here");
    } else if (selectedPayment === "cash") {
      // Handle cash on delivery
      setIsOrderComplete(true);
      localStorage.removeItem('coffeeShopCart');
      setTimeout(() => router.push('/'), 3000);
    } else {
      // Other payment methods
      setShowQR(true);
      
      // Simulate order processing
      setTimeout(() => {
        setShowQR(false);
        setIsOrderComplete(true);
        localStorage.removeItem('coffeeShopCart');
        setTimeout(() => router.push('/'), 3000);
      }, 3000);
    }
  };

  return (
    <div className="bg-amber-50 min-h-screen py-10">
      <div className="container mx-auto p-6">
        {/* Back button */}
        <Link 
          href="/product/[id]" 
          as="/product/1"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-yellow-600 mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Kembali ke produk</span>  
        </Link>

        {isOrderComplete ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={30} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Pesanan Berhasil!</h2>
            <p className="text-gray-600 mb-4">Terima kasih atas pesanan Anda. Pesanan Anda akan segera diproses.</p>
            <p className="text-sm text-gray-500">Anda akan diarahkan ke halaman utama dalam beberapa detik...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Method</h2>
              
              <div className="space-y-4">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="check"
                    checked={selectedPayment === "check"}
                    onChange={() => setSelectedPayment("check")}
                    className="mr-3"
                  />
                  <span className="text-lg font-medium text-gray-700">QRIS Payment</span>
                </label>
                
                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={selectedPayment === "cash"}
                      onChange={() => setSelectedPayment("cash")}
                      className="mr-3"
                    />
                    <span className="text-lg font-medium text-gray-700">Cash on delivery</span>
                  </div>
                  <img src="/image/product/paySim.png" alt="Cash" className="h-8" />
                </label>
                
                <div className={`ml-6 p-4 bg-gray-50 rounded-lg ${selectedPayment === "cash" ? "block" : "hidden"}`}>
                  <p className="text-gray-700">Pay with cash upon delivery.</p>
                </div>
                
                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="MbankingPay"
                      checked={selectedPayment === "MbankingPay"}
                      onChange={() => setSelectedPayment("MbankingPay")}
                      className="mr-3"
                    />
                    <span className="text-lg font-medium text-gray-700">Bank Transfer (Midtrans)</span>
                  </div>
                </label>
                
                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={selectedPayment === "paypal"}
                      onChange={() => setSelectedPayment("paypal")}
                      className="mr-3"
                    />
                    <span className="text-lg font-medium text-gray-700">PayPal</span>
                  </div>
                 
                </label>
              </div>
              
              <div className="mt-8">
                <button 
                  onClick={handleOrder}
                  disabled={isLoading}
                  className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-yellow-600 hover:bg-yellow-700'} text-white py-3 px-6 rounded-lg font-medium text-lg transition-colors`}
                >
                  {isLoading ? 'Processing...' : 'Order'}
                </button>
              </div>
              
              {selectedPayment === "MbankingPay" && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> For demo purposes, clicking "Order" will redirect you to Midtrans payment simulator. 
                    In a real application, this would connect to your actual Midtrans account via a backend API.
                  </p>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Cart Totals</h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.blend}`} className="flex justify-between py-3 border-b">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-800">{item.name} × {item.quantity}</span>
                    </div>
                    <span className="text-gray-700">Rp{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-700">Jasa Pengiriman</span>
                  <span className="text-gray-700">Rp {formatPrice(getShippingCost())}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-700">Vat</span>
                  <span className="text-gray-700">Rp {formatPrice(getVAT())}</span>
                </div>
                
                <div className="flex justify-between py-3 font-bold text-lg">
                  <span className="text-gray-800">Order Total</span>
                  <span className="text-gray-800">Rp {formatPrice(getTotal())}</span>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg text-gray-600 text-sm">
                  <p><strong>Order ID:</strong> {orderId}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* QR Code Modal */}
        {showQR && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-md w-full">
              <h3 className="text-xl font-bold text-center mb-4">Scan QR Code to Pay</h3>
              <div className="flex justify-center mb-4">
                <img src="/images/product/paySim.png" alt="QR Code" className="w-100 h-88" />
              </div>
              <p className="text-center text-gray-600 mb-4">Please scan this QR code with your payment app</p>
              <div className="text-center">
                <button
                  onClick={() => setShowQR(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowQR(false);
                    setIsOrderComplete(true);
                    localStorage.removeItem('coffeeShopCart');
                    setTimeout(() => router.push('/'), 3000);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  I've Paid
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;