[![NusaStat di make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![Peringkat](https://make.fun/badge/best-national-statistics-site-20261126-0539/Samot72/best-national-statistics-site-20261126-0539-entry/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![Hadiah](https://make.fun/badge/best-national-statistics-site-20261126-0539/Samot72/best-national-statistics-site-20261126-0539-entry/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

# NusaStat — Statistik Indonesia dalam Angka

Portal statistik nasional Indonesia: penduduk 281,60 juta jiwa, PDB Rp22.139 triliun,
dan pembangunan manusia yang terus membaik — semuanya angka resmi dengan sumber dan tahunnya.
Dibangun untuk kompetisi make.fun
[best-national-statistics-site-20261126-0539](https://make.fun/c/best-national-statistics-site-20261126-0539).

## Negara dan sumber angka

**Indonesia, edisi 2024.** Angka utama berasal dari Badan Pusat Statistik (BPS):
penduduk 281,60 juta (estimasi pertengahan 2024), PDB Rp22.139,0 triliun
(US$1.396,3 miliar), PDB per kapita US$4.960, pertumbuhan ekonomi 5,03%,
kemiskinan 8,57% (September 2024, 24,06 juta orang), pengangguran terbuka 4,91%
(Agustus 2024), IPM 75,02, angka harapan hidup 73,93 tahun, inflasi 1,57%.
Sumber pelengkap: Bank Indonesia (cadangan devisa US$155,7 miliar, kurs Rp16.157),
Bank Dunia (PDB per kapita), Kemenkes/SSGI (stunting 19,8%), APJII
(pengguna internet 221,56 juta), BPJS Kesehatan (cakupan JKN 98,7%),
BKPM (realisasi investasi Rp1.714,2 triliun). Setiap angka di situs mencantumkan
sumber dan tahunnya; daftar lengkap ada di footer situs.

## Halaman dan fitur

- **Beranda** — kartu indikator utama, grafik pertumbuhan PDB 2015–2024,
  piramida penduduk 2024, 5 provinsi terpadat, daftar rilis terbaru BPS.
- **Penduduk** — piramida penduduk interaktif, tren penduduk 2015–2024,
  kepadatan 147 jiwa/km², penduduk perkotaan 58,6%.
- **Ekonomi** — struktur PDB 2024 (donat 9 lapangan usaha), pengalih grafik
  pertumbuhan PDB ↔ PDB per kapita, tabel perdagangan 2021–2024
  (ekspor US$264,70 M, surplus US$31,04 M).
- **Kesehatan** — angka harapan hidup, tren stunting 2018–2024, cakupan JKN,
  pengalih grafik kemiskinan ↔ pengangguran.
- **Pendidikan** — harapan lama sekolah 13,21 tahun, rata-rata lama sekolah
  8,85 tahun, partisipasi sekolah per kelompok usia, kesenjangan antarprovinsi.
- **Provinsi** — penjelajah 38 provinsi: cari nama, saring per pulau,
  urutkan berdasarkan penduduk/luas/kepadatan/nama, klik baris untuk detail provinsi.

## Cara menjalankan

Situs statis tanpa build step dan tanpa network request — semua file di bawah `app/`:

```sh
cd app && python3 -m http.server 8080
# buka http://localhost:8080/ di desktop Chrome atau di HP
```

Grafik digambar sendiri di canvas (tanpa library eksternal), navigasi memakai
hash route (`#/penduduk`, `#/ekonomi`, …), dan tampilan menyesuaikan layar HP.

## Struktur

- `app/index.html` — kerangka situs (header, navigasi, footer sumber)
- `app/style.css` — desain orisinal (teal + emas di atas krem)
- `app/data.js` — semua angka dan sumbernya
- `app/charts.js` — grafik canvas buatan sendiri (garis, batang, donat, piramida)
- `app/views.js` — perender enam halaman + semua kontrol
- `app/main.js` — router hash
- `main.ts` — program penyerahan (menyalin `app/` + `screenshots/` dan menulis `dossier.json`)
- `vendor/makefun-frontend.ts` — pustaka kit make.fun, tanpa perubahan
- `screenshots/` — 4 tangkapan layar asli dari situs ini

## Lisensi

MIT — lihat `LICENSE`.
