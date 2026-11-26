// Page renderers for NusaStat. Each view returns HTML, then draws its charts
// into the canvases it just rendered. All controls are wired here and work
// without any network request.

import {
  KPI, GDP_GROWTH, GDP_PER_CAPITA, SECTORS, POPULATION_TREND, AGE_GROUPS,
  POVERTY, UNEMPLOYMENT, STUNTING, SCHOOL_PARTICIPATION, EDUCATION, HEALTH,
  PROVINCES, ISLANDS, RELEASES, fmt, fmtInt,
} from "./data.js";
import { lineChart, barChart, donutChart, pyramidChart, hbarChart } from "./charts.js";

function kpiCard(k, gold = false) {
  return `<div class="kpi${gold ? " gold" : ""}">
    <div class="k-label">${k.label}</div>
    <div class="k-value">${k.value}</div>
    <div class="k-sub">${k.sub}</div>
    <div class="src">Sumber: ${k.source}</div>
  </div>`;
}

function hero(title, lede, pills) {
  return `<section class="hero"><h1>${title}</h1><p class="lede">${lede}</p>
    <div class="hero-strip">${pills.map((p) => `<span class="pill">${p}</span>`).join("")}</div></section>`;
}

function releasesCard() {
  return `<section class="card"><h2>Rilis terbaru BPS</h2>
    <p class="lede">Berita Resmi Statistik yang dikutip di situs ini.</p>
    <ul class="release-list">${RELEASES.map(([d, t, s]) =>
      `<li><span class="r-date">${d}</span><span>${t}<br><small>${s}</small></span></li>`).join("")}</ul>
  </section>`;
}

function topProvincesCard() {
  const top = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 5);
  return `<section class="card"><h2>Provinsi terpadat</h2>
    <p class="lede">Lima provinsi dengan penduduk terbanyak, 2024.</p>
    <table class="data"><thead><tr><th>#</th><th>Provinsi</th><th class="num">Penduduk (jt)</th><th class="num">Pangsa</th></tr></thead>
    <tbody>${top.map((p, i) => `<tr><td class="rank">${i + 1}</td><td>${p.name}</td>
      <td class="num">${fmt(p.pop)}</td><td class="num">${fmt(p.share)}%</td></tr>`).join("")}</tbody></table>
    <p class="src">Sumber: BPS, estimasi pertengahan 2024. <a href="#/provinsi">Lihat semua 38 provinsi →</a></p>
  </section>`;
}

// ---------------------------------------------------------------- overview
export function viewOverview() {
  return `<div class="wrap">
    ${hero("Indonesia dalam Angka", "Portal statistik nasional Indonesia: penduduk 281,60 juta jiwa, ekonomi terbesar di Asia Tenggara, dan pembangunan manusia yang terus membaik. Semua angka resmi, lengkap dengan sumber dan tahunnya.",
      ["<b>281,60 jt</b> penduduk (2024)", "<b>5,03%</b> pertumbuhan ekonomi", "<b>8,57%</b> kemiskinan — terendah sepanjang sejarah", "<b>75,02</b> IPM"])}
    <div class="kpis">
      ${kpiCard(KPI.population, true)}${kpiCard(KPI.gdp)}${kpiCard(KPI.growth)}${kpiCard(KPI.poverty)}
    </div>
    <div class="grid2">
      <section class="card"><h2>Pertumbuhan ekonomi, 2015–2024</h2>
        <p class="lede">Laju pertumbuhan PDB riil (% y-on-y). Kontraksi 2020 adalah dampak pandemi COVID-19.</p>
        <div class="chart-wrap"><canvas class="chart" id="ch-growth"></canvas></div>
        <p class="src">Sumber: BPS, 2024. 2024: 5,03%.</p>
      </section>
      <section class="card"><h2>Piramida penduduk 2024</h2>
        <p class="lede">Indonesia masih muda: kelompok umur 10–29 tahun adalah yang terbesar, masing-masing 47,4 juta jiwa.</p>
        <div class="chart-wrap"><canvas class="chart" id="ch-pyramid"></canvas></div>
      </section>
    </div>
    <div class="grid2 wide-left">
      ${topProvincesCard()}
      ${releasesCard()}
    </div>
    <div class="note"><b>Cara memakai situs ini:</b> pilih topik di navigasi atas — Penduduk, Ekonomi,
      Kesehatan, Pendidikan, atau Provinsi — untuk menjelajahi angka Indonesia. Setiap halaman punya
      grafik dan tabel yang bisa dicari, diurutkan, dan difilter.</div>
  </div>`;
}
export function drawOverview() {
  lineChart(document.getElementById("ch-growth"), GDP_GROWTH, {
    height: 250, valFmt: (v) => v.toFixed(2) + "%", tickFmt: (t) => t + "%",
  });
  pyramidChart(document.getElementById("ch-pyramid"), AGE_GROUPS, { height: 250 });
}

