(function () {
  'use strict';

  const frames = Array.from(document.querySelectorAll('.live-frame'));
  if (!frames.length) return;

  const loadFrame = (frame) => {
    const iframe = frame.querySelector('iframe');
    if (!iframe || iframe.dataset.loaded === 'true') return;
    iframe.dataset.loaded = 'true';
  };

  const frameObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadFrame(entry.target);
          frameObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '200px 0px' }
  );
  frames.forEach((f) => frameObserver.observe(f));

  frames.forEach((frame) => {
    const iframe = frame.querySelector('iframe');
    if (!iframe) return;

    const showFallback = () => frame.classList.add('is-blocked');
    iframe.addEventListener('error', showFallback);

    setTimeout(() => {
      try {
        const doc = iframe.contentDocument;
        if (doc && doc.location && doc.location.href === 'about:blank') {
          showFallback();
        }
      } catch (_) {
    
      }
    }, 4000);
  });
})();