const pb = new PocketBase(APP_CONFIG.pocketbaseUrl);

function getLoggedInUserLabel() {
  const model = pb.authStore.model;
  if (!model) return '';
  return model.name || model.email || '';
}

function updateNavbarForAuth() {
  const userArea = document.getElementById('navbar-user-area');
  const welcomeText = document.getElementById('navbar-welcome-text');
  const logoutBtn = document.getElementById('navbar-logout-btn');

  if (!userArea || !welcomeText) return;

  if (pb.authStore.isValid && pb.authStore.model) {
    welcomeText.textContent = `Hoşgeldiniz, ${getLoggedInUserLabel()}!`;
    userArea.hidden = false;
  } else {
    userArea.hidden = true;
    welcomeText.textContent = '';
  }

  if (logoutBtn && !logoutBtn.dataset.bound) {
    logoutBtn.dataset.bound = 'true';
    logoutBtn.addEventListener('click', () => {
      pb.authStore.clear();
      window.location.href = pageUrl(APP_CONFIG.auth.redirectAfterLogout);
    });
  }
}

function initAuthUI() {
  updateNavbarForAuth();
}

document.addEventListener('DOMContentLoaded', initAuthUI);
document.addEventListener('navbar:loaded', initAuthUI);