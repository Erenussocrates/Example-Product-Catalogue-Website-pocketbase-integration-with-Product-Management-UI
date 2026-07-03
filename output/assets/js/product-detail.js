// assets/js/product-detail.js

async function loadProductDetail() {
  const loadingIndicator = document.getElementById('detail-loading');
  const errorAlert = document.getElementById('detail-error');
  const contentWrapper = document.getElementById('detail-content');

  // Read and parse URL parameters out of window parameters string structures (?id=xyz)
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    if (loadingIndicator) loadingIndicator.remove();
    errorAlert.textContent = 'Hata: Geçerli bir ürün kimliği (ID) bulunamadı.';
    errorAlert.classList.remove('d-none');
    return;
  }

  try {
    // Request specific table record tracking parameters directly from PocketBase collection index
    const product = await pb.collection(APP_CONFIG.collections.products).getOne(productId);
    const { fields } = APP_CONFIG.products;

    // Isolate variables and resolve defaults
    const productName = product[fields.name] || 'İsimsiz Ürün';
    const productPrice = product[fields.price] ? `${product[fields.price]} ₺` : 'Fiyat Belirtilmedi';
    
    const rawDescription = product[fields.description] ? product[fields.description].trim() : '';
    const productDesc = (rawDescription === '' || rawDescription === 'N/A') ? 'Bu ürün için detaylı bir açıklama belirtilmemiş.' : rawDescription;

    // Determine correct dynamic resource link mapping for product record images
    let imageUrl = 'assets/images/logo.png';
    if (product[fields.image]) {
      imageUrl = pb.files.getURL(product, product[fields.image]);
    }

    // Inject data fields into DOM nodes
    document.getElementById('detail-title').textContent = productName;
    document.getElementById('detail-price').textContent = productPrice;
    document.getElementById('detail-description').textContent = productDesc;
    
    const imgElement = document.getElementById('detail-image');
    imgElement.src = imageUrl;
    imgElement.alt = productName;

    // Dynamically update page title browser meta header tracking tab name context
    document.title = `${productName} - Ürün Detayı`;

    // Connect product information context straight into your right WhatsApp CTA button click text
    const whatsappBtn = document.getElementById('detail-whatsapp-btn');
    if (whatsappBtn) {
      const messageText = encodeURIComponent(`Merhaba, "${productName}" ürününüz hakkında bilgi almak/sipariş vermek istiyorum.`);
      whatsappBtn.href = `https://wa.me{messageText}`;
    }

    // Toggle container presentation hidden layer frames clean
    if (loadingIndicator) loadingIndicator.remove();
    contentWrapper.classList.remove('d-none');

  } catch (error) {
    console.error('Failed loading template record details:', error);
    if (loadingIndicator) loadingIndicator.remove();
    errorAlert.textContent = `Ürün detayları yüklenirken hata oluştu: ${error.message}`;
    errorAlert.classList.remove('d-none');
  }
}

document.addEventListener('DOMContentLoaded', loadProductDetail);
