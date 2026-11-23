(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.StudioComponents = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  const TEMPLATE = ["nav", "crumb", "banner", "hero", "cards", "input", "tabs", "chips", "switch", "list", "toast", "settings", "team", "table", "modal"];

  const escapeHtml = (s) => {
    const str = String(s ?? "");
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };

  const safe = (v) => String(v).replace(/[^a-z0-9-]/gi, "");

  const FX_PREFIX = { shadow: "sh", border: "bd", bg: "bg", accent: "ac", hover: "hv" };

  const fxClasses = (fx) => {
    let classes = [];
    for (const [key, prefix] of Object.entries(FX_PREFIX)) {
      const val = fx?.[key];
      if (val && val !== "none") {
        classes.push(`fx-${prefix}-${safe(val)}`);
      }
    }
    return classes.join(" ");
  };

  const styleAttr = (style) => {
    if (!style) return "";
    const parts = [];
    if (typeof style.fs === "number" && isFinite(style.fs)) parts.push(`--b-fs:${style.fs}px`);
    if (typeof style.fw === "number" && isFinite(style.fw)) parts.push(`--b-fw:${style.fw}`);
    if (typeof style.radius === "number" && isFinite(style.radius)) parts.push(`--radius:${style.radius}px`);
    if (typeof style.pad === "number" && isFinite(style.pad)) parts.push(`--b-pad:${style.pad}px`);
    if (style.align && ["left", "center", "right"].includes(style.align)) {
      parts.push(`text-align:${style.align}`);
    }
    return parts.length > 0 ? `style="${parts.join(";")}"` : "";
  };

  const defs = [];
  const byType = Object.create(null);

  const register = (def) => {
    defs.push(def);
    byType[def.type] = def;
  };

  const get = (type) => byType[type];

  const list = () => defs.slice();

  const schema = () => {
    const s = {};
    for (const d of defs) {
      s[d.type] = {
        skins: d.skins.map(sk => sk[0]),
        texts: d.texts
      };
    }
    return s;
  };

  const renderBlock = (block) => {
    const def = get(block.type);
    if (!def) return "";
    const skin = def.skins.some(s => s[0] === block.skin) ? block.skin : def.skins[0][0];
    const id = safe(block.id);
    const texts = block.texts || {};
    const h = {
      id,
      t: (k) => escapeHtml(Object.prototype.hasOwnProperty.call(texts, k) ? texts[k] : def.texts[k]),
      k: (k) => ` data-k="${escapeHtml(k)}"`
    };

    const fx = fxClasses(block.fx);
    const classes = `blk blk-${block.type} sk-${block.type}-${skin} ${fx}`.trim();
    const style = styleAttr(block.style);
    const inner = def.render(h);

    return `<section class="${classes}" data-id="${id}" data-type="${block.type}"${style ? " " + style : ""}>${inner}</section>`;
  };

  // Register definitions from blocks.md
  register({
    type: "nav",
    label: "내비게이션",
    texts: { logo: "브랜드", "link-1": "소개", "link-2": "기능", "link-3": "요금", "btn-nav": "시작하기" },
    skins: [["basic", "기본"], ["center", "가운데 로고"], ["dark", "어두운"], ["float", "떠 있는 바"], ["clear", "투명"], ["line", "아래 선"]],
    render: (h) => `<nav class="pv-nav" aria-label="주요 메뉴"><b class="pv-logo" ${h.k("logo")}>${h.t("logo")}</b><div class="pv-links"><a href="#" ${h.k("link-1")}>${h.t("link-1")}</a><a href="#" ${h.k("link-2")}>${h.t("link-2")}</a><a href="#" ${h.k("link-3")}>${h.t("link-3")}</a></div><a class="pv-btn pv-primary" href="#" ${h.k("btn-nav")}>${h.t("btn-nav")}</a></nav>`
  });

  register({
    type: "crumb",
    label: "위치 표시",
    texts: { "crumb-1": "홈", "crumb-2": "프로젝트", "crumb-3": "3분기 출시" },
    skins: [["basic", "기본"], ["slash", "빗금"], ["pill", "알약"], ["bold", "굵게"]],
    render: (h) => `<nav class="pv-crumb" aria-label="현재 위치"><a href="#" ${h.k("crumb-1")}>${h.t("crumb-1")}</a><span class="pv-sep" aria-hidden="true">›</span><a href="#" ${h.k("crumb-2")}>${h.t("crumb-2")}</a><span class="pv-sep" aria-hidden="true">›</span><b aria-current="page"${h.k("crumb-3")}>${h.t("crumb-3")}</b></nav>`
  });

  register({
    type: "banner",
    label: "알림 배너",
    texts: { "banner-text": "이번 주 금요일 오후 6시에 정기 점검이 있어요.", "banner-link": "자세히" },
    skins: [["soft", "연한 바탕"], ["line", "왼쪽 선"], ["fill", "채움"], ["outline", "외곽선"]],
    render: (h) => `<div class="pv-banner" role="note"><span ${h.k("banner-text")}>${h.t("banner-text")}</span><a href="#" ${h.k("banner-link")}>${h.t("banner-link")}</a></div>`
  });

  register({
    type: "hero",
    label: "히어로",
    texts: { "chip-hero": "새 기능", "h1-hero": "작은 팀을 위한 가장 쉬운 일정 관리", "lead": "복잡한 도구 없이 핵심 기능에만 집중하세요.", "btn-hero-1": "무료로 시작하기", "btn-hero-2": "더 알아보기" },
    skins: [["left", "왼쪽 정렬"], ["center", "가운데 정렬"], ["split", "좌우 분할"], ["invert", "반전 배경"], ["big", "큰 숫자 강조"], ["point", "포인트색 배경"]],
    render: (h) => `<div class="pv-hero"><div class="pv-hero-text"><span class="pv-chip" ${h.k("chip-hero")}>${h.t("chip-hero")}</span><h1 class="pv-h1" ${h.k("h1-hero")}>${h.t("h1-hero")}</h1><p class="pv-lead" ${h.k("lead")}>${h.t("lead")}</p><div class="pv-row"><a class="pv-btn pv-primary" href="#" ${h.k("btn-hero-1")}>${h.t("btn-hero-1")}</a><a class="pv-btn pv-secondary" href="#" ${h.k("btn-hero-2")}>${h.t("btn-hero-2")}</a></div></div><div class="pv-hero-art" aria-hidden="true"></div></div>`
  });

  register({
    type: "buttons",
    label: "버튼",
    texts: { "btn-1": "기본 버튼", "btn-2": "보조 버튼", "btn-3": "글자 버튼" },
    skins: [["fill", "채움"], ["outline", "외곽선"], ["ghost", "고스트"], ["soft", "부드러운"], ["pill", "알약"], ["raised", "입체"], ["brutal", "네오 브루탈"], ["link", "밑줄 글자"], ["lg", "큰 버튼"], ["sm", "작은 버튼"]],
    render: (h) => `<div class="pv-row pv-buttons"><a class="pv-btn pv-primary" href="#" ${h.k("btn-1")}>${h.t("btn-1")}</a><a class="pv-btn pv-secondary" href="#" ${h.k("btn-2")}>${h.t("btn-2")}</a><a class="pv-btn pv-text" href="#" ${h.k("btn-3")}>${h.t("btn-3")}</a></div>`
  });

  register({
    type: "cards",
    label: "카드",
    texts: { "card1-h": "함께 보는 일정", "card1-p": "팀 전체 일정을 한 화면에서 확인해요.", "card2-h": "알아서 알려 주는 마감", "card2-p": "마감 하루 전에 담당자에게 알림이 가요.", "card3-h": "가벼운 주간 리포트", "card3-p": "매주 월요일, 지난주 진행 상황을 정리해 드려요." },
    skins: [["border", "테두리"], ["flat", "평면"], ["shadow", "그림자"], ["float", "떠 있는"], ["accent", "왼쪽 강조선"], ["band", "위쪽 색띠"], ["invert", "반전"], ["tint", "연한 포인트색"], ["glass", "유리"], ["brutal", "네오 브루탈"], ["dashed", "점선"]],
    render: (h) => `<div class="pv-cards"><article class="pv-card"><h3 ${h.k("card1-h")}>${h.t("card1-h")}</h3><p ${h.k("card1-p")}>${h.t("card1-p")}</p></article><article class="pv-card"><h3 ${h.k("card2-h")}>${h.t("card2-h")}</h3><p ${h.k("card2-p")}>${h.t("card2-p")}</p></article><article class="pv-card"><h3 ${h.k("card3-h")}>${h.t("card3-h")}</h3><p ${h.k("card3-p")}>${h.t("card3-p")}</p></article></div>`
  });

  register({
    type: "input",
    label: "입력칸",
    texts: { "form-label": "이메일", "form-help": "알림을 받을 주소를 적어 주세요." },
    skins: [["box", "상자"], ["line", "밑줄만"], ["fill", "채움"], ["pill", "알약"], ["inset", "안쪽 그림자"]],
    render: (h) => `<div class="pv-field-wrap"><label class="pv-label" for="em-${h.id}" ${h.k("form-label")}>${h.t("form-label")}</label><input id="em-${h.id}" class="pv-input" type="email" placeholder="name@mail.com" aria-describedby="emh-${h.id}"><p class="pv-help" id="emh-${h.id}" ${h.k("form-help")}>${h.t("form-help")}</p></div>`
  });

  register({
    type: "tabs",
    label: "탭",
    texts: { "tab-1": "전체", "tab-2": "진행 중", "tab-3": "완료" },
    skins: [["segment", "세그먼트"], ["underline", "밑줄"], ["pill", "알약"], ["box", "상자"]],
    render: (h) => `<div class="pv-tabs" role="tablist" aria-label="보기 선택"><button class="pv-tab on" type="button" role="tab" aria-selected="true" ${h.k("tab-1")}>${h.t("tab-1")}</button><button class="pv-tab" type="button" role="tab" aria-selected="false" ${h.k("tab-2")}>${h.t("tab-2")}</button><button class="pv-tab" type="button" role="tab" aria-selected="false" ${h.k("tab-3")}>${h.t("tab-3")}</button></div>`
  });

  return {
    escapeHtml,
    register,
    get,
    list,
    schema,
    renderBlock,
    fxClasses,
    styleAttr,
    TEMPLATE
  };
});
