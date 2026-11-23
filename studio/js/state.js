(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.StudioState = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const VARS = [
    { key: "radius", css: "radius", min: 0, max: 32, def: 12 },
    { key: "btnH", css: "btn-h", min: 32, max: 64, def: 44 },
    { key: "btnPx", css: "btn-px", min: 10, max: 40, def: 20 },
    { key: "fs", css: "fs", min: 13, max: 19, def: 15 },
    { key: "h1", css: "h1", min: 24, max: 64, def: 40 },
    { key: "gap", css: "gap", min: 8, max: 40, def: 20 },
    { key: "bw", css: "bw", min: 0, max: 3, def: 1 }
  ];
  const DEFAULT_COLORS = { bg: "#F7F5F0", title: "#1A1A1A", sub: "#6B6B6B", point: "#C54118" };
  const FX = {
    shadow: ["none", "xs", "sm", "md", "lg", "float", "inset", "color", "hard"],
    border: ["none", "solid", "dashed", "double", "thick"],
    bg: ["none", "surface", "tint", "invert", "glass"],
    accent: ["none", "left", "top", "bottom"],
    hover: ["none", "lift", "grow", "bright", "press"]
  };
  const STYLE = {
    fs: [11, 48],
    radius: [0, 40],
    pad: [0, 64],
    fw: [400, 500, 600, 700, 800],
    align: ["left", "center", "right"]
  };
  const LIMITS = { text: 300, blocks: 60 };
  const ID_RE = /^[a-z][a-z0-9]{0,23}$/;
  const isHex = (s) => typeof s === "string" && /^#[0-9a-f]{6}$/i.test(s);
  const newId = () => {
    let id;
    do {
      id = "b" + Math.random().toString(36).slice(2);
    } while (id.length < 8 || !ID_RE.test(id));
    return id.slice(0, 10);
  };
  const defaultTheme = () => ({
    colors: { ...DEFAULT_COLORS },
    vars: VARS.reduce((acc, v) => {
      acc[v.key] = v.def;
      return acc;
    }, {})
  });
  const num = (v, min, max, def) =>
    typeof v === "number" && isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : def;
  const sanitizeTheme = (raw) => {
    if (!raw || typeof raw !== "object") return defaultTheme();
    const colors = {};
    Object.keys(DEFAULT_COLORS).forEach(k => {
      colors[k] = isHex(raw.colors?.[k]) ? raw.colors[k] : DEFAULT_COLORS[k];
    });
    const vars = {};
    VARS.forEach(v => {
      vars[v.key] = num(raw.vars?.[v.key], v.min, v.max, v.def);
    });
    return { colors, vars };
  };
  const sanitizeStyle = (raw) => {
    if (!raw || typeof raw !== "object") return {};
    const res = {};
    ["fs", "radius", "pad"].forEach(k => {
      const val = raw[k];
      if (typeof val === "number" && isFinite(val)) {
        res[k] = num(val, STYLE[k][0], STYLE[k][1], undefined);
      }
    });
    if (typeof raw.fw === "number" && STYLE.fw.includes(raw.fw)) res.fw = raw.fw;
    if (typeof raw.align === "string" && STYLE.align.includes(raw.align)) res.align = raw.align;
    return res;
  };
  const sanitizeFx = (raw) => {
    if (!raw || typeof raw !== "object") return {};
    const res = {};
    Object.keys(FX).forEach(k => {
      const val = raw[k];
      if (typeof val === "string" && val !== "none" && FX[k].includes(val)) {
        res[k] = val;
      }
    });
    return res;
  };
  const own = (obj, k) => obj && Object.prototype.hasOwnProperty.call(obj, k);
  const sanitizeBlock = (raw, schema) => {
    if (!raw || typeof raw !== "object" || typeof raw.type !== "string" || !own(schema, raw.type)) return null;
    const def = schema[raw.type];
    const skin = def.skins.includes(raw.skin) ? raw.skin : def.skins[0];
    const texts = {};
    Object.keys(def.texts).forEach(k => {
      const val = raw.texts?.[k];
      if (typeof val === "string") texts[k] = val.slice(0, LIMITS.text);
    });
    const id = typeof raw.id === "string" && ID_RE.test(raw.id) ? raw.id : newId();
    return {
      id,
      type: raw.type,
      skin,
      texts,
      style: sanitizeStyle(raw.style),
      fx: sanitizeFx(raw.fx)
    };
  };
  const sanitizeProject = (raw, schema) => {
    if (!raw || typeof raw !== "object") return { version: 2, theme: defaultTheme(), blocks: [] };
    const blocks = Array.isArray(raw.blocks) ? raw.blocks : [];
    const sanitized = [];
    const seen = new Set();
    for (const b of blocks) {
      const sb = sanitizeBlock(b, schema);
      if (sb) {
        if (seen.has(sb.id)) {
          const dup = { ...sb, id: newId() };
          sanitized.push(dup);
        } else {
          seen.add(sb.id);
          sanitized.push(sb);
        }
      }
      if (sanitized.length >= LIMITS.blocks) break;
    }
    const theme = sanitizeTheme(raw.theme);
    return { version: 2, theme, blocks: sanitized };
  };
  const parseProject = (text, schema) => {
    try {
      const data = JSON.parse(text);
      if (!data || typeof data !== "object" || Array.isArray(data) || !Array.isArray(data.blocks)) {
        return { ok: false, error: "UI 스튜디오 작업 파일이 아니에요." };
      }
      return { ok: true, project: sanitizeProject(data, schema) };
    } catch (e) {
      return { ok: false, error: "파일을 읽을 수 없어요. JSON 형식이 아니에요." };
    }
  };
  const serialize = (p) => JSON.stringify(p, null, 2);
  const createBlock = (type, schema) => {
    if (!own(schema, type)) return null;
    return {
      id: newId(),
      type,
      skin: schema[type].skins[0],
      texts: {},
      style: {},
      fx: {}
    };
  };
  const templateProject = (types, schema) => ({
    version: 2,
    theme: defaultTheme(),
    blocks: types.map(t => createBlock(t, schema)).filter(Boolean)
  });
  const withBlocks = (p, blocks) => ({ ...p, blocks });
  const indexOf = (p, id) => p.blocks.findIndex(b => b.id === id);
  const addBlock = (p, block, index) => {
    if (p.blocks.length >= LIMITS.blocks) return p;
    let i = index === undefined ? p.blocks.length : Math.min(p.blocks.length, Math.max(0, index));
    const newBlocks = [...p.blocks];
    newBlocks.splice(i, 0, block);
    return withBlocks(p, newBlocks);
  };
  const removeBlock = (p, id) => {
    const i = indexOf(p, id);
    if (i < 0) return { project: p, removed: null };
    const newBlocks = [...p.blocks];
    const [removed] = newBlocks.splice(i, 1);
    return { project: withBlocks(p, newBlocks), removed: { block: removed, index: i } };
  };
  const restoreBlock = (p, removed) => {
    if (!removed || indexOf(p, removed.block.id) >= 0) return p;
    return addBlock(p, removed.block, removed.index);
  };
  const duplicateBlock = (p, id) => {
    const i = indexOf(p, id);
    if (i < 0 || p.blocks.length >= LIMITS.blocks) return p;
    const b = p.blocks[i];
    const copy = {
      ...b,
      id: newId(),
      texts: { ...b.texts },
      style: { ...b.style },
      fx: { ...b.fx }
    };
    const newBlocks = [...p.blocks];
    newBlocks.splice(i + 1, 0, copy);
    return withBlocks(p, newBlocks);
  };
  const moveBlock = (p, id, dir) => {
    const i = indexOf(p, id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= p.blocks.length) return p;
    const newBlocks = [...p.blocks];
    const temp = newBlocks[i];
    newBlocks[i] = newBlocks[j];
    newBlocks[j] = temp;
    return withBlocks(p, newBlocks);
  };
  const updateBlock = (p, id, patch, schema) => {
    const i = indexOf(p, id);
    if (i < 0) return p;
    const b = p.blocks[i];
    const merged = {
      ...b,
      skin: patch.skin ?? b.skin,
      texts: { ...b.texts, ...patch.texts },
      style: { ...b.style, ...patch.style },
      fx: { ...b.fx, ...patch.fx }
    };
    const clean = sanitizeBlock(merged, schema);
    if (!clean) return p;
    clean.id = id;
    const newBlocks = [...p.blocks];
    newBlocks[i] = clean;
    return withBlocks(p, newBlocks);
  };
  const setTheme = (p, patch) => {
    const newTheme = sanitizeTheme({
      colors: { ...p.theme.colors, ...patch.colors },
      vars: { ...p.theme.vars, ...patch.vars }
    });
    return { ...p, theme: newTheme };
  };
  const contrast = (a, b) => {
    const lum = (hex) => {
      let r = parseInt(hex.slice(1, 3), 16) / 255;
      let g = parseInt(hex.slice(3, 5), 16) / 255;
      let bl = parseInt(hex.slice(5, 7), 16) / 255;
      r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
      g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
      bl = bl <= 0.03928 ? bl / 12.92 : Math.pow((bl + 0.055) / 1.055, 2.4);
      return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
    };
    const lA = lum(a);
    const lB = lum(b);
    return (Math.max(lA, lB) + 0.05) / (Math.min(lA, lB) + 0.05);
  };
  const onPoint = (c) => contrast(c.point, c.bg) >= contrast(c.point, c.title) ? c.bg : c.title;
  const themeVars = (theme) => {
    const t = sanitizeTheme(theme || {});
    const onPointColor = onPoint(t.colors);
    const parts = [
      `--bg:${t.colors.bg}`,
      `--title:${t.colors.title}`,
      `--sub:${t.colors.sub}`,
      `--point:${t.colors.point}`,
      `--on-point:${onPointColor}`
    ];
    const vars = VARS.map(v => `--${v.css}:${t.vars[v.key]}px`);
    return [ ...parts, ...vars ].join(";");
  };
  const migrateV1 = (v1, base, schema) => {
    if (!v1 || typeof v1 !== "object") return base;
    const theme = sanitizeTheme({
      colors: { ...base.theme.colors, ...(v1.colors || {}) },
      vars: VARS.reduce((acc, v) => {
        const val = v1.vars?.[v.key] ?? v1.vars?.[v.css];
        acc[v.key] = (typeof val === "number" && v.key === "fs") ? Math.min(19, val) : (typeof val === "number" ? val : v.def);
        return acc;
      }, {})
    });
    const blocks = base.blocks.map(b => {
      const texts = {};
      Object.keys(schema[b.type].texts).forEach(k => {
        if (typeof v1.texts?.[k] === "string") texts[k] = v1.texts[k].slice(0, LIMITS.text);
      });
      return { ...b, texts: { ...b.texts, ...texts } };
    });
    return { ...base, theme, blocks };
  };
  return {
    VARS, DEFAULT_COLORS, FX, STYLE, LIMITS, ID_RE,
    isHex, newId, defaultTheme, num, sanitizeTheme, sanitizeStyle, sanitizeFx,
    own, sanitizeBlock, sanitizeProject, parseProject, serialize,
    createBlock, templateProject, withBlocks, indexOf, addBlock, removeBlock,
    restoreBlock, duplicateBlock, moveBlock, updateBlock, setTheme,
    contrast, onPoint, themeVars, migrateV1
  };
});