// -------------------------------------------------------------- population
export function viewPopulation() {
  return `<div class="wrap">
    <div class="pagehead"><h1>Penduduk Indonesia</h1>
      <p>281,60 juta jiwa pada pertengahan 2024 — negara berpenduduk terbesar keempat di dunia.
      Penduduk tersebar di 38 provinsi dan 17 ribu pulau, dengan Jawa menampung 56% penduduk di 7% luas daratan.</p></div>
    <div class="kpis">
      ${kpiCard(KPI.population, true)}
      <div class="kpi"><div class="k-label">Kepadatan</div><div class="k-value">147 /km²</div>
        <div class="k-sub">281,60 jt jiwa di 1.916.907 km² daratan</div><div class="src">Sumber: BPS, 2024</div></div>
      <div class="kpi"><div class="k-label">Penduduk perkotaan</div><div class="k-value">58,6%</div>
        <div class="k-sub">165 juta jiwa tinggal di kota</div><div class="src">Sumber: BPS, 2024</div></div>
      <div class="kpi"><div class="k-label">Sensus 2020</div><div class="k-value">270,20 jt</div>
        <div class="k-sub">Hasil Sensus Penduduk 2020</div><div class="src">Sumber: BPS, 2020</div></div>
    </div>
    <div class="grid2">
      <section class="card"><h2>Piramida penduduk 2024</h2>
        <p class="lede">Juta jiwa per kelompok umur sepuluh tahunan. Bentuk piramida yang melebar di bawah
        menunjukkan penduduk muda yang besar.</p>
        <div class="chart-wrap"><canvas class="chart" id="ch-pyramid2"></canvas></div>
      </section>
      <section class="card"><h2>Pertumbuhan penduduk, 2015–2024</h2>
        <p class="lede">Juta jiwa. Penduduk bertambah sekitar 2,9 juta jiwa per tahun dalam satu dekade terakhir.</p>
        <div class="chart-wrap"><canvas class="chart" id="ch-poptrend"></canvas></div>
        <p class="src">Sumber: BPS — proyeksi penduduk dan Sensus Penduduk 2020.</p>
      </section>
    </div>
    <div class="note"><b>Membaca piramida:</b> kelompok umur 0–9 tahun (44,7 juta) sedikit lebih kecil
      dari 20–29 tahun (47,4 juta) — tanda angka kelahiran mulai menurun, sementara penduduk usia kerja
      (15–64 tahun) mencapai sekitar 68% dari total penduduk.</div>
  </div>`;
}
export function drawPopulation() {
  pyramidChart(document.getElementById("ch-pyramid2"), AGE_GROUPS, { height: 280 });
  lineChart(document.getElementById("ch-poptrend"), POPULATION_TREND, {
    height: 250, valFmt: (v) => v.toFixed(1), tickFmt: (t) => Math.round(t) + " jt",
  });
}

// ----------------------------------------------------------------- economy
const TRADE = [
  [2021, 231.61, 196.27, 35.34],
  [2022, 291.90, 237.44, 54.46],
  [2023, 258.82, 221.93, 36.89],
  [2024, 264.70, 233.66, 31.04],
];

