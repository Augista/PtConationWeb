export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  isNew?: boolean;
  isHot?: boolean;
  category: string;
  description: string;
  images: string[];
}

export const products: Product[] = [ 
      {
        id: 1,
        name: "Arabica Jawa",
        price: 45260,
        oldPrice: 62000,
        rating: 3.5,
        image: "/images/product/1.png",
        isNew: true,
        category: "Arabica",
        description: "Kopi Arabika berkualitas tinggi dengan cita rasa khas.",
        images: ["/images/product/1.png", "/images/product/4.png"],
      },
      {
        id: 2,
        name: "Gayo",
        price: 68000,
        oldPrice: 85000,
        rating: 3,
        image: "/images/product/4.png",
        isNew: true,
        category: "Arabica",
        description: "Kopi Gayo dengan cita rasa khas Aceh.",
        images: ["/images/product/4.png", "/images/product/5.png"],
      },
      {
        id: 3,
        name: "Robusta",
        price: 29600,
        oldPrice: 37000,
        rating: 4,
        image: "/images/product/2.png",
        isNew: true,
        category: "Robusta",
        description: "Kopi Gayo dengan cita rasa khas Aceh.",
        images: ["/images/product/2.png", "/images/product/3.png"],
      },
      {
        id: 4,
        name: "Robusta",
        price: 29600,
        oldPrice: 37000,
        rating: 4,
        image: "/images/product/5.png",
        isNew: true,
        category: "Robusta",
        description: "Kopi Gayo dengan cita rasa khas Aceh.",
        images: ["/images/product/5.png", "/images/product/6.png"],
      },
      {
        id: 5,
        name: "Robusta",
        price: 29600,
        oldPrice: 37000,
        rating: 4,
        image: "/images/product/7.png",
        isNew: true,
        category: "Robusta",
        description: "Kopi Gayo dengan cita rasa khas Aceh.",
        images: ["/images/product/7.png", "/images/product/3.png"],
      },
      {
        id: 6,
        name: "Gayo Aceh",
        price: 29600,
        oldPrice: 37000,
        rating: 4,
        image: "/images/product/8.png",
        isNew: true,
        category: "Robusta",
        description: "Kopi Gayo dengan cita rasa khas Aceh.",
        images: ["/images/product/8.png", "/images/product/3.png"],
      },
    ];

// Fungsi untuk mengambil semua produk
export const getProducts = (): Product[] => products;

// Fungsi untuk mengambil produk berdasarkan ID
export const getProductById = (id: number): Product | undefined =>
  products.find((product) => product.id === id);
