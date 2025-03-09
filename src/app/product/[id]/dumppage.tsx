"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { getProducts } from "@/utils/products";

const products = getProducts();

export default function ProductDetail() {
  const params = useParams();
  const id = Number(params.id);

  const product = products.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(product?.image || "");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [customSize, setCustomSize] = useState("");

  if (!product) {
    return <div className="text-center text-red-600">Produk tidak ditemukan</div>;
  }

  const handleAddToCart = () => {
    console.log(`Menambahkan ${product.name} ke keranjang dengan ukuran: ${selectedSize || customSize}`);
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-amber-100">
      {/* Image Section */}
      <div>
        <div className="relative h-96 md:h-128 rounded-lg overflow-hidden mb-4">
          <Image
            src={selectedImage}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Thumbnail Images */}
        {product.images && (
  <div className="flex gap-2 mt-4 flex-wrap">
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


      {/* Product Info Section */}
      <div>
        <h1 className="text-3xl font-bold text-black">{product.name}</h1>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 mt-1">
          {[...Array(Math.floor(product.rating))].map((_, index) => (
            <Star key={index} size={18} fill="currentColor" />
          ))}
          {product.rating % 1 >= 0.5 && <Star size={18} fill="currentColor" className="half-filled" />}
          <span className="text-gray-600 text-sm ml-1">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="mt-2">
          <p className="text-yellow-600 text-3xl font-semibold">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          {product.oldPrice && (
            <p className="text-gray-400 line-through text-lg">
              Rp {product.oldPrice.toLocaleString("id-ID")}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mt-4">
          <p className="text-gray-700">{product.description}</p>
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
                  selectedSize === size ? "bg-blue-400 border-yellow-500" : ""
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div>
            <label htmlFor="customSize" className="text-sm text-black mb-1 block">
              Atau tentukan ukuran sendiri:
            </label>
            <input
              type="text"
              id="customSize"
              placeholder="Masukkan ukuran custom..."
              className="w-full text-black border px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              value={customSize}
              onChange={(e) => {
                setCustomSize(e.target.value);
                setSelectedSize(null);
              }}
            />
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-6 w-full px-6 py-3 bg-yellow-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors font-medium"
        >
          <ShoppingCart size={20} />
          Tambahkan ke Keranjang
        </button>
      </div>
    </div>
    </div>
  );
}
