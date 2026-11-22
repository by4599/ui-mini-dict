/* 입력 도우미 · 오버레이 */
window.PV = Object.assign(window.PV || {}, {
  searchbar: `<div class="pv col" style="justify-content:center">
    <div class="bx" style="justify-content:flex-start;border-radius:99px;background:var(--well);border:0;padding:6px 9px">
      <span style="color:var(--gray)">⌕</span><span class="a-type" style="white-space:nowrap;font-weight:600">제주 렌터카</span></div>
    <div class="hstack"><span class="t s">최근</span><span class="pill">부산 호텔</span><span class="pill">KTX</span></div>
  </div>`,

  autocomplete: `<div class="pv col">
    <div class="bx" style="justify-content:flex-start;border-color:var(--blue);border-width:1.5px">⌕ <b>강남</b><span class="a-blink" style="color:var(--blue)">|</span></div>
    <div class="a-fade" style="border-radius:6px;box-shadow:0 3px 10px rgba(0,0,0,0.12);font-size:8px;overflow:hidden">
      <div style="padding:3px 8px"><b>강남</b>역</div><div style="padding:3px 8px;background:var(--well)"><b>강남</b>구청</div><div style="padding:3px 8px"><b>강남</b> 맛집</div></div>
  </div>`,

  otp: `<div class="pv ctr">
    <div class="t b">문자로 받은 6자리</div>
    <div class="hstack" style="gap:3px">
      <span class="bx a-stag" style="width:15px;height:20px;padding:0;justify-content:center;font-weight:800">3</span><span class="bx a-stag d1" style="width:15px;height:20px;padding:0;justify-content:center;font-weight:800">8</span><span class="bx a-stag d2" style="width:15px;height:20px;padding:0;justify-content:center;font-weight:800">1</span>
      <span class="bx" style="width:15px;height:20px;padding:0;justify-content:center;border-color:var(--blue);border-width:1.5px"></span><span class="bx" style="width:15px;height:20px;padding:0"></span><span class="bx" style="width:15px;height:20px;padding:0"></span></div>
    <div class="t s">2:48 남음</div>
  </div>`,

  passwordtoggle: `<div class="pv col" style="justify-content:center">
    <div class="t s">비밀번호</div>
    <div class="bx" style="position:relative;height:22px">
      <span class="a-pwhide" style="font-weight:800;letter-spacing:1px">••••••••</span>
      <span class="a-pwshow" style="position:absolute;left:8px;font-weight:700">sunny2025</span>
      <span style="color:var(--gray);font-size:10px">👁</span></div>
  </div>`,

  floatinglabel: `<div class="pv col" style="justify-content:center">
    <div class="bx" style="position:relative;height:28px;border-color:var(--blue);border-width:1.5px;align-items:flex-end;padding-bottom:4px">
      <span class="a-float" style="position:absolute;left:8px;color:var(--blue)">이메일</span>
      <b class="a-fade" style="font-size:8.5px">mina@mail.com</b></div>
    <div class="t s">입력을 시작하면 이름표가 위로 올라가요</div>
  </div>`,

  charcounter: `<div class="pv col">
    <div class="t s">한 줄 소개</div>
    <div class="bx" style="height:38px;align-items:flex-start"><span class="a-type" style="white-space:nowrap">주말마다 산에 가요</span></div>
    <div class="t s" style="text-align:right"><b style="color:var(--ink)">10</b> / 30</div>
  </div>`,

  fileupload: `<div class="pv ctr">
    <div style="width:100%;flex:1;border:1.5px dashed #c7c7cc;border-radius:7px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px" class="a-drop">
      <span style="font-size:12px;color:var(--blue)">⇪</span><div class="t">사진을 여기로 끌어 오세요</div><div class="t s">또는 눌러서 고르기</div></div>
  </div>`,

  rangeslider: `<div class="pv col" style="justify-content:center">
    <div class="row"><span class="t">가격대</span><span class="t b bl">3만 ~ 8만 원</span></div>
    <div style="position:relative;height:12px">
      <div class="track" style="position:absolute;left:0;right:0;top:4px"></div>
      <i class="a-rangefill" style="position:absolute;top:4px;height:4px;background:var(--blue);border-radius:3px"></i>
      <i class="a-rangeL" style="position:absolute;top:0;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.25)"></i>
      <i class="a-rangeR" style="position:absolute;top:0;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.25)"></i></div>
    <div class="row t s"><span>0원</span><span>10만 원</span></div>
  </div>`,

  timepicker: `<div class="pv ctr" style="flex-direction:row;gap:10px">
    <div style="position:absolute;left:10px;right:10px;top:50%;height:18px;margin-top:-9px;background:var(--well);border-radius:5px"></div>
    <div style="position:relative;height:54px;overflow:hidden;text-align:center;font-size:10px;line-height:18px;color:var(--gray)"><div class="a-wheel"><div>오전</div><div style="color:var(--ink);font-weight:800">오후</div><div>&nbsp;</div></div></div>
    <div style="position:relative;height:54px;overflow:hidden;text-align:center;font-size:10px;line-height:18px;color:var(--gray)"><div class="a-wheel" style="animation-name:wheel2"><div>6</div><div style="color:var(--ink);font-weight:800">7</div><div>8</div><div>9</div></div></div>
    <div style="position:relative;height:54px;overflow:hidden;text-align:center;font-size:10px;line-height:18px;color:var(--gray)"><div><div>25</div><div style="color:var(--ink);font-weight:800">30</div><div>35</div></div></div>
  </div>`,

  popover: `<div class="pv">
    <div class="hstack t"><b>무료 취소</b><span class="ic bl" style="width:11px;height:11px;font-size:7px">?</span></div>
    <div class="a-pop" style="position:absolute;left:10px;top:28px;width:78%;background:#fff;border-radius:7px;padding:6px 8px;box-shadow:0 4px 14px rgba(0,0,0,0.15)">
      <i style="position:absolute;left:44px;top:-3px;width:7px;height:7px;background:#fff;transform:rotate(45deg)"></i>
      <div class="t b" style="margin-bottom:2px">체크인 3일 전까지</div><div class="t s">수수료 없이 전액 돌려드려요</div><div class="t bl b" style="font-size:7.5px;margin-top:3px">자세히 보기</div></div>
  </div>`,

  dropdown: `<div class="pv">
    <div class="bt gr" style="display:inline-flex;height:18px">정렬: 인기순 ▾</div>
    <div class="menu a-ddown" style="left:12px;top:32px;transform-origin:top">
      <div style="color:var(--blue);font-weight:700">✓ 인기순</div><div>가격 낮은 순</div><div>가격 높은 순</div><div>최신순</div></div>
  </div>`,

  actionsheet: `<div class="pv dim" style="background:#aeaeb2;padding:6px">
    <div class="a-up" style="position:absolute;left:6px;right:6px;bottom:6px">
      <div style="background:#fff;border-radius:7px;font-size:8px;text-align:center;overflow:hidden">
        <div style="padding:4px;border-bottom:1px solid var(--line);color:var(--blue)">사진 찍기</div><div style="padding:4px;border-bottom:1px solid var(--line);color:var(--blue)">앨범에서 고르기</div><div style="padding:4px;color:var(--red)">사진 삭제</div></div>
      <div style="background:#fff;border-radius:7px;font-size:8px;text-align:center;padding:4px;margin-top:4px;font-weight:700;color:var(--blue)">취소</div></div>
  </div>`,

  contextmenu: `<div class="pv gray">
    <div class="bx" style="width:70%;margin-top:6px">회의록_11월.docx</div>
    <span class="finger a-hold" style="left:44px;top:14px;border-radius:3px;width:10px;height:10px;background:rgba(0,0,0,0.15);border:0"></span>
    <div class="menu a-pop" style="left:50px;top:30px"><div>열기</div><div>복사</div><div>이름 바꾸기</div><div style="color:var(--red)">삭제</div></div>
  </div>`,

  fullscreenmodal: `<div class="pv gray" style="padding:0">
    <div style="padding:8px 10px"><div class="ln" style="width:60%"></div><div class="ln" style="width:80%"></div></div>
    <div class="a-up" style="position:absolute;inset:0;background:#fff;padding:7px 10px">
      <div class="row" style="margin-bottom:7px"><span style="font-size:10px">✕</span><b class="t b">새 일정</b><span class="t bl b">저장</span></div>
      <div class="bx" style="margin-bottom:4px">제목</div><div class="bx">날짜 · 시간</div></div>
  </div>`,

  sidepanel: `<div class="pv" style="padding:0">
    <div style="padding:8px 10px"><div class="bx" style="margin-bottom:4px">주문 #1024</div><div class="bx">주문 #1025</div></div>
    <div class="a-slide" style="position:absolute;top:0;bottom:0;right:0;width:60%;background:#fff;padding:8px;box-shadow:-3px 0 10px rgba(0,0,0,0.12)">
      <div class="row" style="margin-bottom:5px"><b class="t b">주문 #1024</b><span class="t s">✕</span></div>
      <div class="t s" style="margin-bottom:3px">결제 완료</div><div class="ln" style="width:85%"></div><div class="ln" style="width:65%"></div></div>
  </div>`,

  lightbox: `<div class="pv" style="background:#111;padding:8px">
    <div class="row" style="color:#fff;font-size:8px;margin-bottom:6px"><span>2 / 8</span><span>✕</span></div>
    <div class="a-pinch" style="margin:0 auto;width:72%;height:52px;border-radius:4px;background:linear-gradient(160deg,#9cc6ff,#2f86f6 60%,#174ea6);animation-name:lbzoom"></div>
    <span style="position:absolute;left:6px;top:50%;color:#fff;font-size:12px">‹</span><span style="position:absolute;right:6px;top:50%;color:#fff;font-size:12px">›</span>
  </div>`,

  splash: `<div class="pv ctr" style="background:var(--blue)">
    <div class="a-bounce" style="width:28px;height:28px;border-radius:8px;background:#fff;display:flex;align-items:center;justify-content:center;color:var(--blue);font-size:15px;font-weight:900">U</div>
    <div class="t b a-fade" style="color:#fff">UI 사전</div>
  </div>`,

  onboarding: `<div class="pv col" style="align-items:center;text-align:center;padding-top:8px">
    <div class="t s" style="align-self:flex-end">건너뛰기</div>
    <div class="a-car hstack" style="gap:0;width:300%;align-self:flex-start;animation-duration:6s">
      <div style="flex:1"><span style="font-size:15px">🗺️</span><div class="t b">코스를 추천해요</div></div>
      <div style="flex:1"><span style="font-size:15px">🎫</span><div class="t b">한 번에 예약해요</div></div>
      <div style="flex:1"><span style="font-size:15px">📸</span><div class="t b">추억을 모아요</div></div></div>
    <div class="bt wide" style="height:16px;margin-top:auto">시작하기</div>
  </div>`,
});
