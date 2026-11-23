"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const S = require("../studio/js/state.js");
const C = require("../studio/js/components.js");
require("../studio/js/components-forms.js");
require("../studio/js/components-more.js");
const E = require("../studio/js/export.js");

const STUDIO = path.join(__dirname, "..", "studio");
const realCss = () => E.CSS_FILES.map((f) => fs.readFileSync(path.join(STUDIO, f), "utf8")).join("\n");
const allTypes = () => C.list().map((d) => d.type);
const template = () => S.templateProject(C.TEMPLATE, C.schema());

test("registry: about 24+ block types, each with >=3 skins, defaults and render", () => {
  const defs = C.list();
  assert.ok(defs.length >= 24, "got " + defs.length);
  for (const d of defs) {
    assert.match(d.type, /^[a-z]+$/);
    assert.equal(typeof d.label, "string");
    assert.ok(d.skins.length >= 3, d.type);
    for (const [id, label] of d.skins) { assert.match(id, /^[a-z]+$/); assert.equal(typeof label, "string"); }
    assert.equal(typeof d.render, "function");
    assert.ok(Object.keys(d.texts).length >= 1, d.type);
  }
  assert.ok(C.TEMPLATE.every((t) => C.get(t)), "template types registered");
  assert.equal(C.get("nope"), undefined);
});

test("escapeHtml escapes the five characters", () => {
  assert.equal(C.escapeHtml(`<a href="x">'&'</a>`), "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
  assert.equal(C.escapeHtml(undefined), "");
});

test("renderBlock: wrapper classes, fx, style vars, data-k texts, defaults", () => {
  const html = C.renderBlock({ id: "abc", type: "hero", skin: C.get("hero").skins[1][0], texts: { "h1-hero": "내 제목" }, style: { fs: 18, fw: 700, radius: 6, pad: 24, align: "center" }, fx: { shadow: "md", border: "dashed", bg: "tint", accent: "left", hover: "lift" } });
  assert.match(html, /^<section class="blk blk-hero sk-hero-[a-z]+ fx-sh-md fx-bd-dashed fx-bg-tint fx-ac-left fx-hv-lift" data-id="abc" data-type="hero" style="--b-fs:18px;--b-fw:700;--radius:6px;--b-pad:24px;text-align:center">/);
  assert.match(html, /data-k="h1-hero"[^>]*>내 제목</);
  assert.match(html, new RegExp('data-k="lead"[^>]*>' + C.get("hero").texts.lead + "<"));
  assert.doesNotMatch(html, /contenteditable/);
  assert.equal(C.renderBlock({ id: "x", type: "nope", skin: "a", texts: {}, style: {}, fx: {} }), "");
});

test("every block type renders; ids are suffixed per block (no duplicates when duplicated)", () => {
  for (const type of allTypes()) {
    const one = C.renderBlock({ id: "aa", type, skin: C.get(type).skins[0][0], texts: {}, style: {}, fx: {} });
    const two = C.renderBlock({ id: "bb", type, skin: C.get(type).skins[0][0], texts: {}, style: {}, fx: {} });
    assert.match(one, new RegExp('^<section class="blk blk-' + type + " sk-" + type + "-"), type);
    for (const m of one.matchAll(/\s(?:id|for|name|aria-labelledby)="([^"]+)"/g)) {
      assert.match(m[1], /aa/, type + " attr not suffixed: " + m[0]);
      assert.doesNotMatch(two, new RegExp('\\s(?:id|name)="' + m[1] + '"'), type);
    }
  }
});

