// Hand-drawn canvas charts for NusaStat — no chart library, no network.
// Every chart function draws into a <canvas> and returns nothing; the canvas
// carries its size in CSS and the drawing is scaled by devicePixelRatio.

const TEAL = "#0e4f4a";
const TEAL_DARK = "#0b3b38";
const GOLD = "#e8a33d";
const GOLD_LT = "#f2c063";
const GREY = "#8a978f";
const GRID = "#e3ddc9";
const RED = "#b3402e";
const GREEN = "#1f7a4d";

function setup(canvas, cssH) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth || 600;
  const h = cssH;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.style.height = h + "px";
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.font = "12px system-ui, sans-serif";
  return { ctx, w, h };
}

function niceMax(v) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 3 ? 3 : n <= 5 ? 5 : 10) * p;
}

function axes(ctx, x0, y0, x1, y1) {
  ctx.strokeStyle = "#c9c2ab";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(x1, y1);
  ctx.stroke();
}

function gridlines(ctx, x0, x1, yTop, yBottom, ticks, fmtTick) {
  ctx.strokeStyle = GRID;
  ctx.fillStyle = "#5c6b68";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (const t of ticks) {
    const y = yBottom - (t / ticks[ticks.length - 1]) * (yBottom - yTop);
    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    ctx.fillText(fmtTick(t), x0 - 6, y);
  }
}

// Line chart with dots and value labels: series = [[label, value], ...]
export function lineChart(canvas, series, opts = {}) {
  const { ctx, w, h } = setup(canvas, opts.height || 240);
  const padL = opts.padL ?? 44, padR = 14, padT = 18, padB = 26;
  const x0 = padL, x1 = w - padR, y0 = padT, y1 = h - padB;
  const vals = series.map(([, v]) => v);
  const lo = Math.min(0, ...vals);
  const hi = niceMax(Math.max(...vals));
  const ticks = [0, hi / 2, hi];
  gridlines(ctx, x0, x1, y0, y1, ticks, (t) => (opts.tickFmt ? opts.tickFmt(t) : String(t)));
  axes(ctx, x0, y0, x1, y1);
  const xs = (i) => x0 + (i / (series.length - 1)) * (x1 - x0);
  const ys = (v) => y1 - ((v - lo) / (hi - lo)) * (y1 - y0);
  // area fill
  ctx.beginPath();
  series.forEach(([ , v], i) => { i === 0 ? ctx.moveTo(xs(i), ys(v)) : ctx.lineTo(xs(i), ys(v)); });
  ctx.lineTo(xs(series.length - 1), y1); ctx.lineTo(xs(0), y1); ctx.closePath();
  ctx.fillStyle = "rgba(20,112,106,.12)"; ctx.fill();
  // line
  ctx.beginPath();
  series.forEach(([, v], i) => { i === 0 ? ctx.moveTo(xs(i), ys(v)) : ctx.lineTo(xs(i), ys(v)); });
  ctx.strokeStyle = opts.color || TEAL; ctx.lineWidth = 2.4; ctx.lineJoin = "round"; ctx.stroke();
  // dots + labels
  ctx.textAlign = "center"; ctx.textBaseline = "bottom";
  series.forEach(([label, v], i) => {
    ctx.beginPath(); ctx.arc(xs(i), ys(v), 3.6, 0, Math.PI * 2);
    ctx.fillStyle = v < 0 ? RED : (opts.color || TEAL); ctx.fill();
    ctx.fillStyle = TEAL_DARK;
    ctx.font = "bold 11px system-ui, sans-serif";
    ctx.fillText(opts.valFmt ? opts.valFmt(v) : String(v), xs(i), ys(v) - 7);
    ctx.font = "11px system-ui, sans-serif";
    ctx.fillStyle = "#5c6b68";
    ctx.textBaseline = "top";
    ctx.fillText(String(label), xs(i), y1 + 7);
    ctx.textBaseline = "bottom";
  });
}

// Vertical bar chart: series = [[label, value], ...]
export function barChart(canvas, series, opts = {}) {
  const { ctx, w, h } = setup(canvas, opts.height || 240);
  const padL = opts.padL ?? 44, padR = 10, padT = 20, padB = 26;
  const x0 = padL, x1 = w - padR, y0 = padT, y1 = h - padB;
  const vals = series.map(([, v]) => v);
  const hi = niceMax(Math.max(...vals));
  const ticks = [0, hi / 2, hi];
  gridlines(ctx, x0, x1, y0, y1, ticks, (t) => (opts.tickFmt ? opts.tickFmt(t) : String(t)));
  axes(ctx, x0, y0, x1, y1);
  const slot = (x1 - x0) / series.length;
  const bw = Math.min(46, slot * 0.62);
  ctx.textAlign = "center";
  series.forEach(([label, v], i) => {
    const cx = x0 + slot * (i + 0.5);
    const bh = (v / hi) * (y1 - y0);
    const neg = v < 0;
    ctx.fillStyle = neg ? RED : (opts.colors ? opts.colors[i % opts.colors.length] : TEAL);
    ctx.beginPath();
    ctx.roundRect(cx - bw / 2, neg ? y1 : y1 - bh, bw, Math.max(2, Math.abs(bh)), [4, 4, 0, 0]);
    ctx.fill();
    ctx.fillStyle = TEAL_DARK;
    ctx.font = "bold 11px system-ui, sans-serif";
    ctx.textBaseline = "bottom";
    ctx.fillText(opts.valFmt ? opts.valFmt(v) : String(v), cx, (neg ? y1 : y1 - bh) - 4);
    ctx.font = "11px system-ui, sans-serif";
    ctx.fillStyle = "#5c6b68";
    ctx.textBaseline = "top";
    ctx.fillText(String(label), cx, y1 + 7);
    ctx.textBaseline = "bottom";
  });
}

