async function loadNavbar(mountSelector = '#navbar-mount') {
  const mount = document.querySelector(mountSelector);
  if (!mount) return;

  try {
    const response = await fetch('partials/navbar.html');
    if (!response.ok) throw new Error('Navbar failed to load');
    mount.innerHTML = await response.text();

    applyNavbarLinks();

    // Tell auth.js the navbar is ready
    document.dispatchEvent(new CustomEvent('navbar:loaded'));
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();
});