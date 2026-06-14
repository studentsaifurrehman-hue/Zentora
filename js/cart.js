import { getProductById, formatPrice } from './products.js';
import { getCart, saveCart } from './storage.js';

let listeners = [];

export function subscribe(fn) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

function notify() {
  listeners.forEach((fn) => fn(getCartState()));
}

export function getCartState() {
  const cart = getCart();
  const items = cart.map((item) => {
    const product = getProductById(item.id);
    return product ? { ...product, quantity: item.quantity } : null;
  }).filter(Boolean);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, subtotal, itemCount };
}

export function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }
  saveCart(cart);
  notify();
  return getCartState();
}

export function removeFromCart(productId) {
  const cart = getCart().filter((i) => i.id !== productId);
  saveCart(cart);
  notify();
  return getCartState();
}

export function updateQuantity(productId, quantity) {
  if (quantity < 1) return removeFromCart(productId);
  const cart = getCart().map((i) =>
    i.id === productId ? { ...i, quantity } : i
  );
  saveCart(cart);
  notify();
  return getCartState();
}

export function renderCartPanel(container) {
  const state = getCartState();

  if (state.items.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">◇</div>
        <p>Your cart is empty</p>
        <a href="shop.html" class="btn btn-primary btn-sm">Explore Collection</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="cart-items">
      ${state.items.map((item) => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" loading="lazy" />
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <span class="cart-item-price">${formatPrice(item.price)}</span>
            <div class="cart-item-qty">
              <button class="qty-btn qty-minus" aria-label="Decrease quantity">−</button>
              <span>${item.quantity}</span>
              <button class="qty-btn qty-plus" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button class="cart-item-remove" aria-label="Remove item">&times;</button>
        </div>
      `).join('')}
    </div>
    <div class="cart-footer">
      <div class="cart-subtotal">
        <span>Subtotal</span>
        <span>${formatPrice(state.subtotal)}</span>
      </div>
      <p class="cart-note">Shipping & taxes calculated at checkout</p>
      <a href="checkout.html" class="btn btn-primary btn-block">Proceed to Checkout</a>
      <button class="btn btn-ghost btn-block cart-continue">Continue Shopping</button>
    </div>
  `;

  container.querySelectorAll('.cart-item').forEach((el) => {
    const id = el.dataset.id;
    el.querySelector('.qty-minus')?.addEventListener('click', () => {
      const item = state.items.find((i) => i.id === id);
      updateQuantity(id, item.quantity - 1);
      renderCartPanel(container);
      updateCartBadge();
    });
    el.querySelector('.qty-plus')?.addEventListener('click', () => {
      const item = state.items.find((i) => i.id === id);
      updateQuantity(id, item.quantity + 1);
      renderCartPanel(container);
      updateCartBadge();
    });
    el.querySelector('.cart-item-remove')?.addEventListener('click', () => {
      removeFromCart(id);
      renderCartPanel(container);
      updateCartBadge();
    });
  });

  container.querySelector('.cart-continue')?.addEventListener('click', () => {
    document.querySelector('.cart-overlay')?.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
}

export function updateCartBadge() {
  const badge = document.querySelector('.cart-count');
  const { itemCount } = getCartState();
  if (badge) {
    badge.textContent = itemCount;
    badge.style.display = itemCount > 0 ? 'flex' : 'none';
  }
}

export function initCart() {
  updateCartBadge();

  const cartToggle = document.querySelector('.cart-toggle');
  const cartOverlay = document.querySelector('.cart-overlay');
  const cartPanel = document.querySelector('.cart-panel');
  const cartContent = document.querySelector('.cart-content');
  const cartClose = document.querySelector('.cart-close');

  if (!cartOverlay || !cartContent) return;

  const openCart = () => {
    renderCartPanel(cartContent);
    cartOverlay.classList.add('active');
    document.body.classList.add('no-scroll');
  };

  const closeCart = () => {
    cartOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  };

  cartToggle?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) closeCart();
  });

  subscribe(() => updateCartBadge());
}

export function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}
