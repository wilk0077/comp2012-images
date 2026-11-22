import {
  PHASES,
  ASSIGNMENTS,
  TLO_MAP,
  LINK_TYPES,
  ETHICS_NOTES,
  MODULES,
  BACKBONE_LINKS,
  TYPED_LINKS
} from "./roadmap-data.js";

const STORAGE_KEY = "comp1103_landscape_roadmap_v2";

const state = {
  lens: "journey", // "journey" | "theory" | "practice" | "law"
  selectedId: 1,
  hoveredId: null,
  drawerOpen: false,
  pinnedEdgeId: null,
  activeLayers: new Set(), // "handoff" | "theory" | "spiral" | "ethics"
  ethicsBannerDismissed: false,
  explored: loadExplored()
};

/* ---------- LMS-Safe LocalStorage Helpers ---------- */
function loadExplored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set([1]);
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) && parsed.length ? parsed : [1]);
  } catch {
    return new Set([1]);
  }
}

function saveExplored() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.explored]));
  } catch {
    // Ignore storage blocks inside strict LMS iframes
  }
}

/* ---------- DOM References ---------- */
const dom = {
  shell: document.getElementById("app-shell"),
  lensSlider: document.getElementById("lens-slider"),
  lensThumb: document.getElementById("lens-thumb"),
  lensOpts: document.querySelectorAll(".lens-opt"),
  layerChips: document.querySelectorAll(".layer-chip"),
  btnAllLayers: document.getElementById("btn-all-layers"),
  progressText: document.getElementById("progress-text"),
  progressFill: document.getElementById("progress-fill"),
  btnFullscreen: document.getElementById("btn-fullscreen"),

  ethicsBanner: document.getElementById("ethics-banner"),
  btnCloseEthics: document.getElementById("btn-close-ethics"),

  mapStage: document.getElementById("map-stage"),
  mapSvg: document.getElementById("map-svg"),
  columnsGrid: document.getElementById("columns-grid"),

  edgeTooltip: document.getElementById("edge-tooltip"),
  edgePopover: document.getElementById("edge-popover"),

  stepPrev: document.getElementById("step-prev"),
  stepIndicator: document.getElementById("step-indicator"),
  stepNext: document.getElementById("step-next"),

  drawerBackdrop: document.getElementById("drawer-backdrop"),
  drawer: document.getElementById("detail-drawer")
};

/* ---------- Utilities ---------- */
const getModule = (id) => MODULES.find((m) => m.id === id);
const getPhase = (phaseId) => PHASES.find((p) => p.id === phaseId);

