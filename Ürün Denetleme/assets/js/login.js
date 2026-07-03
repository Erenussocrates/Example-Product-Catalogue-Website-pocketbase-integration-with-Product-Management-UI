function showLoginError(message) {
  const alert = document.getElementById('login-error-alert');
  if (!alert) return;
  alert.textContent = message;
  alert.classList.remove('d-none');
}

function hideLoginError() {
  const alert = document.getElementById('login-error-alert');
  if (!alert) return;
  alert.classList.add('d-none');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  if (!form) return;

  hideLoginError();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideLoginError();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    try {
      await pb.collection(APP_CONFIG.collections.employees).authWithPassword(email, password);
      window.location.href = pageUrl(APP_CONFIG.auth.redirectAfterLogin);
    } catch (err) {
      console.error('Login failed:', err);
      showLoginError('E-posta veya şifre hatalı.');
    }
  });
});
