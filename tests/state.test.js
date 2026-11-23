"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const S = require("../studio/js/state.js");

const schema = {
  hero: { skins: ["left", "center"], texts: { h: "제목", lead: "설명" } },
  cards: { skins: ["flat", "border"], texts: { "card1-h": "카드" } },
};
const mk = (over = {}) => ({ id: "a1", type: "hero", skin: "left", texts: {}, style: {}, fx: {}, ...over });
const proj = (blocks) => ({ version: 2, theme: S.defaultTheme(), blocks });
const ids = (p) => p.blocks.map((b) => b.id);

test("constants match contract", () => {
  assert.equal(S.VARS.length, 7);
  assert.deepEqual(S.VARS.map((v) => v.css), ["radius", "btn-h", "btn-px", "fs", "h1", "gap", "bw"]);
  assert.equal(S.FX.shadow.length, 9);
  assert.equal(S.LIMITS.blocks, 60);
  assert.equal(S.LIMITS.text, 300);
});

test("newId matches ID_RE and is unique", () => {
  const set = new Set(Array.from({ length: 200 }, () => S.newId()));
  assert.equal(set.size, 200);
  for (const id of set) assert.match(id, S.ID_RE);
});

test("defaultTheme uses defaults", () => {
  const t = S.defaultTheme();
  assert.deepEqual(t.colors, S.DEFAULT_COLORS);
  assert.equal(t.vars.radius, 12);
  assert.equal(t.vars.btnH, 44);
});

test("sanitizeTheme: bad hex -> default, numbers clamped and rounded", () => {
  const t = S.sanitizeTheme({ colors: { bg: "red}</style><script>", title: "#000000" }, vars: { radius: 999, gap: -5, fs: "14", h1: 30.6, bw: NaN } });
  assert.equal(t.colors.bg, S.DEFAULT_COLORS.bg);
  assert.equal(t.colors.title, "#000000");
  assert.equal(t.vars.radius, 32);
  assert.equal(t.vars.gap, 8);
  assert.equal(t.vars.fs, 15, "string numbers are not accepted");
  assert.equal(t.vars.h1, 31);
  assert.equal(t.vars.bw, 1);
});

test("sanitizeStyle keeps only valid keys", () => {
  assert.deepEqual(S.sanitizeStyle({ fs: 100, fw: 650, radius: 8, pad: "x", align: "justify", evil: 1 }), { fs: 48, radius: 8 });
  assert.deepEqual(S.sanitizeStyle({ fw: 700, align: "center", pad: 0 }), { fw: 700, align: "center", pad: 0 });
  assert.deepEqual(S.sanitizeStyle(null), {});
  assert.deepEqual(S.sanitizeStyle({ fs: null }), {});
});

test("sanitizeFx keeps whitelisted, drops none and junk", () => {
  assert.deepEqual(S.sanitizeFx({ shadow: "md", border: "none", bg: "x\" onload=\"", hover: "lift", foo: "bar" }), { shadow: "md", hover: "lift" });
  assert.deepEqual(S.sanitizeFx("nope"), {});
});

test("sanitizeBlock: unknown type -> null; bad skin -> first; texts whitelisted and capped", () => {
  assert.equal(S.sanitizeBlock({ type: "nope" }, schema), null);
  assert.equal(S.sanitizeBlock({ type: "__proto__" }, schema), null);
  assert.equal(S.sanitizeBlock({ type: "toString" }, schema), null);
  assert.equal(S.sanitizeBlock("x", schema), null);
  const b = S.sanitizeBlock({ id: "BAD ID\"", type: "hero", skin: "evil", texts: { h: "x".repeat(500), other: "no", lead: 5, __proto__: { p: 1 } } }, schema);
  assert.equal(b.skin, "left");
  assert.match(b.id, S.ID_RE);
  assert.equal(b.texts.h.length, 300);
  assert.deepEqual(Object.keys(b.texts), ["h"]);
  assert.deepEqual(b.style, {});
  assert.deepEqual(b.fx, {});
  assert.equal(S.sanitizeBlock({ id: "ok1", type: "hero", skin: "center" }, schema).id, "ok1");
});

