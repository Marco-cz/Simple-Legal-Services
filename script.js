// Cookie banner dismiss
function dismissCookies() {
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.classList.add('hidden');
  try { localStorage.setItem('sls_cookies_ok', '1'); } catch (e) {}
}

// Hide banner if previously accepted
document.addEventListener('DOMContentLoaded', () => {
  try {
    if (localStorage.getItem('sls_cookies_ok') === '1') {
      document.getElementById('cookieBanner')?.classList.add('hidden');
    }
  } catch (e) {}

  // Mobile nav toggle
  const burger = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  burger?.addEventListener('click', () => links?.classList.toggle('open'));

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => links?.classList.remove('open'))
  );
});
