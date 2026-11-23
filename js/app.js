(function () {
  const DICT = window.DICT;
  const PV = window.PV || {};
  const $ = (id) => document.getElementById(id);
  const els = {
    chips: $('chips'), grid: $('grid'), title: $('secTitle'), count: $('secCount'),
    q: $('q'), clear: $('clear'), hints: $('hints'), wrap: document.querySelector('.wrap'),
  };
  let current = 0;

  const pad = (n) => String(n).padStart(2, '0');
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function cardHTML({ id, ko, en, num }) {
    const preview = PV[id] || '<div class="pv"></div>';
    return `<div class="card" role="button" tabindex="0" data-id="${id}" aria-label="${esc(ko)} 설명 보기">
      <div class="well">${preview}</div>
      <div class="card-name"><b><em>${pad(num)}</em>${esc(ko)}</b><small>${esc(en)}</small></div>
    </div>`;
  }

  function renderChips() {
    els.chips.innerHTML = DICT.map((c, i) =>
      `<button type="button" data-i="${i}" class="${i === current ? 'on' : ''}">${esc(c.name)}</button>`
    ).join('');
  }

  function playIn(dir) {
    els.grid.classList.remove('in-l', 'in-r');
    void els.grid.offsetWidth;
    if (dir) els.grid.classList.add(dir);
  }

  function renderCategory(i, dir) {
    const cat = DICT[i];
    els.title.textContent = cat.name;
    els.count.textContent = `${cat.items.length}개`;
    els.grid.innerHTML = cat.items
      .map(([id, ko, en], n) => cardHTML({ id, ko, en, num: n + 1 }))
      .join('');
    playIn(dir);
  }

  function selectCategory(i) {
    if (i === current) return;
    const dir = i > current ? 'in-l' : 'in-r';
    current = i;
    [...els.chips.children].forEach((b, n) => b.classList.toggle('on', n === i));
    const chip = els.chips.children[i];
    els.chips.scrollTo({ left: chip.offsetLeft - (els.chips.clientWidth - chip.offsetWidth) / 2, behavior: 'smooth' });
    renderCategory(i, dir);
  }

  function renderSearch(query) {
    const results = window.searchDict(DICT, query);
    els.title.textContent = `찾은 이름 ${results.length}개`;
    els.count.textContent = '';
    els.grid.innerHTML = results.length
      ? results.map(cardHTML).join('')
      : '<p class="empty">아직 없는 이름이에요. 다른 말로 찾아보세요.</p>';
    playIn(null);
  }

  function onQuery() {
    const query = els.q.value;
    const active = query.trim().length > 0;
    els.wrap.classList.toggle('searching', active);
    els.chips.hidden = active;
    els.hints.hidden = active;
    els.clear.hidden = !active;
    if (active) renderSearch(query);
    else renderCategory(current, null);
  }

  function setQuery(value) {
    els.q.value = value;
    onQuery();
  }

  els.chips.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) selectCategory(Number(b.dataset.i));
  });
  els.hints.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) setQuery(b.textContent);
  });
  els.grid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) window.openDetail(card.dataset.id);
  });
  els.grid.addEventListener('keydown', (e) => {
    const card = e.target.closest('.card');
    if (card && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      window.openDetail(card.dataset.id);
    }
  });
  els.q.addEventListener('input', onQuery);
  els.clear.addEventListener('click', () => { setQuery(''); els.q.focus(); });

  renderChips();
  renderCategory(current, null);
})();
