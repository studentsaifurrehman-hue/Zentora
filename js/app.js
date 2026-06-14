import { PRODUCTS, CATEGORIES, TESTIMONIALS } from './products.js';
import { initCart } from './cart.js';
import { initWishlist, updateWishlistButtons } from './wishlist.js';
import {
  createProductCard,
  initReveal,
  initCountdown,
  initNewsletter,
  initHeaderScroll,
  initMobileNav,
  renderStars,
} from './components.js';
import { initShopFilters } from './filter.js';
import { initCheckout } from './checkout.js';

function initHome() {
  const featuredGrid = document.querySelector('#featured-products');
  if (featuredGrid) {
    PRODUCTS.filter((p) => p.featured).slice(0, 6).forEach((p) => {
      featuredGrid.appendChild(createProductCard(p));
    });
  }

  const dealsGrid = document.querySelector('#deals-products');
  if (dealsGrid) {
    PRODUCTS.filter((p) => p.deal).forEach((p) => {
      dealsGrid.appendChild(createProductCard(p));
    });
  }

  const categoriesGrid = document.querySelector('#categories-grid');
  if (categoriesGrid) {
    const categoryImages = {
      fashion: 'https://images.unsplash.com/photo-1483985988351-763728e1935b?w=500&h=600&fit=crop&q=80',
      beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=600&fit=crop&q=80',
      tech: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=600&fit=crop&q=80',
      home: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&h=600&fit=crop&q=80',
      accessories: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=600&fit=crop&q=80',
    };
    CATEGORIES.forEach((cat) => {
      const card = document.createElement('a');
      card.href = `shop.html?category=${cat.id}`;
      card.className = 'category-card reveal';
      card.innerHTML = `
        <img src="${categoryImages[cat.id]}" alt="${cat.name}" loading="lazy" />
        <div class="category-card-content">
          <span class="category-icon">${cat.icon}</span>
          <h3>${cat.name}</h3>
          <span class="category-link">Shop Now →</span>
        </div>
      `;
      categoriesGrid.appendChild(card);
    });
  }

  const testimonialsGrid = document.querySelector('#testimonials-grid');
  if (testimonialsGrid) {
    TESTIMONIALS.forEach((t) => {
      const card = document.createElement('div');
      card.className = 'testimonial-card reveal';
      card.innerHTML = `
        <div class="testimonial-stars">${renderStars(t.rating)}</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${t.avatar}</div>
          <div>
            <strong>${t.name}</strong>
            <span>${t.location}</span>
          </div>
        </div>
      `;
      testimonialsGrid.appendChild(card);
    });
  }

  updateWishlistButtons();
  initReveal();
  initCountdown();
  initNewsletter();
}

function initShop() {
  initShopFilters();

  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  if (category) {
    const select = document.querySelector('#filter-category');
    if (select) {
      select.value = category;
      select.dispatchEvent(new Event('change'));
    }
    document.querySelectorAll('.category-pill').forEach((p) => {
      p.classList.toggle('active', p.dataset.category === category);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initCart();
  initWishlist();
  initHeaderScroll();
  initMobileNav();

  const page = document.body.dataset.page;
  if (page === 'home') initHome();
  if (page === 'shop') initShop();
  if (page === 'checkout') initCheckout();
});
