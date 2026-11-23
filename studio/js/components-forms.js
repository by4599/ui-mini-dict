(function (root, factory) {
    factory(typeof module === "object" && module.exports ? require("./components.js") : root.StudioComponents);
})(typeof self !== "undefined" ? self : this, function (C) {
    "use strict";
    Object.values({
        chips: {
            type: "chips",
            label: "칩·뱃지",
            skins: [["outline", "외곽선"], ["fill", "채움"], ["soft", "연한 바탕"], ["dot", "점 표시"], ["tag", "각진 태그"], ["shadow", "그림자"]],
            texts: {
                "chip-f1": "긴급",
                "chip-f2": "중요",
                "chip-f3": "대기"
            },
            render: function (h) {
                const id = h.id;
                return `<div class="pv-chips">
    <span class="pv-chip-f on" ${h.k("chip-f1")}>${h.t("chip-f1")}</span>
    <span class="pv-chip-f" ${h.k("chip-f2")}>${h.t("chip-f2")}</span>
    <span class="pv-chip-f" ${h.k("chip-f3")}>${h.t("chip-f3")}</span>
</div>`;
            }
        },
        switch: {
            type: "switch",
            label: "스위치",
            skins: [["basic", "기본"], ["ios", "iOS형"], ["square", "각진"]],
            texts: {
                "switch-text": "알림 받기",
                "sw-c1": "마감 하루 전",
                "sw-c2": "댓글이 달리면"
            },
            render: function (h) {
                const id = h.id;
                return `<div class="pv-switch-wrap">
    <label class="pv-switch">
        <input type="checkbox" checked>
        <span class="pv-knob"></span>
        <span ${h.k("switch-text")}>${h.t("switch-text")}</span>
    </label>
    <div class="pv-field">
        <label class="pv-check"><input type="checkbox" checked><span ${h.k("sw-c1")}>${h.t("sw-c1")}</span></label>
        <label class="pv-check"><input type="checkbox"><span ${h.k("sw-c2")}>${h.t("sw-c2")}</span></label>
    </div>
</div>`;
            }
        },
        list: {
            type: "list",
            label: "목록",
            skins: [["lines", "선"], ["cards", "카드형"], ["zebra", "줄무늬"], ["plain", "미니멀"]],
            texts: {
                "list-1": "디자인 시안 검토",
                "badge-1": "진행 중",
                "list-2": "출시 일정 공유",
                "badge-2": "완료",
                "list-3": "고객 인터뷰 정리",
                "badge-3": "대기"
            },
            render: function (h) {
                return `<ul class="pv-list">
    <li>
        <span ${h.k("list-1")}>${h.t("list-1")}</span>
        <span class="pv-badge" ${h.k("badge-1")}>${h.t("badge-1")}</span>
    </li>
    <li>
        <span ${h.k("list-2")}>${h.t("list-2")}</span>
        <span class="pv-badge" ${h.k("badge-2")}>${h.t("badge-2")}</span>
    </li>
    <li>
        <span ${h.k("list-3")}>${h.t("list-3")}</span>
        <span class="pv-badge" ${h.k("badge-3")}>${h.t("badge-3")}</span>
    </li>
</ul>`;
            }
        },
        toast: {
            type: "toast",
            label: "토스트·스낵바",
            skins: [["dark", "어두운"], ["light", "밝은+그림자"], ["point", "포인트색"], ["accent", "왼쪽 강조선"]],
            texts: {
                "toast-text": "저장했어요",
                "toast-btn": "되돌리기"
            },
            render: function (h) {
                return `<div class="pv-toast">
    <span ${h.k("toast-text")}>${h.t("toast-text")}</span>
    <button type="button" ${h.k("toast-btn")}>${h.t("toast-btn")}</button>
</div>`;
            }
        },
        settings: {
            type: "settings",
            label: "설정 폼",
            skins: [["card", "카드"], ["plain", "평면"], ["line", "구분선"], ["compact", "촘촘"]],
            texts: {
                "set-h": "프로젝트 설정",
                "set-scope": "공개 범위",
                "set-noti": "알림",
                "set-c1": "마감 하루 전",
                "set-c2": "댓글이 달리면",
                "set-view": "기본 보기",
                "set-r1": "목록",
                "set-r2": "달력",
                "set-range": "하루 목표 업무 수",
                "prog-label": "프로필 완성도"
            },
            render: function (h) {
                const id = h.id;
                return `<div class="pv-split">
    <article class="pv-card">
        <h3 ${h.k("set-h")}>${h.t("set-h")}</h3>
        <label class="pv-label" for="sc-${id}" ${h.k("set-scope")}>${h.t("set-scope")}</label>
        <select id="sc-${id}" class="pv-input pv-select">
            <option>팀원만</option><option>회사 전체</option><option>링크가 있는 사람</option>
        </select>
        <fieldset class="pv-field">
            <legend ${h.k("set-noti")}>${h.t("set-noti")}</legend>
            <label class="pv-check"><input type="checkbox" checked><span ${h.k("set-c1")}>${h.t("set-c1")}</span></label>
            <label class="pv-check"><input type="checkbox"><span ${h.k("set-c2")}>${h.t("set-c2")}</span></label>
        </fieldset>
        <fieldset class="pv-field">
            <legend ${h.k("set-view")}>${h.t("set-view")}</legend>
            <label class="pv-check"><input type="radio" name="view-${id}" checked><span ${h.k("set-r1")}>${h.t("set-r1")}</span></label>
            <label class="pv-check"><input type="radio" name="view-${id}"><span ${h.k("set-r2")}>${h.t("set-r2")}</span></label>
        </fieldset>
        <label class="pv-label" for="rg-${id}" ${h.k("set-range")}>${h.t("set-range")}</label>
        <input id="rg-${id}" class="pv-range" type="range" min="1" max="10" value="4">
        <div class="pv-progress-head"><span ${h.k("prog-label")}>${h.t("prog-label")}</span><b>70%</b></div>
        <div class="pv-progress" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" aria-label="${h.t("prog-label")}"><i></i></div>
    </article>
</div>`;
            }
        },
        team: {
            type: "team",
            label: "팀·자주 묻는 질문",
            skins: [["card", "카드"], ["plain", "평면"], ["boxed", "상자형 질문"], ["line", "구분선"]],
            texts: {
                "team-h": "팀",
                "team-text": "7명이 함께 보고 있어요",
                "faq1-q": "팀원은 몇 명까지 초대할 수 있나요?",
                "faq1-a": "무료 요금제는 10명까지, 팀 요금제는 제한이 없어요.",
                "faq2-q": "다른 도구에서 옮겨 올 수 있나요?",
                "faq2-a": "엑셀과 CSV 파일을 그대로 불러올 수 있어요."
            },
            render: function (h) {
                return `<div class="pv-split">
    <article class="pv-card">
        <h3 ${h.k("team-h")}>${h.t("team-h")}</h3>
        <div class="pv-avatars">
            <span class="pv-avatar">민</span><span class="pv-avatar">서</span><span class="pv-avatar">J</span><span class="pv-avatar">현</span><span class="pv-avatar pv-more">+3</span>
            <span class="pv-avatars-text" ${h.k("team-text")}>${h.t("team-text")}</span>
        </div>
        <details class="pv-acc" open>
            <summary><span ${h.k("faq1-q")}>${h.t("faq1-q")}</span></summary>
            <p ${h.k("faq1-a")}>${h.t("faq1-a")}</p>
        </details>
        <details class="pv-acc">
            <summary><span ${h.k("faq2-q")}>${h.t("faq2-q")}</span></summary>
            <p ${h.k("faq2-a")}>${h.t("faq2-a")}</p>
        </details>
        <div class="pv-skeleton" aria-label="불러오는 중" role="status"><i></i><i></i><i></i></div>
    </article>
</div>`;
            }
        },
        table: {
            type: "table",
            label: "표",
            skins: [["lines", "선"], ["zebra", "줄무늬"], ["grid", "격자"], ["rows", "카드형 행"], ["minimal", "미니멀"]],
            texts: {
                "th-1": "업무",
                "th-2": "담당",
                "th-3": "마감",
                "th-4": "상태",
                "td-1a": "랜딩 페이지 문구",
                "td-1b": "김민지",
                "td-1d": "진행 중",
                "td-2a": "결제 화면 점검",
                "td-2b": "박서준",
                "td-2d": "대기",
                "td-3a": "릴리스 노트",
                "td-3b": "이현",
                "td-3d": "완료"
            },
            render: function (h) {
                return `<div class="pv-table-wrap">
    <table class="pv-table">
        <thead><tr><th ${h.k("th-1")}>${h.t("th-1")}</th><th ${h.k("th-2")}>${h.t("th-2")}</th><th ${h.k("th-3")}>${h.t("th-3")}</th><th ${h.k("th-4")}>${h.t("th-4")}</th></tr></thead>
        <tbody>
            <tr><td ${h.k("td-1a")}>${h.t("td-1a")}</td><td ${h.k("td-1b")}>${h.t("td-1b")}</td><td>11.28</td><td><span class="pv-badge pv-badge-on" ${h.k("td-1d")}>${h.t("td-1d")}</span></td></tr>
            <tr><td ${h.k("td-2a")}>${h.t("td-2a")}</td><td ${h.k("td-2b")}>${h.t("td-2b")}</td><td>12.02</td><td><span class="pv-badge" ${h.k("td-2d")}>${h.t("td-2d")}</span></td></tr>
            <tr><td ${h.k("td-3a")}>${h.t("td-3a")}</td><td ${h.k("td-3b")}>${h.t("td-3b")}</td><td>12.05</td><td><span class="pv-badge" ${h.k("td-3d")}>${h.t("td-3d")}</span></td></tr>
        </tbody>
    </table>
    <nav class="pv-pages" aria-label="페이지">
        <button type="button" aria-label="이전 페이지">‹</button><button type="button" class="on" aria-current="page">1</button><button type="button">2</button><button type="button">3</button><button type="button" aria-label="다음 페이지">›</button>
    </nav>
</div>`;
            }
        },
        modal: {
            type: "modal",
            label: "모달",
            skins: [["center", "가운데 창"], ["sheet", "하단 시트형"], ["danger", "경고"], ["full", "전체 화면형"]],
            texts: {
                "modal-h": "업무를 삭제할까요?",
                "modal-p": "삭제한 업무는 30일 동안 휴지통에 보관돼요.",
                "modal-no": "취소",
                "modal-yes": "삭제하기"
            },
            render: function (h) {
                const id = h.id;
                return `<div class="pv-modal-wrap">
    <div class="pv-modal" role="dialog" aria-modal="false" aria-labelledby="mt-${id}">
        <h3 id="mt-${id}" ${h.k("modal-h")}>${h.t("modal-h")}</h3>
        <p ${h.k("modal-p")}>${h.t("modal-p")}</p>
        <div class="pv-row">
            <a class="pv-btn pv-secondary" href="#" ${h.k("modal-no")}>${h.t("modal-no")}</a>
            <a class="pv-btn pv-primary" href="#" ${h.k("modal-yes")}>${h.t("modal-yes")}</a>
        </div>
    </div>
</div>`;
            }
        }
    }).forEach(C.register);
});
