/* 이름(한/영)과 생김새 키워드로 항목 찾기. 공백·대소문자 무시, 부분 일치 */
window.searchDict = (function () {
  const norm = (s) => s.toLowerCase().replace(/\s+/g, '');

  return function searchDict(dict, query) {
    const q = norm(query);
    if (!q) return [];
    return dict.flatMap((cat) =>
      cat.items
        .map(([id, ko, en, tags], i) => ({ id, ko, en, num: i + 1, hay: norm(ko + en + tags) }))
        .filter((item) => item.hay.includes(q))
    );
  };
})();
