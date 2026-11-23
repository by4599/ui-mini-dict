(function () { "use strict";
const S = window.StudioState;

const ROLES = ["bg", "title", "sub", "point"];
const HEX = /^#[0-9a-f]{6}$/i;

function hueWords(hex) {
    const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
    const max = Math.max(r, g, b), d = max - Math.min(r, g, b);
    if (d < 0.12) return "무채색 블랙 화이트 그레이 모노";
    const h = ((max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4) * 60 + 360) % 360;
    if (h < 15 || h >= 340) return "레드 빨강";
    if (h < 45) return "오렌지 주황 코랄";
    if (h < 70) return "옐로 노랑 골드 머스타드";
    if (h < 170) return "그린 초록 민트";
    if (h < 200) return "청록 틸 시안";
    if (h < 250) return "블루 파랑 네이비";
    if (h < 290) return "퍼플 보라 라벤더";
    return "핑크 분홍 로즈";
}

function searchText(p) {
    const dark = S.contrast(p.bg, "#000000") < S.contrast(p.bg, "#FFFFFF");
    return [p.name, p.group === "classic" ? "클래식 기본 무난" : "개성",
        dark ? "다크 어두운 블랙 밤" : "라이트 밝은 화이트", hueWords(p.point)].join(" ").toLowerCase();
}

function markPalette(c) {
    document.querySelectorAll(".pal-btn").forEach(btn => {
        const p = JSON.parse(btn.dataset.colors);
        const match = ROLES.every(r => p[r].toLowerCase() === c[r].toLowerCase());
        btn.setAttribute("aria-pressed", String(match));
    });
}

function renderContrast(c) {
    const contrastUl = document.getElementById("contrast");
    if (!contrastUl) return;
    contrastUl.replaceChildren();
    const items = [
        { label: "제목 글자", pair: [c.bg, c.title], req: 4.5 },
        { label: "본문 글자", pair: [c.bg, c.sub], req: 4.5 },
        { label: "포인트색", pair: [c.bg, c.point], req: 3 }
    ];
    items.forEach(item => {
        const li = document.createElement("li");
        const ratio = S.contrast(item.pair[0], item.pair[1]);
        const isOk = ratio >= item.req;
        const span = document.createElement("span");
        span.className = isOk ? "ok" : "bad";
        span.textContent = isOk ? "통과" : "부족";
        li.textContent = `${item.label} ${ratio.toFixed(1)}:1 `;
        li.appendChild(span);
        contrastUl.appendChild(li);
    });
}

window.StudioThemePanel = {
    init(ctx) {
        const { store, say } = ctx;
        const palettesContainer = document.getElementById("palettes");
        const palSearch = document.getElementById("palSearch");
        const palEmpty = document.getElementById("palEmpty");
        const GROUPS = [["classic", "기본 클래식"], ["", "개성 있는 조합"]];
        const byCss = Object.fromEntries(S.VARS.map(v => [v.css, v]));

        const sync = (theme) => {
            const colors = theme.colors || {};
            const vars = theme.vars || {};
            
            document.querySelectorAll("input[data-var]").forEach(input => {
                const v = byCss[input.dataset.var];
                if (v && vars[v.key] !== undefined) {
                    input.value = vars[v.key];
                    const out = input.closest(".ctl").querySelector("output");
                    if (out) out.textContent = vars[v.key] + "px";
                }
            });

            document.querySelectorAll("input[data-color]").forEach(input => {
                const role = input.dataset.color;
                if (colors[role]) {
                    input.value = colors[role].toLowerCase();
                    const code = input.nextElementSibling;
                    if (code) code.textContent = colors[role].toUpperCase();
                }
            });

            renderContrast(colors);
            markPalette(colors);
        };

        document.querySelectorAll("input[data-var]").forEach(input => {
            input.addEventListener("input", (e) => {
                const val = Number(e.target.value);
                const v = byCss[input.dataset.var];
                if (!v) return;
                store.set(S.setTheme(store.get(), { vars: { [v.key]: val } }), "theme");
                const out = input.closest(".ctl").querySelector("output");
                if (out) out.textContent = val + "px";
            });
        });

        document.querySelectorAll("input[data-color]").forEach(input => {
            input.addEventListener("input", (e) => {
                const role = input.dataset.color;
                store.set(S.setTheme(store.get(), { colors: { [role]: e.target.value.toUpperCase() } }), "theme");
            });
        });

        palSearch.addEventListener("input", () => {
            const words = palSearch.value.toLowerCase().split(/\s+/).filter(Boolean);
            let shown = 0;
            palettesContainer.querySelectorAll(".pal-btn").forEach(btn => {
                btn.hidden = !words.every(w => btn.dataset.search.includes(w));
                if (!btn.hidden) shown++;
            });
            palettesContainer.querySelectorAll(".pal-group").forEach(h => {
                h.hidden = !palettesContainer.querySelector(`.pal-btn[data-group="${h.dataset.group}"]:not([hidden])`);
            });
            palEmpty.hidden = shown > 0;
        });

        document.getElementById("copyCss").addEventListener("click", () => {
            const theme = store.get().theme;
            const css = ":root {\n" + 
                S.themeVars(theme).split(";").map(x => "  " + x.replace(":", ": ") + ";").join("\n") + 
                "\n}";
            if (navigator.clipboard?.writeText) {
                navigator.clipboard.writeText(css).then(() => say("CSS 변수를 복사했어요"))
                    .catch(() => say("복사하지 못했어요. 브라우저 권한을 확인해 주세요"));
            } else {
                say("복사하지 못했어요. 브라우저 권한을 확인해 주세요");
            }
        });

        fetch("palettes.json")
            .then(r => r.json())
            .then(data => {
                const valid = data.filter(p => p.name && ROLES.every(r => p[r] && HEX.test(p[r])));
                const ordered = GROUPS.flatMap(([key, label]) => {
                    const items = valid.filter(p => (p.group === "classic" ? "classic" : "") === key);
                    return items.length ? [{ heading: label, key }, ...items] : [];
                });
                ordered.forEach(p => {
                    if (p.heading) {
                        const h = document.createElement("p");
                        h.className = "pal-group";
                        h.dataset.group = p.key;
                        h.textContent = p.heading;
                        palettesContainer.appendChild(h);
                        return;
                    }
                    const btn = document.createElement("button");
                    btn.className = "pal-btn";
                    btn.type = "button";
                    btn.setAttribute("aria-pressed", "false");
                    btn.dataset.colors = JSON.stringify(p);
                    btn.dataset.group = p.group === "classic" ? "classic" : "";
                    btn.dataset.search = searchText(p);
                    const swWrap = document.createElement("span");
                    swWrap.className = "pal-sw";
                    ROLES.forEach(r => {
                        const s = document.createElement("i");
                        s.style.backgroundColor = p[r];
                        swWrap.appendChild(s);
                    });
                    btn.appendChild(swWrap);
                    const name = document.createElement("span");
                    name.className = "pal-name";
                    name.textContent = p.name;
                    btn.appendChild(name);
                    palettesContainer.appendChild(btn);
                    btn.addEventListener("click", () => {
                        const pData = JSON.parse(btn.dataset.colors);
                        store.set(S.setTheme(store.get(), { colors: { bg: pData.bg, title: pData.title, sub: pData.sub, point: pData.point } }), "theme");
                    });
                });
                sync(store.get().theme);
            })
            .catch(() => say("추천 색을 불러오지 못했어요"));

        store.on((kind) => {
            if (kind === "theme" || kind === "load") sync(store.get().theme);
        });
        sync(store.get().theme);
    }
};
})();
