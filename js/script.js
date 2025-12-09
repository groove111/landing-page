// LINEアプリ優先で開き、失敗したらwebにフォールバックするロジック
(function () {
  // --- カスタマイズする部分（本番のLINE IDに置き換えてください） ---
  const appUrl = 'line://ti/p/@YOUR_LINE_ID';
  const webUrl = 'https://qr-official.line.me/gs/M_033yhecu_GW.png?oat_content=qr';
  // ---------------------------------------------------------------

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

    window.location.href = appUrl;

    setTimeout(function () {
      document.removeEventListener('visibilitychange', handleVisibility);
      if (!didOpen && Date.now() - start >= timeout - 50) {
        window.open(webUrl, '_blank');
      }
    }, timeout);
  }, { passive: false });
})();
