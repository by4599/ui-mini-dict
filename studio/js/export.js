(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    const S = require("./state.js");
    const C = require("./components.js");
    require("./components-forms.js");
    require("./components-more.js");
    module.exports = factory(S, C);
  } else {
    root.StudioExport = factory(root.StudioState, root.StudioComponents);
  }
})(typeof self !== "undefined" ? self : this, function (S, C) {
  "use strict";

  const CSS_FILES = [
    "css/components.css",
    "css/components-more.css",
    "css/skins-a.css",
    "css/skins-b.css",
    "css/skins-c.css",
    "css/effects.css",
  ];

  function usedClasses(project) {
    const p = S.sanitizeProject(project, C.schema());
    const used = new Set();
    for (const b of p.blocks) {
      const skin = C.get(b.type).skins.find(s => s[0] === b.skin);
      if (skin) {
        used.add(`sk-${b.type}-${b.skin}`);
      }
      if (b.fx) {
        C.fxClasses(b.fx).split(" ").forEach(cls => {
          if (cls) used.add(cls);
        });
      }
    }
    return used;
  }

  function splitTop(text, ch) {
    const parts = [];
    let current = "";
    let depth = 0;
    let bracketDepth = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === "{") depth++;
      else if (char === "}") depth--;
      else if (char === "[") bracketDepth++;
      else if (char === "]") bracketDepth--;

      if (char === ch && depth === 0 && bracketDepth === 0) {
        parts.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    parts.push(current);
    return parts;
  }

  function rules(text) {
    const result = [];
    let start = 0;
    let depth = 0;
    let open = -1;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === "{") {
        if (depth === 0) open = i;
        depth++;
      } else if (char === "}") {
        depth--;
        if (depth === 0 && open >= 0) {
          result.push({
            head: text.slice(start, open).trim(),
            body: text.slice(open + 1, i)
          });
          start = i + 1;
          open = -1;
        }
      }
    }
    return result;
  }

  function pruneCss(css, used) {
    let cleaned = css.replace(/\/\*[\s\S]*?\*\//g, "");
    const rulesList = rules(cleaned);
    const output = [];

    for (const { head, body } of rulesList) {
      if (head.startsWith("@media") || head.startsWith("@container") || head.startsWith("@supports")) {
        const inner = pruneCss(body, used);
        if (inner.trim()) {
          output.push(head + "{" + inner + "}");
        }
      } else if (head.startsWith("@")) {
        output.push(head + "{" + body + "}");
      } else {
        const selectors = splitTop(head, ",").map(s => s.trim());
        const kept = selectors.filter(sel => {
          const matches = sel.match(/\.((?:sk|fx)-[a-z0-9-]+)/g);
          if (!matches) return true;
          return matches.every(m => used.has(m.replace(/\./, "")));
        });
        if (kept.length > 0) {
          output.push(kept.join(", ") + "{" + body + "}");
        }
      }
    }
    return output.join("\n");
  }

  function buildHtml(project, cssText) {
    const p = S.sanitizeProject(project, C.schema());
    const used = usedClasses(p);
    const pruned = pruneCss(String(cssText || ""), used).replace(/</g, "\\3c ");
    const blocks = p.blocks.map(C.renderBlock).join("\n");
    const themeVars = S.themeVars(p.theme);

    return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>내가 만든 화면</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css">
<style>
body{margin:0}.pv{min-height:100vh}
${pruned}
</style>
</head>
<body>
<main class="pv" style="${themeVars}">
${blocks}
</main>
</body>
</html>`;
  }

  function fetchCss() {
    return Promise.all(CSS_FILES.map(f => 
      fetch(f).then(r => {
        if (!r.ok) throw new Error("css " + f);
        return r.text();
      })
    )).then(a => a.join("\n"));
  }

  function download(name, text, mime) {
    const blob = new Blob([text], { type: mime + ";charset=utf-8" });
    const a = document.createElement("a");
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return {
    CSS_FILES,
    usedClasses,
    pruneCss,
    buildHtml,
    fetchCss,
    download
  };
});