test("sanitizeProject: filters, dedupes ids, caps block count, always valid", () => {
  const raw = { version: 2, theme: {}, blocks: [mk(), mk(), { type: "nope" }, ...Array.from({ length: 70 }, (_, i) => mk({ id: "x" + i }))] };
  const p = S.sanitizeProject(raw, schema);
  assert.equal(p.version, 2);
  assert.equal(p.blocks.length, 60);
  assert.equal(new Set(ids(p)).size, 60);
  assert.equal(p.blocks[0].id, "a1");
  assert.notEqual(p.blocks[1].id, "a1");
  const empty = S.sanitizeProject(null, schema);
  assert.deepEqual(empty.blocks, []);
  assert.deepEqual(empty.theme, S.defaultTheme());
});

test("parseProject: errors for bad JSON / shape, ok for valid", () => {
  assert.equal(S.parseProject("{bad", schema).ok, false);
  assert.equal(typeof S.parseProject("{bad", schema).error, "string");
  assert.equal(S.parseProject("[]", schema).ok, false);
  assert.equal(S.parseProject('{"blocks":"x"}', schema).ok, false);
  const r = S.parseProject(JSON.stringify(proj([mk()])), schema);
  assert.equal(r.ok, true);
  assert.equal(r.project.blocks[0].type, "hero");
});

test("serialize -> parseProject round trip", () => {
  const p = proj([mk({ texts: { h: "<b>안녕</b>" }, style: { fs: 20 }, fx: { shadow: "hard" } }), mk({ id: "b2", type: "cards", skin: "border" })]);
  const r = S.parseProject(S.serialize(p), schema);
  assert.deepEqual(r.project, p);
});

test("createBlock and templateProject", () => {
  const b = S.createBlock("cards", schema);
  assert.equal(b.type, "cards");
  assert.equal(b.skin, "flat");
  assert.deepEqual(b.texts, {});
  assert.match(b.id, S.ID_RE);
  assert.equal(S.createBlock("nope", schema), null);
  const t = S.templateProject(["hero", "nope", "cards"], schema);
  assert.deepEqual(t.blocks.map((x) => x.type), ["hero", "cards"]);
});

test("addBlock: inserts immutably at index, respects limit", () => {
  const p = proj([mk({ id: "a" }), mk({ id: "c" })]);
  const n = S.addBlock(p, mk({ id: "b" }), 1);
  assert.deepEqual(ids(n), ["a", "b", "c"]);
  assert.deepEqual(ids(p), ["a", "c"], "original untouched");
  assert.deepEqual(ids(S.addBlock(p, mk({ id: "z" }))), ["a", "c", "z"]);
  const full = proj(Array.from({ length: 60 }, (_, i) => mk({ id: "k" + i })));
  assert.equal(S.addBlock(full, mk({ id: "over" })), full);
});

test("removeBlock + restoreBlock (undo)", () => {
  const p = proj([mk({ id: "a" }), mk({ id: "b" }), mk({ id: "c" })]);
  const { project, removed } = S.removeBlock(p, "b");
  assert.deepEqual(ids(project), ["a", "c"]);
  assert.equal(removed.index, 1);
  assert.equal(removed.block.id, "b");
  assert.deepEqual(ids(p), ["a", "b", "c"]);
  assert.deepEqual(ids(S.restoreBlock(project, removed)), ["a", "b", "c"]);
  const miss = S.removeBlock(p, "zz");
  assert.equal(miss.project, p);
  assert.equal(miss.removed, null);
  assert.equal(S.restoreBlock(p, null), p);
  assert.equal(S.restoreBlock(p, { block: mk({ id: "a" }), index: 0 }), p, "no duplicate id on restore");
});

test("duplicateBlock: deep copy with new id after original", () => {
  const p = proj([mk({ id: "a", texts: { h: "t" }, style: { fs: 20 }, fx: { shadow: "md" } }), mk({ id: "b" })]);
  const n = S.duplicateBlock(p, "a");
  assert.equal(n.blocks.length, 3);
  assert.equal(n.blocks[0].id, "a");
  assert.notEqual(n.blocks[1].id, "a");
  assert.match(n.blocks[1].id, S.ID_RE);
  assert.deepEqual(n.blocks[1].texts, { h: "t" });
  assert.notEqual(n.blocks[1].texts, n.blocks[0].texts, "deep copy");
  assert.notEqual(n.blocks[1].style, n.blocks[0].style);
  assert.equal(n.blocks[2].id, "b");
  assert.equal(S.duplicateBlock(p, "zz"), p);
});

