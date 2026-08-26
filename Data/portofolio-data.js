const portfolioData = [
  {
    id: 1,
    tag: "Automation",
    title: "Cypress BDD Test Framework",
    description: "Personal test automation framework using Cypress, Cucumber BDD, and Mochawesome reporting.",
    bgClass: "bg-a1",
    imgUrl: "",
    detailName: "Cypress Cucumber BDD Test Framework",
    detailDesc: "Framework pengujian otomasi berbasis Behavior-Driven Development (BDD) dengan Cypress dan Gherkin syntax, dirancang untuk memudahkan kolaborasi antara QA, Developer, dan Product Owner.",
    tech: ["Cypress", "Cucumber BDD", "JavaScript", "Mochawesome"],
    role: "QA Automation Creator",
    duration: "Personal Project (2026)"
  },
  {
    id: 2,
    tag: "API Testing",
    title: "Postman API Automation Suite",
    description: "Automated API regression suite with Newman CLI and CI/CD integration.",
    bgClass: "bg-a2",
    imgUrl: "",
    detailName: "Postman REST API Automation Suite",
    detailDesc: "Kumpulan skenario pengujian API otomatis lengkap dengan assertion dinamis, environment variables, chaining requests, dan integrasi runner Newman.",
    tech: ["Postman", "Newman", "JavaScript", "RESTful API"],
    role: "API QA Specialist",
    duration: "Personal Project (2026)"
  },
  {
    id: 3,
    tag: "Web Testing",
    title: "Playwright Cross-Browser Suite",
    description: "High-speed modern end-to-end testing across Chromium, Firefox, and WebKit.",
    bgClass: "bg-a3",
    imgUrl: "",
    detailName: "Playwright Cross-Browser Testing Suite",
    detailDesc: "Implementasi pengujian lintas peramban berkecepatan tinggi dengan auto-waiting, visual regression testing, dan parallel test execution.",
    tech: ["Playwright", "TypeScript", "HTML Report"],
    role: "QA Engineer",
    duration: "Personal Project (2026)"
  },
  {
    id: 4,
    tag: "Mobile QA",
    title: "Android Mobile App Test Suite",
    description: "Mobile automation and UI testing for Android applications using Appium.",
    bgClass: "bg-a4",
    imgUrl: "",
    detailName: "Android Mobile App Test Automation",
    detailDesc: "Skenario otomasi pengujian aplikasi Android mencakup uji gestur, verifikasi alur transaksi, dan penanganan status jaringan dinamis.",
    tech: ["Appium", "Android SDK", "Java / Kotlin", "UiAutomator2"],
    role: "Mobile QA Engineer",
    duration: "Personal Project (2026)"
  }
];

if (typeof personalPortfolioData === 'undefined') {
  var personalPortfolioData = portfolioData;
}
if (typeof portofolioData === 'undefined') {
  var portofolioData = portfolioData;
}
