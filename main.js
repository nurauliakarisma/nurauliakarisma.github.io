/**
 * QA Portfolio - Global JavaScript (main.js)
 * Manages responsive sidebar toggle (desktop collapsed icon mode + mobile drawer),
 * perfectly sequenced cascading animations, live search & tag filtering, and modals.
 */

document.addEventListener('DOMContentLoaded', () => {
    // =============================================================
    // 1. SIDEBAR TOGGLE & STATE MANAGEMENT
    // =============================================================
    const container = document.querySelector('.portfolio-container');
    const sidebarToggles = document.querySelectorAll('.sidebar-toggle-btn, #sidebar-toggle');
    const sidebarCloseBtn = document.querySelector('.sidebar-close-btn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    // Load saved collapsed state from localStorage (Desktop)
    const isCollapsedSaved = localStorage.getItem('sidebar_collapsed') === 'true';
    if (container && window.innerWidth > 992) {
        if (isCollapsedSaved) {
            container.classList.add('collapsed');
        } else {
            container.classList.remove('collapsed');
        }
    }

    function toggleSidebar() {
        if (!container) return;
        
        if (window.innerWidth <= 992) {
            // Mobile / Tablet: toggle off-canvas drawer
            container.classList.toggle('mobile-open');
            if (container.classList.contains('mobile-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        } else {
            // Desktop: toggle collapsed icon-only mode
            container.classList.toggle('collapsed');
            const isNowCollapsed = container.classList.contains('collapsed');
            localStorage.setItem('sidebar_collapsed', isNowCollapsed);
        }
    }

    function closeMobileSidebar() {
        if (container && container.classList.contains('mobile-open')) {
            container.classList.remove('mobile-open');
            document.body.style.overflow = '';
        }
    }

    sidebarToggles.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });
    });

    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMobileSidebar();
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            closeMobileSidebar();
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            closeMobileSidebar();
            if (localStorage.getItem('sidebar_collapsed') === 'true') {
                container.classList.add('collapsed');
            } else {
                container.classList.remove('collapsed');
            }
        }
    });

    // Helper untuk normalisasi path gambar aset agar selalu valid baik di index.html maupun di Modul/*.html
    function resolveAssetPath(path, isInsideModul = false) {
        if (!path || typeof path !== 'string' || path.trim() === '') return '';
        let p = path.trim();
        if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('//') || p.startsWith('data:')) {
            return p;
        }
        // Hapus semua awalan ../, ./, atau / agar path relatif dari root folder web
        p = p.replace(/^(\.\.\/|\.\/|\/)+/, '');
        
        // Normalisasi folder project/ atau Project/ agar persis 'Project/'
        if (p.toLowerCase().startsWith('project/')) {
            p = 'Project/' + p.slice(8);
        }

        return isInsideModul ? `../${p}` : p;
    }

    // =============================================================
    // 1.4. DYNAMIC HANDLED PROJECTS RENDERING (From Data/projects-data.js)
    // =============================================================
    function renderProjectsCards() {
        const projDataRaw = (typeof projectsData !== 'undefined' && Array.isArray(projectsData)) 
            ? projectsData 
            : ((typeof handledProjectsData !== 'undefined' && Array.isArray(handledProjectsData)) ? handledProjectsData : null);

        if (!projDataRaw) return;

        // Filter item kosong
        const validProjects = projDataRaw.filter(item => item && item.title && item.title.trim() !== '');

        // Urutkan dari proyek terbaru ke terlama (ID terbesar / terakhir di atas)
        const projData = [...validProjects].sort((a, b) => (b.id || 0) - (a.id || 0));

        const homeProjectsGrid = document.getElementById('homeProjectsGrid');
        const projectsGrid = document.getElementById('projectsGrid');

        if (homeProjectsGrid) {
            // Render 4 proyek terbaru untuk Beranda (index.html)
            const homeItems = projData.slice(0, 4);
            homeProjectsGrid.innerHTML = homeItems.map(item => {
                let imgStyle = '';
                const cleanPath = resolveAssetPath(item.imgUrl, false);
                if (cleanPath) {
                    imgStyle = `style="background-image: url('${cleanPath}'); background-size: cover; background-position: top center;"`;
                }
                const cardDesc = item.detailDesc || item.description || '';
                return `
                    <div class="project-card glow-card reveal" data-tag="${item.tag || 'Proyek'}" onclick="openProjectDetailModal(${item.id}, 'project')" style="cursor: pointer;">
                        <div class="project-img ${item.bgClass || 'bg-p1'}" ${imgStyle}></div>
                        <span class="tag">${item.tag || 'Proyek'}</span>
                        <h3>${item.title || ''}</h3>
                        <p>${cardDesc}</p>
                    </div>
                `;
            }).join('');
        }

        if (projectsGrid) {
            // Render seluruh proyek dari terbaru ke terlama (Modul/project.html)
            projectsGrid.innerHTML = projData.map(item => {
                let imgStyle = '';
                const cleanPath = resolveAssetPath(item.imgUrl, true);
                if (cleanPath) {
                    imgStyle = `style="background-image: url('${cleanPath}'); background-size: cover; background-position: top center;"`;
                }
                const cardDesc = item.detailDesc || item.description || '';
                return `
                    <div class="project-card glow-card" data-tag="${item.tag || 'Proyek'}" onclick="openProjectDetailModal(${item.id}, 'project')" style="cursor: pointer;">
                        <div class="project-img ${item.bgClass || 'bg-a1'}" ${imgStyle}></div>
                        <span class="tag">${item.tag || 'Proyek'}</span>
                        <h3>${item.title || ''}</h3>
                        <p>${cardDesc}</p>
                    </div>
                `;
            }).join('');
        }
    }

    renderProjectsCards();

    // =============================================================
    // 1.4.1. DYNAMIC PERSONAL PORTFOLIO RENDERING (From Data/portofolio-data.js)
    // =============================================================
    function renderPortfolioCards() {
        const portDataRaw = (typeof portfolioData !== 'undefined' && Array.isArray(portfolioData)) 
            ? portfolioData 
            : ((typeof personalPortfolioData !== 'undefined' && Array.isArray(personalPortfolioData)) 
                ? personalPortfolioData 
                : ((typeof portofolioData !== 'undefined' && Array.isArray(portofolioData)) ? portofolioData : null));

        if (!portDataRaw) return;

        // Urutkan dari portofolio terbaru ke terlama (ID terbesar / terakhir di atas)
        const portData = [...portDataRaw].sort((a, b) => (b.id || 0) - (a.id || 0));

        const homePortfolioGrid = document.getElementById('homePortfolioGrid');
        const portfolioGrid = document.getElementById('portfolioGrid');

        if (homePortfolioGrid) {
            // Render 4 portofolio personal terbaru untuk Beranda (index.html)
            const homeItems = portData.slice(0, 4);
            homePortfolioGrid.innerHTML = homeItems.map(item => {
                let imgStyle = '';
                const cleanPath = resolveAssetPath(item.imgUrl, false);
                if (cleanPath) {
                    imgStyle = `style="background-image: url('${cleanPath}'); background-size: cover; background-position: top center;"`;
                }
                const cardDesc = item.detailDesc || item.description || '';
                return `
                    <div class="project-card glow-card reveal" data-tag="${item.tag || 'Portofolio'}" onclick="openProjectDetailModal(${item.id}, 'portfolio')" style="cursor: pointer;">
                        <div class="project-img ${item.bgClass || 'bg-p2'}" ${imgStyle}></div>
                        <span class="tag">${item.tag || 'Portofolio'}</span>
                        <h3>${item.title || ''}</h3>
                        <p>${cardDesc}</p>
                    </div>
                `;
            }).join('');
        }

        if (portfolioGrid) {
            // Render seluruh portofolio personal dari terbaru ke terlama (Modul/portfolio.html)
            portfolioGrid.innerHTML = portData.map(item => {
                let imgStyle = '';
                const cleanPath = resolveAssetPath(item.imgUrl, true);
                if (cleanPath) {
                    imgStyle = `style="background-image: url('${cleanPath}'); background-size: cover; background-position: top center;"`;
                }
                const cardDesc = item.detailDesc || item.description || '';
                return `
                    <div class="project-card glow-card" data-tag="${item.tag || 'Portofolio'}" onclick="openProjectDetailModal(${item.id}, 'portfolio')" style="cursor: pointer;">
                        <div class="project-img ${item.bgClass || 'bg-a2'}" ${imgStyle}></div>
                        <span class="tag">${item.tag || 'Portofolio'}</span>
                        <h3>${item.title || ''}</h3>
                        <p>${cardDesc}</p>
                    </div>
                `;
            }).join('');
        }
    }

    renderPortfolioCards();

    // =============================================================
    // 1.5. DYNAMIC ARTICLES RENDERING (From Data/articles-data.js)
    // =============================================================
    function renderArticleCards() {
        if (typeof articlesData === 'undefined' || !Array.isArray(articlesData)) return;

        // Urutkan dari artikel terbaru ke terlama (ID terbesar / terakhir di atas)
        const sortedArticles = [...articlesData].sort((a, b) => (b.id || 0) - (a.id || 0));

        const homeArticlesGrid = document.getElementById('homeArticlesGrid');
        const articlesGrid = document.getElementById('articlesGrid');

        if (homeArticlesGrid) {
            // Render 4 artikel terbaru untuk Beranda (index.html)
            const homeItems = sortedArticles.slice(0, 4);
            homeArticlesGrid.innerHTML = homeItems.map(article => {
                let imgStyle = '';
                if (article.imgUrl && article.imgUrl.trim() !== '') {
                    const cleanPath = article.imgUrl.replace(/^\.\.\//, '');
                    imgStyle = `style="background-image: url('${cleanPath}');"`;
                }
                return `
                    <a href="${article.url || 'Modul/article.html'}" target="_blank" class="project-card glow-card reveal" data-tag="${article.tag || 'Pengujian'}">
                        <div class="project-img ${article.bgClass || 'bg-a1'}" ${imgStyle}></div>
                        <span class="tag">${article.tag || 'Artikel'}</span>
                        <h3>${article.title || ''}</h3>
                        <p>${article.description || ''}</p>
                    </a>
                `;
            }).join('');
        }

        if (articlesGrid) {
            // Render seluruh artikel dari terbaru ke terlama (Modul/article.html)
            articlesGrid.innerHTML = sortedArticles.map(article => {
                let imgStyle = '';
                if (article.imgUrl && article.imgUrl.trim() !== '') {
                    const cleanPath = article.imgUrl.startsWith('../') ? article.imgUrl : `../${article.imgUrl}`;
                    imgStyle = `style="background-image: url('${cleanPath}');"`;
                }
                return `
                    <a href="${article.url || '#'}" target="_blank" class="project-card glow-card" data-tag="${article.tag || 'Pengujian'}">
                        <div class="project-img ${article.bgClass || 'bg-a1'}" ${imgStyle}></div>
                        <span class="tag">${article.tag || 'Artikel'}</span>
                        <h3>${article.title || ''}</h3>
                        <p>${article.description || ''}</p>
                    </a>
                `;
            }).join('');
        }
    }

    renderArticleCards();

    // =============================================================
    // 1.6. DYNAMIC YOUTUBE VIDEOS RENDERING (From Data/youtube-data.js)
    // =============================================================
    function getYouTubeThumbnail(url) {
        if (!url) return '';
        const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/;
        const match = url.match(regExp);
        return match && match[1] ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : '';
    }

    function renderVideoCards() {
        if (typeof videosData === 'undefined' || !Array.isArray(videosData)) return;

        // Urutkan dari video terbaru ke terlama (ID terbesar / terakhir di atas)
        const sortedVideos = [...videosData].sort((a, b) => (b.id || 0) - (a.id || 0));

        const homeVideosGrid = document.getElementById('homeVideosGrid');
        const videosGrid = document.getElementById('videosGrid');

        if (homeVideosGrid) {
            // Tampilkan 4 data video terbaru untuk Beranda (index.html)
            const homeItems = sortedVideos.slice(0, 4);
            homeVideosGrid.innerHTML = homeItems.map(video => {
                const autoThumb = getYouTubeThumbnail(video.url);
                const rawImg = video.imgUrl || autoThumb;
                let imgStyle = '';
                if (rawImg && rawImg.trim() !== '') {
                    const cleanPath = (rawImg.startsWith('http') || rawImg.startsWith('//')) ? rawImg : rawImg.replace(/^\.\.\//, '');
                    imgStyle = `background-image: url('${cleanPath}'); background-size: cover; background-position: center;`;
                }
                return `
                    <a href="${video.url || 'Modul/youtube.html'}" target="_blank" class="project-card glow-card reveal" data-tag="${video.tag || 'Video'}">
                        <div class="project-img ${video.bgClass || 'bg-a1'}" style="display: flex; align-items: center; justify-content: center; position: relative; ${imgStyle}">
                            <div style="background: rgba(0, 0, 0, 0.35); position: absolute; inset: 0; border-radius: inherit; display: flex; align-items: center; justify-content: center;">
                                <i class="fa-brands fa-youtube" style="font-size: 42px; color: #FFFFFF; filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.75));"></i>
                            </div>
                        </div>
                        <span class="tag">${video.tag || 'Video'}</span>
                        <h3>${video.title || ''}</h3>
                        <p>${video.description || ''}</p>
                    </a>
                `;
            }).join('');
        }

        if (videosGrid) {
            // Render seluruh video dari terbaru ke terlama (Modul/youtube.html)
            videosGrid.innerHTML = sortedVideos.map(video => {
                const autoThumb = getYouTubeThumbnail(video.url);
                const rawImg = video.imgUrl || autoThumb;
                let imgStyle = '';
                if (rawImg && rawImg.trim() !== '') {
                    const cleanPath = (rawImg.startsWith('http') || rawImg.startsWith('//') || rawImg.startsWith('../')) ? rawImg : `../${rawImg}`;
                    imgStyle = `background-image: url('${cleanPath}'); background-size: cover; background-position: center;`;
                }
                return `
                    <a href="${video.url || 'https://www.youtube.com/@nurauliakarismadewi'}" target="_blank" class="project-card glow-card" data-tag="${video.tag || 'Video'}">
                        <div class="project-img ${video.bgClass || 'bg-a1'}" style="display: flex; align-items: center; justify-content: center; position: relative; ${imgStyle}">
                            <div style="background: rgba(0, 0, 0, 0.35); position: absolute; inset: 0; border-radius: inherit; display: flex; align-items: center; justify-content: center;">
                                <i class="fa-brands fa-youtube" style="font-size: 42px; color: #FFFFFF; filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.75));"></i>
                            </div>
                        </div>
                        <span class="tag">${video.tag || 'Video'}</span>
                        <h3>${video.title || ''}</h3>
                        <p>${video.description || ''}</p>
                    </a>
                `;
            }).join('');
        }
    }

    renderVideoCards();

    // =============================================================
    // 1.7. DYNAMIC CERTIFICATES RENDERING (From Data/certificates-data.js)
    // =============================================================
    function renderCertificateCards() {
        const certDataRaw = (typeof certificateData !== 'undefined' && Array.isArray(certificateData)) 
            ? certificateData 
            : ((typeof certificatesData !== 'undefined' && Array.isArray(certificatesData)) ? certificatesData : null);

        if (!certDataRaw) return;

        // Urutkan dari sertifikat terbaru ke terlama (ID terbesar / terakhir di atas)
        const certData = [...certDataRaw].sort((a, b) => (b.id || 0) - (a.id || 0));

        const homeCertGrid = document.getElementById('homeCertGrid');
        const certGrid = document.getElementById('certGrid');

        if (homeCertGrid) {
            // Render 4 sertifikat terbaru untuk Beranda (index.html)
            const homeItems = certData.slice(0, 4);
            homeCertGrid.innerHTML = homeItems.map(cert => {
                const rawImg = cert.imgUrl || '';
                const cleanImg = rawImg.replace(/^\.\.\//, '');
                const pagesList = Array.isArray(cert.pages) 
                    ? cert.pages.map(p => p.replace(/^\.\.\//, '')).join(',') 
                    : cleanImg;

                let imgStyle = '';
                if (cleanImg && (cleanImg.startsWith('http') || cleanImg.includes('/'))) {
                    imgStyle = `style="background-image: url('${cleanImg}'); background-size: cover; background-position: center;"`;
                }

                return `
                    <div class="project-card glow-card cert-card reveal" 
                         data-source="${cert.tag || cert.source || 'Sertifikasi'}" 
                         data-tag="${cert.tag || 'Sertifikasi'}" 
                         data-id="${cert.id}"
                         data-img="${cleanImg}" 
                         data-pages="${pagesList}" 
                         onclick="openCertDetailModal(${cert.id})"
                         style="cursor: pointer;">
                        <div class="project-img ${cert.bgClass || 'bg-c1'}" ${imgStyle}></div>
                        <span class="tag">${cert.tag || 'Sertifikasi'}</span>
                        <h3>${cert.title || ''}</h3>
                        <p>${cert.description || ''}</p>
                    </div>
                `;
            }).join('');
        }

        if (certGrid) {
            // Render seluruh sertifikat dari terbaru ke terlama (Modul/certificate.html)
            certGrid.innerHTML = certData.map(cert => {
                const rawImg = cert.imgUrl || '';
                const cleanImg = (rawImg.startsWith('http') || rawImg.startsWith('../')) ? rawImg : `../${rawImg}`;
                const pagesList = Array.isArray(cert.pages) 
                    ? cert.pages.map(p => (p.startsWith('http') || p.startsWith('../')) ? p : `../${p}`).join(',') 
                    : cleanImg;

                let imgStyle = '';
                if (cleanImg && (cleanImg.startsWith('http') || cleanImg.includes('/'))) {
                    imgStyle = `style="background-image: url('${cleanImg}'); background-size: cover; background-position: center;"`;
                }

                return `
                    <div class="project-card glow-card cert-card" 
                         data-source="${cert.tag || cert.source || 'Sertifikasi'}" 
                         data-tag="${cert.tag || 'Sertifikasi'}" 
                         data-id="${cert.id}"
                         data-img="${cleanImg}" 
                         data-pages="${pagesList}" 
                         onclick="openCertDetailModal(${cert.id})"
                         style="cursor: pointer;">
                        <div class="project-img ${cert.bgClass || 'bg-c1'}" ${imgStyle}></div>
                        <span class="tag">${cert.tag || 'Sertifikasi'}</span>
                        <h3>${cert.title || ''}</h3>
                        <p>${cert.description || ''}</p>
                    </div>
                `;
            }).join('');
        }
    }

    renderCertificateCards();

    // =============================================================
    // 1.8. DYNAMIC TIMELINE RENDERING (From Data/timeline-data.js)
    // =============================================================
    function renderTimeline() {
        if (typeof timelineData === 'undefined' || !Array.isArray(timelineData)) return;

        const heroCardsGrid = document.getElementById('aboutHeroCardsGrid');
        const timelineContainer = document.getElementById('timelineContainer');
        const timelineModals = document.getElementById('timelineModalsContainer');

        if (heroCardsGrid) {
            heroCardsGrid.innerHTML = timelineData.map(item => {
                const imgPath = resolveAssetPath(item.miniCardImg, true);
                return `
                <div class="mini-card" onclick="openModal('${item.modalId}')">
                    <img src="${imgPath}" alt="${item.miniCardLabel}">
                    <div class="mini-card-overlay">${item.miniCardLabel}</div>
                </div>
            `;
            }).join('');
        }

        if (timelineContainer) {
            const itemsHtml = timelineData.map((item, index) => {
                const isLast = index === timelineData.length - 1;
                const dotClass = item.isCurrent ? 'timeline-dot current' : 'timeline-dot';
                const badgeClass = item.isCurrent ? 'timeline-badge current' : 'timeline-badge';
                const subtitleClass = item.isCurrent ? 'timeline-card-subtitle current' : 'timeline-card-subtitle';

                return `
                    <div class="timeline-item reveal ${isLast ? 'is-last' : ''}">
                        <div class="timeline-marker">
                            <span class="${dotClass}"></span>
                            ${!isLast ? '<div class="timeline-line"></div>' : ''}
                        </div>
                        <div class="timeline-card">
                            <div class="timeline-card-header">
                                <span class="${badgeClass}">
                                    ${item.category}
                                </span>
                                <span class="timeline-year">
                                    <i class="fa-regular fa-calendar-days"></i> ${item.year}
                                </span>
                            </div>
                            <h3 class="timeline-card-title">${item.title}</h3>
                            <p class="${subtitleClass}">${item.subtitle}</p>
                            <p class="timeline-card-desc">
                                ${item.description}
                            </p>
                            <button class="btn-read-more" onclick="openModal('${item.modalId}')">
                                Lihat Selengkapnya <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

            timelineContainer.innerHTML = itemsHtml;
        }

        if (timelineModals) {
            timelineModals.innerHTML = timelineData.map(item => `
                <div id="${item.modalId}" class="modal-overlay" onclick="outsideClose(event, '${item.modalId}')">
                    <div class="modal-container">
                        <div class="modal-header">
                            <h3>${item.modalTitle}</h3>
                            <button class="modal-close" onclick="closeModal('${item.modalId}')"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        <div class="modal-body">
                            <ul>
                                ${item.details.map(d => `<li>${d}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    renderTimeline();

    // =============================================================
    // 2. PERFECTLY ORDERED CASCADING SCROLL & REVEAL ANIMATIONS
    // =============================================================

    // Select all reveal elements across the document
    const revealElements = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-scale, ' +
        '.section-header, .stats-bar, .footer-card, .about-hero, .page-header-title, .article-controls, .qa-tools-section'
    );

    // Stagger all grid containers per-child in exact DOM order
    const gridContainers = document.querySelectorAll(
        '.projects-grid, .services-grid, .tools-grid, .hero-cards-grid'
    );

    gridContainers.forEach(grid => {
        const cards = grid.children;
        Array.from(cards).forEach((card, i) => {
            card.classList.add('reveal');
            card.style.transitionDelay = `${(i * 0.08) + 0.1}s`;
        });
    });

    // Timeline items in about page
    const timelineItems = document.querySelectorAll('.timeline-card');
    timelineItems.forEach((item, i) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${(i * 0.12) + 0.1}s`;
    });

    // Setup IntersectionObserver for smooth entrance
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');

                    // If a grid container is intersecting, trigger its children
                    if (entry.target.classList.contains('projects-grid') || 
                        entry.target.classList.contains('services-grid') || 
                        entry.target.classList.contains('tools-grid') ||
                        entry.target.classList.contains('hero-cards-grid')) {
                        Array.from(entry.target.children).forEach(child => {
                            child.classList.add('reveal-visible');
                        });
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -10px 0px'
        });

        revealElements.forEach(el => {
            if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
                el.classList.add('reveal');
            }
            revealObserver.observe(el);
        });

        gridContainers.forEach(grid => {
            revealObserver.observe(grid);
            Array.from(grid.children).forEach(child => revealObserver.observe(child));
        });

        timelineItems.forEach(item => {
            revealObserver.observe(item);
        });
    } else {
        // Fallback for older browsers
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .project-card, .service-card').forEach(el => {
            el.classList.add('reveal-visible');
        });
    }

    // =============================================================
    // 3. UNIFIED LIVE SEARCH & FILTERING WITH SEQUENTIAL RE-ANIMATION
    // =============================================================
    function initFilterSystem(searchId, containerId, attrName) {
        const searchInput = document.getElementById(searchId);
        const grid = document.getElementById(containerId);
        if (!grid) return;

        const tagBtns = grid.parentElement.querySelectorAll('.filter-tags .tag-btn');
        const cards = grid.querySelectorAll('.project-card');
        let currentFilter = 'all';

        function applyFilter() {
            const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
            let visibleCount = 0;

            cards.forEach(card => {
                const title = (card.querySelector('h3') ? card.querySelector('h3').textContent : '').toLowerCase();
                const desc = (card.querySelector('p') ? card.querySelector('p').textContent : '').toLowerCase();
                const tagAttr = (card.getAttribute(attrName) || '').toLowerCase();
                const cardTag = (card.getAttribute('data-tag') || '').toLowerCase();
                const cardSource = (card.getAttribute('data-source') || '').toLowerCase();
                const filterLower = currentFilter.toLowerCase();

                const matchesSearch = !query || title.includes(query) || desc.includes(query) || tagAttr.includes(query) || cardTag.includes(query) || cardSource.includes(query);
                const matchesTag = (filterLower === 'all' || 
                                    tagAttr === filterLower || 
                                    cardTag === filterLower || 
                                    cardSource === filterLower || 
                                    tagAttr.includes(filterLower) || 
                                    cardSource.includes(filterLower));

                if (matchesSearch && matchesTag) {
                    card.style.display = 'flex';
                    // Re-trigger clean cascading animation
                    card.classList.remove('filter-animate');
                    void card.offsetWidth; // Force reflow
                    card.style.animationDelay = `${visibleCount * 0.06}s`;
                    card.classList.add('filter-animate');
                    card.classList.add('reveal-visible');
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                    card.classList.remove('filter-animate');
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', applyFilter);
        }

        tagBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tagBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.getAttribute('data-filter') || 'all';
                applyFilter();
            });
        });
    }

    // Initialize on relevant pages
    initFilterSystem('projectSearch', 'projectsGrid', 'data-tag');
    initFilterSystem('portfolioSearch', 'portfolioGrid', 'data-tag');
    initFilterSystem('articleSearch', 'articlesGrid', 'data-tag');
    initFilterSystem('certSearch', 'certGrid', 'data-source');
    initFilterSystem('videoSearch', 'videosGrid', 'data-tag');

    // =============================================================
    // 3B. MOBILE FILTER DRAWER TOGGLE
    // =============================================================
    document.querySelectorAll('.mobile-filter-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const controls = this.closest('.article-controls');
            if (controls) {
                const isOpen = controls.classList.toggle('filter-open');
                this.classList.toggle('active', isOpen);
            }
        });
    });

    // Close mobile filter dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.article-controls')) {
            document.querySelectorAll('.article-controls.filter-open').forEach(c => {
                c.classList.remove('filter-open');
            });
            document.querySelectorAll('.mobile-filter-btn.active').forEach(b => {
                b.classList.remove('active');
            });
        }
    });

    // =============================================================
    // 4. CERTIFICATE DETAIL MODAL & FULLSCREEN PREVIEW SLIDER
    // =============================================================
    const certModal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');
    const certCloseBtn = document.getElementById('certCloseBtn');
    const certPrevBtn = document.getElementById('certPrevBtn');
    const certNextBtn = document.getElementById('certNextBtn');
    const certCurrentPage = document.getElementById('certCurrentPage');
    const certTotalPages = document.getElementById('certTotalPages');
    const certPageIndicator = document.getElementById('certPageIndicator');

    const certDetailModal = document.getElementById('certDetailModal');
    const certDetailModalImg = document.getElementById('certDetailModalImg');
    const certDetailPrevBtn = document.getElementById('certDetailPrevBtn');
    const certDetailNextBtn = document.getElementById('certDetailNextBtn');

    let currentCertList = [];
    let currentCertIndex = 0;

    let currentCertDetailPages = [];
    let currentCertDetailIndex = 0;
    let currentActiveCert = null;

    // Menampilkan halaman sertifikat pada Modal Detail
    function showCertDetailSlide(index) {
        if (!currentCertDetailPages || currentCertDetailPages.length === 0) return;
        if (index < 0) index = 0;
        if (index >= currentCertDetailPages.length) index = currentCertDetailPages.length - 1;
        currentCertDetailIndex = index;

        const imgEl = document.getElementById('certDetailModalImg');
        const counterEl = document.getElementById('certDetailCurrentPage');
        const totalEl = document.getElementById('certDetailTotalPages');
        const toolbarEl = document.getElementById('certSliderToolbar');
        const pillsContainer = document.getElementById('certDetailPills');
        const prevBtn = document.getElementById('certDetailPrevBtn');
        const nextBtn = document.getElementById('certDetailNextBtn');

        if (imgEl) {
            imgEl.style.opacity = '0';
            imgEl.style.transform = 'scale(0.97)';
            setTimeout(() => {
                imgEl.src = currentCertDetailPages[currentCertDetailIndex];
                imgEl.onload = () => {
                    imgEl.style.opacity = '1';
                    imgEl.style.transform = 'scale(1)';
                };
            }, 60);
        }

        if (counterEl) counterEl.textContent = (currentCertDetailIndex + 1).toString();
        if (totalEl) totalEl.textContent = currentCertDetailPages.length.toString();

        if (toolbarEl) {
            toolbarEl.style.display = (currentCertDetailPages.length > 1) ? 'flex' : 'none';
        }

        if (prevBtn) prevBtn.disabled = (currentCertDetailIndex === 0);
        if (nextBtn) nextBtn.disabled = (currentCertDetailIndex === currentCertDetailPages.length - 1);

        if (pillsContainer) {
            if (currentCertDetailPages.length > 1) {
                pillsContainer.style.display = 'flex';
                pillsContainer.innerHTML = currentCertDetailPages.map((_, idx) => `
                    <button type="button" class="cert-page-pill ${idx === currentCertDetailIndex ? 'active' : ''}" 
                            onclick="showCertDetailSlide(${idx})">
                        <i class="fa-solid fa-file-image"></i> Lembar ${idx + 1}
                    </button>
                `).join('');
            } else {
                pillsContainer.style.display = 'none';
                pillsContainer.innerHTML = '';
            }
        }
    }
    window.showCertDetailSlide = showCertDetailSlide;

    // Membuka Modal Detail Sertifikat Lengkap
    window.openCertDetailModal = function(id) {
        const certDataRaw = (typeof certificateData !== 'undefined' && Array.isArray(certificateData)) 
            ? certificateData 
            : ((typeof certificatesData !== 'undefined' && Array.isArray(certificatesData)) ? certificatesData : null);

        if (!certDataRaw || certDataRaw.length === 0) return;

        const cert = certDataRaw.find(c => c.id === id) || certDataRaw[0];
        if (!cert) return;
        currentActiveCert = cert;

        const modal = document.getElementById('certDetailModal');
        if (!modal) return;

        const isInsideModul = window.location.pathname.includes('/Modul/') || window.location.pathname.includes('\\Modul\\');

        // Normalisasi daftar lembar/halaman gambar sertifikat
        let rawPages = [];
        if (Array.isArray(cert.pages) && cert.pages.length > 0) {
            rawPages = cert.pages;
        } else if (cert.imgUrl) {
            rawPages = [cert.imgUrl];
        }

        currentCertDetailPages = rawPages.map(p => resolveAssetPath(p, isInsideModul)).filter(Boolean);
        currentCertDetailIndex = 0;

        // Mengisi elemen teks informasi detail sertifikat
        const tagEl = document.getElementById('modalCertTag');
        const titleEl = document.getElementById('certDetailTitle');
        const issuerEl = document.getElementById('certDetailIssuer');
        const descEl = document.getElementById('certDetailDesc');
        const specIssuerEl = document.getElementById('certSpecIssuer');
        const specFieldEl = document.getElementById('certSpecField');
        const specPagesEl = document.getElementById('certSpecPages');

        if (tagEl) tagEl.textContent = cert.tag || 'Sertifikasi';
        if (titleEl) titleEl.textContent = cert.title || '';
        if (issuerEl) issuerEl.textContent = cert.source || cert.tag || 'Lembaga Pelatihan Terakreditasi';
        if (descEl) descEl.textContent = cert.description || 'Sertifikasi kompetensi Quality Assurance Engineer dan keahlian rekayasa sistem.';
        if (specIssuerEl) specIssuerEl.textContent = cert.source || '-';
        if (specFieldEl) specFieldEl.textContent = cert.field || (cert.tag === 'SanberCode' ? 'QA Engineer / Automation Testing' : (cert.tag === 'Dicoding' ? 'Mobile Developer / Software Engineer' : cert.tag));
        if (specPagesEl) specPagesEl.textContent = `${currentCertDetailPages.length} Lembar Dokumen Resmi`;

        // Render slide awal
        showCertDetailSlide(0);

        modal.classList.add('active');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    // Navigasi prev/next pada Modal Detail
    if (certDetailPrevBtn) {
        certDetailPrevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentCertDetailIndex > 0) {
                showCertDetailSlide(currentCertDetailIndex - 1);
            }
        });
    }

    if (certDetailNextBtn) {
        certDetailNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentCertDetailIndex < currentCertDetailPages.length - 1) {
                showCertDetailSlide(currentCertDetailIndex + 1);
            }
        });
    }

    // Membuka Gambar Resolusi Penuh (Fullscreen Lightbox)
    window.openCertZoom = function() {
        if (!currentCertDetailPages || currentCertDetailPages.length === 0) return;
        currentCertList = currentCertDetailPages;
        currentCertIndex = currentCertDetailIndex;
        showCertSlide(currentCertIndex);

        if (certModal) {
            certModal.classList.add('active');
            certModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    // Slider untuk Lightbox Resolusi Penuh
    function showCertSlide(index) {
        if (!currentCertList || currentCertList.length === 0) return;
        currentCertIndex = index;
        if (modalImg) {
            modalImg.style.opacity = '0';
            modalImg.style.transform = 'scale(0.96)';
            setTimeout(() => {
                modalImg.src = currentCertList[currentCertIndex];
                modalImg.onload = () => {
                    modalImg.style.opacity = '1';
                    modalImg.style.transform = 'scale(1)';
                };
            }, 80);
        }

        if (certCurrentPage) certCurrentPage.textContent = (currentCertIndex + 1).toString();
        if (certTotalPages) certTotalPages.textContent = currentCertList.length.toString();

        if (certPageIndicator) {
            certPageIndicator.style.display = (currentCertList.length > 1) ? 'block' : 'none';
        }

        if (certPrevBtn && certNextBtn) {
            if (currentCertList.length <= 1) {
                certPrevBtn.style.display = 'none';
                certNextBtn.style.display = 'none';
            } else {
                certPrevBtn.style.display = 'flex';
                certNextBtn.style.display = 'flex';
                certPrevBtn.disabled = (currentCertIndex === 0);
                certNextBtn.disabled = (currentCertIndex === currentCertList.length - 1);
            }
        }
    }

    function closeCertLightbox() {
        if (certModal) {
            certModal.classList.remove('active');
            certModal.style.display = 'none';
            const detailModal = document.getElementById('certDetailModal');
            if (!detailModal || !detailModal.classList.contains('active')) {
                document.body.style.overflow = 'auto';
            }
        }
    }

    // Delegasi klik kartu sertifikat bila belum terpicu
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.cert-card');
        if (card && !e.target.closest('.modal-container')) {
            const certId = card.getAttribute('data-id');
            if (certId) {
                openCertDetailModal(parseInt(certId, 10));
            }
        }
    });

    if (certPrevBtn) {
        certPrevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentCertIndex > 0) {
                showCertSlide(currentCertIndex - 1);
            }
        });
    }

    if (certNextBtn) {
        certNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentCertIndex < currentCertList.length - 1) {
                showCertSlide(currentCertIndex + 1);
            }
        });
    }

    if (certCloseBtn) {
        certCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeCertLightbox();
        });
    }

    // Menutup Lightbox saat klik area luar gambar
    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal || e.target.classList.contains('cert-img-wrapper')) {
                closeCertLightbox();
            }
        });
    }

    // Kontrol Keyboard (Panah Kiri, Kanan, Escape)
    document.addEventListener('keydown', (e) => {
        if (certModal && certModal.classList.contains('active')) {
            if (e.key === 'ArrowLeft' && certPrevBtn && !certPrevBtn.disabled) {
                certPrevBtn.click();
            } else if (e.key === 'ArrowRight' && certNextBtn && !certNextBtn.disabled) {
                certNextBtn.click();
            } else if (e.key === 'Escape') {
                closeCertLightbox();
            }
        } else {
            const detailModal = document.getElementById('certDetailModal');
            if (detailModal && detailModal.classList.contains('active')) {
                if (e.key === 'ArrowLeft' && currentCertDetailIndex > 0) {
                    showCertDetailSlide(currentCertDetailIndex - 1);
                } else if (e.key === 'ArrowRight' && currentCertDetailIndex < currentCertDetailPages.length - 1) {
                    showCertDetailSlide(currentCertDetailIndex + 1);
                } else if (e.key === 'Escape') {
                    window.closeModal('certDetailModal');
                }
            }
        }
    });

    // =============================================================
    // 5. MODAL CONTROLS (About Timeline & Project Modals)
    // =============================================================
    window.openProjectDetailModal = function(id, type = 'project') {
        let targetDataset = null;
        if (type === 'portfolio') {
            targetDataset = (typeof portfolioData !== 'undefined' && Array.isArray(portfolioData))
                ? portfolioData
                : ((typeof personalPortfolioData !== 'undefined' && Array.isArray(personalPortfolioData)) ? personalPortfolioData : null);
        } else {
            targetDataset = (typeof projectsData !== 'undefined' && Array.isArray(projectsData))
                ? projectsData
                : ((typeof handledProjectsData !== 'undefined' && Array.isArray(handledProjectsData)) ? handledProjectsData : null);
        }

        // Fallbacks if one is not defined
        if (!targetDataset || targetDataset.length === 0) {
            targetDataset = (typeof projectsData !== 'undefined' && Array.isArray(projectsData)) 
                ? projectsData 
                : ((typeof portfolioData !== 'undefined' && Array.isArray(portfolioData)) ? portfolioData : null);
        }
        if (!targetDataset) return;

        const project = targetDataset.find(p => p.id === id) || targetDataset[0];
        if (!project) return;

        const modal = document.getElementById('projectDetailModal');
        if (!modal) return;

        const titleEl = document.getElementById('modalProjectTitle');
        const tagEl = document.getElementById('modalProjectTag');
        const nameEl = document.getElementById('modalProjectName');
        const descEl = document.getElementById('modalProjectDesc');
        const techEl = document.getElementById('modalProjectTech');
        const roleEl = document.getElementById('modalProjectRole');
        const durationEl = document.getElementById('modalProjectDuration');
        const categoryEl = document.getElementById('modalProjectCategory');
        const bannerEl = document.getElementById('modalProjectBanner');

        if (titleEl) titleEl.textContent = `Detail ${type === 'portfolio' ? 'Portofolio' : 'Proyek'} – ${project.tag || 'Ikhtisar'}`;
        if (tagEl) tagEl.textContent = project.tag || (type === 'portfolio' ? 'Portofolio' : 'Proyek');
        if (nameEl) nameEl.textContent = project.detailName || project.title;
        if (descEl) descEl.textContent = project.detailDesc || project.description;
        if (roleEl) roleEl.textContent = project.role || 'Quality Assurance Engineer';
        if (durationEl) durationEl.textContent = project.duration || '-';
        if (categoryEl) categoryEl.textContent = project.tag || 'Quality Assurance';

        if (bannerEl) {
            const bgClass = project.bannerBg || project.bgClass || 'bg-a1';
            bannerEl.className = `project-banner-preview ${bgClass}`;

            const rawImg = project.bannerImg || project.imgUrl || '';
            const isInsideModul = window.location.pathname.includes('/Modul/') || window.location.pathname.includes('\\Modul\\');
            const cleanImg = resolveAssetPath(rawImg, isInsideModul);
            if (cleanImg) {
                bannerEl.style.backgroundImage = `url('${cleanImg}')`;
                bannerEl.style.backgroundPosition = 'top center';
            } else {
                bannerEl.style.backgroundImage = '';
                bannerEl.style.backgroundPosition = '';
            }

            // Banner Badge & Overlay handling (bisa diatur langsung di projects-data.js)
            const bannerBadgeEl = document.getElementById('modalProjectBannerBadge') || bannerEl.querySelector('.banner-badge');
            let bannerOverlayEl = bannerEl.querySelector('.banner-overlay');

            let badgeText = '';
            let badgeIcon = (project.bannerIcon !== undefined) ? project.bannerIcon : 'fa-solid fa-shield-check';

            if (project.bannerBadge !== undefined && project.bannerBadge !== null) {
                if (typeof project.bannerBadge === 'object') {
                    badgeText = project.bannerBadge.text || '';
                    if (project.bannerBadge.icon !== undefined) badgeIcon = project.bannerBadge.icon;
                } else {
                    badgeText = String(project.bannerBadge);
                }
            } else if (project.banner && (project.banner.badge || project.banner.text)) {
                badgeText = project.banner.badge || project.banner.text || '';
                if (project.banner.icon !== undefined) badgeIcon = project.banner.icon;
            } else {
                badgeText = type === 'portfolio' ? 'Portofolio Terverifikasi' : 'Pengujian Web & Aplikasi Mobile';
            }

            if (project.bannerBadge === false || badgeText === 'false' || badgeText === '') {
                if (bannerOverlayEl) bannerOverlayEl.style.display = 'none';
            } else {
                if (bannerOverlayEl) bannerOverlayEl.style.display = 'flex';
                const iconHtml = (badgeIcon && badgeIcon !== 'none') ? `<i class="${badgeIcon}"></i> ` : '';
                const badgeHtml = (badgeText.includes('<i') || badgeText.includes('<svg') || badgeText.includes('<span'))
                    ? badgeText
                    : `${iconHtml}${badgeText}`;

                if (bannerBadgeEl) {
                    bannerBadgeEl.innerHTML = badgeHtml;
                } else if (bannerOverlayEl) {
                    const newBadge = document.createElement('div');
                    newBadge.className = 'banner-badge';
                    newBadge.id = 'modalProjectBannerBadge';
                    newBadge.innerHTML = badgeHtml;
                    bannerOverlayEl.appendChild(newBadge);
                }
            }
        }

        if (techEl) {
            const badges = Array.isArray(project.tech) 
                ? project.tech.map(t => `<span class="modal-tech-badge">${t}</span>`).join('') 
                : `<span class="modal-tech-badge">${project.tag}</span>`;
            techEl.innerHTML = badges;
        }

        modal.classList.add('active');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    window.openModal = function(modalId) {
        if (typeof modalId === 'string' && modalId.startsWith('modal-p')) {
            const num = parseInt(modalId.replace('modal-p', ''));
            if (!isNaN(num)) {
                window.openProjectDetailModal(num);
                return;
            }
        }
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    window.outsideClose = function(event, modalId) {
        if (event.target.id === modalId) {
            window.closeModal(modalId);
        }
    };

    const closeModalButtons = document.querySelectorAll('.close-modal, .modal-close');
    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = btn.closest('.modal-overlay') || btn.closest('.cert-modal');
            if (modal) {
                modal.classList.remove('active');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active, .cert-modal[style*="display: flex"], .cert-modal.active').forEach(modal => {
                modal.classList.remove('active');
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
            closeMobileSidebar();
        }
    });

    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                certModal.classList.remove('active');
                certModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // =============================================================
    // 6. CONTACT FORM AUTO RESET
    // =============================================================
    const contactForm = document.querySelector('.footer-middle form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            setTimeout(() => {
                this.reset();
            }, 500);
        });
    }
});
