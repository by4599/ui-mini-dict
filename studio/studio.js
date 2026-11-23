"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const preview = document.getElementById("preview");
    const palettesContainer = document.getElementById("palettes");
    const contrastUl = document.getElementById("contrast");
    const statusEl = document.getElementById("status");
    const STORAGE_KEY = "ui-studio-v1";
    const ROLES = ["bg", "title", "sub", "point"];
    const HEX = /^#[0-9a-f]{6}$/i;

    let currentColors = { bg: "#F7F5F0", title: "#1A1A1A", sub: "#6B6B6B", point: "#C54118" };
    let statusTimer = null;
    let loading = true;

    function setStatus(msg) {
        if (statusTimer) clearTimeout(statusTimer);
        statusEl.textContent = msg;
        statusTimer = setTimeout(() => { statusEl.textContent = ""; }, 3000);
    }

    function contrast(a, b) {
        const getL = (hex) => {
            const ch = [1, 3, 5].map(i => {
                const c = parseInt(hex.slice(i, i + 2), 16) / 255;
                return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
        };
        const l1 = getL(a);
        const l2 = getL(b);
        const max = Math.max(l1, l2);
        const min = Math.min(l1, l2);
        return (max + 0.05) / (min + 0.05);
    }

    function renderContrast(c) {
        contrastUl.replaceChildren();
        const items = [
            { label: "제목 글자", pair: [c.bg, c.title], req: 4.5 },
            { label: "본문 글자", pair: [c.bg, c.sub], req: 4.5 },
            { label: "포인트색", pair: [c.bg, c.point], req: 3 }
        ];
        items.forEach(item => {
            const li = document.createElement("li");
            const ratio = contrast(item.pair[0], item.pair[1]);
            const isOk = ratio >= item.req;
            const span = document.createElement("span");
            span.className = isOk ? "ok" : "bad";
            span.textContent = isOk ? "통과" : "부족";
            li.textContent = `${item.label} ${ratio.toFixed(1)}:1 `;
            li.appendChild(span);
            contrastUl.appendChild(li);
        });
    }

    function applyColors(c) {
        currentColors = { ...c };
        ROLES.forEach(role => {
            preview.style.setProperty("--" + role, c[role]);
            const input = document.querySelector(`input[data-color="${role}"]`);
            if (input) {
                input.value = c[role];
                const code = input.nextElementSibling;
                if (code) code.textContent = c[role].toUpperCase();
            }
        });
        const cPointBg = contrast(c.point, c.bg);
        const cPointTitle = contrast(c.point, c.title);
        preview.style.setProperty("--on-point", cPointBg >= cPointTitle ? c.bg : c.title);
        renderContrast(c);
        markPalette(c);
        if (!loading) save();
    }

    function markPalette(c) {
        document.querySelectorAll(".pal-btn").forEach(btn => {
            const p = JSON.parse(btn.dataset.colors);
            const match = ROLES.every(r => p[r].toLowerCase() === c[r].toLowerCase());
            btn.setAttribute("aria-pressed", String(match));
        });
    }

    function save() {
        try {
            const data = {
                vars: {},
                colors: currentColors,
                texts: {}
            };
            document.querySelectorAll("input[data-var]").forEach(i => {
                data.vars[i.dataset.var] = Number(i.value);
            });
            document.querySelectorAll("[data-edit]").forEach(el => {
                data.texts[el.dataset.edit] = el.textContent;
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) { /* storage blocked */ }
    }

    function load() {
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (stored) {
                if (stored.vars) {
                    document.querySelectorAll("input[data-var]").forEach(i => {
                        const val = stored.vars[i.dataset.var];
                        if (Number.isFinite(val)) {
                            const min = Number(i.min), max = Number(i.max);
                            const clamped = Math.min(Math.max(val, min), max);
                            i.value = clamped;
                            const out = i.closest(".ctl").querySelector("output");
                            if (out) out.textContent = clamped + "px";
                        }
                    });
                }
                if (stored.colors && ROLES.every(r => HEX.test(stored.colors[r]))) {
                    currentColors = stored.colors;
                }
                if (stored.texts) {
                    document.querySelectorAll("[data-edit]").forEach(el => {
                        const txt = stored.texts[el.dataset.edit];
                        if (typeof txt === "string" && txt.length <= 200) {
                            el.textContent = txt;
                        }
                    });
                }
            }
        } catch (e) { }
        loading = false;
        document.querySelectorAll("input[data-var]").forEach(i => {
            i.dispatchEvent(new Event("input"));
        });
        applyColors(currentColors);
    }

    document.querySelectorAll("input[data-var]").forEach(input => {
        input.addEventListener("input", (e) => {
            const val = e.target.value;
            preview.style.setProperty("--" + input.dataset.var, val + "px");
            const out = input.closest(".ctl").querySelector("output");
            if (out) out.textContent = val + "px";
            save();
        });
    });

    document.querySelectorAll("input[data-color]").forEach(input => {
        input.addEventListener("input", (e) => {
            const role = input.dataset.color;
            currentColors[role] = input.value;
            applyColors(currentColors);
        });
    });

    document.querySelectorAll("[data-edit]").forEach(el => {
        el.addEventListener("input", save);
        el.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                el.blur();
            }
        });
        el.addEventListener("paste", (e) => {
            e.preventDefault();
            const text = e.clipboardData.getData("text/plain");
            document.execCommand("insertText", false, text);
        });
    });

    preview.querySelectorAll("a[href='#']").forEach(a => {
        a.addEventListener("click", (e) => e.preventDefault());
    });

    document.getElementById("copyCss").addEventListener("click", () => {
        let css = ":root {\n";
        ROLES.forEach(r => css += `  --${r}: ${currentColors[r]};\n`);
        document.querySelectorAll("input[data-var]").forEach(i => {
            css += `  --${i.dataset.var}: ${i.value}px;\n`;
        });
        css += `  --on-point: ${preview.style.getPropertyValue("--on-point")};\n}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(css).then(() => setStatus("CSS 변수를 복사했어요")).catch(() => setStatus("복사하지 못했어요. 브라우저 권한을 확인해 주세요"));
        } else {
            setStatus("복사하지 못했어요. 브라우저 권한을 확인해 주세요");
        }
    });

    document.getElementById("reset").addEventListener("click", () => {
        if (confirm("모양, 색, 고친 글자를 모두 처음으로 되돌릴까요?")) {
            try {
                localStorage.removeItem(STORAGE_KEY);
                location.reload();
            } catch (e) { }
        }
    });

    const palSearch = document.getElementById("palSearch");
    const palEmpty = document.getElementById("palEmpty");
    const GROUPS = [["classic", "기본 클래식"], ["", "개성 있는 조합"]];

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
        const dark = contrast(p.bg, "#000000") < contrast(p.bg, "#FFFFFF");
        return [p.name, p.group === "classic" ? "클래식 기본 무난" : "개성",
            dark ? "다크 어두운 블랙 밤" : "라이트 밝은 화이트", hueWords(p.point)].join(" ").toLowerCase();
    }

    function filterPalettes() {
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
    }
    palSearch.addEventListener("input", filterPalettes);

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
                    applyColors(pData);
                });
            });
            markPalette(currentColors);
        })
        .catch(() => setStatus("추천 색을 불러오지 못했어요"));

    load();
});
