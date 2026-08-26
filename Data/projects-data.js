const projectsData = [
  {
    id: 1,
    tag: "Dashboard",
    title: "Dealer Monitoring System",
    description: "Custom monitoring dashboard with PHP, MySQL, React, and Google Apps Script.",
    bgClass: "bg-a1",
    imgUrl: "",
    detailName: "Dealer & Client Monitoring Dashboard",
    detailDesc: "Membangun sistem dasbor pemantauan kustom untuk memantau performa dealer secara real-time, terintegrasi dengan pengelolaan basis data dan otomatisasi pelaporan.",
    tech: ["HTML", "PHP", "MySQL", "React JSX", "Google Apps Script"],
    role: "Fullstack Developer & QA Support",
    duration: "3 Bulan (2026)"
  },
  {
    id: 2,
    tag: "Automation",
    title: "E2E Test Automation Suite",
    description: "Automated test scripts using Selenium WebDriver, Mocha, and GitHub Actions.",
    bgClass: "bg-a2",
    imgUrl: "",
    detailName: "E2E Test Automation Suite",
    detailDesc: "Perancangan dan implementasi kerangka kerja pengujian end-to-end otomatis guna meminimalisir waktu regresi pengujian perangkat lunak web.",
    tech: ["Selenium WebDriver", "Mocha", "Postman", "GitHub Actions"],
    role: "QA Automation Engineer",
    duration: "2 Bulan"
  },
  {
    id: 3,
    tag: "Quality Control",
    title: "Enterprise QC Testing",
    description: "Comprehensive system testing and quality assurance at PT Traspac Makmur Sejahtera.",
    bgClass: "bg-a3",
    imgUrl: "",
    detailName: "Enterprise Quality Control Testing",
    detailDesc: "Pelaksanaan pengujian sistem secara komprehensif untuk memastikan seluruh modul aplikasi siap digunakan oleh klien perusahaan tanpa celah bug mayor.",
    tech: ["Manual Testing", "Bug Tracking Tools", "Test Scenario Planning"],
    role: "Quality Control Professional",
    duration: "Pengalaman Profesional"
  },
  {
    id: 4,
    tag: "Dashboard",
    title: "Client Operations Dashboard",
    description: "Real-time analytics and reporting dashboard built with modern frontend frameworks.",
    bgClass: "bg-a4",
    imgUrl: "",
    detailName: "Client Operations Dashboard",
    detailDesc: "Pembuatan dasbor analitik operasional klien untuk memantau performa harian dan metrik bisnis utama secara terpusat.",
    tech: ["React", "Tailwind CSS", "JavaScript"],
    role: "Frontend Developer",
    duration: "1.5 Bulan"
  }
];

if (typeof handledProjectsData === 'undefined') {
  var handledProjectsData = projectsData;
}