export function viewEconomy() {
  return `<div class="wrap">
    <div class="pagehead"><h1>Ekonomi Indonesia</h1>
      <p>PDB Rp22.139,0 triliun pada 2024 (US$1.396,3 miliar) dengan pertumbuhan 5,03%.
      Industri pengolahan adalah lapangan usaha terbesar, dan neraca perdagangan surplus
      56 bulan berturut-turut sejak Mei 2020.</p></div>
    <div class="kpis">
      ${kpiCard(KPI.gdp, true)}${kpiCard(KPI.growth)}${kpiCard(KPI.gdpCapita)}${kpiCard(KPI.exports)}
    </div>
    <div class="kpis">
      ${kpiCard(KPI.inflation)}
      ${kpiCard(KPI.reserves)}
      <div class="kpi"><div class="k-label">Realisasi investasi</div><div class="k-value">Rp1.714,2 T</div>
        <div class="k-sub">2024, naik 20,8% dari 2023</div><div class="src">Sumber: BKPM, 2024</div></div>
      <div class="kpi"><div class="k-label">Kurs rupiah</div><div class="k-value">Rp16.157</div>
        <div class="k-sub">Per dolar AS, akhir Desember 2024</div><div class="src">Sumber: Bank Indonesia, 2024</div></div>
    </div>
    <div class="grid2">
      <section class="card"><h2>Struktur PDB 2024</h2>
        <p class="lede">Pangsa lapangan usaha terhadap PDB harga berlaku (%).</p>
        <div class="chart-wrap"><canvas class="chart" id="ch-sectors"></canvas></div>
        <div class="legend" id="sector-legend"></div>
        <p class="src">Sumber: BPS, 2024.</p>
      </section>
      <section class="card"><h2 id="econ-chart-title">Pertumbuhan PDB, 2015–2024</h2>
        <p class="lede">Pilih metrik di bawah untuk mengganti grafik.</p>
        <div class="controls"><div class="seg" id="econ-seg">
          <button data-metric="growth" class="active">Pertumbuhan (%)</button>
          <button data-metric="capita">PDB per kapita (US$)</button>
        </div></div>
        <div class="chart-wrap"><canvas class="chart" id="ch-econ"></canvas></div>
        <p class="src" id="econ-src">Sumber: BPS, 2024.</p>
      </section>
    </div>
    <section class="card"><h2>Perdagangan luar negeri, 2021–2024</h2>
      <p class="lede">Miliar dolar AS. Ekspor 2024 didorong nonmigas US$248,83 miliar; impor nonmigas US$197,38 miliar.</p>
      <table class="data"><thead><tr><th>Tahun</th><th class="num">Ekspor</th><th class="num">Impor</th><th class="num">Neraca</th></tr></thead>
      <tbody>${TRADE.map(([y, e, i, n]) => `<tr><td>${y}</td><td class="num">US$${fmt(e)} M</td>
        <td class="num">US$${fmt(i)} M</td><td class="num">US$${fmt(n)} M surplus</td></tr>`).join("")}</tbody></table>
      <p class="src">Sumber: BPS (diolah Kemendag), 2024.</p>
    </section>
  </div>`;
}
export function drawEconomy() {
  const colors = donutChart(document.getElementById("ch-sectors"), SECTORS, {
    height: 240, centerTop: "100%", centerBottom: "PDB 2024",
  });
  document.getElementById("sector-legend").innerHTML = SECTORS.map(([label, v], i) =>
    `<span><i style="background:${colors[i % colors.length]}"></i>${label} — ${v}%</span>`).join("");
  const draw = (metric) => {
    const title = document.getElementById("econ-chart-title");
    const src = document.getElementById("econ-src");
    if (metric === "capita") {
      title.textContent = "PDB per kapita, 2015–2024";
      src.textContent = "Sumber: Bank Dunia; 2024: BPS (US$4.960,3).";
      lineChart(document.getElementById("ch-econ"), GDP_PER_CAPITA, {
        height: 250, color: "#b3402e", valFmt: (v) => "$" + fmtInt(v), tickFmt: (t) => "$" + fmtInt(t),
      });
    } else {
      title.textContent = "Pertumbuhan PDB, 2015–2024";
      src.textContent = "Sumber: BPS, 2024.";
      lineChart(document.getElementById("ch-econ"), GDP_GROWTH, {
        height: 250, valFmt: (v) => v.toFixed(2) + "%", tickFmt: (t) => t + "%",
      });
    }
  };
  draw("growth");
  document.getElementById("econ-seg").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-metric]");
    if (!btn) return;
    document.querySelectorAll("#econ-seg button").forEach((b) => b.classList.toggle("active", b === btn));
    draw(btn.dataset.metric);
  });
}

