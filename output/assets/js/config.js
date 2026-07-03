const APP_CONFIG = {
  pocketbaseUrl: 'http://127.0.0.1:8090',

  collections: {
    users: 'users',
    products: 'urunler',
  },

  pages: {
    home: 'index.html',
    login: 'giris.html',
    allProducts: 'tum_urunler.html',
    productDetail: 'urun_detay.html', // ADDED: New generic detail route link
  },

  auth: {
    redirectAfterLogin: 'home',
    redirectAfterLogout: 'login',
  },

  products: {
    fields: {
      name: 'urun_isim',
      price: 'urun_lt_fiyat',
      image: 'urun_resim',
      description: 'aciklama', // ADDED: Description mapping
    },
    gridColumns: 5,
  },
};

function pageUrl(pageKey, hash = '') {
  const path = APP_CONFIG.pages[pageKey];
  if (!path) {
    console.warn(`Unknown page key: "${pageKey}"`);
    return '#';
  }
  return hash ? `${path}${hash}` : path;
}

function applyNavbarLinks() {
  document.querySelectorAll('[data-page]').forEach((link) => {
    const key = link.dataset.page;
    const hash = link.dataset.hash || '';
    if (APP_CONFIG.pages[key]) {
      link.href = pageUrl(key, hash);
    }
  });
}
