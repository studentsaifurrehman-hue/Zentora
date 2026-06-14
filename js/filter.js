import { filterProducts } from './products.js';
import { renderProductGrid, initReveal } from './components.js';

export function initShopFilters() {
  const grid = document.querySelector('#shop-grid');
  const categorySelect = document.querySelector('#filter-category');
  const minPrice = document.querySelector('#filter-min');
  const maxPrice = document.querySelector('#filter-max');
  const searchInput = document.querySelector('#filter-search');
  const sortSelect = document.querySelector('#filter-sort');
  const resultCount = document.querySelector('#result-count');

  if (!grid) return;

  function applyFilters() {
    let products = filterProducts({
      category: categorySelect?.value || 'all',
      minPrice: minPrice?.value ? Number(minPrice.value) : null,
      maxPrice: maxPrice?.value ? Number(maxPrice.value) : null,
      search: searchInput?.value?.trim() || '',
    });

    const sort = sortSelect?.value || 'featured';
    switch (sort) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    if (resultCount) {
      resultCount.textContent = `${products.length} product${products.length !== 1 ? 's' : ''}`;
    }

    renderProductGrid(grid, products);
    initReveal(grid);

    grid.querySelector('#clear-filters')?.addEventListener('click', () => {
      if (categorySelect) categorySelect.value = 'all';
      if (minPrice) minPrice.value = '';
      if (maxPrice) maxPrice.value = '';
      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'featured';
      applyFilters();
    });
  }

  [categorySelect, minPrice, maxPrice, sortSelect].forEach((el) => {
    el?.addEventListener('change', applyFilters);
  });

  let searchTimeout;
  searchInput?.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(applyFilters, 300);
  });

  document.querySelectorAll('.category-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      const cat = pill.dataset.category;
      if (categorySelect) categorySelect.value = cat === 'all' ? 'all' : cat;
      document.querySelectorAll('.category-pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      applyFilters();
    });
  });

  applyFilters();
}