// ------------------------------------------------------------------ health
export function viewHealth() {
  return `<div class="wrap">
    <div class="pagehead"><h1>Kesehatan</h1>
      <p>Angka harapan hidup 73,93 tahun (2024) — naik dari 71,47 tahun pada 2020.
      Stunting balita turun ke 19,8% pada 2024, dan hampir seluruh penduduk sudah terdaftar
      dalam Jaminan Kesehatan Nasional.</p></div>
    <div class="kpis">
      ${kpiCard(KPI.lifeExpectancy, true)}
      <div class="kpi"><div class="k-label">Stunting balita</div><div class="k-value">${HEALTH.stunting}</div>
        <div class="k-sub">${HEALTH.stuntingNote}</div><div class="src">Sumber: Kemenkes (SSGI), 2024</div></div>
      <div class="kpi"><div class="k-label">Cakupan JKN</div><div class="k-value">${HEALTH.jkn}</div>
        <div class="k-sub">${HEALTH.jknNote}</div><div class="src">Sumber: BPJS Kesehatan, 2024</div></div>
      ${kpiCard(KPI.hdi)}
    </div>
    <div class="grid2">
      <section class="card"><h2>Stunting balita menurun, 2018–2024</h2>
        <p class="lede">Prevalensi stunting (% balita). Target pemerintah: di bawah 14% pada 2024 —
        belum tercapai, tetapi tren turunnya konsisten.</p>
        <div class="chart-wrap"><canvas class="chart" id="ch-stunting"></canvas></div>
        <p class="src">Sumber: Riskesdas 2018; Survei Status Gizi Indonesia (SSGI) 2019–2024, Kemenkes.</p>
      </section>
      <section class="card"><h2>Kemiskinan dan pengangguran</h2>
        <p class="lede">Dua penentu kesehatan masyarakat — keduanya membaik pada 2024.</p>
        <div class="chart-wrap"><canvas class="chart" id="ch-poverty"></canvas></div>
        <p class="src">Sumber: BPS — kemiskinan September 2024: 8,57% (24,06 juta orang);
          garis kemiskinan Rp595.242 per kapita per bulan.</p>
        <p class="hint">Gunakan tab di bawah untuk melihat pengangguran terbuka.</p>
        <div class="tabs" id="health-tabs">
          <button data-tab="poverty" class="active">Kemiskinan (%)</button>
          <button data-tab="unemp">Pengangguran (%)</button>
        </div>
      </section>
    </div>
    <div class="note"><b>${HEALTH.jknDetail}</b> JKN adalah program jaminan kesehatan
      terbesar di dunia berdasarkan jumlah peserta. Cakupan ini dihitung dari peserta aktif
      dan terdaftar terhadap total penduduk.</div>
  </div>`;
}
export function drawHealth() {
  barChart(document.getElementById("ch-stunting"), STUNTING, {
    height: 250, valFmt: (v) => v.toFixed(1) + "%", tickFmt: (t) => t + "%",
  });
  const draw = (tab) => {
    if (tab === "unemp") {
      lineChart(document.getElementById("ch-poverty"), UNEMPLOYMENT, {
        height: 250, color: "#b3402e", valFmt: (v) => v.toFixed(2) + "%", tickFmt: (t) => t + "%",
      });
    } else {
      lineChart(document.getElementById("ch-poverty"), POVERTY, {
        height: 250, valFmt: (v) => v.toFixed(2) + "%", tickFmt: (t) => t + "%",
      });
    }
  };
  draw("poverty");
  document.getElementById("health-tabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tab]");
    if (!btn) return;
    document.querySelectorAll("#health-tabs button").forEach((b) => b.classList.toggle("active", b === btn));
    draw(btn.dataset.tab);
  });
}

