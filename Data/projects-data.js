/**
 * DATA PROYEK KLIEN & INSTANSI (projects-data.js)
 * Khusus menyimpan proyek riil komersial / instansi pemerintah / militer (Handled Projects).
 */

const projectsData = [
  {
    id: 7,
    tag: "Layanan Publik",
    title: "SIM-Persuratan & Anggaran DPRD",
    description: "Sistem informasi manajemen persuratan kedinasan, pencairan dana (NPD), nota dinas, dan pemantauan realisasi anggaran APBD berbasis web responsif.",
    bgClass: "bg-blue-900",
    imgUrl: "Project/Persuratan.png",
    bannerBadge: "Aplikasi Web Pemerintahan",
    bannerIcon: "fa-solid fa-landmark",
    detailName: "SIM-Persuratan & Pengelolaan Anggaran Sekretariat DPRD Jawa Timur",
    detailDesc: "Platform digital terintegrasi untuk memodernisasi tata kelola administrasi naskah dinas dan keuangan birokrasi secara nirkertas (paperless). Mengimplementasikan Kontrol Akses Berbasis Peran (Super Admin, Admin Dokinfo, Admin FPP, Staf), penomoran surat kedinasan otomatis, validasi sisa pagu rekening belanja guna mencegah kelebihan anggaran, visualisasi realisasi APBD waktu nyata (ApexCharts), kalender agenda interaktif (FullCalendar), manajemen rekanan media advertorial (perhitungan PPN 11%), ekspor laporan resmi Excel berstandar kop dinas (PhpSpreadsheet), serta antarmuka adaptif ramah ponsel.",
    tech: [
      "Laravel 11",
      "PHP 8.2",
      "MySQL",
      "Bootstrap 5",
      "FullCalendar",
      "ApexCharts",
      "PhpSpreadsheet",
      "SweetAlert2",
      "Validasi QA"
    ],
    role: "Pengembang Web & Penguji Mutu (QA)",
    duration: "2 Bulan (2024 / 2025)"
  },
  {
    id: 6,
    tag: "Layanan Publik",
    title: "Traffic Attitude Record",
    description: "Traffic Attitude Record (TAR) adalah sistem terpusat berbasis integrasi API yang menghimpun dan menyajikan data lalu lintas resmi untuk masyarakat serta petugas. Aplikasi ini memudahkan pengecekan dan verifikasi Surat Izin Mengemudi (SIM), penelusuran riwayat pelanggaran lalu lintas, serta penyediaan panduan penyelesaian denda maupun pemutihan secara transparan, akurat, dan efisien.",
    bgClass: "bg-a1",
    imgUrl: "Project/TAR.png",
    bannerBadge: "Pengujian Web & Aplikasi Mobile",
    bannerIcon: "fa-solid fa-shield-check",
    detailName: "TAR (Traffic Attitude Record)",
    detailDesc: "Traffic Attitude Record (TAR) adalah sistem terpusat berbasis integrasi API yang menghimpun dan menyajikan data lalu lintas resmi untuk masyarakat serta petugas. Aplikasi ini memudahkan pengecekan dan verifikasi Surat Izin Mengemudi (SIM), penelusuran riwayat pelanggaran lalu lintas, serta penyediaan panduan penyelesaian denda maupun pemutihan secara transparan, akurat, dan efisien.",
    tech: ["Selenium", "Cypress", "Pengujian Manual", "Pengujian Regresi", "Pengujian Asap (Smoke Testing)"],
    role: "Spesialis Jaminan Mutu Perangkat Lunak",
    duration: "12 Bulan (2024 / 2025)"
  },
  {
    id: 5,
    tag: "Dasbor Analitik",
    title: "Dealer Monitoring System",
    description: "Dasbor pemantauan performa operasional jaringan dealer secara waktu nyata yang terintegrasi dengan otomatisasi Google Apps Script.",
    bgClass: "bg-a6",
    imgUrl: "",
    bannerBadge: "QA Dasbor & Analitik Waktu Nyata",
    bannerIcon: "fa-solid fa-chart-line",
    detailName: "Dealer & Client Operations Monitoring Dashboard",
    detailDesc: "Dasbor pemantauan operasional yang dirancang untuk mengonsolidasikan data penjualan, metrik performa dealer, dan catatan aktivitas klien secara waktu nyata. Dilengkapi visualisasi data interaktif, otomatisasi sinkronisasi basis data melalui Google Apps Script, dan sistem pelaporan otomatis untuk meningkatkan kecepatan pengambilan keputusan manajemen.",
    tech: ["HTML5", "PHP", "MySQL", "React JSX", "Google Apps Script", "Validasi QA"],
    role: "Pengembang & Dukungan Jaminan Mutu (QA)",
    duration: "3 Bulan (2024 / 2025)"
  },
  {
    id: 4,
    tag: "Pertahanan",
    title: "Operational System (OPS)",
    description: "Sistem internal militer terpadu untuk pencatatan, pemantauan status, dan pelaporan riwayat operasi pertahanan strategis angkatan bersenjata.",
    bgClass: "bg-a5",
    imgUrl: "",
    bannerBadge: "QA Operasi Strategis Pertahanan",
    bannerIcon: "fa-solid fa-crosshairs",
    detailName: "Operational System (OPS) — Mabes TNI & PT Traspac",
    detailDesc: "Operational System (OPS) adalah aplikasi komando internal tingkat strategis yang digunakan oleh angkatan bersenjata (TNI) untuk mengorganisasikan, mencatat, dan memantau seluruh data operasi militer secara waktu nyata. Sistem ini mencakup pelacakan operasi militer yang sedang berlangsung, riwayat operasi yang telah tuntas, serta simulasi dan perencanaan operasi masa depan guna meningkatkan kesiapan operasional dan ketertelusuran data pertahanan.\n\nDalam sistem berkerahasiaan tinggi ini, peran QA berfokus pada pengujian integritas data operasional, validasi alur pelaporan hierarkis, pengujian stabilitas performa sistem dalam menangani dataset besar, serta pengujian regresi menyeluruh untuk menjamin ketiadaan cacat kritis sebelum implementasi operasional.",
    tech: ["Pengujian Manual", "Pengujian Integritas Data", "Pengujian Regresi", "Pengujian Asap", "QA Keamanan & Akses", "Pelacakan Cacat", "Dokumentasi Uji"],
    role: "Spesialis Jaminan Mutu Perangkat Lunak",
    duration: "Desember 2025 – Sekarang"
  },
  {
    id: 3,
    tag: "Pembelajaran Elektronik",
    title: "Investment Learning Center (ILC)",
    description: "Platform Sistem Manajemen Pembelajaran (LMS) interaktif untuk pengembangan kompetensi aparatur Kementerian Investasi & Hilirisasi / BKPM.",
    bgClass: "bg-a4",
    imgUrl: "",
    bannerBadge: "QA Sistem Pembelajaran Elektronik",
    bannerIcon: "fa-solid fa-graduation-cap",
    detailName: "Investment Learning Center (ILC) — Pusdiklat Kementerian Investasi & BKPM",
    detailDesc: "Investment Learning Center (ILC) adalah platform Learning Management System (LMS) berbasis web yang dikembangkan untuk Pusat Pendidikan dan Pelatihan (Pusdiklat) Kementerian Investasi dan Hilirisasi / BKPM. Platform ini dirancang untuk mendemokratisasi akses pelatihan aparatur pemerintah di seluruh Indonesia melalui modul pembelajaran multimedia interaktif, manajemen kursus, asesmen kompetensi daring, dan penerbitan sertifikat pelatihan digital tanpa batasan ruang dan waktu.\n\nTanggung jawab utama mencakup pengujian alur fungsional menyeluruh LMS (manajemen pengguna, pendaftaran kursus, pemutaran video, ujian daring dan penilaian kuis), pelaksanaan pengujian regresi berkala, pelacakan cacat sistem dengan langkah reproduksi yang presisi, serta koordinasi erat bersama tim pengembang untuk memastikan keandalan serta kemudahan penggunaan (usability).",
    tech: ["Pengujian Manual", "Pengujian Fungsional", "Pengujian Regresi", "Pengujian Asap", "QA LMS", "Pelacakan Cacat", "Dokumentasi Kasus Uji"],
    role: "Spesialis Jaminan Mutu Perangkat Lunak",
    duration: "November 2025 – Sekarang"
  },
  {
    id: 2,
    tag: "Pertahanan",
    title: "My Kujang",
    description: "Aplikasi terpadu TNI Angkatan Darat untuk pengelolaan data personel militer, rekam ujian jasmani, penggajian, dan kontrol hak akses berbasis peran (RBAC).",
    bgClass: "bg-a3",
    imgUrl: "",
    bannerBadge: "QA Keamanan Akses & Pertahanan",
    bannerIcon: "fa-solid fa-user-shield",
    detailName: "My Kujang — TNI Angkatan Darat & PT Traspac",
    detailDesc: "My Kujang adalah platform web terpadu yang dirancang khusus untuk Markas Besar TNI Angkatan Darat guna mengelola siklus data personel dan rekam aktivitas fisik prajurit secara aman. Aplikasi ini mencakup pencatatan skor ujian jasmani (kesamaptaan), manajemen data gaji dan tunjangan, riwayat kedinasan dan mutasi, penugasan operasi, hingga inventaris seragam dinas. Keamanan data diperkuat dengan implementasi Kontrol Akses Berbasis Peran (RBAC) ketat yang membagi otorisasi mulai dari Admin Kompi, Personel, Admin Pusat, Admin Umum, hingga Pimpinan.\n\nTugas QA mencakup validasi mendalam terhadap akurasi kalkulasi skor jasmani, integritas data kepangkatan, serta pengujian isolasi hak akses untuk mencegah kebocoran data rahasia personel militer. Pengujian dilakukan melalui pengujian fungsional, pengujian regresi, dan dokumentasi cacat sistem secara komprehensif.",
    tech: ["Pengujian Manual", "Pengujian RBAC", "Pengujian Regresi", "Pengujian Asap", "Verifikasi Basis Data", "Pelacakan Cacat", "Dokumentasi Kasus Uji"],
    role: "Spesialis Jaminan Mutu Perangkat Lunak",
    duration: "Juli 2025 – Sekarang"
  },
  {
    id: 1,
    tag: "Meja Bantuan",
    title: "SDAP Helpdesk",
    description: "Sistem meja bantuan dan penanganan tiket internal Pusdatin Kementerian Pertahanan RI untuk kendala teknis dan sistem informasi pertahanan.",
    bgClass: "bg-a2",
    imgUrl: "",
    bannerBadge: "QA Alur Kerja Tiket & Bantuan Teknis",
    bannerIcon: "fa-solid fa-shield-halved",
    detailName: "SDAP Helpdesk — Pusdatin Kementerian Pertahanan RI",
    detailDesc: "SDAP Helpdesk adalah aplikasi internal pengelolaan tiket dan bantuan teknis yang dikembangkan untuk Pusat Data dan Informasi (Pusdatin) Kementerian Pertahanan Republik Indonesia. Sistem ini berfungsi sebagai pusat penanganan keluhan, kendala operasional sistem informasi, dan permohonan dukungan teknis dari seluruh satuan kerja di lingkungan Kemhan RI secara terstruktur, terukur, dan transparan.\n\nRuang lingkup pengujian QA meliputi verifikasi alur pelaporan isu, eskalasi tiket antartingkat teknisi, penelusuran status SLA penyelesaian kendala, pengujian API untuk memvalidasi integrasi data modul bantuan, serta pengujian manual dan regresi ketat sebelum setiap versi aplikasi diterapkan ke lingkungan server kementerian.",
    tech: ["Pengujian Manual", "Pengujian API", "Pengujian Regresi", "Pengujian Asap", "QA Alur Kerja Tiket", "Pelacakan Cacat", "Dokumentasi Uji"],
    role: "Spesialis Jaminan Mutu Perangkat Lunak",
    duration: "April 2025 – Juli 2025"
  }
];

if (typeof handledProjectsData === 'undefined') {
  var handledProjectsData = projectsData;
}
