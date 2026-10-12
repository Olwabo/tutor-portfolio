(function () {
  'use strict';

  const root = document.getElementById('slideshow');
  if (!root) return;

  const track     = root.querySelector('#slideshowTrack');
  const slides    = Array.from(root.querySelectorAll('.slide'));
  const dots      = Array.from(root.querySelectorAll('.slide-dot'));
  const prevBtn   = root.querySelector('.slide-prev');
  const nextBtn   = root.querySelector('.slide-next');
  const currentEl = root.querySelector('#slideCurrent');
  const totalEl   = root.querySelector('#slideTotal');

  let current = 0;
  const total = slides.length;

  totalEl.textContent = total;

  function goTo(index) {
    // wrap
    current = (index + total) % total;

    slides.forEach((s, i) => {
      const active = i === current;
      s.classList.toggle('is-active', active);
      s.setAttribute('aria-hidden', String(!active));
    });

    dots.forEach((d, i) => {
      const active = i === current;
      d.classList.toggle('is-active', active);
      d.setAttribute('aria-selected', String(active));
    });

    currentEl.textContent = current + 1;
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  root.tabIndex = 0;
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
  });

  let touchStartX = 0;
  let touchEndX   = 0;
  track?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  track?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) > 40) {
      goTo(delta > 0 ? current - 1 : current + 1);
    }
  }, { passive: true });

  goTo(0);
})();