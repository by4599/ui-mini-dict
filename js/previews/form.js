/* 입력 폼 · AI 화면 */
window.PV = Object.assign(window.PV || {}, {
  textfield: `<div class="pv col">
    <div class="t s">닉네임</div>
    <div class="bx" style="border-color:var(--green);border-width:1.5px;font-weight:700">새벽러너</div>
    <div class="t a-fade" style="font-size:7.5px;color:var(--green);font-weight:700">사용할 수 있어요</div>
  </div>`,

  select: `<div class="pv col">
    <div class="t s">배송 메모</div>
    <div class="bx" style="font-weight:700">문 앞에 놔주세요<span style="color:var(--gray);font-size:7px">▼</span></div>
    <div class="a-fade" style="border-radius:6px;box-shadow:0 3px 10px rgba(0,0,0,0.12);overflow:hidden;font-size:8px">
      <div style="padding:3px 8px;background:var(--blue-soft);color:var(--blue);font-weight:700">문 앞에 놔주세요</div><div style="padding:3px 8px">경비실에 맡겨주세요</div></div>
  </div>`,

  segmented: `<div class="pv col" style="justify-content:center">
    <div class="t s">보기 방식</div>
    <div style="position:relative;display:flex;background:var(--well);border-radius:99px;padding:2px;font-size:8px">
      <i class="a-seg" style="position:absolute;left:2px;top:2px;bottom:2px;width:calc(33.3% - 1.3px);background:#fff;border-radius:99px;box-shadow:0 1px 3px rgba(0,0,0,0.1)"></i>
      <span style="flex:1;text-align:center;padding:4px 0;position:relative;font-weight:700">일</span><span style="flex:1;text-align:center;padding:4px 0;position:relative;color:var(--gray)">주</span><span style="flex:1;text-align:center;padding:4px 0;position:relative;color:var(--gray)">월</span>
    </div>
  </div>`,

  switch: `<div class="pv row">
    <div><div class="t b">야간 모드</div><div class="t s">밤 10시부터 화면을 어둡게</div></div>
    <div class="a-swon" style="flex:none;width:28px;height:16px;border-radius:99px;padding:2px"><i class="a-knob" style="display:block;width:12px;height:12px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,0.2)"></i></div>
  </div>`,

  checkbox: `<div class="pv col" style="justify-content:center">
    <div class="hstack t"><span class="chk on">✓</span>충전기</div>
    <div class="hstack t"><span class="chk on">✓</span>우산</div>
    <div class="hstack t"><span class="chk">✓</span>보조배터리</div>
    <div class="t bl b" style="font-size:7.5px">2개 챙김</div>
  </div>`,

  radio: `<div class="pv col" style="justify-content:center">
    <div class="t s">결제 수단</div>
    <div class="hstack t"><span class="rad"></span>카드</div>
    <div class="hstack t"><span class="rad on"></span>계좌이체</div>
    <div class="hstack t"><span class="rad"></span>휴대폰</div>
  </div>`,

  slider: `<div class="pv col" style="justify-content:center">
    <div class="row"><span class="t">최대 금액</span><span class="t b bl">5만 원</span></div>
    <div style="position:relative;height:12px;display:flex;align-items:center">
      <div class="track" style="flex:1"><i class="a-fill"></i></div>
      <i class="a-thumb" style="position:absolute;top:0;width:12px;height:12px;margin-left:-6px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.25)"></i>
    </div>
    <div class="row t s"><span>0원</span><span>10만 원</span></div>
  </div>`,

  stepper: `<div class="pv col" style="justify-content:center">
    <div class="t s">인원</div>
    <div class="bx" style="padding:5px 10px"><b style="color:var(--gray);font-size:11px">−</b><b style="font-size:13px">2명</b><b class="a-press" style="color:var(--blue);font-size:11px;animation-name:blink;animation-duration:1.6s">+</b></div>
  </div>`,

  datepicker: `<div class="pv" style="padding:8px 10px">
    <div class="row" style="margin-bottom:4px"><b class="t b">체크인</b><b class="t bl b">12월 6일</b></div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px 0;text-align:center;font-size:7px;color:var(--ink2)">
      <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span style="background:var(--blue);color:#fff;border-radius:99px;font-weight:700" class="a-bounce">6</span><span>7</span>
      <span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span>
      <span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span></div>
  </div>`,

  thinking: `<div class="pv gray col" style="gap:8px">
    <div style="align-self:flex-end"><span class="pill bl">오늘 저녁 뭐 먹지?</span></div>
    <div class="hstack" style="background:#fff;border-radius:99px;padding:5px 8px;align-self:flex-start;gap:3px">
      <i class="a-blink" style="width:4px;height:4px;border-radius:50%;background:var(--gray)"></i><i class="a-blink d1" style="width:4px;height:4px;border-radius:50%;background:var(--gray)"></i><i class="a-blink d2" style="width:4px;height:4px;border-radius:50%;background:var(--gray)"></i></div>
  </div>`,

  streaming: `<div class="pv gray col">
    <div style="align-self:flex-end"><span class="pill bl">부산 맛집 추천</span></div>
    <div style="background:#fff;border-radius:6px;padding:5px 7px;width:78%"><div class="t a-type" style="white-space:nowrap">국밥 골목부터 가 볼까요</div></div>
    <div class="abs" style="right:10px;bottom:8px;width:16px;height:16px;border-radius:5px;background:var(--ink);display:flex;align-items:center;justify-content:center"><i style="width:5px;height:5px;background:#fff;border-radius:1px"></i></div>
  </div>`,

  suggested: `<div class="pv gray col">
    <div class="t b" style="margin-bottom:2px">무엇이든 물어보세요</div>
    <div class="hstack" style="flex-wrap:wrap;gap:4px"><span class="pill a-stag">메일 다듬기</span><span class="pill a-stag d1">회의록 요약</span><span class="pill a-stag d2">여행 일정 짜기</span></div>
  </div>`,

  regenerate: `<div class="pv gray col">
    <div style="background:#fff;border-radius:6px;padding:6px 7px"><div class="ln a-shimmer" style="width:90%"></div><div class="ln a-shimmer" style="width:70%;margin:0"></div></div>
    <div class="row t s"><span class="hstack" style="color:var(--ink2)"><span class="a-spin" style="display:inline-block;animation-duration:2.4s">↻</span>다시 만들기</span><span>‹ 2/2 ›</span></div>
  </div>`,

  citations: `<div class="pv gray col" style="justify-content:center">
    <div style="background:#fff;border-radius:6px;padding:5px 7px;font-size:8px">환불은 7일 안에 가능해요 <span class="pill bl" style="height:11px;padding:0 4px">1</span></div>
    <div class="a-pop hstack" style="background:#fff;border-radius:6px;padding:5px 7px;box-shadow:0 2px 8px rgba(0,0,0,0.1);gap:6px">
      <i style="width:12px;height:12px;border-radius:3px;background:var(--blue)"></i><div><div class="t b" style="font-size:8px">환불 정책</div><div class="t s">help.example.com</div></div></div>
  </div>`,

  feedback: `<div class="pv gray col">
    <div style="background:#fff;border-radius:6px;padding:6px 7px"><div class="ln" style="width:90%"></div><div class="ln" style="width:65%;margin:0"></div></div>
    <div class="hstack" style="gap:6px;font-size:10px"><span class="a-bounce">👍</span><span style="opacity:0.5">👎</span></div>
    <div class="a-pop" style="align-self:center"><span class="toastbox">의견 고마워요</span></div>
  </div>`,

  editprompt: `<div class="pv gray col">
    <div class="row"><span style="font-size:9px">✎</span><span class="pill bl">더 짧게 써줘</span></div>
    <div style="background:#fff;border:1.5px solid var(--blue);border-radius:7px;padding:5px 7px">
      <div class="t" style="margin-bottom:4px">세 줄로만 정리해줘<span class="a-blink" style="color:var(--blue)">|</span></div>
      <div class="hstack" style="justify-content:flex-end"><span class="bt gr" style="height:13px;padding:0 6px">취소</span><span class="bt" style="height:13px;padding:0 6px">보내기</span></div></div>
  </div>`,

  attachment: `<div class="pv gray col" style="justify-content:space-between">
    <div class="hstack" style="background:#fff;border-radius:6px;padding:5px 7px;gap:6px;width:80%">
      <span style="flex:none;width:14px;height:16px;border-radius:3px;background:var(--red);color:#fff;font-size:5px;font-weight:800;display:flex;align-items:center;justify-content:center">PDF</span>
      <div style="flex:1"><div class="t b" style="font-size:8px">견적서.pdf</div><div class="track" style="height:3px;margin-top:3px"><i class="a-grow" style="--w:80%"></i></div></div></div>
    <div class="bx" style="border-radius:99px;color:var(--gray2)">📎 메시지 입력</div>
  </div>`,

  agentsteps: `<div class="pv col" style="justify-content:center;gap:4px">
    <div class="hstack t"><span class="ic gn" style="width:10px;height:10px;font-size:6px">✓</span>항공권 검색하기</div>
    <div class="hstack t"><span class="ic gn" style="width:10px;height:10px;font-size:6px">✓</span>가격 비교하기</div>
    <div class="hstack t"><span class="spinner a-spin" style="width:10px;height:10px;border-width:2px"></span>숙소 찾는 중</div>
    <div class="hstack t s"><span class="rad" style="width:10px;height:10px"></span>일정표 보내기</div>
  </div>`,
});
