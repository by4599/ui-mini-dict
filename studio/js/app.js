document.addEventListener("DOMContentLoaded", () => {
  const S = StudioState;
  const C = StudioComponents;
  const E = StudioExport;

  const KEY_V2 = "ui-studio-v2";
  const KEY_V1 = "ui-studio-v1";
  const schema = C.schema();

  let statusTimer;
  const say = (msg) => {
    const status = document.getElementById("status");
    status.textContent = msg;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => {
      status.textContent = "";
    }, 4000);
  };

  let store;
  const createStore = (project) => {
    let current = project;
    const listeners = [];
    let selId = null;

    const get = () => current;
    const set = (next, kind, info) => {
      if (next === current) return;
      current = next;
      listeners.forEach((fn) => fn(kind, info || {}));
      scheduleSave();
    };
    const select = (id) => {
      selId = id;
      listeners.forEach((fn) => fn("select", { id }));
    };
    const sel = () => selId;
    const on = (fn) => {
      listeners.push(fn);
    };

    let warned = false;
    let saveTimer = null;
    const scheduleSave = () => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        try {
          localStorage.setItem(KEY_V2, S.serialize(current));
        } catch (e) {
          if (!warned) {
            say("브라우저 저장 공간을 쓸 수 없어 저장하지 못했어요");
            warned = true;
          }
        }
      }, 400);
    };

    return { get, set, sel, select, on };
  };

  const loadInitial = () => {
    const base = S.templateProject(C.TEMPLATE, schema);
    try {
      const raw = localStorage.getItem(KEY_V2);
      if (raw) {
        const r = S.parseProject(raw, schema);
        if (r.ok) return r.project;
      }
      const v1 = JSON.parse(localStorage.getItem(KEY_V1));
      if (v1) return S.migrateV1(v1, base, schema);
    } catch (e) {
      // lean-debt: empty catch - storage/parse errors are non-fatal
    }
    return base;
  };

  const initialProject = loadInitial();
  store = createStore(initialProject);

  const ctx = { store, schema, say };
  StudioThemePanel.init(ctx);
  const canvas = StudioCanvas.init(ctx);
  StudioInspector.init(ctx);

  const saveNow = () => {
    try {
      localStorage.setItem(KEY_V2, S.serialize(store.get()));
    } catch (e) {
      say("브라우저 저장 공간을 쓸 수 없어 저장하지 못했어요");
    }
  };
  saveNow();

  // Device Switch
  document.querySelectorAll(".dev").forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = btn.dataset.dev;
      document.getElementById("frame").style.setProperty("--dev", val + "px");
      document.querySelectorAll(".dev").forEach((b) => {
        b.setAttribute("aria-pressed", b === btn);
      });
    });
  });

  if (window.matchMedia("(max-width: 959px)").matches) document.querySelector('.dev[data-dev="390"]').click();

  // Add Dialog Logic
  const addDlg = document.getElementById("addDlg");
  const exportDlg = document.getElementById("exportDlg");

  const addList = document.getElementById("addList");
  const addBtn = document.getElementById("addBtn");

  C.list().forEach((def) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = def.label;
    btn.dataset.type = def.type;
    addList.appendChild(btn);
  });

  addBtn.onclick = () => addDlg.showModal();

  addList.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-type]");
    if (btn) {
      addDlg.close();
      canvas.add(btn.dataset.type);
    }
  });

  // Dialog Global Close
  document.addEventListener("click", (e) => {
    const d = e.target.closest("dialog");
    if (d) {
      if (e.target === d) d.close();
    }
  });

  document.querySelectorAll("[data-close]").forEach((el) => {
    el.onclick = () => {
      const d = el.closest("dialog");
      if (d) d.close();
    };
  });

  // Export Dialog
  document.getElementById("exportBtn").onclick = () => exportDlg.showModal();

  document.getElementById("expRun").onclick = () => {
    const kind = document.querySelector('input[name="expKind"]:checked').value;
    if (kind === "html") {
      E.fetchCss().then((css) => {
        E.download("my-ui.html", E.buildHtml(store.get(), css), "text/html");
        say("HTML 파일을 받았어요");
        exportDlg.close();
      }).catch(() => {
        say("스타일 파일을 읽지 못해 내보내지 못했어요");
      });
    } else if (kind === "json") {
      E.download("my-ui.json", S.serialize(store.get()), "application/json");
      say("작업 파일을 저장했어요");
      exportDlg.close();
    } else if (kind === "code") {
      E.fetchCss().then((css) => {
        const html = E.buildHtml(store.get(), css);
        navigator.clipboard.writeText(html).then(() => {
          say("코드를 복사했어요");
        }).catch(() => {
          say("복사하지 못했어요. 브라우저 권한을 확인해 주세요");
        });
        exportDlg.close();
      }).catch(() => {
        say("스타일 파일을 읽지 못해 내보내지 못했어요");
      });
    } else if (kind === "load") {
      document.getElementById("loadFile").click();
    }
  };

  document.getElementById("loadFile").onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1000000) {
      say("파일이 너무 커요 (1MB 이하만)");
      e.target.value = "";
      return;
    }
    file.text().then((t) => {
      const r = S.parseProject(t, schema);
      if (!r.ok) {
        say(r.error);
      } else if (confirm("지금 화면을 불러온 파일로 바꿀까요? 지금 작업은 사라져요.")) {
        store.select(null);
        store.set(r.project, "load");
        exportDlg.close();
        say(`작업 파일을 불러왔어요 (블록 ${r.project.blocks.length}개)`);
      }
    }).catch(() => {
      say("파일을 읽지 못했어요");
    }).finally(() => {
      e.target.value = "";
    });
  };

  document.getElementById("reset").onclick = () => {
    if (confirm("블록, 모양, 색, 고친 글자를 모두 처음으로 되돌릴까요?")) {
      store.select(null);
      store.set(S.templateProject(C.TEMPLATE, schema), "load");
      say("처음 상태로 되돌렸어요");
    }
  };

  window.addEventListener("beforeunload", () => {
    try {
      localStorage.setItem(KEY_V2, S.serialize(store.get()));
    } catch (e) {
      // lean-debt: empty catch - non-fatal
    }
  });
});
