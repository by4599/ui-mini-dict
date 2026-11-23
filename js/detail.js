/* 카드를 누르면 설명 바텀시트를 띄운다 */
window.openDetail = (function () {
  const SECTIONS = ['무엇인가요', '언제 쓰나요', '헷갈리기 쉬운 것'];
  const pad = (n) => String(n).padStart(2, '0');

  const lookup = new Map(
    window.DICT.flatMap((cat) =>
      cat.items.map(([id, ko, en], i) => [id, { id, ko, en, num: i + 1, cat: cat.name }])
    )
  );

  const root = document.createElement('div');
  root.className = 'dt-root';
  root.hidden = true;
  root.innerHTML = `<div class="dt-dim"></div>
    <section class="dt-sheet" role="dialog" aria-modal="true" aria-labelledby="dtTitle">
      <div class="dt-handle"></div>
      <div class="dt-top"><span class="dt-cat"></span><button type="button" class="dt-close" aria-label="닫기">✕</button></div>
      <h2 class="dt-title" id="dtTitle"></h2>
      <div class="dt-en"></div>
      <div class="well dt-preview"><div class="dt-zoom"></div></div>
      <div class="dt-body"></div>
    </section>`;
  document.body.appendChild(root);

  const q = (sel) => root.querySelector(sel);
  let lastFocus = null;

  function close() {
    root.classList.remove('dt-open');
    document.body.classList.remove('dt-lock');
    setTimeout(() => { root.hidden = true; }, 320);
    if (lastFocus) lastFocus.focus();
  }

  function fill(item) {
    const desc = (window.DESC || {})[item.id] || [];
    q('.dt-cat').textContent = item.cat;
    q('.dt-title').innerHTML = `<em>${pad(item.num)}</em>`;
    q('.dt-title').append(item.ko);
    q('.dt-en').textContent = item.en;
    q('.dt-zoom').innerHTML = (window.PV || {})[item.id] || '';
    const body = q('.dt-body');
    body.replaceChildren(...SECTIONS.flatMap((label, i) => {
      if (!desc[i]) return [];
      const sec = document.createElement('div');
      sec.className = 'dt-sec';
      const h = document.createElement('h3');
      h.textContent = label;
      const p = document.createElement('p');
      p.textContent = desc[i];
      sec.append(h, p);
      return [sec];
    }));
  }

  function open(id) {
    const item = lookup.get(id);
    if (!item) return;
    lastFocus = document.activeElement;
    fill(item);
    root.hidden = false;
    q('.dt-sheet').scrollTop = 0;
    document.body.classList.add('dt-lock');
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('dt-open')));
    q('.dt-close').focus({ preventScroll: true });
  }

  q('.dt-dim').addEventListener('click', close);
  q('.dt-close').addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !root.hidden) close();
  });

  return open;
})();
