/* 알림과 피드백 · 로딩 */
window.PV = Object.assign(window.PV || {}, {
  toast: `<div class="pv">
    <div class="ln dk" style="width:55%"></div><div class="ln" style="width:80%"></div><div class="ln" style="width:65%"></div>
    <div class="bt wide" style="margin-top:8px">담기</div>
    <div class="abs a-pop" style="left:0;right:0;bottom:8px;text-align:center"><span class="toastbox">장바구니에 담았어요</span></div>
  </div>`,

  snackbar: `<div class="pv">
    <div class="bx">제주 2박 3일 여행</div>
    <div class="abs a-up" style="left:6px;right:6px;bottom:6px;background:var(--ink);color:#fff;border-radius:6px;padding:6px 8px;display:flex;justify-content:space-between;font-size:8px">
      <span>여행을 삭제했어요</span><b style="color:#63a5f8">되돌리기</b></div>
  </div>`,

  banner: `<div class="pv" style="padding:0">
    <div class="a-down row" style="background:var(--blue-soft);padding:6px 8px;font-size:8px;color:var(--blue);font-weight:700">
      <span class="hstack"><span class="ic bl" style="width:11px;height:11px;font-size:7px;background:var(--blue);color:#fff">!</span>배송이 하루 늦어져요</span><span style="color:var(--gray)">✕</span></div>
    <div style="padding:8px 12px"><div class="ln dk" style="width:55%"></div><div class="ln" style="width:85%"></div><div class="ln" style="width:70%"></div></div>
  </div>`,

  modal: `<div class="pv dim">
    <div class="ln" style="width:50%;background:#6e6e73"></div>
    <div class="dialog a-zin">
      <div class="t b" style="font-size:9.5px">구독을 시작할까요?</div>
      <div class="t s" style="margin:2px 0 6px">다음 달부터 매월 결제돼요</div>
      <div class="hstack"><div class="bt gr" style="flex:1">취소</div><div class="bt" style="flex:1">시작</div></div>
    </div>
  </div>`,

  bottomsheet: `<div class="pv dim" style="background:#aeaeb2">
    <div class="ln" style="width:60%;background:#8e8e93"></div>
    <div class="sheet a-up">
      <div class="t" style="margin-bottom:4px">링크 복사</div><div class="t" style="margin-bottom:4px">즐겨찾기</div><div class="t rd">신고하기</div>
    </div>
  </div>`,

  inlineerror: `<div class="pv col">
    <div class="t s">비밀번호</div>
    <div class="bx a-shake" style="border-color:var(--red);border-width:1.5px;font-weight:700">••••</div>
    <div class="t rd a-fade" style="font-size:7.5px">8자 이상 입력해 주세요</div>
  </div>`,

  tooltip: `<div class="pv">
    <div class="a-pop" style="display:inline-block;background:var(--ink);color:#fff;font-size:7.5px;font-weight:600;padding:4px 7px;border-radius:5px;position:relative;margin-bottom:6px">지난 30일 걸음 수 평균이에요
      <i style="position:absolute;left:14px;bottom:-3px;width:6px;height:6px;background:var(--ink);transform:rotate(45deg)"></i></div>
    <div class="hstack t" style="color:var(--ink2)">하루 평균 걸음 <span class="ic bl" style="width:11px;height:11px;font-size:7px;border:1px solid var(--blue);background:#fff">i</span></div>
    <div class="t big" style="margin-top:2px">8,420</div>
  </div>`,

  coachmark: `<div class="pv dim" style="background:#636366">
    <div class="ln" style="width:55%;background:#8e8e93"></div><div class="ln" style="width:75%;background:#7c7c80"></div>
    <div class="a-fade abs" style="left:12px;top:40px;color:#fff">
      <div class="t b" style="color:#fff;margin-bottom:4px">새 글은 여기서 써요</div><span class="pill" style="font-weight:700">확인</span></div>
    <div class="abs" style="right:10px;bottom:10px;width:30px;height:30px;border-radius:50%;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 0 0 5px rgba(255,255,255,0.25)">+</div>
  </div>`,

  badge: `<div class="pv ctr">
    <div class="hstack" style="gap:22px;font-size:17px">
      <span style="position:relative">🔔<span class="dotn a-bounce" style="right:-6px;top:-4px">5</span></span>
      <span style="position:relative">💬<span class="dotn" style="right:-2px;top:-1px;min-width:6px;width:6px;height:6px;padding:0"></span></span>
    </div>
    <div class="t b">읽지 않은 소식 5개</div>
  </div>`,

  spinner: `<div class="pv ctr"><div class="spinner a-spin"></div><div class="t s">잠시만 기다려 주세요</div></div>`,

  skeleton: `<div class="pv col" style="gap:7px">
    <div class="hstack" style="gap:8px"><div class="blk a-shimmer" style="width:22px;height:22px"></div><div style="flex:1"><div class="ln a-shimmer" style="width:85%"></div><div class="ln a-shimmer" style="width:55%;margin:0"></div></div></div>
    <div class="hstack" style="gap:8px"><div class="blk a-shimmer" style="width:22px;height:22px"></div><div style="flex:1"><div class="ln a-shimmer" style="width:85%"></div><div class="ln a-shimmer" style="width:55%;margin:0"></div></div></div>
  </div>`,

  progressbar: `<div class="pv col" style="justify-content:center">
    <div class="t b">영상 올리는 중</div>
    <div class="row"><div class="track" style="flex:1"><i class="a-grow" style="--w:74%"></i></div><span class="t b">74%</span></div>
    <div class="t s">약 20초 남았어요</div>
  </div>`,

  progressring: `<div class="pv ctr" style="flex-direction:row;gap:10px">
    <svg width="40" height="40" viewBox="0 0 36 36"><circle cx="18" cy="18" r="14" fill="none" stroke="#e5e5ea" stroke-width="4"/>
      <circle class="a-ring" cx="18" cy="18" r="14" fill="none" stroke="#2f86f6" stroke-width="4" stroke-linecap="round" stroke-dasharray="88" transform="rotate(-90 18 18)"/></svg>
    <div style="text-align:left"><div class="t s">이번 주 운동 목표</div><div class="t b">4회 중 3회</div></div>
  </div>`,

  stepindicator: `<div class="pv col" style="justify-content:center">
    <div class="row"><span class="t b">배송지 입력</span><span class="t b">2 / 3</span></div>
    <div class="hstack" style="gap:3px"><div class="track" style="flex:1"><i style="width:100%"></i></div><div class="track" style="flex:1"><i class="a-grow" style="--w:100%"></i></div><div class="track" style="flex:1"></div></div>
    <div class="row t s"><span>상품</span><span style="color:var(--ink);font-weight:700">배송지</span><span>결제</span></div>
  </div>`,

  buttonloading: `<div class="pv col" style="justify-content:center">
    <div class="ln dk" style="width:50%"></div><div class="ln" style="width:75%"></div>
    <div class="bt wide" style="opacity:0.55;height:20px;margin-top:6px"><span class="spinner w a-spin"></span>보내는 중</div>
  </div>`,

  progressiveimage: `<div class="pv" style="padding:0">
    <div class="a-blur" style="position:absolute;inset:0;background:linear-gradient(160deg,#9cc6ff 0%,#2f86f6 55%,#174ea6 100%)">
      <div style="position:absolute;left:18%;bottom:0;width:0;height:0;border-left:28px solid transparent;border-right:28px solid transparent;border-bottom:40px solid #e8f1fe"></div>
      <div style="position:absolute;right:20%;top:16px;width:14px;height:14px;border-radius:50%;background:#fec833"></div>
    </div>
  </div>`,

  optimistic: `<div class="pv col" style="justify-content:center">
    <div class="bx"><span>오늘의 레시피</span><span class="a-heart" style="color:var(--red);font-size:11px">♥</span></div>
    <div class="t s">누르자마자 하트가 채워져요</div>
  </div>`,

  toploadingbar: `<div class="pv" style="padding:0">
    <div class="a-grow" style="--w:100%;height:3px;background:var(--blue);border-radius:0 2px 2px 0"></div>
    <div style="padding:10px 12px"><div class="ln dk" style="width:50%"></div><div class="ln" style="width:85%"></div><div class="ln" style="width:70%"></div><div class="ln" style="width:80%"></div></div>
  </div>`,
});
