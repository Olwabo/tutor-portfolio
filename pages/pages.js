(function () {
  'use strict';

  const yearEl = document.getElementById('year');
  if (yearEl && !yearEl.textContent.trim()) {
    yearEl.textContent = new Date().getFullYear();
  }

  const tocLinks = Array.from(document.querySelectorAll('.toc-link'));
  const sections = tocLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length) {
    const setActive = (id) => {
      tocLinks.forEach((l) =>
        l.classList.toggle('active', l.getAttribute('href') === '#' + id)
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
  }
})();