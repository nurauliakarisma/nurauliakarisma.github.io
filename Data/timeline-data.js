/**
 * DATA LINIMASA KARIER & PERJALANAN (timeline-data.js)
 * Menyimpan rekam jejak perjalanan pendidikan, pelatihan, dan karier profesional di Modul/about.html.
 */

const timelineData = [
  {
    id: 1,
    modalId: "modal-ub",
    category: "Akademik",
    year: "2020 – 2024",
    title: "Universitas Brawijaya",
    subtitle: "Alumna & Studi Pendidikan Tinggi",
    description: "Lulusan D3 Teknologi Informasi dengan IPK 3,92. Mengintegrasikan pencapaian akademik teratas, pengalaman magang industri di Bangkit Academy dan instansi pemerintahan DPRD Jatim, kepemimpinan sebagai Ketua Umum DPM FV UB, serta torehan juara kompetisi teknologi nasional.",
    miniCardImg: "Asset_img_Thubnile/wisuda.png",
    miniCardLabel: "Universitas Brawijaya",
    modalTitle: "Detail Akademik & Rekam Jejak - Universitas Brawijaya",
    details: [
    "<strong>Akademik & Keahlian Utama (IPK 3,92):</strong> Menguasai System Analysis, Web & Mobile Development, Product Management, dan Data Management melalui kurikulum aplikatif dan proyek riil.",
    "<strong>Studi Independen & Magang (Bangkit Academy 2023):</strong> Terpilih dari 67.000+ pendaftar di jalur Mobile Development (Google, Tokopedia, Gojek, Traveloka); mendalami ekosistem Kotlin, arsitektur Android modern, dan menuntaskan proyek Capstone tim.",
    "<strong>Magang Operasional (DPRD Provinsi Jawa Timur):</strong> Mengembangkan serta memelihara sistem informasi departemen, mengoptimasi alur kerja administrasi, dan mengelola pembaruan konten portal web resmi institusi.",
    "<strong>Prestasi Kompetisi Nasional:</strong> Juara 1 Olimpiade Vokasi Indonesia (Web-based Monitoring PLTMH), Juara 2 Olimpiade Vokasi Indonesia (Android Energy Efficiency & Smart Grid), dan Juara 1 PKM-KI 2022 (Virtual Reality Tari Tradisional).",
    "<strong>Kepemimpinan & Organisasi Kampus:</strong> Ketua Umum DPM Fakultas Vokasi UB (2023–2024) yang menginisiasi regulasi dan modul advokasi fakultas, serta aktif di DPM UB, UAM Penalaran, Brawijaya Legislative Fair, Raja Brawijaya, dan program pengabdian Vokasi Mengajar."
   ]
  },
  {
    id: 2,
    modalId: "modal-mitra",
    category: "Pengalaman Industri",
    year: "2024",
    title: "Mitra Maju Mulia",
    subtitle: "Pengalaman Kerja & Operasional Bisnis",
    description: "Memimpin inisiatif modernisasi teknologi, riset ekspansi bisnis, dan perancangan sistem internal perusahaan. Berhasil memangkas downtime operasional hingga 20% serta memperluas penetrasi pasar lewat pengembangan ekosistem platform digital e-commerce dan company profile.",
    isCurrent: false,
    miniCardImg: "Asset_img_Thubnile/3M.png",
    miniCardLabel: "Mitra Maju Mulia",
    modalTitle: "Detail Pengalaman - Research And Development Specialist",
    details: [
      "<strong>Pengembangan Solusi Digital & E-Commerce:</strong> Membangun platform e-commerce fungsional lengkap dengan katalog produk, pembayaran aman, dan pelacakan pesanan terintegrasi yang mendongkrak pendapatan digital perusahaan.",
      "<strong>Efisiensi Sistem & Downtime (-20%):</strong> Merancang dan mengeksekusi program pemeliharaan preventif yang meningkatkan keandalan sistem sekaligus memangkas operational downtime hingga 20%.",
      "<strong>Riset Pasar & Ekspansi Strategis:</strong> Melakukan riset komprehensif terkait target pasar dan segmentasi pelanggan sebagai dasar pengambilan keputusan ekspansi bisnis secara terukur.",
      "<strong>Tata Kelola & Infrastruktur Organisasi:</strong> Merancang sistem manajemen SDM dan kerangka regulasi kerja operasional untuk mempercepat alur kerja tim, didukung adopsi teknologi infrastruktur yang modern.",
      "<strong>Branding & Visibilitas Digital:</strong> Membangun dan mengelola website company profile resmi untuk memperkuat identitas brand serta daya saing digital perusahaan di tingkat regional."
    ]
  },
  {
    id: 3,
    modalId: "modal-bootcamp",
    category: "Pelatihan & Sertifikasi",
    year: "2024 – 2025",
    title: "Pelatihan Software Quality Assurance (SQA)",
    subtitle: "MySkill & Bootcamp QA (Digital Skola, JayJay, SanberCode)",
    description: "Mendalami kompetensi QA secara intensif melalui MySkill dan rangkaian program bootcamp QA (Digital Skola, JayJay, dan SanberCode). Mempelajari metodologi pengujian manual, perancangan skenario uji (test cases), pelacakan cacat sistem (bug tracking), serta praktik otomatisasi pengujian modern.",
    isCurrent: false,
    miniCardImg: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
    miniCardLabel: "Pelatihan SQA",
    modalTitle: "Detail Pelatihan - MySkill & Bootcamp QA",
    details: [
      "<strong>MySkill QA Intensive:</strong> Menguasai konsep fundamental pengujian perangkat lunak, teknik Black-Box testing, pembuatan skenario uji terperinci, dan dokumentasi pelaporan cacat sistem.",
      "<strong>Digital Skola Mini Bootcamp:</strong> Pelatihan intensif QA Engineer untuk menguasai siklus SDLC/STLC, manajemen isu di Jira, serta eksekusi pengujian fungsional web.",
      "<strong>SanberCode QA Automation:</strong> Praktik langsung otomatisasi pengujian web dan antarmuka API menggunakan Cypress, Selenium WebDriver, dan Postman.",
      "<strong>Pengujian Mutakhir:</strong> Mempelajari verifikasi respon API, pengujian regresi, dan pengintegrasian skrip pengujian ke dalam alur rilis perangkat lunak."
    ]
  },
  {
    id: 4,
    modalId: "modal-traspac",
    category: "Masa Kini",
    year: "2025 – Sekarang",
    title: "PT Traspac Makmur Sejahtera",
    subtitle: "Spesialis Jaminan Mutu Perangkat Lunak (QA Engineer)",
    description: "Bertanggung jawab atas penjaminan mutu software lintas platform (web & mobile) pada berbagai proyek konkuren. Mengawal siklus rilis end-to-end melalui perancangan 500+ test case, pelaporan 1.000+ bug terstruktur, automasi alur kritis, serta pengawalan stabilitas sistem pasca-rilis.",
    isCurrent: true,
    miniCardImg: "Asset_img_Thubnile/Traspac.png",
    miniCardLabel: "PT Traspac",
    modalTitle: "Detail Pengalaman - Software Quality Assurance",
    details: [
      "<strong>Desain & Eksekusi Testing Komprehensif:</strong> Merancang dan mengeksekusi 500+ manual test case serta script automasi yang mencakup 30% critical user flows, guna memperluas test coverage pada platform web dan mobile.",
      "<strong>Pencegahan Gap Kebutuhan (-20% hingga -30%):</strong> Meninjau test case sebelum kick-off proyek bersama BA, PM, dan Developer, memangkas celah requirement dan edge case yang terlewat sejak fase awal pengembangan.",
      "<strong>Regresi & Validasi Rilis:</strong> Menjalankan pengujian regresi dan ad-hoc rutin yang memvalidasi 95%+ fungsi inti pra-rilis, memonitor sistem 12 jam pasca-deploy, serta menguji hotfix kritis dengan turnaround time kurang dari 1 hari.",
      "<strong>Manajemen Defect & Pelaporan:</strong> Mengidentifikasi dan mendokumentasikan 1.084 bug dengan detail langkah reproduksi dan severity yang presisi, memverifikasi 100% issue resolved, serta menyusun laporan uji rilis sesuai standar dokumentasi institusi.",
      "<strong>Kolaborasi Tim & Mentoring:</strong> Menyelaraskan acceptance criteria lintas fungsi, mementori QA intern terkait dasar test case, API testing, dan database, serta memfasilitasi sesi knowledge-sharing berkala."
    ]
  }
];