// --------------------------------------------------------------- education
export function viewEducation() {
  return `<div class="wrap">
    <div class="pagehead"><h1>Pendidikan</h1>
      <p>Harapan lama sekolah 13,21 tahun dan rata-rata lama sekolah 8,85 tahun pada 2024 —
      rata-rata orang Indonesia bersekolah setara kelas 3 SMP. Partisipasi sekolah dasar
      hampir universal, tetapi turun tajam di jenjang menengah atas.</p></div>
    <div class="kpis">
      <div class="kpi gold"><div class="k-label">Harapan lama sekolah</div><div class="k-value">${EDUCATION.hls}</div>
        <div class="k-sub">${EDUCATION.hlsNote}</div><div class="src">Sumber: BPS, 2024</div></div>
      <div class="kpi"><div class="k-label">Rata-rata lama sekolah</div><div class="k-value">${EDUCATION.rls}</div>
        <div class="k-sub">${EDUCATION.rlsNote}</div><div class="src">Sumber: BPS, 2024</div></div>
      ${kpiCard(KPI.hdi)}
      <div class="kpi"><div class="k-label">Pengeluaran riil per kapita</div><div class="k-value">Rp12,34 jt</div>
        <div class="k-sub">Disesuaikan, per tahun, 2024</div><div class="src">Sumber: BPS (komponen IPM), 2024</div></div>
    </div>
    <div class="grid2">
      <section class="card"><h2>Partisipasi sekolah menurut usia, 2024</h2>
        <p class="lede">Angka partisipasi sekolah (%) — hampir semua anak usia SD bersekolah,
        tetapi hanya 3 dari 4 remaja usia SMA yang masih sekolah.</p>
        <div class="chart-wrap"><canvas class="chart" id="ch-aps"></canvas></div>
        <p class="src">Sumber: BPS, 2024.</p>
      </section>
      <section class="card"><h2>Kesenjangan antarprovinsi</h2>
        <p class="lede">Harapan lama sekolah tertinggi dan terendah, 2024.</p>
        <div class="bar-row"><span>DI Yogyakarta</span><span class="bar"><i style="width:100%"></i></span><span class="val">15,70 th</span></div>
        <div class="bar-row"><span>Aceh</span><span class="bar"><i style="width:91.6%"></i></span><span class="val">14,39 th</span></div>
        <div class="bar-row"><span>Sumatera Barat</span><span class="bar"><i style="width:91.1%"></i></span><span class="val">14,30 th</span></div>
        <div class="bar-row"><span>Nasional</span><span class="bar"><i class="gold" style="width:84.1%"></i></span><span class="val">13,21 th</span></div>
        <div class="bar-row"><span>Papua Pegunungan</span><span class="bar"><i style="width:63.5%"></i></span><span class="val">9,97 th</span></div>
        <div class="bar-row"><span>Papua Tengah</span><span class="bar"><i style="width:61.3%"></i></span><span class="val">9,63 th</span></div>
        <p class="src">Sumber: BPS, Berita Resmi Statistik IPM 2024 (15 Nov 2024). Sejak 2024 BPS
          menyajikan IPM untuk 38 provinsi; Sulawesi Barat naik dari kategori sedang ke tinggi (IPM 70,46).</p>
        <div class="note"><b>Membaca angka:</b> harapan lama sekolah mengukur berapa lama anak usia
          7 tahun diperkirakan bersekolah; rata-rata lama sekolah mengukur pendidikan yang sudah
          ditempuh penduduk usia 25 tahun ke atas.</div>
      </section>
    </div>
  </div>`;
}
export function drawEducation() {
  hbarChart(document.getElementById("ch-aps"), SCHOOL_PARTICIPATION, {
    labelW: 190, valFmt: (v) => v.toFixed(2) + "%",
  });
}

