(function () {
  "use strict";
  const S = window.StudioState;
  const C = window.StudioComponents;
  const FX_LABELS = {
    shadow: { none: "없음", xs: "아주 약하게", sm: "약하게", md: "보통", lg: "강하게", float: "떠 있는", inset: "안쪽 그림자", color: "색 그림자", hard: "하드 섀도" },
    border: { none: "없음", solid: "실선", dashed: "점선", double: "이중선", thick: "굵게" },
    bg: { none: "투명", surface: "표면", tint: "연한 포인트색", invert: "반전", glass: "유리" },
    accent: { none: "없음", left: "왼쪽", top: "위", bottom: "아래" },
    hover: { none: "없음", lift: "떠오름", grow: "살짝 커짐", bright: "밝아짐", press: "눌림" }
  };
  const FX_NAMES = { shadow: "그림자", border: "테두리", bg: "배경", accent: "강조선", hover: "마우스 반응" };

  const el = (tag, props = {}, children = []) => {
    const node = document.createElement(tag);
    const { dataset, ...rest } = props;
    Object.assign(node, rest);
    if (dataset) {
      Object.entries(dataset).forEach(([k, v]) => {
        node.dataset[k] = v;
      });
    }
    children.forEach(child => {
      if (typeof child === "string") {
        node.appendChild(document.createTextNode(child));
      } else {
        node.appendChild(child);
      }
    });
    return node;
  };

  const patch = (ctx, id, obj) => {
    const next = S.updateBlock(ctx.store.get(), id, obj, ctx.schema);
    ctx.store.set(next, "block", { id, from: "inspector" });
  };

  const render = (ctx) => {
    const root = document.getElementById("inspector");
    if (!root) return;
    root.replaceChildren();
    const state = ctx.store.get();
    const selId = ctx.store.sel();
    const block = selId ? state.blocks.find(b => b.id === selId) : null;

    if (!block) {
      const empty = el("div", { className: "insp" }, [
        el("p", { className: "insp-empty" }, ["블록을 누르면 여기서 스킨과 효과를 바꿀 수 있어요"])
      ]);
      root.appendChild(empty);
      return;
    }

    const container = el("div", { className: "insp" });
    container.appendChild(el("h2", {}, [C.get(block.type).label]));
    container.appendChild(el("p", { className: "hint" }, ["글자는 미리보기에서 눌러 바로 고쳐요"]));

    const field = (labelText, control) => {
      const wrapper = el("label", { className: "insp-field" });
      wrapper.appendChild(el("span", {}, [labelText]));
      wrapper.appendChild(control);
      return wrapper;
    };

    const skinSelect = el("select", {
      dataset: { f: "skin" },
      className: "insp-select"
    });
    C.get(block.type).skins.forEach(s => {
      const opt = el("option", { value: s[0] }, [s[1]]);
      skinSelect.appendChild(opt);
    });
    skinSelect.value = block.skin;
    skinSelect.onchange = () => patch(ctx, block.id, { skin: skinSelect.value });
    container.appendChild(field("스킨", skinSelect));

    const fxFieldset = el("fieldset");
    fxFieldset.appendChild(el("legend", {}, ["효과"]));
    const fxGroup = el("div", {});
    fxFieldset.appendChild(fxGroup);

    Object.keys(S.FX).forEach(key => {
      const select = el("select", {
        dataset: { f: "fx" },
        className: "insp-select"
      });
      S.FX[key].forEach(val => {
        const opt = el("option", { value: val }, [FX_LABELS[key][val]]);
        select.appendChild(opt);
      });
      select.value = block.fx?.[key] || "none";
      select.onchange = () => {
        patch(ctx, block.id, { fx: { [key]: select.value } });
      };
      fxGroup.appendChild(field(FX_NAMES[key], select));
    });
    container.appendChild(fxFieldset);

    const styleFieldset = el("fieldset");
    styleFieldset.appendChild(el("legend", {}, ["이 블록만 따로"]));
    const grid = el("div", { className: "insp-grid" });
    styleFieldset.appendChild(grid);

    const styleKeys = [
      { k: "fs", label: "글자 크기(px)", min: 11, max: 48, type: "num" },
      { k: "radius", label: "둥글기(px)", min: 0, max: 40, type: "num" },
      { k: "pad", label: "안쪽 여백(px)", min: 0, max: 64, type: "num" },
      { k: "fw", label: "굵기", type: "fw" },
      { k: "align", label: "정렬", type: "align" }
    ];

    styleKeys.forEach(item => {
      let input;
      if (item.type === "num") {
        input = el("input", {
          type: "number",
          dataset: { st: item.k },
          min: item.min,
          max: item.max,
          placeholder: "전체 따름",
          value: block.style?.[item.k] ?? ""
        });
      } else if (item.type === "fw") {
        input = el("select", { dataset: { st: item.k }, className: "insp-select" });
        ["", "400", "500", "600", "700", "800"].forEach(v => {
          const opt = el("option", { value: v }, [v === "" ? "전체 따름" : v === "400" ? "보통" : v === "500" ? "중간" : v === "600" ? "약간 굵게" : v === "700" ? "굵게" : v === "800" ? "아주 굵게" : v]);
          input.appendChild(opt);
        });
      } else {
        input = el("select", { dataset: { st: item.k }, className: "insp-select" });
        ["", "left", "center", "right"].forEach(v => {
          const opt = el("option", { value: v }, [v === "" ? "전체 따름" : v === "left" ? "왼쪽" : v === "center" ? "가운데" : "오른쪽"]);
          input.appendChild(opt);
        });
      }
      input.value = block.style?.[item.k] ?? "";
      input.onchange = () => {
        let val = input.value;
        if (val === "") {
          patch(ctx, block.id, { style: { [item.k]: null } });
        } else {
          let numVal = item.type === "num" ? Number(val) : val;
          if (item.type === "num") numVal = Math.max(item.min, Math.min(item.max, numVal));
          if (item.type === "fw") numVal = Number(val);
          patch(ctx, block.id, { style: { [item.k]: numVal } });
        }
        const b = ctx.store.get().blocks.find(x => x.id === block.id);
        input.value = b.style?.[item.k] ?? "";
      };
      grid.appendChild(field(item.label, input));
    });

    const resetBtn = el("button", {
      className: "btn-ghost insp-reset",
      type: "button"
    }, ["전체 설정 따르기"]);
    resetBtn.onclick = () => {
      patch(ctx, block.id, { style: { fs: null, fw: null, radius: null, pad: null, align: null } });
      ctx.say("이 블록을 전체 설정으로 되돌렸어요");
      render(ctx);
    };
    grid.appendChild(resetBtn);

    container.appendChild(styleFieldset);
    root.appendChild(container);
  };

  window.StudioInspector = {
    init(ctx) {
      render(ctx);
      ctx.store.on((kind, info) => {
        if (kind === "select" || kind === "blocks" || kind === "load" || (kind === "block" && info.from !== "inspector")) {
          render(ctx);
        }
      });
    }
  };
})();
