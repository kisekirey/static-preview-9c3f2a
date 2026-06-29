/* わたしのネコのクリニック — 共通スクリプト */
(function () {
  'use strict';

  // モバイルメニュー開閉
  var btn = document.getElementById('menuBtn');
  var spNav = document.getElementById('spNav');
  var overlay = document.getElementById('spNavOverlay');

  function closeNav() {
    if (!btn) return;
    btn.classList.remove('open');
    if (spNav) spNav.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  function toggleNav() {
    var open = btn.classList.toggle('open');
    if (spNav) spNav.classList.toggle('open', open);
    if (overlay) overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (btn) btn.addEventListener('click', toggleNav);
  if (overlay) overlay.addEventListener('click', closeNav);
  if (spNav) {
    spNav.querySelectorAll('a[href]').forEach(function (a) {
      a.addEventListener('click', function () {
        // ページ内リンクや遷移時にメニューを閉じる
        if (a.getAttribute('href') !== '#') closeNav();
      });
    });
  }

  // スクロールアップ表示制御
  var up = document.getElementById('scrollUp');
  if (up) {
    var onScroll = function () {
      if (window.scrollY > 400) up.classList.add('show');
      else up.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    up.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ページ内アンカーのスムーススクロール（ヘッダー分のオフセット考慮）
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();