// ----------------------------------------------------------------- regions
let regionState = { q: "", island: "Semua", sort: "pop", dir: -1, selected: null };

function filteredProvinces() {
  let list = PROVINCES.filter((p) =>
    (regionState.island === "Semua" || p.island === regionState.island) &&
    p.name.toLowerCase().includes(regionState.q.toLowerCase()));
  const key = regionState.sort;
  list = [...list].sort((a, b) => {
    const av = key === "name" ? a.name : a[key];
    const bv = key === "name" ? b.name : b[key];
    if (typeof av === "string") return regionState.dir * av.localeCompare(bv, "id");
    return regionState.dir * (av - bv);
  });
  return list;
}

function regionTableHTML(list) {
  if (!list.length) return `<div class="empty">Tidak ada provinsi yang cocok dengan pencarian “${regionState.q}”.</div>`;
  return `<table class="data"><thead><tr><th>#</th><th>Provinsi</th><th>Pulau</th>
    <th class="num">Penduduk (jt)</th><th class="num">Luas (km²)</th><th class="num">Kepadatan (/km²)</th></tr></thead>
    <tbody>${list.map((p, i) => `<tr data-prov="${p.name}" style="cursor:pointer" title="Klik untuk detail">
      <td class="rank">${i + 1}</td><td><strong>${p.name}</strong></td><td>${p.island}</td>
      <td class="num">${fmt(p.pop)}</td><td class="num">${fmtInt(p.area)}</td>
      <td class="num">${fmtInt(p.density)}</td></tr>`).join("")}</tbody></table>
    <p class="src">Menampilkan ${list.length} dari 38 provinsi. Klik baris untuk melihat detail provinsi.
    Sumber: BPS, estimasi pertengahan 2024; luas daratan BPS.</p>`;
}

function regionDetailHTML(p) {
  return `<div class="detail" id="prov-detail"><h3>${p.name}</h3>
    <p class="big">${fmt(p.pop)} juta jiwa <small>· ${fmt(p.share)}% penduduk Indonesia</small></p>
    <p>Pulau ${p.island} · Luas daratan ${fmtInt(p.area)} km² · Kepadatan ${fmtInt(p.density)} jiwa/km².
    ${p.name === "DKI Jakarta" ? "Provinsi terpadat di Indonesia — lebih dari 15.000 jiwa per km²."
      : p.name === "Jawa Barat" ? "Provinsi berpenduduk terbanyak di Indonesia."
      : p.density < 20 ? "Salah satu provinsi dengan kepadatan terendah — wilayah luas dengan penduduk tersebar."
      : "Kepadatan di atas rata-rata nasional (147 jiwa/km²)."}</p>
    <p class="src">Sumber: BPS, estimasi pertengahan 2024.</p></div>`;
}

