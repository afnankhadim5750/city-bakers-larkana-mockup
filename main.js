(function () {
  'use strict';

  /* ---------- Mobile menu (instant toggle — no transition) ---------- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');
  if (toggle && menu) {
    var setMenu = function (open) {
      if (open) {
        menu.removeAttribute('hidden');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close menu');
      } else {
        menu.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      }
    };
    toggle.addEventListener('click', function () {
      setMenu(menu.hasAttribute('hidden'));
    });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hasAttribute('hidden')) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Scroll-spy for desktop nav ---------- */
  var navLinks = document.querySelectorAll('.site-nav a');
  var sections = Array.prototype.slice.call(navLinks).map(function (a) {
    return document.querySelector(a.getAttribute('href'));
  }).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.board-row, .card, .occasion, .why-card, .gallery-item, .gtk-box, .acc-item');
  revealEls.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.acc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = btn.closest('.acc-item').querySelector('.acc-panel');
      var open = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.acc-btn').forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
      });
      document.querySelectorAll('.acc-panel').forEach(function (p) {
        p.setAttribute('hidden', '');
      });
      if (!open) {
        btn.setAttribute('aria-expanded', 'true');
        panel.removeAttribute('hidden');
      }
    });
  });

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var lastFocus = null;
  function openLightbox(src, alt) {
    lastFocus = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    lightboxImg.src = '';
    document.body.style.overflow = '';
    if (lastFocus) { lastFocus.focus(); }
  }
  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      openLightbox(item.getAttribute('data-full'), item.getAttribute('data-alt'));
    });
  });
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) { closeLightbox(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hasAttribute('hidden')) { closeLightbox(); }
  });
})();
