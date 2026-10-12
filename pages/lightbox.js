(function () {
  'use strict';

  const bars = Array.from(document.querySelectorAll('.bar-fill[data-percent]'));

  bars.forEach((bar) => {
    const pct = Math.max(0, Math.min(100, Number(bar.dataset.percent) || 0));
    bar.style.setProperty('--w', pct + '%');
  });

  if (bars.length) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-animated');
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    bars.forEach((bar) => barObserver.observe(bar));
  }

  const donuts = Array.from(document.querySelectorAll('.donut[data-percent]'));

  donuts.forEach((donut) => {
    const pct = Math.max(0, Math.min(100, Number(donut.dataset.percent) || 0));
    const fill = donut.querySelector('.donut-fill');
    if (!fill) return;

    fill.dataset.target = String(pct);
    fill.style.strokeDasharray = '0 100';
  });

  if (donuts.length) {
    const donutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const donut = entry.target;
          const fill = donut.querySelector('.donut-fill');
          if (!fill) return;

          const target = Number(fill.dataset.target || 0);
          const delay = Number(donut.dataset.delay || 0);

          setTimeout(() => {
            fill.style.strokeDasharray = `${target} ${100 - target}`;
          }, delay);

          donutObserver.unobserve(donut);
        });
      },
      { threshold: 0.4 }
    );

    donuts.forEach((donut, i) => {
      donut.dataset.delay = String(i * 150);
      donutObserver.observe(donut);
    });
  }

  const columns = Array.from(document.querySelectorAll('.column-bar[data-value]'));

  if (columns.length) {
    const colObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-animated');
          colObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    columns.forEach((col) => colObserver.observe(col));
  }

  const toggleBtn   = document.querySelector('[data-toggle-responses]');
  const tableWrap   = document.getElementById('responsesTable');
  const toggleText  = document.getElementById('responsesToggleText');
  const toggleLabel = document.getElementById('responsesToggleLabel');

  if (toggleBtn && tableWrap) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
      const next = !isOpen;

      toggleBtn.setAttribute('aria-expanded', String(next));
      tableWrap.hidden = !next;

      if (toggleText) toggleText.textContent = next ? 'Hide table' : 'Show table';
      if (toggleLabel) toggleLabel.textContent = next
        ? 'Hide the responses table'
        : 'View the responses in your browser';

      if (next) {
        setTimeout(() => {
          tableWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      }
    });
  }

  const filterInput = document.querySelector('.responses-search input');
  const responsesRows = Array.from(
    document.querySelectorAll('.responses-table tbody tr')
  );

  if (filterInput && responsesRows.length) {
    filterInput.addEventListener('input', () => {
      const q = filterInput.value.trim().toLowerCase();
      responsesRows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = !q || text.includes(q) ? '' : 'none';
      });
    });
  }
})();