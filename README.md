# Tugas 5 - Middleware & Error Terpusat

## Identitas
- Nama: [ADITYA]
- NIM: [F1D02310032] (Varian: B - Kantin)

## Cara Menjalankan
1. Jalankan `npm install`.
2. Salin `.env.example` menjadi `.env`, lalu atur `API_KEY` dan `PORT` bila diperlukan.
3. Jalankan `npm run dev`; API tersedia di `http://localhost:<PORT>` (default `3000`).
4. Pastikan `@baseUrl` di `requests.http` menggunakan port yang sama dan `@apiKey` sama dengan nilai `API_KEY` di `.env`.

API key wajib diatur melalui environment. Jika `API_KEY` tidak diset, middleware menolak seluruh POST dan DELETE dengan `401`; endpoint GET tetap dapat digunakan. Tidak ada kunci rahasia bawaan.

## Struktur Proyek
```text
controllers/       Menerima request dan mengirim response sukses.
data/              Menyimpan dan mengelola data menu in-memory.
middleware/        Logger, pemeriksaan API key, dan penanganan error.
routes/            Mendefinisikan endpoint tanpa mengulang awalan /menu.
services/          Aturan bisnis dan pengambilan data secara async.
utils/             AppError dan pembungkus handler async.
validators/        Skema Joi dan validasi request.
index.js           Membuat aplikasi Express dan memasang router/middleware.
requests.http      Skenario uji untuk REST Client.
```

## Endpoint
| Method | URL | Middleware | Hasil |
|---|---|---|---|
| GET | `/menu` | logger | `200`, daftar menu |
| GET | `/menu?kategori=minuman` | logger | `200`, daftar terfilter |
| GET | `/menu/:id` | logger | `200` atau `404 NOT_FOUND` |
| POST | `/menu` | logger, cekApiKey, validasi Joi | `201`, atau `401` / `422` / `409` |
| DELETE | `/menu/:id` | logger, cekApiKey | `204`, atau `401` / `404 NOT_FOUND` |

## Aturan Validasi, Aturan Bisnis, dan Kode Error
- `nama`: string wajib, 3-50 karakter.
- `harga`: bilangan bulat wajib, 1.000-100.000.
- `kategori`: wajib salah satu dari `makanan`, `minuman`, atau `camilan`.
- `tersedia`: boolean, default `true`.
- Joi mengumpulkan semua kesalahan sekaligus (`abortEarly: false`); kegagalan memakai `422 VALIDATION_ERROR`.
- Service menolak `nama` duplikat tanpa membedakan huruf besar/kecil dengan `409 NAMA_DUPLIKAT`. Keunikan adalah aturan bisnis atas data yang ada, bukan bentuk/tipe input, sehingga diperiksa di service, bukan Joi.
- Error lainnya: `401 UNAUTHORIZED`, `404 NOT_FOUND`, `404 ROUTE_NOT_FOUND`, dan `500 INTERNAL_SERVER_ERROR`.
- Format error: `{ "error": { "pesan": "...", "kode": "..." } }`. Detail internal error 500 hanya dicatat di terminal.

## Pengujian
Jalankan server dengan `npm run dev`, kemudian kirim tiap request di `requests.http` menggunakan ekstensi REST Client. Jalankan POST sukses sebelum POST duplikat, dan DELETE sukses setelah screenshot daftar/detail jika ingin mempertahankan data awal.

Tangkapan layar respons REST Client yang tersedia di `screenshot/`:

| File | Hasil yang ditunjukkan |
|---|---|
| [get1.png](./screenshot/get1.png) | GET daftar menu (`200`) |
| [get2.png](./screenshot/get2.png) | GET dengan filter kategori minuman (`200`) |
| [get3.png](./screenshot/get3.png) | GET detail menu (`200`) |
| [get4.png](./screenshot/get4.png) | GET detail tidak ditemukan (`404 NOT_FOUND`) |
| [get5.png](./screenshot/get5.png) | URL tidak dikenal (`404 ROUTE_NOT_FOUND`) |
| [post1.png](./screenshot/post1.png) | POST berhasil (`201`) |
| [post2.png](./screenshot/post2.png) | POST tanpa API key (`401`) |
| [post3.png](./screenshot/post3.png) | POST gagal validasi (`422`) |
| [post4.png](./screenshot/post4.png) | POST nama duplikat (`409 NAMA_DUPLIKAT`) |
| [delete1.png](./screenshot/delete1.png) | DELETE berhasil (`204`) |
| [delete2.png](./screenshot/delete2.png) | DELETE menu tidak ditemukan (`404 NOT_FOUND`) |

Screenshot tambahan yang masih perlu dilengkapi:
- Terminal server yang memperlihatkan baris logger untuk status `404`, `401`, `422`, `201`, dan `204`.
- Uji error `500`: respons umum di klien dan jejak error di terminal. Pulihkan kode setelah uji.
- `requests.http` terbuka di VS Code.

## Deklarasi Penggunaan AI
| Bagian | Alat AI | Dipakai untuk apa | Cara saya memeriksa hasilnya |
|---|---|---|---|
| Kode API, dokumentasi, dan contoh request | Copilot (AI assistant) | Membantu menyusun implementasi awal dan merapikan dokumentasi sesuai spesifikasi | Meninjau kode dan menguji endpoint melalui `requests.http` |

Contoh prompt: “Bantu susun API Tugas 5 Varian B sesuai spesifikasi berikut.”

Pernyataan: Saya menggunakan AI sebagai alat bantu pada bagian yang dicantumkan di tabel, lalu meninjau dan menguji hasilnya.

## Kesimpulan & Kendala
Dengan error terpusat, setiap kegagalan memakai format dan alur penanganan yang sama, bukan response error berbeda-beda di setiap route. Error tak terduga memberi pesan umum kepada klien, sementara jejak lengkap dicatat di terminal. Kendala dan solusinya: [Isi setelah menjalankan dan menguji proyek.]
