import { formatPrice } from './products.js';
import { addToCart, showToast } from './cart.js';
import { isInWishlist } from './wishlist.js';

export function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) html += '<span class="star filled">★</span>';
    else if (i === full && half) html += '<span class="star half">★</span>';
    else html += '<span class="star">★</span>';
  }
  return html;
}

export function createProductCard(product, options = {}) {
  const { showQuickAdd = true } = options;
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const card = document.createElement('article');
  card.className = 'product-card reveal';
  card.dataset.category = product.category;
  card.dataset.price = product.price;
  card.innerHTML = `
    <div class="product-card-image">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      ${discount > 0 ? `<span class="product-discount">-${discount}%</span>` : ''}
      <img src="${product.image}" alt="${product.name}" loading="lazy" width="300" height="375" />
      <div class="product-card-overlay">
        ${showQuickAdd ? `<button class="btn btn-primary btn-sm quick-add" data-id="${product.id}">Add to Cart</button>` : ''}
        <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" data-wishlist-id="${product.id}" aria-label="Add to wishlist" aria-pressed="${isInWishlist(product.id)}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
    </div>
    <div class="product-card-body">
      <span class="product-category">${product.category}</span>
      <h3 class="product-name">${product.name}</h3>
      <div class="product-rating">
        ${renderStars(product.rating)}
        <span class="rating-count">(${product.reviews})</span>
      </div>
      <div class="product-price">
        <span class="price-current">${formatPrice(product.price)}</span>
        ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
      </div>
    </div>
  `;

  card.querySelector('.quick-add')?.addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(product.id);
    showToast(`${product.name} added to cart`);
  });

  return card;
}

export function renderProductGrid(container, products) {
  container.innerHTML = '';
  if (products.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <p>No products match your filters.</p>
        <button class="btn btn-ghost" id="clear-filters">Clear Filters</button>
      </div>
    `;
    return;
  }
  products.forEach((p) => container.appendChild(createProductCard(p)));
  initReveal(container);
}

export function initReveal(root = document) {
  const reveals = root.querySelectorAll('.reveal:not(.visible)');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach((el) => observer.observe(el));
}

export function initCountdown() {
  const el = document.querySelector('.countdown-timer');
  if (!el) return;

  const end = new Date();
  end.setDate(end.getDate() + 2);
  end.setHours(23, 59, 59, 0);

  function tick() {
    const now = new Date();
    const diff = end - now;
    if (diff <= 0) {
      el.innerHTML = '<span>Offer ended</span>';
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.innerHTML = `
      <div class="countdown-unit"><span>${String(h).padStart(2, '0')}</span><small>Hours</small></div>
      <div class="countdown-sep">:</div>
      <div class="countdown-unit"><span>${String(m).padStart(2, '0')}</span><small>Min</small></div>
      <div class="countdown-sep">:</div>
      <div class="countdown-unit"><span>${String(s).padStart(2, '0')}</span><small>Sec</small></div>
    `;
  }

  tick();
  setInterval(tick, 1000);
}

export function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input?.value) {
      showToast('Welcome to Zentora — check your inbox for exclusive offers.');
      input.value = '';
    }
  });
}

export function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    if (y > lastY && y > 200) header.classList.add('hidden');
    else header.classList.remove('hidden');
    lastY = y;
  }, { passive: true });
}

export function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-menu');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
}
