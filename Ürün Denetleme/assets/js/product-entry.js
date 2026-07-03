// assets/js/product-entry.js

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('product-entry-form');
  const btnAddImage = document.getElementById('btn-add-image');
  const fileInput = document.getElementById('product-image-file');
  const fileNameIndicator = document.getElementById('file-name-indicator');
  const fileNameText = document.getElementById('file-name-text');
  
  const successAlert = document.getElementById('entry-success-alert');
  const errorAlert = document.getElementById('entry-error-alert');
  const btnSubmit = document.getElementById('btn-submit-product');
  const pageTitle = document.querySelector('#form5-1m .mbr-section-title strong');

  if (!form || !btnAddImage || !fileInput) return;

  // Read URL query parameters to detect routing instructions (?id=YOUR_PRODUCT_ID)
  const urlParams = new URLSearchParams(window.location.search);
  const editProductId = urlParams.get('id');
  const isEditMode = !!editProductId; // Evaluates to true if an ID parameter exists

  function resetAlerts() {
    successAlert.classList.add('d-none');
    errorAlert.classList.add('d-none');
  }

  // IF IN EDIT MODE: Pre-fill input forms with data downloaded from PocketBase
  if (isEditMode) {
    try {
      if (pageTitle) pageTitle.textContent = "Ürün Güncelleme Paneli";
      btnSubmit.textContent = "Ürünü Güncelle";

      // Download single product card information fields matching targeting rules
      const product = await pb.collection(APP_CONFIG.collections.products).getOne(editProductId);

      // Map values into the input element form structures
      document.getElementById('product-name').value = product.urun_isim || '';
      document.getElementById('product-price').value = product.urun_lt_fiyat || '';
      document.getElementById('product-desc').value = (product.aciklama === 'N/A') ? '' : (product.aciklama || '');

      // Display preexisting image name value tracker on dashboard
      if (product.urun_resim) {
        fileNameText.textContent = `Mevcut: ${product.urun_resim}`;
        fileNameIndicator.classList.remove('d-none');
        btnAddImage.textContent = "Resmi Değiştir";
      }
    } catch (err) {
      console.error('Failed to fetch product for editing:', err);
      errorAlert.textContent = `Ürün bilgileri yüklenemedi: ${err.message}`;
      errorAlert.classList.remove('d-none');
    }
  }

  btnAddImage.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length > 0) {
      fileNameText.textContent = fileInput.files[0].name;
      fileNameIndicator.classList.remove('d-none');
      btnAddImage.textContent = "Resmi Değiştir";
    } else if (!isEditMode) {
      fileNameIndicator.classList.add('d-none');
      btnAddImage.textContent = "Resim ekle";
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resetAlerts();

    const nameValue = document.getElementById('product-name').value.trim();
    const priceValue = document.getElementById('product-price').value.trim();
    const descValue = document.getElementById('product-desc').value.trim();

    const formData = new FormData();
    formData.append('urun_isim', nameValue);
    formData.append('urun_lt_fiyat', parseFloat(priceValue));
    formData.append('aciklama', descValue || 'N/A');

    if (fileInput.files && fileInput.files.length > 0) {
      formData.append('urun_resim', fileInput.files[0]);
    }

    try {
      btnSubmit.disabled = true;
      btnSubmit.textContent = isEditMode ? "Güncelleniyor..." : "Yaratılıyor...";

      if (isEditMode) {
        // UPDATE ACTION: Overwrites existing targeted item indices
        await pb.collection(APP_CONFIG.collections.products).update(editProductId, formData);
        successAlert.textContent = "Ürün başarıyla güncellenmiştir! Listeye yönlendiriliyorsunuz...";
        successAlert.classList.remove('d-none');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Redirect back to updates management display portal after 2 seconds
        setTimeout(() => {
          window.location.href = 'urun-guncelleme.html';
        }, 2000);

      } else {
        // CREATE ACTION: Inserts fresh item entries 
        await pb.collection(APP_CONFIG.collections.products).create(formData);
        successAlert.textContent = "Ürün başarıyla kaydedilmiştir!";
        successAlert.classList.remove('d-none');
        
        form.reset();
        fileNameIndicator.classList.add('d-none');
        btnAddImage.textContent = "Resim ekle";
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

    } catch (err) {
      console.error('Operation failed:', err);
      errorAlert.textContent = `İşlem gerçekleştirilirken hata oluştu: ${err.message}`;
      errorAlert.classList.remove('d-none');
    } finally {
      btnSubmit.disabled = false;
      btnSubmit.textContent = isEditMode ? "Ürünü Güncelle" : "Ürünü yarat";
    }
  });
});
