/* 버튼과 칩 · 콘텐츠 표시 */
window.PV = Object.assign(window.PV || {}, {
  primarybtn: `<div class="pv col" style="justify-content:center">
    <div class="ln dk" style="width:55%"></div><div class="ln" style="width:80%"></div>
    <div class="bt wide a-press" style="height:22px;margin-top:6px;animation-name:btnpress">예약하기</div>
  </div>`,

  secondarybtn: `<div class="pv col" style="justify-content:center">
    <div class="ln dk" style="width:55%"></div><div class="ln" style="width:80%"></div>
    <div class="hstack" style="margin-top:6px"><div class="bt gr" style="flex:1;height:22px">장바구니</div><div class="bt" style="flex:1;height:22px">바로 구매</div></div>
  </div>`,

  ghostbtn: `<div class="pv ctr">
    <div class="t b">로그인이 필요해요</div>
    <div class="bt wide" style="height:20px">카카오로 시작</div>
    <div class="t bl b a-blink" style="font-size:8px;animation-duration:2s">다음에 할게요</div>
  </div>`,

  iconbutton: `<div class="pv ctr">
    <div class="hstack" style="gap:8px">
      <span class="ic gr" style="width:24px;height:24px;font-size:11px">↗</span>
      <span class="ic rd a-heart" style="width:24px;height:24px;font-size:11px;animation-name:bounce">♥</span>
      <span class="ic gr" style="width:24px;height:24px;font-size:11px">⋯</span></div>
    <div class="t s">공유 · 찜 · 더보기</div>
  </div>`,

  filterchip: `<div class="pv col" style="justify-content:center">
    <div class="t b">숙소 조건</div>
    <div class="hstack" style="flex-wrap:wrap;gap:4px">
      <span class="pill dk">✓ 수영장</span><span class="pill a-chipon">조식</span><span class="pill">주차</span><span class="pill dk">✓ 오션뷰</span></div>
  </div>`,

  inputchip: `<div class="pv col" style="justify-content:center">
    <div class="t s">받는 사람</div>
    <div class="bx" style="justify-content:flex-start;flex-wrap:wrap;gap:3px;padding:4px 5px">
      <span class="pill bl">김민지 ✕</span><span class="pill bl a-stag">박서준 ✕</span><span class="a-blink" style="color:var(--blue)">|</span></div>
  </div>`,

  togglebtn: `<div class="pv ctr">
    <div class="hstack" style="gap:0;border:1px solid var(--line);border-radius:6px;overflow:hidden">
      <b class="a-chipon" style="width:24px;height:22px;display:flex;align-items:center;justify-content:center;font-size:10px">B</b>
      <i style="width:24px;height:22px;display:flex;align-items:center;justify-content:center;font-size:10px;border-left:1px solid var(--line)">I</i>
      <u style="width:24px;height:22px;display:flex;align-items:center;justify-content:center;font-size:10px;border-left:1px solid var(--line);background:var(--ink);color:#fff">U</u></div>
    <div class="t s">누른 상태가 그대로 남아요</div>
  </div>`,

  splitbtn: `<div class="pv col" style="justify-content:center;align-items:flex-start">
    <div class="hstack" style="gap:1px"><div class="bt" style="border-radius:5px 0 0 5px;height:20px">PDF로 저장</div><div class="bt" style="border-radius:0 5px 5px 0;height:20px;padding:0 6px">▾</div></div>
    <div class="menu a-pop" style="position:relative;margin-left:30px"><div>PNG로 저장</div><div>엑셀로 저장</div></div>
  </div>`,

  stickycta: `<div class="pv gray" style="padding:0">
    <div class="a-pull" style="padding:8px 10px;animation-name:scrollup"><div class="blk" style="height:36px;margin-bottom:6px"></div><div class="ln" style="width:70%"></div><div class="ln" style="width:85%"></div><div class="ln" style="width:60%"></div><div class="ln" style="width:75%"></div></div>
    <div class="abs" style="left:0;right:0;bottom:0;background:#fff;padding:6px 8px;box-shadow:0 -2px 6px rgba(0,0,0,0.06)"><div class="bt wide" style="height:20px">39,000원 구매하기</div></div>
  </div>`,

  card: `<div class="pv gray ctr">
    <div class="a-stag" style="width:70%;background:#fff;border-radius:7px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.06);text-align:left">
      <div style="height:34px;background:linear-gradient(135deg,#9cc6ff,#2f86f6)"></div>
      <div style="padding:4px 6px"><div class="t b" style="font-size:8px">강릉 바다 산책</div><div class="t s">2시간 · 무료</div></div></div>
  </div>`,

  listitem: `<div class="pv col" style="justify-content:center;gap:0">
    <div class="row" style="padding:5px 0;border-bottom:1px solid var(--line)"><span class="hstack"><span class="ic bl" style="width:16px;height:16px;font-size:8px">✈</span><span class="t">항공권</span></span><span class="t s">›</span></div>
    <div class="row" style="padding:5px 0;border-bottom:1px solid var(--line)"><span class="hstack"><span class="ic gn" style="width:16px;height:16px;font-size:8px">⌂</span><span class="t">숙소</span></span><span class="t s">›</span></div>
    <div class="row" style="padding:5px 0"><span class="hstack"><span class="ic rd" style="width:16px;height:16px;font-size:8px">♨</span><span class="t">맛집</span></span><span class="t s">›</span></div>
  </div>`,

  accordion: `<div class="pv col" style="justify-content:center;gap:0">
    <div class="row" style="padding:4px 0;border-bottom:1px solid var(--line)"><span class="t b">배송은 얼마나 걸려요?</span><span class="t s">⌃</span></div>
    <div class="a-acc" style="overflow:hidden"><div class="t s" style="padding:4px 0">평일 기준 1~2일 안에 도착해요</div></div>
    <div class="row" style="padding:4px 0;border-top:1px solid var(--line)"><span class="t">교환할 수 있나요?</span><span class="t s">⌄</span></div>
  </div>`,

  carousel: `<div class="pv" style="padding:8px 0 0">
    <div class="a-car hstack" style="gap:0;width:300%">
      <div style="flex:1;height:58px;margin:0 12px;border-radius:7px;background:var(--blue);color:#fff;padding:7px;font-size:8px;font-weight:700">겨울 특가 30%</div>
      <div style="flex:1;height:58px;margin:0 12px;border-radius:7px;background:#ff8a65;color:#fff;padding:7px;font-size:8px;font-weight:700">신규 가입 쿠폰</div>
      <div style="flex:1;height:58px;margin:0 12px;border-radius:7px;background:var(--green);color:#fff;padding:7px;font-size:8px;font-weight:700">무료 배송 주간</div></div>
    <div class="t s" style="position:absolute;right:16px;top:50px;background:rgba(0,0,0,0.35);color:#fff;border-radius:99px;padding:0 5px">자동 넘김</div>
  </div>`,

  pageindicator: `<div class="pv ctr">
    <div style="width:70%;height:44px;border-radius:7px;background:var(--well)"></div>
    <div style="position:relative;display:flex;gap:4px">
      <i style="width:5px;height:5px;border-radius:50%;background:#c7c7cc"></i><i style="width:5px;height:5px;border-radius:50%;background:#c7c7cc"></i><i style="width:5px;height:5px;border-radius:50%;background:#c7c7cc"></i><i style="width:5px;height:5px;border-radius:50%;background:#c7c7cc"></i>
      <i class="a-dotmove" style="position:absolute;left:0;top:0;width:5px;height:5px;border-radius:50%;background:var(--ink)"></i></div>
  </div>`,

  avatar: `<div class="pv ctr">
    <div class="hstack" style="gap:0">
      <span class="ic" style="width:24px;height:24px;background:#ffb74d;color:#fff;border:2px solid #fff">민</span>
      <span class="ic" style="width:24px;height:24px;background:#4fc3f7;color:#fff;border:2px solid #fff;margin-left:-7px">J</span>
      <span class="ic" style="width:24px;height:24px;background:#81c784;color:#fff;border:2px solid #fff;margin-left:-7px">서</span>
      <span class="ic gr a-bounce" style="width:24px;height:24px;border:2px solid #fff;margin-left:-7px;font-size:8px">+4</span></div>
    <div class="t s">7명이 함께 보고 있어요</div>
  </div>`,

  rating: `<div class="pv ctr">
    <div class="hstack" style="gap:2px;font-size:15px;color:#fec833">
      <span class="a-stag">★</span><span class="a-stag d1">★</span><span class="a-stag d2">★</span><span class="a-stag d3">★</span><span style="color:#e5e5ea">★</span></div>
    <div class="t"><b>4.0</b> <span class="t s">리뷰 128개</span></div>
  </div>`,

  timeline: `<div class="pv" style="padding:10px 14px">
    <div style="position:absolute;left:18px;top:14px;bottom:20px;width:1.5px;background:var(--line)"></div>
    <div class="hstack" style="gap:8px;margin-bottom:8px;position:relative"><i style="width:9px;height:9px;border-radius:50%;background:var(--blue)"></i><div><div class="t b">배송 출발</div><div class="t s">오늘 09:12</div></div></div>
    <div class="hstack" style="gap:8px;margin-bottom:8px;position:relative"><i style="width:9px;height:9px;border-radius:50%;background:#c7c7cc"></i><div><div class="t">상품 준비</div><div class="t s">어제 18:40</div></div></div>
    <div class="hstack" style="gap:8px;position:relative"><i style="width:9px;height:9px;border-radius:50%;background:#c7c7cc"></i><div class="t">결제 완료</div></div>
  </div>`,

  datatable: `<div class="pv" style="padding:8px 8px">
    <div style="display:grid;grid-template-columns:1.4fr 1fr 1fr;font-size:7.5px;row-gap:0">
      <b style="padding:3px 2px;border-bottom:1px solid var(--ink2)">상품</b><b style="padding:3px 2px;border-bottom:1px solid var(--ink2)">판매 ▾</b><b style="padding:3px 2px;border-bottom:1px solid var(--ink2)">재고</b>
      <span style="padding:3px 2px;border-bottom:1px solid var(--line)">머그컵</span><span style="padding:3px 2px;border-bottom:1px solid var(--line)">240</span><span style="padding:3px 2px;border-bottom:1px solid var(--line)">12</span>
      <span class="a-rowhl" style="padding:3px 2px;border-bottom:1px solid var(--line)">텀블러</span><span class="a-rowhl" style="padding:3px 2px;border-bottom:1px solid var(--line)">185</span><span class="a-rowhl" style="padding:3px 2px;border-bottom:1px solid var(--line);color:var(--red)">3</span>
      <span style="padding:3px 2px">코스터</span><span style="padding:3px 2px">96</span><span style="padding:3px 2px">40</span></div>
  </div>`,
});