export function viewRegions() {
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  return `<div class="wrap">
    <div class="pagehead"><h1>38 Provinsi</h1>
      <p>Jelajahi penduduk 38 provinsi Indonesia. Cari berdasarkan nama, saring berdasarkan pulau,
      urutkan berdasarkan penduduk, luas, atau kepadatan — lalu klik baris mana pun untuk detailnya.</p></div>
    <div class="controls">
      <input type="search" id="prov-search" placeholder="Cari provinsi… (mis. Jawa Barat)" aria-label="Cari provinsi" value="${regionState.q}">
      <div class="tabs" id="island-tabs" style="margin:0">${ISLANDS.map((is) =>
        `<button data-island="${is}" class="${regionState.island === is ? "active" : ""}">${is}</button>`).join("")}</div>
    </div>
    <div class="controls sortbar">
      <span class="hint">Urutkan:</span>
      <button class="btn${regionState.sort === "pop" ? " active" : ""}" data-sort="pop">Penduduk ${regionState.sort === "pop" ? (regionState.dir === -1 ? "↓" : "↑") : ""}</button>
      <button class="btn${regionState.sort === "area" ? " active" : ""}" data-sort="area">Luas ${regionState.sort === "area" ? (regionState.dir === -1 ? "↓" : "↑") : ""}</button>
      <button class="btn${regionState.sort === "density" ? " active" : ""}" data-sort="density">Kepadatan ${regionState.sort === "density" ? (regionState.dir === -1 ? "↓" : "↑") : ""}</button>
      <button class="btn${regionState.sort === "name" ? " active" : ""}" data-sort="name">Nama ${regionState.sort === "name" ? (regionState.dir === -1 ? "↓" : "↑") : ""}</button>
    </div>
    <div class="grid2">
      <section class="card"><h2>10 provinsi terpadat</h2>
        <p class="lede">Juta jiwa, 2024. Enam provinsi di Jawa menampung lebih dari separuh penduduk Indonesia.</p>
        <div class="chart-wrap"><canvas class="chart" id="ch-top10"></canvas></div>
        <p class="src">Sumber: BPS, estimasi pertengahan 2024.</p>
      </section>
      <section class="card"><h2>Provinsi</h2>
        <div id="prov-table">${regionTableHTML(filteredProvinces())}</div>
        <div id="prov-detail-slot">${regionState.selected ? regionDetailHTML(regionState.selected) : ""}</div>
      </section>
    </div>
    <div class="note"><b>Tahukah Anda?</b> Jawa Barat (49,94 juta) berpenduduk lebih banyak daripada
      seluruh Pulau Kalimantan (17,44 juta) dan seluruh Pulau Sulawesi (20,72 juta) digabungkan.
      Sebaliknya, Papua Pegunungan (1,46 juta) luasnya 51.213 km² — lebih luas dari Jawa Timur —
      dengan kepadatan hanya 29 jiwa/km².</div>
  </div>`;
}

export function drawRegions() {
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  hbarChart(document.getElementById("ch-top10"),
    top10.map((p) => [p.name, p.pop]), { labelW: 150, valFmt: (v) => fmt(v) + " jt" });

  const tableSlot = document.getElementById("prov-table");
  const detailSlot = document.getElementById("prov-detail-slot");
  const refresh = () => {
    tableSlot.innerHTML = regionTableHTML(filteredProvinces());
    document.querySelectorAll(".sortbar .btn").forEach((b) => {
      const on = b.dataset.sort === regionState.sort;
      b.classList.toggle("active", on);
      b.textContent = b.textContent.replace(/ [↓↑]$/, "") + (on ? (regionState.dir === -1 ? " ↓" : " ↑") : "");
    });
  };
  document.getElementById("prov-search").addEventListener("input", (e) => {
    regionState.q = e.target.value;
    refresh();
  });
  document.getElementById("island-tabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-island]");
    if (!btn) return;
    regionState.island = btn.dataset.island;
    document.querySelectorAll("#island-tabs button").forEach((b) => b.classList.toggle("active", b === btn));
    refresh();
  });
  document.querySelector(".sortbar").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-sort]");
    if (!btn) return;
    if (regionState.sort === btn.dataset.sort) regionState.dir *= -1;
    else { regionState.sort = btn.dataset.sort; regionState.dir = btn.dataset.sort === "name" ? 1 : -1; }
    refresh();
  });
  tableSlot.addEventListener("click", (e) => {
    const tr = e.target.closest("tr[data-prov]");
    if (!tr) return;
    regionState.selected = PROVINCES.find((p) => p.name === tr.dataset.prov);
    detailSlot.innerHTML = regionDetailHTML(regionState.selected);
    detailSlot.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}