test("moveBlock: swap with neighbour, same ref at edges", () => {
  const p = proj([mk({ id: "a" }), mk({ id: "b" }), mk({ id: "c" })]);
  assert.deepEqual(ids(S.moveBlock(p, "b", -1)), ["b", "a", "c"]);
  assert.deepEqual(ids(S.moveBlock(p, "b", 1)), ["a", "c", "b"]);
  assert.equal(S.moveBlock(p, "a", -1), p);
  assert.equal(S.moveBlock(p, "c", 1), p);
  assert.equal(S.moveBlock(p, "zz", 1), p);
  assert.deepEqual(ids(p), ["a", "b", "c"]);
});

test("updateBlock: merges texts/style/fx, null or none removes, validates", () => {
  const p = proj([mk({ id: "a", texts: { h: "old" }, style: { fs: 20, fw: 700 }, fx: { shadow: "md" } })]);
  const n = S.updateBlock(p, "a", { skin: "center", texts: { lead: "새 설명", junk: "x" }, style: { fs: null, align: "center" }, fx: { shadow: "none", border: "dashed" } }, schema);
  const b = n.blocks[0];
  assert.equal(b.id, "a");
  assert.equal(b.skin, "center");
  assert.deepEqual(b.texts, { h: "old", lead: "새 설명" });
  assert.deepEqual(b.style, { fw: 700, align: "center" });
  assert.deepEqual(b.fx, { border: "dashed" });
  assert.equal(p.blocks[0].skin, "left", "original untouched");
  assert.equal(S.updateBlock(p, "a", { skin: "evil" }, schema).blocks[0].skin, "left");
  assert.equal(S.updateBlock(p, "zz", { skin: "center" }, schema), p);
});

test("setTheme merges and sanitizes", () => {
  const p = proj([]);
  const n = S.setTheme(p, { colors: { point: "#123456", bg: "bad" }, vars: { radius: 4 } });
  assert.equal(n.theme.colors.point, "#123456");
  assert.equal(n.theme.colors.bg, S.DEFAULT_COLORS.bg);
  assert.equal(n.theme.vars.radius, 4);
  assert.equal(n.theme.vars.gap, 20);
  assert.equal(p.theme.vars.radius, 12);
});

test("contrast, onPoint, themeVars", () => {
  assert.equal(Math.round(S.contrast("#FFFFFF", "#000000")), 21);
  assert.equal(S.contrast("#777777", "#777777"), 1);
  assert.equal(S.onPoint({ bg: "#FFFFFF", title: "#111111", sub: "#555555", point: "#111199" }), "#FFFFFF");
  assert.equal(S.onPoint({ bg: "#FFFFFF", title: "#111111", sub: "#555555", point: "#FFEE88" }), "#111111");
  const css = S.themeVars(S.defaultTheme());
  assert.match(css, /--bg:#F7F5F0/);
  assert.match(css, /--on-point:#[0-9A-Fa-f]{6}/);
  assert.match(css, /--btn-h:44px/);
  assert.match(css, /--bw:1px/);
  assert.doesNotMatch(S.themeVars({ colors: { bg: "red;}</style>" }, vars: {} }), /<|}/);
});

test("migrateV1 maps kebab vars, colors and matching text keys", () => {
  const base = { version: 2, theme: S.defaultTheme(), blocks: [mk({ id: "a" }), mk({ id: "b", type: "cards", skin: "flat" })] };
  const v1 = { vars: { radius: 4, "btn-h": 60, "btn-px": 30, fs: 99 }, colors: { bg: "#000000", title: "#FFFFFF", sub: "#AAAAAA", point: "#FF0000" }, texts: { h: "옛 제목", "card1-h": "옛 카드", evil: "x", lead: 3 } };
  const p = S.migrateV1(v1, base, schema);
  assert.equal(p.theme.vars.radius, 4);
  assert.equal(p.theme.vars.btnH, 60);
  assert.equal(p.theme.vars.btnPx, 30);
  assert.equal(p.theme.vars.fs, 19);
  assert.equal(p.theme.colors.bg, "#000000");
  assert.deepEqual(p.blocks[0].texts, { h: "옛 제목" });
  assert.deepEqual(p.blocks[1].texts, { "card1-h": "옛 카드" });
  assert.deepEqual(base.blocks[0].texts, {}, "base untouched");
  assert.deepEqual(S.migrateV1(null, base, schema), base);
});
