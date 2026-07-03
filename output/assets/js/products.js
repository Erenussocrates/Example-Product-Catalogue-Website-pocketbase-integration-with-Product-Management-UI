function getProductImageUrl(record) {
  const imageField = APP_CONFIG.products.fields.image;
  const filename = record[imageField];

  if (!filename) return 'assets/images/logo.png';

  return pb.files.getURL(record, filename);
}

function createProductCard(record) {
  const { fields } = APP_CONFIG.products;

  const name = record[fields.name] || 'İsimsiz ürün';
  const price = record[fields.price] ?? '';
  const imageUrl = getProductImageUrl(record);

  const col = document.createElement('div');
  col.className = 'col';

  // MODIFIED: Wrapped card inside a dynamic hyperlink route matching your config pattern
  col.innerHTML = `
    <a href="${pageUrl('productDetail')}?id=${record.id}" class="text-decoration-none text-dark h-100 d-block">
      <div class="card product-card h-100">
        <div class="product-card-img-wrap">
          <img src="${imageUrl}" class="card-img-top product-card-img" alt="${name}">
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title product-card-title mb-2"><strong>${name}</strong></h5>
          <p class="card-text product-card-price mt-auto mb-0">${price} ₺</p>
        </div>
      </div>
    </a>
  `;

  return col;
}

async function loadProducts() {
  const grid = document.getElementById('products-grid');
  const loading = document.getElementById('products-loading');
  const errorBox = document.getElementById('products-error');

  if (!grid) return;

  try {
    const records = await pb
      .collection(APP_CONFIG.collections.products)
      .getFullList({ sort: '-created' });

    grid.innerHTML = '';

    if (records.length === 0) {
      if (loading) loading.textContent = 'Henüz ürün bulunmuyor.';
      return;
    }

    records.forEach((record) => {
      grid.appendChild(createProductCard(record));
    });

    if (loading) loading.remove();
  } catch (err) {
    console.error('Products load failed:', err);
    if (loading) loading.remove();
    if (errorBox) {
      errorBox.textContent = 'Ürünler yüklenemedi. API kurallarını ve PocketBase bağlantısını kontrol edin.';
      errorBox.classList.remove('d-none');
    }
  }
}

document.addEventListener('DOMContentLoaded', loadProducts);
