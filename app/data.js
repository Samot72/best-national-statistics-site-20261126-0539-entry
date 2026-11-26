// NusaStat data — every figure is a real published figure, with its source and year.
// Main source: Badan Pusat Statistik (BPS). Province figures are BPS mid-2024
// estimates, rounded. No figure here is invented or fetched from the network.

export const META = {
  country: "Indonesia",
  edition: "2024",
  updated: "26 November 2026",
};

export const KPI = {
  population: { value: "281,60 jt", label: "Penduduk", sub: "Estimasi pertengahan 2024", source: "BPS, 2024" },
  gdp: { value: "Rp22.139 T", label: "PDB harga berlaku", sub: "US$1.396,3 miliar", source: "BPS, 2024" },
  gdpCapita: { value: "US$4.960", label: "PDB per kapita", sub: "Rp78,6 juta per orang", source: "BPS, 2024" },
  growth: { value: "5,03%", label: "Pertumbuhan ekonomi", sub: "2024 (y-on-y)", source: "BPS, 2024" },
  lifeExpectancy: { value: "73,93 th", label: "Angka harapan hidup", sub: "Saat lahir, 2024", source: "BPS, 2024" },
  poverty: { value: "8,57%", label: "Penduduk miskin", sub: "24,06 juta orang, Sep 2024", source: "BPS, 2024" },
  unemployment: { value: "4,91%", label: "Pengangguran terbuka", sub: "7,47 juta orang, Agu 2024", source: "BPS, 2024" },
  hdi: { value: "75,02", label: "Indeks Pembangunan Manusia", sub: "Kategori tinggi, 2024", source: "BPS, 2024" },
  inflation: { value: "1,57%", label: "Inflasi tahun kalender", sub: "2024 (Des ke Des)", source: "BPS, 2024" },
  exports: { value: "US$264,70 M", label: "Ekspor barang", sub: "Surplus dagang US$31,04 M, 2024", source: "BPS, 2024" },
  internet: { value: "221,56 jt", label: "Pengguna internet", sub: "79,5% penduduk, 2024", source: "APJII, 2024" },
  reserves: { value: "US$155,7 M", label: "Cadangan devisa", sub: "Akhir Desember 2024", source: "Bank Indonesia, 2024" },
};

// [year, value] — BPS, pertumbuhan PDB riil y-on-y (%)
export const GDP_GROWTH = [
  [2015, 4.88], [2016, 5.03], [2017, 5.07], [2018, 5.17], [2019, 5.02],
  [2020, -2.07], [2021, 3.70], [2022, 5.31], [2023, 5.05], [2024, 5.03],
];

// PDB per kapita nominal, US$ — Bank Dunia (2024: BPS US$4.960,3)
export const GDP_PER_CAPITA = [
  [2015, 3335], [2016, 3605], [2017, 3878], [2018, 3932], [2019, 4150],
  [2020, 3870], [2021, 4350], [2022, 4783], [2023, 4919], [2024, 4960],
];

// Pangsa PDB menurut lapangan usaha, 2024 (%) — BPS
export const SECTORS = [
  ["Industri pengolahan", 18.67],
  ["Perdagangan besar & eceran", 12.85],
  ["Pertanian, kehutanan & perikanan", 12.53],
  ["Konstruksi", 9.45],
  ["Pertambangan & penggalian", 8.15],
  ["Informasi & komunikasi", 7.96],
  ["Administrasi pemerintahan", 7.39],
  ["Transportasi & pergudangan", 5.87],
  ["Lapangan usaha lainnya", 17.13],
];

// [year, penduduk juta jiwa] — BPS (2020: Sensus Penduduk)
export const POPULATION_TREND = [
  [2015, 255.59], [2016, 258.70], [2017, 261.89], [2018, 265.02], [2019, 268.07],
  [2020, 270.20], [2021, 272.68], [2022, 275.77], [2023, 278.69], [2024, 281.60],
];

// Struktur umur 2024, juta jiwa per kelompok sepuluh tahunan (estimasi BPS, dibulatkan).
// Laki-laki 50,2% / perempuan 49,8% dari tiap kelompok.
export const AGE_GROUPS = [
  ["0–9", 44.7], ["10–19", 47.4], ["20–29", 47.4], ["30–39", 44.1],
  ["40–49", 39.0], ["50–59", 30.0], ["60–69", 18.6], ["70+", 9.4],
];

// [year, %] September — BPS
export const POVERTY = [
  [2015, 11.13], [2016, 10.70], [2017, 10.12], [2018, 9.66], [2019, 9.22],
  [2020, 10.19], [2021, 9.71], [2022, 9.57], [2023, 9.36], [2024, 8.57],
];

// [year, %] Agustus — BPS (Tingkat Pengangguran Terbuka)
export const UNEMPLOYMENT = [
  [2015, 6.18], [2016, 5.61], [2017, 5.50], [2018, 5.34], [2019, 5.28],
  [2020, 7.07], [2021, 6.49], [2022, 5.86], [2023, 5.45], [2024, 4.91],
];

// Prevalensi stunting balita (%) — Riskesdas 2018, SSGI 2019–2024 (Kemenkes)
export const STUNTING = [
  [2018, 30.8], [2019, 27.7], [2021, 24.4], [2022, 21.6], [2023, 21.5], [2024, 19.8],
];

// Angka partisipasi sekolah (%) — BPS, 2024
export const SCHOOL_PARTICIPATION = [
  ["Usia 7–12 tahun (SD)", 99.19],
  ["Usia 13–15 tahun (SMP)", 96.17],
  ["Usia 16–18 tahun (SMA)", 74.64],
  ["Usia 19–23 tahun (PT)", 29.01],
];

