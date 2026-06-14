import { getCartState } from './cart.js';
import { formatPrice } from './products.js';
import { clearCart } from './storage.js';
import { showToast } from './cart.js';

export function initCheckout() {
  const summary = document.querySelector('#checkout-summary');
  const form = document.querySelector('#checkout-form');
  const empty = document.querySelector('#checkout-empty');

  if (!summary || !form) return;

  const state = getCartState();

  if (state.items.length === 0) {
    form.style.display = 'none';
    if (empty) empty.style.display = 'flex';
    return;
  }

  if (empty) empty.style.display = 'none';

  const shipping = state.subtotal >= 150 ? 0 : 12.99;
  const tax = state.subtotal * 0.08;
  const total = state.subtotal + shipping + tax;

  summary.innerHTML = `
    <div class="checkout-items">
      ${state.items.map((item) => `
        <div class="checkout-item">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          <div>
            <h4>${item.name}</h4>
            <span>Qty: ${item.quantity}</span>
          </div>
          <span>${formatPrice(item.price * item.quantity)}</span>
        </div>
      `).join('')}
    </div>
    <div class="checkout-totals">
      <div class="total-row"><span>Subtotal</span><span>${formatPrice(state.subtotal)}</span></div>
      <div class="total-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
      <div class="total-row"><span>Estimated Tax</span><span>${formatPrice(tax)}</span></div>
      <div class="total-row total-final"><span>Total</span><span>${formatPrice(total)}</span></div>
    </div>
    <div class="trust-badges checkout-trust">
      <div class="trust-badge"><span class="trust-icon">🔒</span> Secure Payment</div>
      <div class="trust-badge"><span class="trust-icon">↩</span> 30-Day Returns</div>
      <div class="trust-badge"><span class="trust-icon">✓</span> Authenticity Guaranteed</div>
    </div>
  `;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Processing...';

    setTimeout(() => {
      clearCart();
      form.style.display = 'none';
      summary.style.display = 'none';
      const success = document.querySelector('#checkout-success');
      if (success) {
        success.style.display = 'flex';
        const orderNum = 'ZT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        success.querySelector('.order-number').textContent = orderNum;
      }
      showToast('Order placed successfully!');
    }, 2000);
  });

  const steps = form.querySelectorAll('.checkout-step');
  const stepBtns = form.querySelectorAll('button[data-step]');

  stepBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = Number(btn.dataset.step);
      steps.forEach((s, i) => {
        s.classList.toggle('active', i + 1 === target);
        s.classList.toggle('completed', i + 1 < target);
      });
      form.querySelectorAll('.step-indicator .step').forEach((s, i) => {
        s.classList.toggle('active', i + 1 === target);
        s.classList.toggle('completed', i + 1 < target);
      });
    });
  });
}
