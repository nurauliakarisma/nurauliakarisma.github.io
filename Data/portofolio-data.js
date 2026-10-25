/**
 * DATA PORTOFOLIO PERSONAL (portofolio-data.js)
 * Khusus menyimpan karya mandiri, aplikasi personal (Mobile App), dan framework QA Automation.
 */

const portfolioData = [
  {
    id: 9,
    tag: "Aplikasi Mobile",
    title: "CineVerse – Cinema Ticketing App",
    description: "Aplikasi pemesanan tiket bioskop modern berbasis Jetpack Compose dengan kontrol akses multi-tier member, katalog film interaktif, dan alur checkout lengkap.",
    bgClass: "bg-rose-950",
    imgUrl: "Project/cineverse.png",
    bannerBadge: "Aplikasi Pemesanan Tiket",
    bannerIcon: "fa-solid fa-film",
    detailName: "CineVerse – Modern Cinema Ticketing & Movie Catalog (Jetpack Compose & Material 3)",
    detailDesc: "Aplikasi mobile Android native dengan pendekatan Declarative UI (Jetpack Compose) dan arsitektur MVVM. Menampilkan fitur Kontrol Akses Berbasis Tingkatan Anggota (VIP, Cinema Club, Reguler) untuk pembatasan pemesanan film, pencarian dan filter chips kategori waktu nyata, manajemen katalog 24 film, keranjang belanja dengan kalkulasi subtotal dinamis, modul checkout riwayat transaksi LUNAS, serta manajemen profil dan sunting bio pengguna dengan reactive StateFlow.",
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "Material 3",
      "MVVM",
      "StateFlow & Coroutines",
      "Compose Navigation",
      "Manual Dependency Injection",
      "Validasi QA"
    ],
    role: "Android Developer & Quality Assurance Engineer",
    duration: "1 Bulan (Proyek Mandiri)"
  },
  {
    id: 8,
    tag: "Aplikasi Mobile",
    title: "Course Schedule App",
    description: "Aplikasi Android manajemen jadwal kuliah berbasis arsitektur MVVM dengan deteksi jadwal terdekat, paginasi data, dan pengingat harian via AlarmManager.",
    bgClass: "bg-indigo-600",
    imgUrl: "Project/course-schedule.png",
    bannerBadge: "Manajemen Jadwal Kuliah",
    bannerIcon: "fa-solid fa-graduation-cap",
    detailName: "Course Schedule App – Academic Management (Android Jetpack)",
    detailDesc: "Aplikasi produktivitas akademik modern berbasis Android Native untuk mengelola jadwal perkuliahan secara terstruktur. Menerapkan arsitektur MVVM dan Repository Pattern dengan Room Database (auto-seeding prepopulation), Android Jetpack Paging untuk efisiensi render daftar mata kuliah, fitur pengurutan dinamis (waktu, mata kuliah, dosen), gestur geser-untuk-menghapus, serta integrasi penjadwalan latar belakang AlarmManager & BroadcastReceiver untuk notifikasi agenda harian berformat InboxStyle.",
    tech: [
      "Kotlin",
      "MVVM",
      "Room Database",
      "AlarmManager",
      "BroadcastReceiver",
      "Paging Library",
      "Coroutines",
      "Preferences DataStore"
    ],
    role: "Pengembang Android",
    duration: "1 Bulan (Proyek Mandiri)"
  },
  {
    id: 7,
    tag: "Aplikasi Mobile",
    title: "GitHub Users Navigation App",
    description: "Aplikasi Android untuk eksplorasi profil GitHub interaktif dengan integrasi REST API, penyimpanan lokal Room DB, dan manajemen tema DataStore.",
    bgClass: "bg-slate-900",
    imgUrl: "Project/Github_app.png",
    bannerBadge: "Eksplorasi Pengguna GitHub",
    bannerIcon: "fa-brands fa-github",
    detailName: "GitHub Users – Fundamental Android App (MVVM & REST API)",
    detailDesc: "Aplikasi mobile modern untuk mencari dan menampilkan profil pengguna GitHub secara waktu nyata. Mengimplementasikan arsitektur MVVM dan Repository Pattern yang memadukan data jarak jauh (GitHub REST API via Retrofit & OkHttp) dengan penyimpanan persisten lokal (Room Database untuk pengguna favorit). Dilengkapi navigasi tab ViewPager2 untuk daftar pengikut/mengikuti, pemuatan gambar adaptif via Glide, serta pengalih tema Terang/Gelap berbasis DataStore Preferences.",
    tech: [
      "Kotlin",
      "MVVM",
      "Retrofit 2",
      "Room Database",
      "DataStore Preferences",
      "LiveData & ViewModel",
      "Coroutines",
      "ViewPager2"
    ],
    role: "Pengembang Android",
    duration: "1 Bulan (Proyek Mandiri)"
  },
  {
    id: 6,
    tag: "Aplikasi Mobile",
    title: "Todo App & Task Manager",
    description: "Aplikasi Android manajemen tugas harian berbasis arsitektur MVVM dengan fitur paginasi data, filter dinamis SQLite, dan pengingat harian otomatis.",
    bgClass: "bg-blue-600",
    imgUrl: "Project/Todo_app.png",
    bannerBadge: "Manajemen Tugas & Catatan",
    bannerIcon: "fa-solid fa-list-check",
    detailName: "Todo App – Modern Task Management (Android Jetpack)",
    detailDesc: "Aplikasi produktivitas berbasis Android untuk mencatat, mengorganisasikan, dan memantau agenda harian secara efisien. Mengimplementasikan arsitektur MVVM dengan Single Source of Truth (Repository), Android Jetpack Paging Library untuk efisiensi memori, SQLite RawQuery untuk filter dinamis, Room Database dengan auto-seeding prepopulation, notifikasi latar belakang melalui WorkManager, serta gestur geser-untuk-menghapus.",
    tech: [
      "Kotlin",
      "MVVM",
      "Room Database",
      "WorkManager",
      "Paging Library",
      "Coroutines",
      "LiveData"
    ],
    role: "Android Developer & Quality Assurance Engineer",
    duration: "1 Bulan (Proyek Mandiri)"
  },
  {
    id: 5,
    tag: "Aplikasi Mobile",
    title: "Habit Tracker App (AAD)",
    description: "Aplikasi pelacak kebiasaan harian berbasis Android untuk membantu pengguna membangun dan memantau rutinitas positif secara konsisten.",
    bgClass: "bg-emerald-500",
    imgUrl: "Project/Habbit_app.jpg",
    bannerBadge: "Pelacak Kebiasaan Harian",
    bannerIcon: "fa-solid fa-calendar-check",
    detailName: "Habit Tracker Application (Android Development)",
    detailDesc: "Aplikasi pencatat dan pengingat kebiasaan harian yang dirancang untuk memantau perkembangan rutinitas harian pengguna. Dilengkapi dengan fitur penambahan kebiasaan, penjadwalan/notifikasi rutin, validasi masukan, serta visualisasi progres kebiasaan.",
    tech: [
      "Kotlin",
      "Android SDK",
      "Room Database",
      "MVVM",
      "Validasi QA"
    ],
    role: "Android Developer & Quality Assurance Engineer",
    duration: "1 Bulan (Proyek Mandiri)"
  },
  {
    id: 4,
    tag: "QA Aplikasi Mobile",
    title: "Android Mobile App Test Suite",
    description: "Otomasi pengujian seluler dan antarmuka untuk aplikasi Android menggunakan Appium dan UIAutomator2.",
    bgClass: "bg-a4",
    imgUrl: "",
    bannerBadge: "Otomasi QA Aplikasi Mobile",
    bannerIcon: "fa-solid fa-mobile-screen-button",
    detailName: "Android Mobile App Test Automation",
    detailDesc: "Skenario otomasi pengujian aplikasi Android yang mencakup pengujian gestur layar sentuh, verifikasi alur transaksi pengguna, dan penanganan status jaringan yang dinamis.",
    tech: ["Appium", "Android SDK", "Java / Kotlin", "UiAutomator2"],
    role: "Perekayasa QA Otomasi Mobile",
    duration: "Proyek Mandiri (2026)"
  },
  {
    id: 3,
    tag: "Pengujian Web",
    title: "Playwright Cross-Browser Suite",
    description: "Pengujian menyeluruh lintas peramban berkecepatan tinggi pada Chromium, Firefox, dan WebKit.",
    bgClass: "bg-a3",
    imgUrl: "",
    bannerBadge: "Pengujian Web Lintas Peramban",
    bannerIcon: "fa-solid fa-laptop-code",
    detailName: "Playwright Cross-Browser Testing Suite",
    detailDesc: "Implementasi pengujian lintas peramban berkecepatan tinggi dengan fitur auto-waiting, regresi visual, dan eksekusi pengujian secara paralel demi keandalan sistem.",
    tech: ["Playwright", "TypeScript", "Laporan HTML"],
    role: "Perekayasa QA Web",
    duration: "Proyek Mandiri (2026)"
  },
  {
    id: 2,
    tag: "Pengujian API",
    title: "Postman API Automation Suite",
    description: "Rangkaian regresi otomasi API otomatis dengan integrasi Newman CLI dan CI/CD.",
    bgClass: "bg-a2",
    imgUrl: "",
    bannerBadge: "Rangkaian Otomasi REST API",
    bannerIcon: "fa-solid fa-network-wired",
    detailName: "Postman REST API Automation Suite",
    detailDesc: "Kumpulan skenario pengujian API otomatis yang komprehensif dengan penegasan (assertion) dinamis, variabel lingkungan, perantaian permintaan (chaining requests), dan integrasi runner Newman.",
    tech: ["Postman", "Newman", "JavaScript", "RESTful API"],
    role: "Spesialis QA API",
    duration: "Proyek Mandiri (2026)"
  },
  {
    id: 1,
    tag: "Otomasi Pengujian",
    title: "Cypress BDD Test Framework",
    description: "Kerangka kerja otomasi pengujian mandiri menggunakan Cypress, Cucumber BDD, dan pelaporan Mochawesome.",
    bgClass: "bg-a1",
    imgUrl: "",
    bannerBadge: "Otomasi Pengujian BDD Cucumber",
    bannerIcon: "fa-solid fa-vial-circle-check",
    detailName: "Cypress Cucumber BDD Test Framework",
    detailDesc: "Kerangka kerja pengujian otomasi berbasis Behavior-Driven Development (BDD) dengan Cypress dan sintaks Gherkin, dirancang untuk memudahkan kolaborasi antara QA, Pengembang, dan Pemilik Produk.",
    tech: ["Cypress", "Cucumber BDD", "JavaScript", "Mochawesome"],
    role: "Pengembang Kerangka Kerja QA",
    duration: "Proyek Mandiri (2026)"
  }
];

if (typeof personalPortfolioData === 'undefined') {
  var personalPortfolioData = portfolioData;
}
if (typeof portofolioData === 'undefined') {
  var portofolioData = portfolioData;
}