test("pruneCss: drops unused sk/fx selectors, handles comma lists, nested at-rules, keyframes", () => {
  const css = `/* note */ .pv{color:red}
.sk-hero-center{a:1}
.sk-hero-split{a:2}
.sk-hero-split, .sk-hero-center .x{b:1}
@container pv (max-width: 600px){ .sk-hero-split{c:1} .pv-cards{d:1} }
@container pv (max-width: 400px){ .sk-hero-split{c:2} }
@keyframes spin{from{opacity:0}to{opacity:1}}
.fx-sh-md{e:1} .fx-sh-lg{e:2}
.blk[class*="fx-bg-"]{p:1}
@media (prefers-reduced-motion: reduce){ .fx-hv-lift:hover{t:0} }`;
  const out = E.pruneCss(css, new Set(["sk-hero-center", "fx-sh-md"]));
  assert.doesNotMatch(out, /note/);
  assert.match(out, /\.pv\s*\{/);
  assert.match(out, /\.sk-hero-center\s*\{/);
  assert.match(out, /\.sk-hero-center \.x/);
  assert.doesNotMatch(out, /sk-hero-split/);
  assert.match(out, /@container pv \(max-width: 600px\)/);
  assert.match(out, /\.pv-cards/);
  assert.doesNotMatch(out, /max-width: 400px/);
  assert.match(out, /@keyframes spin/);
  assert.match(out, /\.fx-sh-md/);
  assert.doesNotMatch(out, /fx-sh-lg/);
  assert.match(out, /class\*="fx-bg-"/);
  assert.doesNotMatch(out, /prefers-reduced-motion/);
  const braces = (s) => [...s].filter((c) => c === "{").length - [...s].filter((c) => c === "}").length;
  assert.equal(braces(out), 0);
});

test("usedClasses lists skin and fx classes of the project", () => {
  const p = { version: 2, theme: S.defaultTheme(), blocks: [{ id: "a", type: "hero", skin: C.get("hero").skins[0][0], texts: {}, style: {}, fx: { shadow: "md", hover: "lift" } }] };
  const used = E.usedClasses(p);
  assert.ok(used.has("sk-hero-" + C.get("hero").skins[0][0]));
  assert.ok(used.has("fx-sh-md"));
  assert.ok(used.has("fx-hv-lift"));
  assert.equal(used.size, 3);
});

test("buildHtml: standalone page, theme vars, blocks, only used css", () => {
  const p = template();
  const html = E.buildHtml(p, ".pv{container-type:inline-size} .sk-nav-dark{x:1} .sk-nav-" + p.blocks[0].skin + "{y:1}");
  assert.match(html, /^<!DOCTYPE html>/);
  assert.match(html, /<html lang="ko">/);
  assert.match(html, /<meta name="viewport"/);
  assert.match(html, /<main class="pv" style="--bg:#F7F5F0;[^"]*">/);
  assert.equal((html.match(/<section class="blk /g) || []).length, p.blocks.length);
  assert.doesNotMatch(html, /contenteditable/);
  assert.match(html, /container-type:inline-size/);
  if (p.blocks[0].skin !== "dark") assert.doesNotMatch(html, /sk-nav-dark\{/);
});

test("buildHtml sanitizes a hostile project itself", () => {
  const hostile = {
    version: 2,
    theme: { colors: { bg: "red}</style><script>alert(1)</script>", title: "#000000" }, vars: { radius: "1;}</style>" } },
    blocks: [
      { id: "x\" onclick=\"alert(1)", type: "hero", skin: "left\" onclick=\"x", texts: { "h1-hero": "<script>alert(1)</script>", lead: "\"</title></style>'" }, style: { fs: "20px;background:url(x)", align: "center\"" }, fx: { shadow: "md\" onmouseover=\"x", bg: "invert" } },
      { type: "<img src=x>", texts: {} },
    ],
  };
  const html = E.buildHtml(hostile, ".pv{} </style><script>bad()</script>");
  assert.doesNotMatch(html, /<script/i);
  assert.doesNotMatch(html, /onclick|onmouseover/);
  assert.doesNotMatch(html, /<img/);
  assert.doesNotMatch(html, /url\(x\)/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(html, /--bg:#F7F5F0/);
  assert.match(html, /fx-bg-invert/);
  assert.equal((html.match(/<\/style>/gi) || []).length, 1);
  assert.equal((html.match(/<section class="blk /g) || []).length, 1);
});

test("JSON round trip through export helpers keeps the project", () => {
  const p = S.updateBlock(template(), template().blocks[0].id, {}, C.schema());
  const back = S.parseProject(S.serialize(p), C.schema());
  assert.equal(back.ok, true);
  assert.deepEqual(back.project, p);
});

test("real css: files exist, under 300 lines, container root and reduced motion present", () => {
  for (const f of E.CSS_FILES) {
    const lines = fs.readFileSync(path.join(STUDIO, f), "utf8").split("\n").length;
    assert.ok(lines <= 300, f + " has " + lines + " lines");
  }
  const css = realCss();
  assert.match(css, /container-type:\s*inline-size/);
  assert.match(css, /prefers-reduced-motion/);
  const pruned = E.pruneCss(css, E.usedClasses(template()));
  assert.ok(pruned.length < css.length, "pruning removed unused skins");
  assert.match(E.buildHtml(template(), css), /container-type:\s*inline-size/);
});
