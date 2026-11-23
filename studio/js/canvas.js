(function () {
  "use strict";

  const S = window.StudioState;
  const C = window.StudioComponents;

  const preview = document.getElementById("preview");
  const snack = document.getElementById("snack");
  const snackText = document.getElementById("snackText");
  const snackUndo = document.getElementById("snackUndo");

  let lastRemoved = null;
  let snackTimer = null;
  let store, say, schema;

  function applyTheme() {
    const theme = store.get().theme;
    preview.style.cssText = S.themeVars(theme);
  }

  function decorate(el) {
    if (el.classList.contains("blk")) {
      el.tabIndex = "0";
      const type = el.dataset.type;
      el.setAttribute("aria-label", C.get(type).label + " 블록");
      el.querySelectorAll("[data-k]").forEach((child) => {
        child.contentEditable = "true";
        child.spellcheck = false;
      });
    }
  }

  function renderAll() {
    const blocks = store.get().blocks;
    preview.innerHTML = blocks.map(C.renderBlock).join("");
    preview.querySelectorAll(".blk").forEach(decorate);
    markSel();
  }

  function renderOne(info) {
    const blocks = store.get().blocks;
    const index = blocks.findIndex((b) => b.id === info.id);
    if (index === -1) return;
    const block = blocks[index];
    const html = C.renderBlock(block);
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const newEl = temp.firstChild;
    const oldEl = preview.querySelector(`.blk[data-id="${block.id}"]`);
    if (oldEl) {
      preview.replaceChild(newEl, oldEl);
      decorate(newEl);
      markSel();
    }
  }

  function markSel() {
    preview.querySelectorAll(".blk").forEach((el) => {
      el.classList.remove("is-sel");
      const tools = el.querySelector(".blk-tools");
      if (tools) tools.remove();
    });
    const selId = store.sel();
    if (selId) {
      const el = preview.querySelector(`.blk[data-id="${selId}"]`);
      if (el) {
        el.classList.add("is-sel");
        const toolsEl = document.createElement("div");
        toolsEl.className = "blk-tools";
        toolsEl.setAttribute("role", "toolbar");
        toolsEl.setAttribute("aria-label", "블록 도구");
        const acts = [
          { name: "up", label: "↑", aria: "위로 이동" },
          { name: "down", label: "↓", aria: "아래로 이동" },
          { name: "dup", label: "⧉", aria: "복제" },
          { name: "del", label: "✕", aria: "삭제" },
        ];
        acts.forEach((act) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.dataset.act = act.name;
          btn.textContent = act.label;
          btn.setAttribute("aria-label", act.aria);
          btn.contentEditable = "false";
          toolsEl.appendChild(btn);
        });
        el.appendChild(toolsEl);
        const blocks = store.get().blocks;
        const idx = blocks.findIndex((b) => b.id === selId);
        const toolsBtns = toolsEl.querySelectorAll("button");
        if (toolsBtns[0]) toolsBtns[0].disabled = idx === 0;
        if (toolsBtns[1]) toolsBtns[1].disabled = idx === blocks.length - 1;
      }
    }
  }

  function act(name, id) {
    const p = store.get();
    if (name === "up" || name === "down") {
      const dir = name === "up" ? -1 : 1;
      const next = S.moveBlock(p, id, dir);
      store.set(next, "blocks");
      focusSelected();
    } else if (name === "dup") {
      const next = S.duplicateBlock(p, id);
      if (next === p) {
        say("블록은 최대 60개까지 넣을 수 있어요");
      } else {
        store.set(next, "blocks");
        const idx = next.blocks.findIndex((b) => b.id === id);
        const newId = next.blocks[idx + 1].id;
        store.select(newId);
        focusSelected();
      }
    } else if (name === "del") {
      const { project, removed } = S.removeBlock(p, id);
      store.set(project, "blocks");
      const blocks = store.get().blocks;
      const nb = blocks[removed.index] || blocks[removed.index - 1];
      store.select(nb ? nb.id : null);
      showUndo(removed);
      if (nb) focusSelected(); else document.getElementById("addBtn")?.focus();
    }
  }

  function showUndo(removed) {
    if (!removed) return;
    lastRemoved = removed;
    snackText.textContent = `'${C.get(removed.block.type).label}' 블록을 지웠어요`;
    snack.hidden = false;
    if (snackTimer) clearTimeout(snackTimer);
    snackTimer = setTimeout(() => {
      snack.hidden = true;
    }, 8000);
  }

  function add(type) {
    const b = S.createBlock(type, schema);
    const p = store.get();
    const selId = store.sel();
    const i = selId ? p.blocks.findIndex((blk) => blk.id === selId) : -1;
    const next = S.addBlock(p, b, i < 0 ? undefined : i + 1);
    if (next === p) {
      say("블록은 최대 60개까지 넣을 수 있어요");
      return;
    }
    store.set(next, "blocks");
    store.select(b.id);
    focusSelected();
    const el = preview.querySelector(`.blk[data-id="${b.id}"]`);
    if (el) el.scrollIntoView({ block: "nearest" });
    say(`'${C.get(type).label}' 블록을 넣었어요`);
  }

  function focusSelected() {
    const selId = store.sel();
    const el = preview.querySelector(`.blk[data-id="${selId}"]`);
    if (el) el.focus({ preventScroll: false });
  }

  function init(ctx) {
    store = ctx.store;
    say = ctx.say;
    schema = ctx.schema;
    applyTheme();
    renderAll();
    store.on((kind, info) => {
      if (kind === "theme") applyTheme();
      if (kind === "blocks" || kind === "load") {
        applyTheme();
        renderAll();
        if (document.activeElement && preview.contains(document.activeElement)) {
          focusSelected();
        }
      }
      if (kind === "block") renderOne(info);
      if (kind === "select") markSel();
    });

    preview.addEventListener("click", (e) => {
      const target = e.target;
      if (target.tagName === "A" && target.getAttribute("href") === "#") {
        e.preventDefault();
        const blk = target.closest(".blk");
        if (blk) store.select(blk.dataset.id);
      } else if (target.dataset.act) {
        e.preventDefault();
        const blk = target.closest(".blk");
        if (blk) act(target.dataset.act, blk.dataset.id);
      } else {
        const blk = target.closest(".blk");
        if (blk) store.select(blk.dataset.id);
      }
    });

    preview.addEventListener("focusin", (e) => {
      const blk = e.target.closest(".blk");
      if (blk && store.sel() !== blk.dataset.id) {
        store.select(blk.dataset.id);
      }
    });

    preview.addEventListener("keydown", (e) => {
      const target = e.target;
      if (target.matches("[data-k]")) {
        if (e.key === "Enter") {
          e.preventDefault();
          target.blur();
          const blk = target.closest(".blk");
          if (blk) blk.focus();
        } else if (e.key === "Escape") {
          target.blur();
          const blk = target.closest(".blk");
          if (blk) blk.focus();
        }
      } else if (target.classList.contains("blk")) {
        const blk = target.closest(".blk");
        if (e.altKey && e.key === "ArrowUp") {
          e.preventDefault();
          act("up", blk.dataset.id);
        } else if (e.altKey && e.key === "ArrowDown") {
          e.preventDefault();
          act("down", blk.dataset.id);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          const blocks = store.get().blocks;
          const idx = blocks.findIndex((b) => b.id === blk.dataset.id);
          if (idx > 0) preview.querySelectorAll(".blk")[idx - 1].focus();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          const blocks = store.get().blocks;
          const idx = blocks.findIndex((b) => b.id === blk.dataset.id);
          if (idx < blocks.length - 1) preview.querySelectorAll(".blk")[idx + 1].focus();
        } else if (e.key === "Delete" || e.key === "Backspace") {
          act("del", blk.dataset.id);
        } else if (e.key === "Enter") {
          const firstK = blk.querySelector("[data-k]");
          if (firstK) firstK.focus();
        }
      }
    });

    preview.addEventListener("input", (e) => {
      const target = e.target;
      if (target.dataset.k) {
        const blk = target.closest(".blk");
        if (blk) {
          const p = store.get();
          const updated = S.updateBlock(p, blk.dataset.id, {
            texts: { [target.dataset.k]: target.textContent },
          }, schema);
          store.set(updated, "text");
        }
      }
    });

    preview.addEventListener("paste", (e) => {
      const target = e.target;
      if (target.dataset.k) {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData("text/plain");
        document.execCommand("insertText", false, text);
      }
    });

    snackUndo.onclick = () => {
      if (lastRemoved) {
        const restored = S.restoreBlock(store.get(), lastRemoved);
        store.set(restored, "blocks");
        store.select(lastRemoved.block.id);
        snack.hidden = true;
        focusSelected();
        say("되돌렸어요");
        lastRemoved = null;
      }
    };

    return { add, focusSelected };
  }

  window.StudioCanvas = { init };
})();
