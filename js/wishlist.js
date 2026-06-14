import { getProductById, formatPrice } from './products.js';
import { getWishlist, saveWishlist } from './storage.js';
import { addToCart, showToast } from './cart.js';

let listeners = [];

export function subscribe(fn) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

function notify() {
  listeners.forEach((fn) => fn(getWishlist()));
}

export function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

export function toggleWishlist(productId) {
  let list = getWishlist();
  if (list.includes(productId)) {
    list = list.filter((id) => id !== productId);
    showToast('Removed from wishlist');
  } else {
    list.push(productId);
    showToast('Added to wishlist');
  }
  saveWishlist(list);
  notify();
  updateWishlistBadge();
  updateWishlistButtons();
  return list;
}

export function updateWishlistBadge() {
  const badge = document.querySelector('.wishlist-count');
  const count = getWishlist().length;
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

export function updateWishlistButtons() {
  const list = getWishlist();
  document.querySelectorAll('[data-wishlist-id]').forEach((btn) => {
    const id = btn.dataset.wishlistId;
    btn.classList.toggle('active', list.includes(id));
    btn.setAttribute('aria-pressed', list.includes(id));
  });
}

export function renderWishlistPanel(container) {
  const list = getWishlist();
  const products = list.map(getProductById).filter(Boolean);

  if (products.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">♡</div>
        <p>Your wishlist is empty</p>
        <a href="shop.html" class="btn btn-primary btn-sm">Discover Products</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="wishlist-items">
      ${products.map((p) => `
        <div class="wishlist-item" data-id="${p.id}">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
          <div class="wishlist-item-info">
            <h4>${p.name}</h4>
            <span>${formatPrice(p.price)}</span>
          </div>
          <button class="btn btn-sm btn-primary wishlist-add-cart">Add to Cart</button>
          <button class="wishlist-remove" aria-label="Remove">&times;</button>
        </div>
      `).join('')}
    </div>
  `;

  container.querySelectorAll('.wishlist-item').forEach((el) => {
    const id = el.dataset.id;
    el.querySelector('.wishlist-add-cart')?.addEventListener('click', () => {
      addToCart(id);
      showToast('Added to cart');
    });
    el.querySelector('.wishlist-remove')?.addEventListener('click', () => {
      toggleWishlist(id);
      renderWishlistPanel(container);
    });
  });
}

export function initWishlist() {
  updateWishlistBadge();
  updateWishlistButtons();

  const toggle = document.querySelector('.wishlist-toggle');
  const overlay = document.querySelector('.wishlist-overlay');
  const content = document.querySelector('.wishlist-content');
  const close = document.querySelector('.wishlist-close');

  if (!overlay || !content) return;

  const open = () => {
    renderWishlistPanel(content);
    overlay.classList.add('active');
    document.body.classList.add('no-scroll');
  };

  const closePanel = () => {
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  };

  toggle?.addEventListener('click', open);
  close?.addEventListener('click', closePanel);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePanel();
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-wishlist-id]');
    if (btn) {
      e.preventDefault();
      toggleWishlist(btn.dataset.wishlistId);
    }
  });

  subscribe(() => updateWishlistBadge());
}
