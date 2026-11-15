(function () {
  // Clean up a service worker registered by a previous PWA-enabled build.
  // It was intercepting fetches and serving stale cached pages even after
  // fresh deploys (hard refresh doesn't touch an active service worker).
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      registrations.forEach(function (registration) {
        registration.unregister();
      });
    });

    if ('caches' in window) {
      caches.keys().then(function (keys) {
        keys.forEach(function (key) {
          caches.delete(key);
        });
      });
    }
  }

  var nav = document.getElementById('site-nav');
  var toggle = document.getElementById('site-nav-toggle');

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 8) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }

  if (nav) {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.querySelectorAll('.site-nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var revealTargets = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealTargets.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // Hydrate home hero telemetry KPI from live market_data.json if present
  var heroLeadEl = document.getElementById('hero-live-lead');
  var heroSubEl = document.getElementById('hero-live-sub');
  if (heroLeadEl && 'fetch' in window) {
    fetch('/assets/data/market_data.json?t=' + Date.now(), { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) return null;
        return res.json();
      })
      .then(function (data) {
        if (!data || !Array.isArray(data.stocks) || !data.stocks.length) return;
        var sorted = data.stocks.slice().sort(function (a, b) {
          return (b.pl_percent || 0) - (a.pl_percent || 0);
        });
        var top = sorted[0];
        if (top && typeof top.pl_percent === 'number') {
          var sym = (top.symbol || '').replace('.L', '').replace('.AS', '');
          var sign = top.pl_percent >= 0 ? '+' : '';
          heroLeadEl.innerHTML = sym + ' ' + sign + top.pl_percent.toFixed(1) + '% Lead &rarr;';
        }
        if (heroSubEl) {
          var winners = data.stocks.filter(function (s) {
            return (s.pl_percent || 0) > 0;
          }).length;
          heroSubEl.textContent =
            winners + '/' + data.stocks.length + ' Positions in Profit · Live Ledger';
        }
      })
      .catch(function () {
        // Keep static fallback silently
      });
  }
})();
