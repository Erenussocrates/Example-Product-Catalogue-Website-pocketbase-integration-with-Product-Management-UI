// assets/js/auth.js
const pb = new PocketBase(APP_CONFIG.apiBaseUrl);

function getLoggedInUserLabel() {
  const model = pb.authStore.model;
  if (!model) return '';
  return model.isim || model.email || '';
}

function handleLogout() {
  pb.authStore.clear(); 
  window.location.reload(); 
}

function checkRouteProtection() {
  const currentPath = window.location.pathname;
  const isUserValid = pb.authStore.isValid && pb.authStore.model;
  
  // Protect routes that should not be visible to signed-out clients
  if (currentPath.includes(APP_CONFIG.pages.productEntry) || currentPath.includes(APP_CONFIG.pages.productUpdate)) {
    if (!isUserValid) {
      window.location.href = pageUrl('login');
      return false;
    }
  }
  return true;
}

function updateNavbarForAuth() {
  const welcomeText = document.getElementById('navbar-welcome-text');
  const navbarLogoutBtn = document.getElementById('navbar-logout-btn');
  if (!welcomeText) return;

  if (pb.authStore.isValid && pb.authStore.model) {
    welcomeText.textContent = `Hoşgeldiniz ${getLoggedInUserLabel()}!`;
    welcomeText.hidden = false;
    
    if (navbarLogoutBtn) {
      navbarLogoutBtn.hidden = false;
      navbarLogoutBtn.addEventListener('click', handleLogout);
    }
  } else {
    welcomeText.textContent = '';
    welcomeText.hidden = true;
    if (navbarLogoutBtn) {
      navbarLogoutBtn.hidden = true;
    }
  }
}

function updatePageFormForAuth() {
  const loginForm = document.getElementById('login-form');
  const logoutPanel = document.getElementById('logout-panel');
  const pageTitle = document.getElementById('auth-page-title');
  const pageLogoutBtn = document.getElementById('btn-page-logout');

  if (!loginForm || !logoutPanel) return;

  if (pb.authStore.isValid && pb.authStore.model) {
    loginForm.classList.add('d-none');
    logoutPanel.classList.remove('d-none');
    if (pageTitle) pageTitle.innerHTML = '<strong>Profiliniz</strong>';
    
    if (pageLogoutBtn) {
      pageLogoutBtn.addEventListener('click', handleLogout);
    }
  } else {
    loginForm.classList.remove('d-none');
    logoutPanel.classList.add('d-none');
    if (pageTitle) pageTitle.innerHTML = '<strong>Çalışan Girişi</strong>';
  }
}

function initAuthUI() {
  const allowed = checkRouteProtection();
  if (!allowed) return; // Prevent layout calculation if redirecting execution

  updateNavbarForAuth();
  updatePageFormForAuth();
}

document.addEventListener('DOMContentLoaded', initAuthUI);
document.addEventListener('navbar:loaded', initAuthUI);
