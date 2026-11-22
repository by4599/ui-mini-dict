/* 다크 패턴 · 메뉴 아이콘 별명 */
(function () {
  const svg = (body) => `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">${body}</svg>`;
  const dots = (pts) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="currentColor" stroke="none"/>`).join('');
  const sq = (pts) => pts.map(([x, y]) => `<rect x="${x}" y="${y}" width="5" height="5" rx="1" fill="currentColor" stroke="none"/>`).join('');

  const ICONS = {
    hamburger: svg('<path d="M4 6h16M4 12h16M4 18h16"/>'),
    kebab: svg(dots([[12, 5], [12, 12], [12, 19]])),
    meatballs: svg(dots([[5, 12], [12, 12], [19, 12]])),
    waffle: svg(dots([[5, 5], [12, 5], [19, 5], [5, 12], [12, 12], [19, 12], [5, 19], [12, 19], [19, 19]])),
    bento: svg(sq([[3, 3], [9.5, 3], [16, 3], [3, 9.5], [9.5, 9.5], [16, 9.5], [3, 16], [9.5, 16], [16, 16]])),
    doner: svg('<path d="M4 6h16M7 12h10M10 18h4"/>'),
    veggieburger: svg('<path d="M5 9h14M5 15h14"/>'),
    stairs: svg('<path d="M4 6h8M4 12h12M4 18h16"/>'),
    sliders: svg('<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2.4" fill="#fff"/><circle cx="15" cy="17" r="2.4" fill="#fff"/>'),
  };

  const menuPreview = (id, rows) => `<div class="pv gray">
    <div class="iconbtn" style="right:10px;top:8px">${ICONS[id]}</div>
    <div class="menu a-pop" style="right:26px;top:30px">${rows.map((r) => `<div${r[0] === '!' ? ' style="color:var(--red)"' : r[0] === '*' ? ' style="color:var(--blue)"' : ''}>${r.replace(/^[!*]/, '')}</div>`).join('')}</div>
  </div>`;

  window.PV = Object.assign(window.PV || {}, {
    roachmotel: `<div class="pv ctr">
      <div class="t b">정말 해지하시겠어요?</div>
      <div class="bt wide">혜택 계속 받기</div>
      <div class="t s" style="font-size:6.5px;color:#c7c7cc">해지는 고객센터 전화로만 가능 (평일 10–11시)</div>
    </div>`,

    prechecked: `<div class="pv col" style="justify-content:center">
      <div class="hstack t"><span class="chk on">✓</span>[필수] 서비스 이용약관</div>
      <div class="hstack t"><span class="chk on">✓</span>[선택] 광고성 정보 수신</div>
      <div class="hstack t"><span class="chk on">✓</span>[선택] 제휴사 정보 제공</div>
    </div>`,

    fakecountdown: `<div class="pv ctr">
      <div class="t s">오늘만 이 가격</div>
      <div class="t big a-blink" style="color:var(--red);animation-duration:1s">00:04:59</div>
      <div class="t s" style="font-size:6.5px">새로고침하면 다시 5분부터</div>
    </div>`,

    confirmshaming: `<div class="pv ctr">
      <div class="t b">첫 구매 20% 쿠폰 받기</div>
      <div class="bt wide">쿠폰 받기</div>
      <div class="t rd" style="font-size:7px;text-decoration:underline">아니요, 저는 제값 다 낼래요</div>
    </div>`,

    sneakbasket: `<div class="pv gray col" style="justify-content:center">
      <div class="t b">장바구니</div>
      <div class="bx">무선 이어폰 89,000원</div>
      <div class="bx a-pop" style="border-color:var(--red);border-width:1.5px;background:#fff4f3;font-weight:700;animation-name:fade">+ 케이스 보험 4,900원</div>
    </div>`,

    fakescarcity: `<div class="pv col" style="justify-content:center;align-items:flex-start">
      <div class="t b">오션뷰 더블룸</div>
      <span class="pill a-shake" style="background:#fde8e7;border:0;color:var(--red);font-weight:800">지금 3명이 보고 있어요!</span>
      <div class="t s">같은 문구가 항상 떠 있어요</div>
    </div>`,

    hiddencosts: `<div class="pv col" style="justify-content:center">
      <div class="row t"><span>상품 금액</span><span>32,000원</span></div>
      <div class="row t rd a-fade"><span>예약 수수료</span><span>+3,800원</span></div>
      <div style="border-top:1px solid var(--line);margin:2px 0"></div>
      <div class="row t b"><span>최종 결제</span><span style="font-size:11px">35,800원</span></div>
    </div>`,

    forcedcontinuity: `<div class="pv ctr">
      <div class="t b">한 달 무료로 써 보세요</div>
      <div class="bt wide">무료 체험 시작</div>
      <div class="t rd" style="font-size:6.5px">체험 종료 후 월 12,900원 자동 결제</div>
    </div>`,

    nagging: `<div class="pv dim">
      <span class="pill a-bounce" style="position:absolute;right:8px;top:6px;background:var(--red);border:0;color:#fff;font-weight:800">오늘 5번째</span>
      <div class="dialog a-zin" style="top:56%">
        <div class="t b" style="margin-bottom:6px">앱 평가를 남겨 주실래요?</div>
        <div class="hstack"><div class="bt gr" style="flex:1">나중에</div><div class="bt" style="flex:1">평가하기</div></div></div>
    </div>`,

    hamburger: menuPreview('hamburger', ['홈', '카테고리', '마이페이지']),
    kebab: menuPreview('kebab', ['편집', '공유', '!삭제']),
    meatballs: menuPreview('meatballs', ['저장', '!신고']),
    waffle: menuPreview('waffle', ['메일', '캘린더', '드라이브']),
    bento: menuPreview('bento', ['모든 서비스', '설정']),
    doner: menuPreview('doner', ['가격대', '브랜드', '배송 방식']),
    veggieburger: menuPreview('veggieburger', ['내 정보', '로그아웃']),
    stairs: menuPreview('stairs', ['*추천순', '최신순', '리뷰 많은 순']),
    sliders: menuPreview('sliders', ['가격 범위', '거리 범위']),
  });
})();
