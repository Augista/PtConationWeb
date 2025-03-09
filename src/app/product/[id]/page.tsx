"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, Star, Heart, ArrowLeft, X, Coffee } from "lucide-react";
import { getProducts } from "@/utils/products";
import Link from "next/link";

const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const products = getProducts();
  const product = products.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState<string | null>("100g"); 
  const [customSize, setCustomSize] = useState("");
  const [selectedBlend, setSelectedBlend] = useState<string | null>(null);
  const [selectedSecondBean, setSelectedSecondBean] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [secondBeanProducts, setSecondBeanProducts] = useState<any[]>([]);

  // Format harga dengan koma
  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID");
  };

  // Calculate price based on selected size and blend
  const calculatePrice = () => {
    if (!product) return 0;
    
    let basePrice = product.price;
    
    // Add premium for custom blends
    if (selectedBlend) {
      // Add a 10% premium for custom blends
      basePrice = basePrice * 1.1;
    }
    
    if (customSize) {
      // Extract number from custom size (e.g. "200g" -> 200)
      const match = customSize.match(/(\d+)/);
      if (match && match[1]) {
        const grams = parseInt(match[1]);
        return basePrice * (grams / 100);
      }
      return basePrice;
    }
    
    if (selectedSize === "100g") {
      return basePrice;
    } else if (selectedSize === "500g") {
      return basePrice * 5;
    } else if (selectedSize === "1kg") {
      return basePrice * 10;
    }
    
    return basePrice;
  };

  // Get second bean products based on selected blend
  const getSecondBeanProducts = (blend: string) => {
    if (!product || !product.category) return [];
    
    let secondBeanCategory = "";
    
    // Get the second bean category based on the blend
    if (blend.includes("arabica-robusta")) {
      if (product.category.toLowerCase().includes("arabica")) {
        secondBeanCategory = "robusta";
      } else if (product.category.toLowerCase().includes("robusta")) {
        secondBeanCategory = "arabica";
      }
    } else if (blend.includes("single-origin")) {
      // For single origin blends, show other single origin beans
      // that are different from the current product
      secondBeanCategory = product.category;
    }
    
    // If no matching category, return empty array
    if (!secondBeanCategory) return [];
    
    // Get products with the second bean category
    return products
      .filter(p => {
        if (blend.includes("single-origin")) {
          // For single origin, get products from the same category but not the current product
          return p.category === secondBeanCategory && p.id !== product.id;
        } else {
          // For arabica-robusta blends, get products from the second bean category
          return p.category.toLowerCase().includes(secondBeanCategory);
        }
      })
      .slice(0, 4); // Get up to 4 related products
  };

  // Handle blend selection
  const handleBlendSelect = (blend: string | null) => {
    setSelectedBlend(blend);
    
    if (blend) {
      const secondBeanProducts = getSecondBeanProducts(blend);
      setSecondBeanProducts(secondBeanProducts);
    } else {
      setSecondBeanProducts([]);
    }
    
    // Reset selected second bean when blend changes
    setSelectedSecondBean(null);
  };

  // Handle second bean selection
  const selectSecondBean = (secondBean: any) => {
    setSelectedSecondBean(secondBean);
    
    // Show notification
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('coffeeShopCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    
    // Set default image when product loads
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('coffeeShopCart', JSON.stringify(cartItems));
  }, [cartItems]);

  if (!product) {
    return <div className="container mx-auto p-6 text-center text-red-600">Produk tidak ditemukan</div>;
  }

  interface CartItem {
    id: string; // Changed to string to support combined IDs
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    secondBeanImage?: string;
    size: string;
    blend: string;
    quantity: number;
    isCustomBlend: boolean;
    mainBean?: string; 
    secondBean?: string;
    blendRatio?: string;
  }

  // Cart functions
  const addToCart = () => {
    const size = selectedSize || customSize || "Default";
    const blend = selectedBlend || "Regular";
    const calculatedPrice = calculatePrice();
    
    let cartItem: CartItem = {
      id: product.id.toString(),
      name: product.name,
      price: calculatedPrice,
      originalPrice: product.price,
      image: product.image,
      secondBeanImage: selectedSecondBean?.image || null,
      size: size,
      blend: blend,
      quantity: quantity,
      isCustomBlend: false // Default to false
    };
    
    if (selectedSecondBean && selectedBlend) {
      const ratio = selectedBlend.includes("70&30") ? "70:30" : 
                    selectedBlend.includes("80&20") ? "80:20" : 
                    selectedBlend.includes("50&50") ? "50:50" : "60:40";
      
      const blendName = `${product.name} + ${selectedSecondBean.name} (${ratio})`;
      
      const ratioParts = ratio.split(":").map(Number); // Convert to numbers
      const secondBeanRatio = ratioParts[1] / 100;
      const mainBeanRatio = ratioParts[0] / 100;
      
      const secondBeanPrice = selectedSecondBean.price * secondBeanRatio;
      const mainBeanPrice = calculatedPrice * mainBeanRatio;
      const blendedPrice = mainBeanPrice + secondBeanPrice;
      
      cartItem = {
        id: `blend-${product.id}-${selectedSecondBean.id}`, // Create a compound string ID
        name: blendName,
        price: blendedPrice,
        originalPrice: product.price,
        image: product.image,
        secondBeanImage: selectedSecondBean.image,
        size: size,
        blend: `Custom (${selectedBlend})`,
        quantity: quantity,
        isCustomBlend: true,
        mainBean: product.name,
        secondBean: selectedSecondBean.name,
        blendRatio: ratio
      };
    }
    
    const existingItemIndex = cartItems.findIndex(
      item => item.id === cartItem.id && item.size === size && item.blend === cartItem.blend
    );
    
    if (existingItemIndex > -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, cartItem]);
    }
    
    setIsAddedToCart(true);
    setIsSidebarOpen(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };

  const removeFromCart = (productId: number | string, size: string, blend: string) => {
    setCartItems(cartItems.filter(item => !(item.id === productId && item.size === size && item.blend === blend)));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Quantity controls
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="bg-amber-50 py-10">
      <div className="container mx-auto p-6">
        {/* Back button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-yellow-600 mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Kembali ke produk</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-md p-6">
          {/* Image Section */}
          <div>
            <div className="relative h-96 md:h-128 rounded-lg overflow-hidden mb-4">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            )}
            </div>

            {/* Thumbnail Images */}
            {product.images && (
              <div className="flex gap-2 mt-4 flex-wrap">
                <button
                  onClick={() => setSelectedImage(product.image)}
                  className={`border p-1 rounded-lg transition ${
                    selectedImage === product.image ? "border-yellow-500" : "border-gray-300"
                  }`}
                >
                  <img src={product.image} alt={`Main`} className="w-16 h-16 object-cover rounded-lg" />
                </button>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`border p-1 rounded-lg transition ${
                      selectedImage === img ? "border-yellow-500" : "border-gray-300"
                    }`}
                  >
                    <img src={img} alt={`Product ${idx}`} className="w-16 h-16 object-cover rounded-lg" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div>
            <h1 className="text-3xl font-bold text-black">{product.name}</h1>

            {/* Category Badge */}
            {product.category && (
              <div className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mt-1 mb-2">
                {product.category}
              </div>
            )}

            {/* Selected Second Bean Badge */}
            {selectedSecondBean && (
              <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1 mb-2 ml-2">
                Blend dengan: {selectedSecondBean.name}
              </div>
            )}

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-500 mt-1">
              {[...Array(Math.floor(product.rating || 5))].map((_, index) => (
                <Star key={index} size={18} fill="currentColor" />
              ))}
              {(product.rating || 5) % 1 >= 0.5 && <Star size={18} fill="currentColor" className="half-filled" />}
              <span className="text-gray-600 text-sm ml-1">({product.rating || "5.0"})</span>
            </div>

            {/* Price */}
            <div className="mt-2">
              <p className="text-yellow-600 text-3xl font-semibold">
                Rp {formatPrice(calculatePrice())}
              </p>
              {product.oldPrice && (
                <p className="text-gray-400 line-through text-lg">
                  Rp {formatPrice(product.oldPrice)}
                </p>
              )}
              {selectedSize !== "100g" || customSize ? (
                <p className="text-sm text-gray-600 mt-1">
                  Harga dasar (100g): Rp {formatPrice(product.price)}
                </p>
              ) : null}
              {selectedBlend && (
                <p className="text-sm text-gray-600 mt-1">
                  *Termasuk premium untuk custom blend
                </p>
              )}
              {selectedSecondBean && (
                <p className="text-sm text-gray-600 mt-1">
                  *Harga blend akan disesuaikan berdasarkan biji kedua yang dipilih
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="text-gray-700">{product.description || "Kopi berkualitas tinggi dengan aroma yang khas dan rasa yang nikmat. Cocok untuk dinikmati kapan saja."}</p>
            </div>

            {/* Size Selection */}
            <div className="mt-6 p-4 border rounded-lg">
              <h3 className="font-semibold mb-2 text-black">Pilih Ukuran</h3>
              <div className="flex gap-2 mb-4 text-black">
                {["100g", "500g", "1kg"].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setCustomSize("");
                    }}
                    className={`border px-4 py-2 rounded-lg hover:bg-gray-100 transition ${
                      selectedSize === size ? "bg-yellow-100 border-yellow-500" : ""
                    }`}
                  >
                    {size} {size !== "100g"}
                  </button>
                ))}
              </div>

              <div>
                <label htmlFor="customSize" className="text-sm text-black mb-1 block">
                  Atau tentukan ukuran sendiri (contoh: 200g, 300g):
                </label>
                <input
                  type="text"
                  id="customSize"
                  placeholder="Masukkan ukuran custom... (dalam gram)"
                  className="w-full text-black border px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={customSize}
                  onChange={(e) => {
                    setCustomSize(e.target.value);
                    setSelectedSize(null);
                  }}
                />
                {customSize && (
                  <p className="text-xs text-gray-500 mt-1">
                    Harga akan disesuaikan berdasarkan ukuran yang dipilih (per 100g)
                  </p>
                )}
              </div>
            </div>

            {/* Custom Blend Selection */}
            <div className="mt-6 p-4 border rounded-lg">
              <h3 className="font-semibold mb-2 text-black">Custom Beans</h3>
              <div className="flex flex-col gap-2 text-black">
                <button
                  onClick={() => handleBlendSelect("arabica-robusta-7030")}
                  className={`border px-4 py-2 rounded-lg hover:bg-gray-100 transition text-left ${
                    selectedBlend === "arabica-robusta-7030" ? "bg-yellow-100 border-yellow-500" : ""
                  }`}
                >
                  <div className="font-medium">Arabica & Robusta Blend (70:30)</div>
                  <div className="text-sm text-gray-600">Memberikan keseimbangan antara rasa halus Arabica dan kekuatan serta crema dari Robusta.</div>
                </button>
                
                <button
                  onClick={() => handleBlendSelect("arabica-robusta-8020")}
                  className={`border px-4 py-2 rounded-lg hover:bg-gray-100 transition text-left ${
                    selectedBlend === "arabica-robusta-8020" ? "bg-yellow-100 border-yellow-500" : ""
                  }`}
                >
                  <div className="font-medium">Arabica & Robusta Blend (80:20)</div>
                  <div className="text-sm text-gray-600">Memberikan keseimbangan antara rasa halus Arabica dan kekuatan serta crema dari Robusta.</div>
                </button>
                
                <button
                  onClick={() => handleBlendSelect("single-origin-5050")}
                  className={`border px-4 py-2 rounded-lg hover:bg-gray-100 transition text-left ${
                    selectedBlend === "single-origin-5050" ? "bg-yellow-100 border-yellow-500" : ""
                  }`}
                >
                  <div className="font-medium">Single Origin Blend (50:50)</div>
                  <div className="text-sm text-gray-600">Menggabungkan kopi dari dua daerah yang berbeda untuk memperkaya karakter rasa.</div>
                </button>
                
                <button
                  onClick={() => handleBlendSelect("single-origin-6040")}
                  className={`border px-4 py-2 rounded-lg hover:bg-gray-100 transition text-left ${
                    selectedBlend === "single-origin-6040" ? "bg-yellow-100 border-yellow-500" : ""
                  }`}
                >
                  <div className="font-medium">Single Origin Blend (60:40)</div>
                  <div className="text-sm text-gray-600">Menggabungkan kopi dari dua daerah yang berbeda untuk memperkaya karakter rasa.</div>
                </button>
                
                <button
                  onClick={() => handleBlendSelect(null)}
                  className={`border px-4 py-2 rounded-lg hover:bg-gray-100 transition text-left ${
                    selectedBlend === null ? "bg-yellow-100 border-yellow-500" : ""
                  }`}
                >
                  <div className="font-medium">Regular (No Blend)</div>
                  <div className="text-sm text-gray-600">Kopi original tanpa custom blend.</div>
                </button>
              </div>
              
              {selectedBlend && !selectedSecondBean && (
                <p className="text-xs text-gray-500 mt-2">
                  *Custom blend dikenakan biaya tambahan 10% dari harga dasar. Pilih biji kedua dari panel di bawah.
                </p>
              )}
              
              {selectedBlend && selectedSecondBean && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <img src={selectedSecondBean.image} alt={selectedSecondBean.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="font-medium text-green-800">Biji Kedua: {selectedSecondBean.name}</p>
                      <p className="text-xs text-green-600">Rp {formatPrice(selectedSecondBean.price)} / 100g</p>
                    </div>
                    <button 
                      onClick={() => setSelectedSecondBean(null)} 
                      className="ml-auto text-gray-500 hover:text-gray-700"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2 text-black">Jumlah</h3>
              <div className="flex items-center border border-black rounded-lg w-32">
                <button 
                  onClick={decreaseQuantity}
                  className="px-3 py-1 text-lg border-r border-black text-black"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full ml-3 px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-black text-black"
                />
                <button 
                  onClick={increaseQuantity}
                  className="px-3 py-1 text-lg border-l border-black text-black"
                >
                  +
                </button>
              </div>
            </div>


            {/* Add to Cart Button */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={addToCart}
                className="flex-1 px-6 py-3 bg-yellow-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors font-medium"
              >
                <ShoppingCart size={20} />
                Tambahkan ke Keranjang
              </button>
              <button
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Second Bean Products Section - Shown when a blend is selected */}
        {secondBeanProducts.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-40">
            <div className="container mx-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-black flex items-center">
                  <Coffee size={20} className="mr-2 text-yellow-600" />
                  {selectedBlend && selectedBlend.includes("arabica") ? 
                    "Pilihan Biji " + (product.category.toLowerCase().includes("arabica") ? "Robusta" : "Arabica") + " untuk Blend Anda" :
                    "Pilihan Single Origin Lain untuk Blend Anda"
                  }
                </h3>
                <button 
                  onClick={() => setSecondBeanProducts([])} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-2">
                {secondBeanProducts.map((secondBean) => (
                  <div key={secondBean.id} className="flex-shrink-0 w-48">
                    <div className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-32">
                        <img
                          src={secondBean.image}
                          alt={secondBean.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="text-sm font-medium text-black mb-1 line-clamp-2">{secondBean.name}</h4>
                        <div className="flex items-center gap-1 text-yellow-500 mb-1">
                          {[...Array(Math.floor(secondBean.rating || 5))].map((_, index) => (
                            <Star key={index} size={10} fill="currentColor" />
                          ))}
                          <span className="text-gray-600 text-xs ml-1">({secondBean.rating || "5.0"})</span>
                        </div>
                        <p className="text-yellow-600 font-semibold text-sm">Rp {formatPrice(secondBean.price)}</p>
                        
                        <button
                          onClick={() => selectSecondBean(secondBean)}
                          className={`mt-2 w-full py-1 px-2 text-xs rounded-lg transition ${
                            selectedSecondBean && selectedSecondBean.id === secondBean.id
                              ? "bg-green-500 text-white"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                          }`}
                        >
                          {selectedSecondBean && selectedSecondBean.id === secondBean.id
                            ? "Terpilih"
                            : "Pilih Biji"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Added to Cart Notification */}
      {isAddedToCart && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 flex items-center">
          <ShoppingCart size={20} className="mr-2" />
          <span>{selectedSecondBean ? "Biji terpilih untuk blend!" : "Produk berhasil ditambahkan ke keranjang!"}</span>
        </div>
      )}
      
      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4 text-black">
            <h2 className="text-lg font-bold text-black">Keranjang Belanja</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="text-center text-black py-8">
              <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-800">Keranjang belanja kosong</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${item.blend}-${index}`} className="flex items-center gap-3 py-3 border-b">
                    <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded"
                      />
                      {/* Display second bean image in bottom right corner if this is a custom blend */}
                      {item.isCustomBlend && item.secondBeanImage && (
                        <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                          <img 
                            src={item.secondBeanImage} 
                            alt={item.secondBean} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-700">{item.name}</h3>
                      <p className="text-xs text-gray-500">Ukuran: {item.size}</p>
                      {item.blend !== "Regular" && (
                        <p className="text-xs text-gray-500">Blend: {item.blend}</p>
                      )}
                      {item.isCustomBlend && item.blendRatio && (
                        <p className="text-xs text-gray-500">Ratio: {item.blendRatio}</p>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">{item.quantity} × Rp {formatPrice(item.price)}</span>
                        <button 
                          onClick={() => removeFromCart(item.id, item.size, item.blend)} 
                          className="text-red-500 text-sm hover:text-red-700"
                        >
                          Hapus
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
                  Lihat Keranjang
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;