const APP_CONFIG = {
  apiBaseUrl: 'http://127.0.0.1:8090',

  collections: {
    employees: 'calisanlar',
    products: 'urunler', // ADDED: Matches your PocketBase collection name
  },

  pages: {
    home: 'index.html',
    login: 'index.html',
    productEntry: 'urun-girisi.html',
    productUpdate: 'urun-guncelleme.html',
    view: '#',
    team: '#',
    contacts: '#',
  },

  auth: {
    redirectAfterLogin: 'productEntry',
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
