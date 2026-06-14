export const CATEGORIES = [
  { id: 'fashion', name: 'Fashion', icon: '◆' },
  { id: 'beauty', name: 'Beauty', icon: '◇' },
  { id: 'tech', name: 'Tech', icon: '▣' },
  { id: 'home', name: 'Home', icon: '◎' },
  { id: 'accessories', name: 'Accessories', icon: '◈' },
];

export const PRODUCTS = [
  {
    id: 'zt-001',
    name: 'Cashmere Overcoat — Midnight',
    category: 'fashion',
    price: 489,
    originalPrice: 620,
    rating: 4.9,
    reviews: 284,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=750&fit=crop&q=80',
    featured: true,
    deal: false,
  },
  {
    id: 'zt-002',
    name: 'Silk Evening Dress — Pearl',
    category: 'fashion',
    price: 345,
    originalPrice: null,
    rating: 4.8,
    reviews: 156,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=750&fit=crop&q=80',
    featured: true,
    deal: false,
  },
  {
    id: 'zt-003',
    name: 'Radiance Serum Collection',
    category: 'beauty',
    price: 128,
    originalPrice: 165,
    rating: 4.9,
    reviews: 412,
    badge: 'Editor\'s Pick',
    image: 'https://images.unsplash.com/photo-1620916564555-4d8faffc8da1?w=600&h=750&fit=crop&q=80',
    featured: true,
    deal: true,
  },
  {
    id: 'zt-004',
    name: 'Luxe Lip Palette — Rose Gold',
    category: 'beauty',
    price: 89,
    originalPrice: null,
    rating: 4.7,
    reviews: 203,
    badge: null,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=750&fit=crop&q=80',
    featured: true,
    deal: false,
  },
  {
    id: 'zt-005',
    name: 'Aura Wireless Earbuds Pro',
    category: 'tech',
    price: 279,
    originalPrice: 349,
    rating: 4.8,
    reviews: 891,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=750&fit=crop&q=80',
    featured: true,
    deal: true,
  },
  {
    id: 'zt-006',
    name: 'Minimalist Smart Watch — Titanium',
    category: 'tech',
    price: 599,
    originalPrice: null,
    rating: 4.9,
    reviews: 534,
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=750&fit=crop&q=80',
    featured: true,
    deal: false,
  },
  {
    id: 'zt-007',
    name: 'Artisan Ceramic Vase Set',
    category: 'home',
    price: 156,
    originalPrice: 198,
    rating: 4.6,
    reviews: 87,
    badge: null,
    image: 'https://images.unsplash.com/photo-1615529182904-89616657cc27?w=600&h=750&fit=crop&q=80',
    featured: false,
    deal: true,
  },
  {
    id: 'zt-008',
    name: 'Scented Candle Trio — Noir',
    category: 'home',
    price: 72,
    originalPrice: null,
    rating: 4.8,
    reviews: 312,
    badge: 'Cult Favorite',
    image: 'https://images.unsplash.com/photo-1615258359027-9d1697e25733?w=600&h=750&fit=crop&q=80',
    featured: false,
    deal: false,
  },
  {
    id: 'zt-009',
    name: 'Italian Leather Tote — Cognac',
    category: 'accessories',
    price: 425,
    originalPrice: 520,
    rating: 4.9,
    reviews: 178,
    badge: 'Limited',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76c3f1?w=600&h=750&fit=crop&q=80',
    featured: true,
    deal: true,
  },
  {
    id: 'zt-010',
    name: 'Gold-Plated Aviator Sunglasses',
    category: 'accessories',
    price: 198,
    originalPrice: null,
    rating: 4.7,
    reviews: 245,
    badge: null,
    image: 'https://images.unsplash.com/photo-1572635196233-4f2e42f5f6c0?w=600&h=750&fit=crop&q=80',
    featured: false,
    deal: false,
  },
  {
    id: 'zt-011',
    name: 'Merino Wool Knit — Ivory',
    category: 'fashion',
    price: 215,
    originalPrice: 280,
    rating: 4.8,
    reviews: 134,
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=750&fit=crop&q=80',
    featured: false,
    deal: true,
  },
  {
    id: 'zt-012',
    name: 'Hydrating Face Mist — Alpine',
    category: 'beauty',
    price: 54,
    originalPrice: 68,
    rating: 4.6,
    reviews: 567,
    badge: 'Deal',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=750&fit=crop&q=80',
    featured: false,
    deal: true,
  },
];

export const TESTIMONIALS = [
  {
    name: 'Sophie Laurent',
    location: 'Paris, France',
    rating: 5,
    text: 'Zentora delivers an experience that rivals the finest boutiques. Every package feels like a gift from a luxury house.',
    avatar: 'SL',
  },
  {
    name: 'James Whitfield',
    location: 'London, UK',
    rating: 5,
    text: 'Fast international shipping, impeccable quality. I\'ve replaced three other stores with Zentora for premium essentials.',
    avatar: 'JW',
  },
  {
    name: 'Aria Nakamura',
    location: 'Tokyo, Japan',
    rating: 5,
    text: 'The attention to detail is extraordinary. From unboxing to product quality — this is how global ecommerce should feel.',
    avatar: 'AN',
  },
  {
    name: 'Marcus Rivera',
    location: 'New York, USA',
    rating: 5,
    text: 'Secure checkout, transparent pricing, and products that exceed expectations. Zentora earned my trust immediately.',
    avatar: 'MR',
  },
];

export function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

export function filterProducts({ category, minPrice, maxPrice, search }) {
  return PRODUCTS.filter((p) => {
    if (category && category !== 'all' && p.category !== category) return false;
    if (minPrice != null && p.price < minPrice) return false;
    if (maxPrice != null && p.price > maxPrice) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}