// Donut chart with a side legend rendered by the caller: series = [[label, value], ...]
export function donutChart(canvas, series, opts = {}) {
  const { ctx, w, h } = setup(canvas, opts.height || 230);
  const cx = w / 2, cy = h / 2, r = Math.min(w, h) / 2 - 14, inner = r * 0.58;
  const total = series.reduce((s, [, v]) => s + v, 0);
  const colors = opts.colors || [TEAL, GOLD, "#2b6cb0", "#7a9a4d", "#b3402e", "#6b5b95", "#3d8b8d", "#c96f2e", "#9aa38f"];
  let a = -Math.PI / 2;
  series.forEach(([, v], i) => {
    const sweep = (v / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, a, a + sweep);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    a += sweep;
  });
  ctx.beginPath(); ctx.arc(cx, cy, inner, 0, Math.PI * 2); ctx.fillStyle = "#fffdf7"; ctx.fill();
  ctx.fillStyle = TEAL_DARK;
  ctx.font = "bold 20px system-ui, sans-serif";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(opts.centerTop || "", cx, cy - 11);
  ctx.font = "12px system-ui, sans-serif";
  ctx.fillStyle = "#5c6b68";
  ctx.fillText(opts.centerBottom || "", cx, cy + 11);
  return colors;
}

// Population pyramid: groups = [[label, totalMillions], ...], male 50.2% / female 49.8%
export function pyramidChart(canvas, groups, opts = {}) {
  const { ctx, w, h } = setup(canvas, opts.height || 300);
  const padT = 24, padB = 22, padL = 8, padR = 8;
  const y0 = padT, y1 = h - padB;
  const rowH = (y1 - y0) / groups.length;
  const maxV = Math.max(...groups.map(([, t]) => t * 0.502));
  const gap = 44; // half-width of the centre gutter where age labels sit
  const half = (w - padL - padR) / 2 - gap;
  const cx = w / 2;
  // headers
  ctx.textAlign = "center"; ctx.font = "bold 12px system-ui, sans-serif";
  ctx.fillStyle = TEAL; ctx.fillText("Laki-laki", cx - gap - half / 2, 12);
  ctx.fillStyle = "#8a5a1d"; ctx.fillText("Perempuan", cx + gap + half / 2, 12);
  groups.forEach(([label, total], i) => {
    const y = y0 + i * rowH;
    const m = total * 0.502, f = total * 0.498;
    const mw = (m / maxV) * half, fw = (f / maxV) * half;
    ctx.fillStyle = TEAL;
    ctx.beginPath(); ctx.roundRect(cx - gap - mw, y + 2, mw, rowH - 4, [3, 0, 0, 3]); ctx.fill();
    ctx.fillStyle = GOLD;
    ctx.beginPath(); ctx.roundRect(cx + gap, y + 2, fw, rowH - 4, [0, 3, 3, 0]); ctx.fill();
    // age label in the centre gutter
    ctx.fillStyle = TEAL_DARK; ctx.font = "bold 11px system-ui, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(label, cx, y + rowH / 2);
    // values inside the bars, near their inner ends
    ctx.font = "bold 11px system-ui, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "right"; ctx.fillText(m.toFixed(1), cx - gap - 5, y + rowH / 2);
    ctx.fillStyle = TEAL_DARK;
    ctx.textAlign = "left"; ctx.fillText(f.toFixed(1), cx + gap + 5, y + rowH / 2);
  });
  ctx.textAlign = "center"; ctx.fillStyle = "#5c6b68"; ctx.font = "11px system-ui, sans-serif";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Juta jiwa per kelompok umur — estimasi BPS 2024", cx, h - 6);
}

// Horizontal bar list drawn on canvas: series = [[label, value], ...]
export function hbarChart(canvas, series, opts = {}) {
  const rowH = opts.rowH || 30;
  const { ctx, w, h } = setup(canvas, series.length * rowH + 16);
  const labelW = opts.labelW || 150;
  const valW = 64;
  const x0 = labelW, x1 = w - valW - 6;
  const maxV = Math.max(...series.map(([, v]) => v));
  ctx.font = "13px system-ui, sans-serif";
  series.forEach(([label, v], i) => {
    const y = 8 + i * rowH;
    ctx.fillStyle = TEAL_DARK; ctx.textAlign = "right"; ctx.textBaseline = "middle";
    ctx.fillText(label, x0 - 10, y + rowH / 2 - 2);
    ctx.fillStyle = "#e9e2cd";
    ctx.beginPath(); ctx.roundRect(x0, y, x1 - x0, 16, 8); ctx.fill();
    ctx.fillStyle = i === 0 ? GOLD : TEAL;
    ctx.beginPath(); ctx.roundRect(x0, y, Math.max(4, ((v / maxV) * (x1 - x0))), 16, 8); ctx.fill();
    ctx.fillStyle = TEAL_DARK; ctx.font = "bold 13px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(opts.valFmt ? opts.valFmt(v) : String(v), x1 + 8, y + rowH / 2 - 2);
    ctx.font = "13px system-ui, sans-serif";
  });
}
