(function (root, factory) {
  factory(typeof module === "object" && module.exports ? require("./components.js") : root.StudioComponents);
})(typeof self !== "undefined" ? self : this, function (C) {
  "use strict";
  Object.values({
    stats: {
      type: "stats",
      label: "통계 숫자",
      skins: [
        ["plain", "기본"],
        ["card", "카드"],
        ["divided", "구분선"],
        ["point", "포인트 숫자"]
      ],
      texts: {
        "st1-n": "1,200+",
        "st1-l": "함께 쓰는 팀",
        "st2-n": "98%",
        "st2-l": "다시 찾는 비율",
        "st3-n": "3분",
        "st3-l": "평균 설정 시간"
      },
      render: function (h) {
        const id = h.id;
        return `<div class="pv-stats">
          <div class="pv-stat"><b class="pv-stat-n" data-k="st1-n">${h.t("st1-n")}</b><span class="pv-stat-l" data-k="st1-l">${h.t("st1-l")}</span></div>
          <div class="pv-stat"><b class="pv-stat-n" data-k="st2-n">${h.t("st2-n")}</b><span class="pv-stat-l" data-k="st2-l">${h.t("st2-l")}</span></div>
          <div class="pv-stat"><b class="pv-stat-n" data-k="st3-n">${h.t("st3-n")}</b><span class="pv-stat-l" data-k="st3-l">${h.t("st3-l")}</span></div>
        </div>`;
      }
    },
    pricing: {
      type: "pricing",
      label: "요금표",
      skins: [
        ["basic", "기본"],
        ["featured", "추천 강조"],
        ["dark", "어두운"],
        ["outline", "테두리 강조"]
      ],
      texts: {
        "pr-h": "요금제",
        "p1-name": "무료",
        "p1-price": "0원",
        "p1-desc": "팀원 10명까지",
        "p1-btn": "시작하기",
        "p2-name": "팀",
        "p2-price": "월 9,900원",
        "p2-desc": "인원 제한 없음",
        "p2-btn": "팀으로 시작",
        "p2-tag": "추천"
      },
      render: function (h) {
        const id = h.id;
        return `<div class="pv-pricing">
          <h2 class="pv-pricing-h" data-k="pr-h">${h.t("pr-h")}</h2>
          <div class="pv-plans">
            <article class="pv-plan">
              <h3 data-k="p1-name">${h.t("p1-name")}</h3>
              <p class="pv-plan-price" data-k="p1-price">${h.t("p1-price")}</p>
              <p class="pv-plan-desc" data-k="p1-desc">${h.t("p1-desc")}</p>
              <a class="pv-btn pv-secondary" href="#" data-k="p1-btn">${h.t("p1-btn")}</a>
            </article>
            <article class="pv-plan pv-plan-pro">
              <span class="pv-plan-tag" data-k="p2-tag">${h.t("p2-tag")}</span>
              <h3 data-k="p2-name">${h.t("p2-name")}</h3>
              <p class="pv-plan-price" data-k="p2-price">${h.t("p2-price")}</p>
              <p class="pv-plan-desc" data-k="p2-desc">${h.t("p2-desc")}</p>
              <a class="pv-btn pv-primary" href="#" data-k="p2-btn">${h.t("p2-btn")}</a>
            </article>
          </div>
        </div>`;
      }
    },
    steps: {
      type: "steps",
      label: "단계",
      skins: [
        ["number", "숫자 원"],
        ["line", "연결선"],
        ["card", "카드"],
        ["minimal", "미니멀"]
      ],
      texts: {
        "s1-h": "가입하기",
        "s1-p": "이메일로 1분 만에 가입해요.",
        "s2-h": "팀 초대",
        "s2-p": "링크 하나로 팀원을 불러요.",
        "s3-h": "일정 등록",
        "s3-p": "첫 일정을 올리면 끝이에요."
      },
      render: function (h) {
        const id = h.id;
        return `<ol class="pv-steps">
          <li class="pv-step"><span class="pv-step-n" aria-hidden="true">1</span><div><h3 data-k="s1-h">${h.t("s1-h")}</h3><p data-k="s1-p">${h.t("s1-p")}</p></div></li>
          <li class="pv-step"><span class="pv-step-n" aria-hidden="true">2</span><div><h3 data-k="s2-h">${h.t("s2-h")}</h3><p data-k="s2-p">${h.t("s2-p")}</p></div></li>
          <li class="pv-step"><span class="pv-step-n" aria-hidden="true">3</span><div><h3 data-k="s3-h">${h.t("s3-h")}</h3><p data-k="s3-p">${h.t("s3-p")}</p></div></li>
        </ol>`;
      }
    },
    timeline: {
      type: "timeline",
      label: "타임라인",
      skins: [
        ["line", "세로선"],
        ["dots", "점만"],
        ["card", "카드"],
        ["compact", "촘촘"]
      ],
      texts: {
        "tl1-d": "9월",
        "tl1-t": "첫 베타 공개",
        "tl2-d": "10월",
        "tl2-t": "팀 요금제 출시",
        "tl3-d": "11월",
        "tl3-t": "모바일 앱 출시"
      },
      render: function (h) {
        const id = h.id;
        return `<ol class="pv-timeline">
          <li class="pv-tl"><span class="pv-tl-d" data-k="tl1-d">${h.t("tl1-d")}</span><p class="pv-tl-t" data-k="tl1-t">${h.t("tl1-t")}</p></li>
          <li class="pv-tl"><span class="pv-tl-d" data-k="tl2-d">${h.t("tl2-d")}</span><p class="pv-tl-t" data-k="tl2-t">${h.t("tl2-t")}</p></li>
          <li class="pv-tl"><span class="pv-tl-d" data-k="tl3-d">${h.t("tl3-d")}</span><p class="pv-tl-t" data-k="tl3-t">${h.t("tl3-t")}</p></li>
        </ol>`;
      }
    },
    quote: {
      type: "quote",
      label: "후기",
      skins: [
        ["plain", "기본"],
        ["card", "카드"],
        ["big", "큰 따옴표"],
        ["point", "포인트색"]
      ],
      texts: {
        "q-text": "회의가 절반으로 줄었어요. 다들 일정표만 보면 되니까요.",
        "q-name": "김하늘",
        "q-role": "디자인팀 리드"
      },
      render: function (h) {
        const id = h.id;
        return `<figure class="pv-quote">
          <blockquote><p data-k="q-text">${h.t("q-text")}</p></blockquote>
          <figcaption><b data-k="q-name">${h.t("q-name")}</b><span data-k="q-role">${h.t("q-role")}</span></figcaption>
        </figure>`;
      }
    },
    empty: {
      type: "empty",
      label: "빈 화면",
      skins: [
        ["plain", "기본"],
        ["dashed", "점선 상자"],
        ["card", "카드"],
        ["tint", "연한 포인트색"]
      ],
      texts: {
        "em-h": "아직 업무가 없어요",
        "em-p": "첫 업무를 만들면 여기에 보여요.",
        "em-btn": "업무 만들기"
      },
      render: function (h) {
        const id = h.id;
        return `<div class="pv-empty">
          <div class="pv-empty-icon" aria-hidden="true">＋</div>
          <h3 data-k="em-h">${h.t("em-h")}</h3>
          <p data-k="em-p">${h.t("em-p")}</p>
          <a class="pv-btn pv-primary" href="#" data-k="em-btn">${h.t("em-btn")}</a>
        </div>`;
      }
    },
    search: {
      type: "search",
      label: "검색바",
      skins: [
        ["box", "상자"],
        ["pill", "알약"],
        ["line", "밑줄"],
        ["fill", "채움"]
      ],
      texts: {
        "sr-label": "검색",
        "sr-btn": "찾기"
      },
      render: function (h) {
        const id = h.id;
        return `<div class="pv-search" role="search">
          <label class="pv-sr-only" for="sr-${id}" data-k="sr-label">${h.t("sr-label")}</label>
          <input id="sr-${id}" class="pv-input" type="search" placeholder="업무, 사람, 파일 찾기">
          <button class="pv-btn pv-primary" type="button" data-k="sr-btn">${h.t("sr-btn")}</button>
        </div>`;
      }
    },
    footer: {
      type: "footer",
      label: "푸터",
      skins: [
        ["basic", "기본"],
        ["dark", "어두운"],
        ["center", "가운데"],
        ["line", "위아래 선"]
      ],
      texts: {
        "ft-logo": "브랜드",
        "ft-1": "이용약관",
        "ft-2": "개인정보처리방침",
        "ft-3": "문의",
        "ft-copy": "© 2026 브랜드"
      },
      render: function (h) {
        const id = h.id;
        return `<footer class="pv-footer">
          <b class="pv-footer-logo" data-k="ft-logo">${h.t("ft-logo")}</b>
          <nav class="pv-footer-links" aria-label="하단 메뉴">
            <a href="#" data-k="ft-1">${h.t("ft-1")}</a>
            <a href="#" data-k="ft-2">${h.t("ft-2")}</a>
            <a href="#" data-k="ft-3">${h.t("ft-3")}</a>
          </nav>
          <small class="pv-footer-copy" data-k="ft-copy">${h.t("ft-copy")}</small>
        </footer>`;
      }
    },
    divider: {
      type: "divider",
      label: "구분선",
      skins: [
        ["line", "선"],
        ["dashed", "점선"],
        ["text", "가운데 글자"],
        ["space", "여백만"]
      ],
      texts: {
        "dv-text": "또는"
      },
      render: function (h) {
        const id = h.id;
        return `<div class="pv-divider" role="separator">
          <span data-k="dv-text">${h.t("dv-text")}</span>
        </div>`;
      }
    },
    image: {
      type: "image",
      label: "이미지 자리",
      skins: [
        ["wide", "넓게"],
        ["square", "정사각"],
        ["round", "원형"],
        ["framed", "액자"]
      ],
      texts: {
        "im-cap": "사진 설명을 적어 주세요"
      },
      render: function (h) {
        const id = h.id;
        const cap = h.t("im-cap");
        return `<figure class="pv-image">
          <div class="pv-image-box" role="img" aria-label="${cap}"></div>
          <figcaption data-k="im-cap">${cap}</figcaption>
        </figure>`;
      }
    }
  }).forEach(C.register);
});