export const EDUCATION = {
  hls: "13,21 th", hlsNote: "Harapan lama sekolah, 2024",
  rls: "8,85 th", rlsNote: "Rata-rata lama sekolah (25 th+), 2024",
  hlsTop: "DI Yogyakarta 15,70 th — tertinggi; Papua Tengah 9,63 th — terendah (BPS, 2024)",
};

export const HEALTH = {
  stunting: "19,8%", stuntingNote: "Prevalensi stunting balita, SSGI 2024",
  jkn: "98,7%", jknNote: "Penduduk terdaftar JKN, Des 2024",
  jknDetail: "Sekitar 278 juta peserta Jaminan Kesehatan Nasional (BPJS Kesehatan).",
};

// Provinsi: nama, pulau, penduduk (juta, estimasi BPS pertengahan 2024),
// luas daratan (km2, BPS). Kepadatan dihitung.
export const PROVINCES = [
  ["Aceh", "Sumatera", 5.55, 57956],
  ["Sumatera Utara", "Sumatera", 15.59, 72981],
  ["Sumatera Barat", "Sumatera", 5.76, 42013],
  ["Riau", "Sumatera", 6.61, 87024],
  ["Jambi", "Sumatera", 3.63, 50058],
  ["Sumatera Selatan", "Sumatera", 8.84, 91592],
  ["Bengkulu", "Sumatera", 2.07, 19919],
  ["Lampung", "Sumatera", 9.31, 34624],
  ["Kep. Bangka Belitung", "Sumatera", 1.47, 16424],
  ["Kep. Riau", "Sumatera", 2.15, 8201],
  ["DKI Jakarta", "Jawa", 10.56, 664],
  ["Jawa Barat", "Jawa", 49.94, 35378],
  ["Jawa Tengah", "Jawa", 37.89, 32801],
  ["DI Yogyakarta", "Jawa", 3.76, 3133],
  ["Jawa Timur", "Jawa", 41.81, 47803],
  ["Banten", "Jawa", 12.43, 9663],
  ["Bali", "Bali & Nusa Tenggara", 4.36, 5780],
  ["Nusa Tenggara Barat", "Bali & Nusa Tenggara", 5.47, 18572],
  ["Nusa Tenggara Timur", "Bali & Nusa Tenggara", 5.66, 47931],
  ["Kalimantan Barat", "Kalimantan", 5.79, 147307],
  ["Kalimantan Tengah", "Kalimantan", 2.74, 153564],
  ["Kalimantan Selatan", "Kalimantan", 4.22, 38744],
  ["Kalimantan Timur", "Kalimantan", 3.96, 129067],
  ["Kalimantan Utara", "Kalimantan", 0.73, 75467],
  ["Sulawesi Utara", "Sulawesi", 2.70, 13892],
  ["Sulawesi Tengah", "Sulawesi", 3.09, 61841],
  ["Sulawesi Selatan", "Sulawesi", 9.36, 46717],
  ["Sulawesi Tenggara", "Sulawesi", 2.80, 38068],
  ["Gorontalo", "Sulawesi", 1.23, 11257],
  ["Sulawesi Barat", "Sulawesi", 1.54, 16787],
  ["Maluku", "Maluku & Papua", 1.98, 46914],
  ["Maluku Utara", "Maluku & Papua", 1.41, 31983],
  ["Papua Barat", "Maluku & Papua", 1.22, 64134],
  ["Papua", "Maluku & Papua", 1.06, 82680],
  ["Papua Selatan", "Maluku & Papua", 0.54, 117849],
  ["Papua Tengah", "Maluku & Papua", 1.36, 66130],
  ["Papua Pegunungan", "Maluku & Papua", 1.46, 51213],
  ["Papua Barat Daya", "Maluku & Papua", 0.62, 38581],
].map(([name, island, pop, area]) => ({
  name, island, pop, area,
  density: Math.round((pop * 1e6) / area),
  share: +(pop / 281.6 * 100).toFixed(2),
}));

export const ISLANDS = ["Semua", "Sumatera", "Jawa", "Bali & Nusa Tenggara", "Kalimantan", "Sulawesi", "Maluku & Papua"];

// Rilis BPS terbaru yang dikutip di situs ini (tanggal rilis nyata).
export const RELEASES = [
  ["5 Feb 2025", "Ekonomi Indonesia 2024 tumbuh 5,03 persen; PDB Rp22.139,0 triliun", "BPS — Berita Resmi Statistik"],
  ["15 Jan 2025", "Kemiskinan September 2024 turun menjadi 8,57 persen (24,06 juta orang)", "BPS — Berita Resmi Statistik"],
  ["15 Jan 2025", "Ekspor 2024 US$264,70 miliar; neraca dagang surplus US$31,04 miliar", "BPS — Berita Resmi Statistik"],
  ["15 Nov 2024", "Indeks Pembangunan Manusia (IPM) 2024 mencapai 75,02", "BPS — Berita Resmi Statistik"],
  ["5 Nov 2024", "Tingkat Pengangguran Terbuka Agustus 2024 sebesar 4,91 persen", "BPS — Berita Resmi Statistik"],
  ["2 Jan 2025", "Inflasi tahun kalender 2024 sebesar 1,57 persen", "BPS — Berita Resmi Statistik"],
];

export function fmt(n, digits = 2) {
  return n.toLocaleString("id-ID", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}
export function fmtInt(n) {
  return n.toLocaleString("id-ID");
}
