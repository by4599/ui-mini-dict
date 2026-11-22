/* 움직임 · 이동 구조 */
window.PV = Object.assign(window.PV || {}, {
  easein: `<div class="pv gray">
    <div class="a-easein" style="width:20px;height:20px;border-radius:5px;background:var(--blue);margin-top:14px"></div>
    <div class="t s" style="position:absolute;left:0;right:0;bottom:12px;text-align:center">느리게 출발해서 점점 빨라져요</div>
  </div>`,

  easeout: `<div class="pv gray">
    <div class="a-easeout" style="width:20px;height:20px;border-radius:5px;background:var(--blue);margin-top:14px"></div>
    <div class="t s" style="position:absolute;left:0;right:0;bottom:12px;text-align:center">빠르게 와서 부드럽게 멈춰요</div>
  </div>`,

  spring: `<div class="pv dim" style="background:#aeaeb2">
    <div class="sheet a-spring" style="top:30px"><div class="ln dk" style="width:60%"></div><div class="ln" style="width:85%"></div></div>
  </div>`,

  bounce: `<div class="pv ctr">
    <span class="ic gn a-bounce" style="width:28px;height:28px;font-size:14px">✓</span>
    <div class="t b">예약 완료!</div>
  </div>`,

  stagger: `<div class="pv gray col" style="justify-content:center">
    <div class="bx a-stag">아메리카노</div>
    <div class="bx a-stag d2">카페라테</div>
    <div class="bx a-stag d4">바닐라라테</div>
  </div>`,

  fade: `<div class="pv ctr">
    <div class="a-fade"><span class="toastbox" style="background:#48484a">지난달보다 12% 줄었어요</span></div>
    <div class="t b">이번 달 배달비 4.2만 원</div>
  </div>`,

  slide: `<div class="pv" style="padding:0;background:var(--well)">
    <div style="padding:10px 12px"><div class="ln" style="width:60%"></div><div class="ln" style="width:80%"></div></div>
    <div class="a-slide" style="position:absolute;inset:0;background:#fff;padding:10px 12px;box-shadow:-3px 0 8px rgba(0,0,0,0.08)">
      <div class="t bl b" style="font-size:7.5px">2단계</div><div class="t b" style="margin-bottom:6px">좌석 고르기</div><div class="ln" style="width:70%"></div></div>
  </div>`,

  zoom: `<div class="pv" style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;align-content:start">
    <div class="blk" style="height:30px"></div><div class="blk" style="height:30px"></div><div class="blk" style="height:30px"></div>
    <div class="blk" style="height:30px"></div><div class="blk" style="height:30px"></div><div class="blk" style="height:30px"></div>
    <div class="a-zoom" style="position:absolute;background:var(--blue)"></div>
  </div>`,

  sharedelement: `<div class="pv">
    <div style="padding-left:26px;margin-top:52px"><div class="t b">한라산 등반 코스</div><div class="ln" style="width:70%;margin-top:4px"></div></div>
    <div class="a-share" style="position:absolute;background:linear-gradient(135deg,#63a5f8,#2f86f6)"></div>
  </div>`,

  tabbar: `<div class="pv" style="padding:0;display:flex;flex-direction:column">
    <div style="flex:1;padding:8px 10px"><div class="t b" style="margin-bottom:5px">홈</div><div class="ln" style="width:80%"></div><div class="ln" style="width:60%"></div></div>
    <div class="row" style="border-top:1px solid var(--line);padding:5px 10px;font-size:6.5px;color:var(--gray)">
      <span style="text-align:center;color:var(--ink);font-weight:700"><i style="display:block;width:7px;height:7px;margin:0 auto 2px;border-radius:2px;background:var(--ink)"></i>홈</span>
      <span style="text-align:center"><i style="display:block;width:7px;height:7px;margin:0 auto 2px;border-radius:2px;background:#c7c7cc"></i>검색</span>
      <span style="text-align:center"><i style="display:block;width:7px;height:7px;margin:0 auto 2px;border-radius:2px;background:#c7c7cc"></i>장바구니</span>
      <span style="text-align:center"><i style="display:block;width:7px;height:7px;margin:0 auto 2px;border-radius:2px;background:#c7c7cc"></i>MY</span></div>
  </div>`,

  toptabs: `<div class="pv col">
    <div style="position:relative;display:flex;font-size:8px;border-bottom:1px solid var(--line)">
      <span style="flex:1;text-align:center;padding-bottom:4px;font-weight:700">전체</span><span style="flex:1;text-align:center;padding-bottom:4px;color:var(--gray)">진행 중</span><span style="flex:1;text-align:center;padding-bottom:4px;color:var(--gray)">완료</span>
      <i class="a-seg" style="position:absolute;left:0;bottom:-1px;width:33.3%;height:2px;background:var(--ink)"></i></div>
    <div class="bx">강남 요가 클래스</div><div class="bx">주말 베이킹</div>
  </div>`,

  drawer: `<div class="pv" style="padding:0">
    <div style="padding:10px 12px"><div class="ln dk" style="width:30%"></div><div class="ln" style="width:70%"></div></div>
    <div class="a-fade" style="position:absolute;inset:0;background:rgba(0,0,0,0.3)"></div>
    <div class="a-slide" style="position:absolute;top:0;bottom:0;left:0;width:58%;background:#fff;padding:10px;animation-name:drawer">
      <div class="t" style="margin-bottom:5px">내 정보</div><div class="t" style="margin-bottom:5px">주문 내역</div><div class="t">설정</div></div>
  </div>`,

  breadcrumb: `<div class="pv col">
    <div class="t s">홈 › 가전 › 주방 › <b style="color:var(--ink)">에어프라이어</b></div>
    <div class="t b" style="margin:2px 0">5L 대용량 에어프라이어</div>
    <div class="ln" style="width:85%"></div><div class="ln" style="width:65%"></div>
  </div>`,

  stickyheader: `<div class="pv gray" style="padding:0">
    <div style="position:relative;z-index:1;background:#fff;padding:6px 10px;box-shadow:0 1px 4px rgba(0,0,0,0.06)" class="hstack"><b class="t b">공연</b><span class="pill">이번 주</span><span class="pill">서울</span></div>
    <div class="a-pull" style="padding:6px 8px;display:flex;flex-direction:column;gap:5px;animation-name:scrollup">
      <div class="bx">뮤지컬 A</div><div class="bx">콘서트 B</div><div class="bx">연극 C</div><div class="bx">전시 D</div></div>
  </div>`,

  fab: `<div class="pv gray col">
    <div class="bx">캠핑 후기</div><div class="bx">등산 후기</div>
    <div class="abs a-bounce" style="right:10px;bottom:10px;width:24px;height:24px;border-radius:50%;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;box-shadow:0 3px 8px rgba(47,134,246,0.4)">+</div>
  </div>`,

  pagination: `<div class="pv gray col">
    <div class="bx">판교 맛집 리스트</div><div class="bx">성수 카페 리스트</div>
    <div class="hstack" style="justify-content:center;gap:6px;font-size:8px;color:var(--gray);margin-top:2px">‹ <b style="background:var(--ink);color:#fff;border-radius:4px;padding:1px 4px">1</b> 2 3 4 ›</div>
  </div>`,

  infinitescroll: `<div class="pv gray" style="padding:6px 8px">
    <div class="a-pull" style="display:flex;flex-direction:column;gap:5px;animation-name:scrollup">
      <div class="bx">게시글 1</div><div class="bx">게시글 2</div><div class="bx">게시글 3</div><div class="bx">게시글 4</div>
      <div style="display:flex;justify-content:center"><span class="spinner a-spin" style="width:10px;height:10px;border-width:2px"></span></div></div>
  </div>`,

  back: `<div class="pv" style="padding:0">
    <div class="hstack" style="padding:6px 10px;border-bottom:1px solid var(--line)"><b class="a-blink" style="font-size:11px;animation-duration:1.8s">‹</b><b class="t b">설정</b></div>
    <div style="padding:8px 10px"><div class="t b" style="margin-bottom:5px">알림</div><div class="ln" style="width:80%"></div><div class="ln" style="width:60%"></div></div>
  </div>`,
});
