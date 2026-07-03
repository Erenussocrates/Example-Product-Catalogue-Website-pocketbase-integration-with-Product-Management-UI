// assets/js/product-update.js

async function deleteProduct(productId, elementId) {
  // Safe confirmation prompt before removing data
  if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;

  try {
    await pb.collection(APP_CONFIG.collections.products).delete(productId);
    
    // Smoothly remove the card item from the UI layout immediately without page reload
    const cardElement = document.getElementById(elementId);
    if (cardElement) {
      cardElement.remove();
    }

    // If no cards are left on screen, display the fallback empty text string
    const container = document.getElementById('products-container');
    if (container && container.children.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-4">
            <p class="mbr-text mbr-fonts-style display-7">Sistemde kayıtlı ürün bulunamadı.</p>
        </div>`;
    }
  } catch (error) {
    console.error('Delete failed:', error);
    alert(`Ürün silinemedi: ${error.message}`);
  }
}

async function fetchAndRenderProducts() {
  const container = document.getElementById('products-container');
  const sectionWrapper = document.getElementById('product-list-section');
  
  if (!container) return;

  if (sectionWrapper) {
    sectionWrapper.style.display = 'block';
  }

  try {
    const records = await pb.collection(APP_CONFIG.collections.products).getFullList({
      sort: 'created',
    });

    if (records.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-4">
            <p class="mbr-text mbr-fonts-style display-7">Sistemde kayıtlı ürün bulunamadı.</p>
        </div>`;
      return;
    }

    let cardsHtml = '';

    records.forEach(product => {
      let imageUrl = 'assets/images/logo.png'; 
      if (product.urun_resim) {
        imageUrl = `${APP_CONFIG.apiBaseUrl}/api/files/${product.collectionId}/${product.id}/${product.urun_resim}`;
      }

      const productName = product.urun_isim || 'İsimsiz Ürün';
      const productPrice = product.urun_lt_fiyat ? `${product.urun_lt_fiyat} ₺` : 'Fiyat Belirtilmedi';
      const rawDescription = product.aciklama ? product.aciklama.trim() : '';
      const productDesc = (rawDescription === '' || rawDescription === 'N/A') ? 'Açıklama bulunmuyor.' : rawDescription;
      
      // Unique visual DOM node identity string for individual card tracking
      const domCardId = `product-card-${product.id}`;

      cardsHtml += `
        <div id="${domCardId}" class="item features-image col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
            <div class="item-wrapper card p-3" style="border: 1px solid #e4e4e4; border-radius: 8px; background: #fff; height: 100%; display: flex; flex-direction: column;">
                
                <div class="item-img mb-3 text-center" style="height: 160px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;">
                    <img src="${imageUrl}" alt="${productName}" class="img-fluid" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                </div>
                
                <div class="item-content text-center d-flex flex-column flex-grow-1">
                    <h5 class="item-title mbr-fonts-style display-7 mb-1" style="font-weight: 700; min-height: 44px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                        ${productName}
                    </h5>
                    
                    <p class="mbr-text mbr-fonts-style display-7 text-info mb-2" style="font-weight: 600;">
                        ${productPrice}
                    </p>
                    
                    <p class="mbr-text mbr-fonts-style display-4 text-muted mb-3 flex-grow-1" 
                       style="font-size: 0.8rem; text-align: left; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; min-height: 54px; line-height: 1.2rem;">
                        ${productDesc}
                    </p>
                    
                    <!-- Buttons Area side-by-side layout configuration -->
                    <div class="mbr-section-btn mt-auto d-flex gap-1">
                        <!-- Redirects user to entry form passing url parameter payload variables -->
                        <a href="urun-girisi.html?id=${product.id}" class="btn btn-info display-4 w-50 py-2 m-0" style="font-size: 0.75rem;">Düzenle</a>
                        
                        <button class="btn btn-danger display-4 w-50 py-2 m-0" style="font-size: 0.75rem;" onclick="deleteProduct('${product.id}', '${domCardId}')">Sil</button>
                    </div>
                </div>
            </div>
        </div>
      `;
    });

    container.innerHTML = cardsHtml;

  } catch (error) {
    console.error('Error listing records:', error);
    container.innerHTML = `
      <div class="col-12 text-center py-4">
          <div class="alert alert-danger" role="alert">
              Veriler veritabanından çekilirken bir hata oluştu: ${error.message}
          </div>
      </div>`;
  }
}

document.addEventListener('DOMContentLoaded', fetchAndRenderProducts);
