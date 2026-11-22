/* 빈 화면 · 제스처 */
window.PV = Object.assign(window.PV || {}, {
  firstuse: `<div class="pv ctr">
    <span style="font-size:14px;color:var(--gray2)">☆</span>
    <div class="t">아직 저장한 장소가 없어요</div>
    <div class="bt a-pop" style="animation-name:blink;animation-duration:2s">장소 둘러보기</div>
  </div>`,

  nosearch: `<div class="pv col" style="align-items:center;text-align:center">
    <div class="bx" style="width:100%;background:var(--well);border:0">스니커즈 270</div>
    <div class="t b" style="margin-top:4px">검색 결과가 없어요</div>
    <div class="t s">혹시 이걸 찾으셨나요?</div>
    <span class="pill bl a-pop">스니커즈 260</span>
  </div>`,

  nofilter: `<div class="pv ctr">
    <div class="hstack"><span class="pill dk">주차</span><span class="pill dk">반려견</span><span class="pill dk">24시</span></div>
    <div class="t">조건에 맞는 카페가 없어요</div>
    <div class="bt gr a-pop" style="animation-name:blink;animation-duration:2s">필터 지우기</div>
  </div>`,

  offline: `<div class="pv ctr">
    <span class="a-wiggle" style="font-size:14px;color:var(--gray)">⌁</span>
    <div class="t b">인터넷에 연결되어 있지 않아요</div>
    <div class="t s">연결되면 자동으로 새로 불러와요</div>
  </div>`,

  permission: `<div class="pv ctr">
    <span class="a-wiggle" style="font-size:14px">🔔</span>
    <div class="t">택배가 도착하면 알려드릴게요</div>
    <div class="bt">알림 허용</div>
  </div>`,

  alldone: `<div class="pv ctr">
    <span class="ic gn a-bounce" style="width:24px;height:24px;font-size:12px">✓</span>
    <div class="t b">오늘 할 일을 모두 끝냈어요</div>
    <div class="t bl" style="font-size:7.5px">내일 할 일 보기 ›</div>
  </div>`,

  afterdelete: `<div class="pv ctr">
    <span style="font-size:14px;color:var(--gray)">🗑</span>
    <div class="t">메모를 모두 지웠어요</div>
    <div class="a-pop"><span class="toastbox">3개 삭제됨 · 되돌리기</span></div>
  </div>`,

  error: `<div class="pv ctr">
    <span class="ic rd a-shake" style="border:1.5px solid var(--red);background:#fff">!</span>
    <div class="t b">불러오지 못했어요</div>
    <div class="bt">다시 시도</div>
  </div>`,

  locked: `<div class="pv ctr">
    <span class="a-wiggle" style="font-size:13px">🔒</span>
    <div class="t">7일 연속 출석하면 열려요</div>
    <div class="track" style="width:70%"><i class="a-grow" style="--w:57%"></i></div>
    <div class="t s">4/7</div>
  </div>`,

  tap: `<div class="pv gray ctr">
    <div class="bx" style="width:90%">서울 → 부산 KTX</div>
    <span class="finger a-press" style="left:52%;top:44%"></span>
  </div>`,

  longpress: `<div class="pv gray">
    <div class="bx" style="width:80%">장보기 목록</div>
    <span class="finger a-hold" style="left:34px;top:12px"></span>
    <div class="menu a-pop" style="left:40px;top:38px"><div>고정하기</div><div>이름 바꾸기</div><div style="color:var(--red)">삭제</div></div>
  </div>`,

  swipe: `<div class="pv gray" style="padding:10px 0 0">
    <div class="a-swl hstack" style="gap:6px;padding-left:12px">
      <div style="flex:none;width:92px;height:56px;border-radius:7px;background:var(--blue)"></div>
      <div style="flex:none;width:92px;height:56px;border-radius:7px;background:#63a5f8"></div>
      <div style="flex:none;width:92px;height:56px;border-radius:7px;background:#9cc6ff"></div></div>
    <div class="hstack" style="justify-content:center;margin-top:8px;gap:3px"><i style="width:10px;height:3px;border-radius:2px;background:var(--ink2)"></i><i style="width:3px;height:3px;border-radius:50%;background:#c7c7cc"></i><i style="width:3px;height:3px;border-radius:50%;background:#c7c7cc"></i></div>
  </div>`,

  swipedelete: `<div class="pv gray col" style="justify-content:center">
    <div class="bx">우유 2개</div>
    <div style="position:relative;border-radius:6px;overflow:hidden;background:var(--red)">
      <span style="position:absolute;right:7px;top:5px;color:#fff;font-size:8px;font-weight:700">삭제</span>
      <div class="bx a-swdel" style="position:relative;border-radius:6px">계란 한 판</div></div>
    <div class="bx">식빵</div>
  </div>`,

  drag: `<div class="pv gray col" style="justify-content:center">
    <div class="bx a-drag2">1. 공항 가기<span style="color:var(--gray2)">≡</span></div>
    <div class="bx a-drag2">2. 체크인<span style="color:var(--gray2)">≡</span></div>
    <div class="bx a-drag" style="position:relative;z-index:1">3. 환전하기<span style="color:var(--gray2)">≡</span></div>
  </div>`,

  pinch: `<div class="pv gray ctr">
    <div class="a-pinch" style="width:66px;height:44px;border-radius:6px;background:linear-gradient(135deg,#9cc6ff,#2f86f6)"></div>
    <span class="finger a-pa" style="right:24px;top:16px"></span>
    <span class="finger a-pb" style="left:24px;bottom:16px"></span>
  </div>`,

  doubletap: `<div class="pv" style="padding:6px">
    <div class="ctr" style="height:100%;border-radius:6px;background:linear-gradient(135deg,#c7c7cc,#8e8e93);display:flex;align-items:center;justify-content:center">
      <span class="a-heart" style="color:#fff;font-size:22px">♥</span></div>
  </div>`,

  pullrefresh: `<div class="pv gray">
    <div class="abs" style="left:50%;top:6px;margin-left:-6px"><span class="spinner a-spin" style="display:block;width:12px;height:12px;border-width:2px"></span></div>
    <div class="a-pull col" style="display:flex;flex-direction:column;gap:5px">
      <div class="bx">새 소식 2개</div><div class="bx">오늘의 날씨</div></div>
  </div>`,

  edgeswipe: `<div class="pv gray" style="padding:6px">
    <div style="position:absolute;inset:6px;border-radius:6px;background:#e5e5ea"></div>
    <div class="a-edge" style="position:absolute;inset:6px;border-radius:6px;background:#fff;padding:8px 10px;box-shadow:-3px 0 8px rgba(0,0,0,0.1)">
      <div class="t b" style="margin-bottom:6px">주문 상세</div><div class="ln" style="width:80%"></div><div class="ln" style="width:60%"></div></div>
    <span class="finger a-edgef" style="left:4px;top:56px"></span>
  </div>`,
});
