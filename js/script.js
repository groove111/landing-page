// LINE link updated by user (lin.ee)
(function () {
  // Using the provided lin.ee short link for both app and web fallback.
  // This link typically redirects to the appropriate LINE friend-add page
  // and should work on mobile and desktop.
  const appUrl = 'https://lin.ee/NvWtvjq';
  const webUrl = 'https://lin.ee/NvWtvjq';

  const link = document.getElementById('line-cta-link');
  if (!link) return;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  link.addEventListener('click', function (e) {
    if (!isMobile) {
      link.href = webUrl;
      return;
    }

    e.preventDefault();

    const timeout = 1100;
    let didOpen = false;
    const start = Date.now();

    function handleVisibility() {
      if (document.hidden) {
        didOpen = true;
      }
    }
    document.addEventListener('visibilitychange', handleVisibility);

    // Try to open the provided link. The lin.ee link will redirect appropriately.
    window.location.href = appUrl;

    setTimeout(function () {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (!didOpen && Date.now() - start >= timeout - 50) {
        window.open(webUrl, '_blank');
      }
    }, timeout);
  }, { passive: false });
})();