function esc(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function lensContent(mod) {
  if (state.lens === "theory") {
    return { cls: "lens-theory", text: mod.theory.short };
  }
  if (state.lens === "practice") {
    return { cls: "lens-practice", text: mod.practice.short };
  }
  if (state.lens === "law") {
    return { cls: "lens-law", text: mod.law.name };
  }
  return { cls: "lens-journey", text: mod.journeyCue };
}

/* ---------- Sliding Lens Thumb Positioning ---------- */
function syncLensThumb() {
  const activeBtn = dom.lensSlider.querySelector(".lens-opt.is-active");
  if (!activeBtn) return;
  dom.lensThumb.style.width = `${activeBtn.offsetWidth}px`;
  dom.lensThumb.style.transform = `translateX(${activeBtn.offsetLeft - 3}px)`;
}

/* ---------- Render Controls & Progress ---------- */
function renderControls() {
  dom.lensOpts.forEach((btn) => {
    const active = btn.dataset.lens === state.lens;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-checked", String(active));
  });
  syncLensThumb();

  dom.layerChips.forEach((chip) => {
    const active = state.activeLayers.has(chip.dataset.layer);
    chip.classList.toggle("is-active", active);
    chip.setAttribute("aria-pressed", String(active));
  });

  const allOn = ["handoff", "theory", "spiral", "ethics"].every((k) =>
    state.activeLayers.has(k)
  );
  dom.btnAllLayers.textContent = allOn ? "Reset" : "Show All";

  dom.ethicsBanner.hidden =
    !state.activeLayers.has("ethics") || state.ethicsBannerDismissed;

  const count = state.explored.size;
  dom.progressText.textContent = `${count} / ${MODULES.length}`;
  dom.progressFill.style.width = `${Math.round((count / MODULES.length) * 100)}%`;

  dom.stepIndicator.textContent = `Week ${state.selectedId} / ${MODULES.length}`;
  dom.stepPrev.disabled = state.selectedId === 1;
  dom.stepNext.disabled = state.selectedId === MODULES.length;
}

/* ---------- Render Three Shaded Phase Columns ---------- */
function renderColumns() {
  const showEthics = state.activeLayers.has("ethics");

  dom.columnsGrid.innerHTML = PHASES.map((phase) => {
    const mods = MODULES.filter((m) => m.phase === phase.id);
    const cardsHtml = mods
      .map((mod) => {
        const lens = lensContent(mod);
        const isSelected = mod.id === state.selectedId;
        const isExplored = state.explored.has(mod.id);
        const hasEthics = Boolean(ETHICS_NOTES[mod.id]);

        const classes = [
          "node-card",
          isSelected ? "is-selected" : "",
          showEthics && hasEthics ? "has-ethics-halo" : ""
        ]
          .filter(Boolean)
          .join(" ");

        return `
          <button
            type="button"
            class="${classes}"
            data-module-id="${mod.id}"
            aria-current="${isSelected ? "true" : "false"}"
          >
            <div class="node-top">
              <span class="node-week">Week ${mod.id}</span>
              <span class="node-badges">
                ${showEthics && hasEthics ? '<span class="ethics-shield" title="Ethics & Security Thread">TLO4</span>' : ""}
                ${mod.assessments.map((code) => `<span class="assess-chip">${esc(code)}</span>`).join("")}
                ${isExplored ? '<span class="explored-pip" title="Explored"></span>' : ""}
              </span>
            </div>
            <h3 class="node-title">${esc(mod.title)}</h3>
            <p class="node-lens-line ${lens.cls}">${esc(lens.text)}</p>
          </button>
        `;
      })
      .join("");

    return `
      <section class="phase-col phase-${phase.id}" aria-label="${esc(phase.title)}">
        <div class="phase-head">
          <span class="phase-kicker">${esc(phase.kicker)}</span>
          <h2 class="phase-title">${esc(phase.title)}</h2>
          <p class="phase-sub">${esc(phase.subtitle)}</p>
        </div>
        ${cardsHtml}
      </section>
    `;
  }).join("");

  dom.columnsGrid.querySelectorAll(".node-card").forEach((card) => {
    const id = Number(card.dataset.moduleId);
    card.addEventListener("click", () => openModule(id));
    card.addEventListener("mouseenter", () => {
      state.hoveredId = id;
      updateNetworkState();
    });
    card.addEventListener("mouseleave", () => {
      state.hoveredId = null;
      updateNetworkState();
    });
  });

  requestAnimationFrame(drawSvgEdges);
}

/* ---------- Collision-Avoidant 3-Column SVG Routing ---------- */
function drawSvgEdges() {
  const stageRect = dom.mapStage.getBoundingClientRect();
  if (!stageRect.width || !stageRect.height) return;

  const rects = new Map();
  dom.columnsGrid.querySelectorAll(".node-card").forEach((el) => {
    const id = Number(el.dataset.moduleId);
    const r = el.getBoundingClientRect();
    rects.set(id, {
      phase: getModule(id).phase,
      left: r.left - stageRect.left,
      right: r.right - stageRect.left,
      top: r.top - stageRect.top,
      bottom: r.bottom - stageRect.top,
      cx: r.left - stageRect.left + r.width / 2,
      cy: r.top - stageRect.top + r.height / 2,
      width: r.width,
      height: r.height
    });
  });

  // Measure column envelope bounds for outer top/bottom/left corridors
  const colRects = new Map();
  dom.columnsGrid.querySelectorAll(".phase-col").forEach((col, idx) => {
    const r = col.getBoundingClientRect();
    colRects.set(idx + 1, {
      left: r.left - stageRect.left,
      right: r.right - stageRect.left,
      top: r.top - stageRect.top,
      bottom: r.bottom - stageRect.top
    });
  });

  const col1 = colRects.get(1);
  const col2 = colRects.get(2);
  const col3 = colRects.get(3);
  if (!col1 || !col2 || !col3) return;

  // Pre-compute port staggering for adjacent cross-column links (Col 1->2 and Col 2->3)
  const outPorts = new Map();
  const inPorts = new Map();

  TYPED_LINKS.forEach((link) => {
    const a = rects.get(link.from);
    const b = rects.get(link.to);
    if (!a || !b) return;
    if (b.phase - a.phase === 1) {
      if (!outPorts.has(link.from)) outPorts.set(link.from, []);
      if (!inPorts.has(link.to)) inPorts.set(link.to, []);
      outPorts.get(link.from).push(link);
      inPorts.get(link.to).push(link);
    }
  });

  outPorts.forEach((arr) => arr.sort((x, y) => rects.get(x.to).cy - rects.get(y.to).cy));
  inPorts.forEach((arr) => arr.sort((x, y) => rects.get(x.from).cy - rects.get(y.from).cy));

  const getPortY = (map, nodeId, linkId) => {
    const arr = map.get(nodeId);
    const rect = rects.get(nodeId);
    if (!arr || arr.length <= 1) return rect.cy;
    const idx = arr.findIndex((l) => l.id === linkId);
    const span = rect.height * 0.56;
    const start = rect.cy - span / 2;
    return start + (span * idx) / (arr.length - 1);
  };

  // Top & bottom long-span corridor lanes (Col 1 -> Col 3)
  const topCorridorLinks = TYPED_LINKS.filter((l) => {
    const a = rects.get(l.from);
    const b = rects.get(l.to);
    return a && b && a.phase === 1 && b.phase === 3 && l.from === 1;
  });
  const bottomCorridorLinks = TYPED_LINKS.filter((l) => {
    const a = rects.get(l.from);
    const b = rects.get(l.to);
    return a && b && a.phase === 1 && b.phase === 3 && l.from > 1;
  });

  // Left-gutter same-column skip links (e.g., 1->4, 2->5)
  const leftSkipLinks = TYPED_LINKS.filter((l) => {
    const a = rects.get(l.from);
    const b = rects.get(l.to);
    return a && b && a.phase === b.phase && Math.abs(l.to - l.from) > 1;
  });

  const defs = `
    <defs>
      <marker id="m-backbone" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
        <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#9BA7BE"></path>
      </marker>
      <marker id="m-handoff" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 9 5 L 0 9 z" fill="#0D7A5F"></path>
      </marker>
      <marker id="m-theory" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 9 5 L 0 9 z" fill="#CB9828"></path>
      </marker>
      <marker id="m-spiral" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 9 5 L 0 9 z" fill="#4F46E5"></path>
      </marker>
    </defs>
  `;

  // 1. Sequential Weekly Backbone
  const backbonePaths = BACKBONE_LINKS.map((link) => {
    const a = rects.get(link.from);
    const b = rects.get(link.to);
    if (!a || !b) return "";

    let d = "";
    if (a.phase === b.phase) {
      d = `M ${a.cx} ${a.bottom} L ${b.cx} ${b.top - 3}`;
    } else {
      // Rounded S-elbow between Phase 1->2 (5->6) and Phase 2->3 (9->10)
      const midX = (a.right + b.left) / 2;
      const r = 10;
      const startX = a.right;
      const startY = a.cy;
      const endX = b.left - 3;
      const endY = b.cy;
      d = `M ${startX} ${startY}
           L ${midX - r} ${startY}
           Q ${midX} ${startY}, ${midX} ${startY - r}
           L ${midX} ${endY + r}
           Q ${midX} ${endY}, ${midX + r} ${endY}
           L ${endX} ${endY}`;
    }
    return `<path class="edge-backbone" data-from="${link.from}" data-to="${link.to}" d="${d}" marker-end="url(#m-backbone)" />`;
  }).join("");

  // 2. All 28 Typed Cross-Module Edges
  const typedPaths = TYPED_LINKS.map((link) => {
    const a = rects.get(link.from);
    const b = rects.get(link.to);
    if (!a || !b) return "";

    let d = "";
    if (a.phase === b.phase && Math.abs(link.to - link.from) === 1) {
      // Adjacent vertical inside same column: slight horizontal offset from backbone
      const xShift = link.type === "handoff" ? -14 : link.type === "theory" ? 14 : 26;
      const x = a.cx + xShift;
      d = `M ${x} ${a.bottom} L ${x} ${b.top - 3}`;
    } else if (a.phase === b.phase) {
      // Non-adjacent skip in same column -> outer-left gutter arc
      const idx = leftSkipLinks.findIndex((l) => l.id === link.id);
      const laneX = col1.left - 14 - idx * 14;
      d = `M ${a.left} ${a.cy}
           C ${laneX} ${a.cy}, ${laneX} ${b.cy}, ${b.left - 3} ${b.cy}`;
    } else if (b.phase - a.phase === 1) {
      // Adjacent column bridge -> port-staggered cubic Bezier
      const x1 = a.right;
      const y1 = getPortY(outPorts, link.from, link.id);
      const x2 = b.left - 3;
      const y2 = getPortY(inPorts, link.to, link.id);
      const dx = Math.max(28, (x2 - x1) * 0.48);
      d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
    } else {
      // Long-span Col 1 -> Col 3: route around outer top or bottom corridor (never over Col 2)
      const isTop = link.from === 1;
      if (isTop) {
        const idx = topCorridorLinks.findIndex((l) => l.id === link.id);
        const laneY = Math.min(col1.top, col2.top, col3.top) - 16 - idx * 14;
        const startX = a.cx + (idx === 0 ? -18 : 18);
        const endX = b.cx + (idx === 0 ? -18 : 18);
        const r = 12;
        if (link.to === 10) {
          d = `M ${startX} ${a.top}
               L ${startX} ${laneY + r}
               Q ${startX} ${laneY}, ${startX + r} ${laneY}
               L ${endX - r} ${laneY}
               Q ${endX} ${laneY}, ${endX} ${laneY + r}
               L ${endX} ${b.top - 3}`;
        } else {
          // 1 -> 12 curves over top corridor and down the right margin of Col 3
          const rightLaneX = col3.right + 14;
          d = `M ${startX} ${a.top}
               L ${startX} ${laneY + r}
               Q ${startX} ${laneY}, ${startX + r} ${laneY}
               L ${rightLaneX - r} ${laneY}
               Q ${rightLaneX} ${laneY}, ${rightLaneX} ${laneY + r}
               L ${rightLaneX} ${b.cy - r}
               Q ${rightLaneX} ${b.cy}, ${rightLaneX - r} ${b.cy}
               L ${b.right + 3} ${b.cy}`;
        }
      } else {
        const idx = bottomCorridorLinks.findIndex((l) => l.id === link.id);
        const maxBottom = Math.max(col1.bottom, col2.bottom, col3.bottom);
        const laneY = maxBottom + 16 + idx * 14;
        const gap1X = (col1.right + col2.left) / 2 + (idx === 0 ? -7 : 7);
        const gap2X = (col2.right + col3.left) / 2 + (idx === 0 ? -7 : 7);
        const r = 10;
        const startY = a.cy + 10;
        const endY = b.cy + (idx === 0 ? -8 : 8);
        d = `M ${a.right} ${startY}
             L ${gap1X - r} ${startY}
             Q ${gap1X} ${startY}, ${gap1X} ${startY + r}
             L ${gap1X} ${laneY - r}
             Q ${gap1X} ${laneY}, ${gap1X + r} ${laneY}
             L ${gap2X - r} ${laneY}
             Q ${gap2X} ${laneY}, ${gap2X} ${laneY - r}
             L ${gap2X} ${endY + r}
             Q ${gap2X} ${endY}, ${gap2X + r} ${endY}
             L ${b.left - 3} ${endY}`;
      }
    }

    return `
      <path class="edge-typed type-${link.type}" data-edge-id="${link.id}" d="${d}" marker-end="url(#m-${link.type})" />
      <path class="edge-hit" data-hit-id="${link.id}" d="${d}" />
    `;
  }).join("");

  dom.mapSvg.setAttribute("viewBox", `0 0 ${stageRect.width} ${stageRect.height}`);
  dom.mapSvg.innerHTML = defs + backbonePaths + typedPaths;

  // Attach hover/click listeners on interactive SVG edge hit targets
  dom.mapSvg.querySelectorAll(".edge-hit").forEach((hit) => {
    const edgeId = hit.dataset.hitId;
    const link = TYPED_LINKS.find((l) => l.id === edgeId);
    if (!link) return;

    hit.addEventListener("mouseenter", (e) => showEdgeTooltip(link, e));
    hit.addEventListener("mousemove", (e) => positionFloating(dom.edgeTooltip, e.clientX, e.clientY));
    hit.addEventListener("mouseleave", hideEdgeTooltip);
    hit.addEventListener("click", (e) => {
      e.stopPropagation();
      hideEdgeTooltip();
      openEdgePopover(link, e.clientX, e.clientY);
    });
  });

  updateNetworkState();
}

/* ---------- Ego-Network & Layer Visibility State ---------- */
function updateNetworkState() {
  const focusId = state.hoveredId ?? (state.drawerOpen ? state.selectedId : null);
  const hasLayerFilter = ["handoff", "theory", "spiral"].some((l) => state.activeLayers.has(l));
  const connectedIds = new Set();

  if (focusId !== null) {
    connectedIds.add(focusId);
    TYPED_LINKS.forEach((l) => {
      if (l.from === focusId || l.to === focusId) {
        connectedIds.add(l.from);
        connectedIds.add(l.to);
      }
    });
  }

  // Node emphasis / dimming
  dom.columnsGrid.querySelectorAll(".node-card").forEach((card) => {
    const id = Number(card.dataset.moduleId);
    const isDimmed = focusId !== null && !connectedIds.has(id);
    card.classList.toggle("is-dimmed", isDimmed);
    card.classList.toggle("is-connected", focusId !== null && id !== focusId && connectedIds.has(id));
  });

  // Backbone muting when inspecting ego-network or global typed layers
  dom.mapSvg.querySelectorAll(".edge-backbone").forEach((path) => {
    path.classList.toggle("is-muted", focusId !== null || hasLayerFilter);
  });

  // Typed edge visibility & interactivity
  TYPED_LINKS.forEach((link) => {
    const visual = dom.mapSvg.querySelector(`.edge-typed[data-edge-id="${link.id}"]`);
    const hit = dom.mapSvg.querySelector(`.edge-hit[data-hit-id="${link.id}"]`);
    if (!visual || !hit) return;

    const layerActive = state.activeLayers.has(link.type);
    const inEgo = focusId !== null && (link.from === focusId || link.to === focusId);
    const isPinned = state.pinnedEdgeId === link.id;

    let visible = false;
    visual.classList.remove("is-visible", "is-ego", "is-dimmed", "is-active-edge");

    if (isPinned) {
      visual.classList.add("is-active-edge");
      visible = true;
    } else if (focusId !== null) {
      if (inEgo) {
        visual.classList.add("is-ego");
        visible = true;
      } else if (layerActive) {
        visual.classList.add("is-dimmed");
      }
    } else if (layerActive) {
      visual.classList.add("is-visible");
      visible = true;
    }

    hit.classList.toggle("is-interactive", visible);
  });
}

/* ---------- Edge Hover Tooltip & Click Popover ---------- */
function positionFloating(el, clientX, clientY) {
  const pad = 14;
  const rect = el.getBoundingClientRect();
  let left = clientX + pad;
  let top = clientY + pad;

  if (left + rect.width > window.innerWidth - pad) {
    left = Math.max(pad, clientX - rect.width - pad);
  }
  if (top + rect.height > window.innerHeight - pad) {
    top = Math.max(pad, clientY - rect.height - pad);
  }

  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
}

function showEdgeTooltip(link, event) {
  const meta = LINK_TYPES[link.type];
  dom.edgeTooltip.innerHTML = `
    <strong>${esc(meta.label)} · W${link.from} &rarr; W${link.to}</strong>
    ${esc(link.reason)}
  `;
  dom.edgeTooltip.hidden = false;
  positionFloating(dom.edgeTooltip, event.clientX, event.clientY);
}

function hideEdgeTooltip() {
  dom.edgeTooltip.hidden = true;
}

function openEdgePopover(link, clientX, clientY) {
  state.pinnedEdgeId = link.id;
  const meta = LINK_TYPES[link.type];
  const src = getModule(link.from);
  const dst = getModule(link.to);

  dom.edgePopover.innerHTML = `
    <div class="popover-head">
      <span class="type-pill type-${link.type}">${esc(meta.label)}</span>
      <button type="button" class="popover-close" aria-label="Close">&times;</button>
    </div>
    <p class="popover-route">Week ${src.id}: ${esc(src.title)} &rarr; Week ${dst.id}: ${esc(dst.title)}</p>
    <p class="popover-reason">${esc(link.reason)}</p>
    <div class="popover-actions">
      <button type="button" class="popover-jump" data-open
