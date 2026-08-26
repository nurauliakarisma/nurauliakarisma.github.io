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

    // =============================================================
    // 1.4. DYNAMIC HANDLED PROJECTS RENDERING (From Data/projects-data.js)
    // =============================================================
    function renderProjectsCards() {
        const projDataRaw = (typeof projectsData !== 'undefined' && Array.isArray(projectsData)) 
            ? projectsData 
            : ((typeof handledProjectsData !== 'undefined' && Array.isArray(handledProjectsData)) ? handledProjectsData : null);

        if (!projDataRaw) return;

        // Urutkan dari proyek terbaru ke terlama (ID terbesar / terakhir di atas)
        const projData = [...projDataRaw].sort((a, b) => (b.id || 0) - (a.id || 0));

        const homeProjectsGrid = document.getElementById('homeProjectsGrid');
        const projectsGrid = document.getElementById('projectsGrid');

        if (homeProjectsGrid) {
            // Render 4 proyek terbaru untuk Beranda (index.html)
            const homeItems = projData.slice(0, 4);
            homeProjectsGrid.innerHTML = homeItems.map(item => {
                let imgStyle = '';
                if (item.imgUrl && item.imgUrl.trim() !== '') {
                    const cleanPath = item.imgUrl.replace(/^\.\.\//, '');
                    imgStyle = `style="background-image: url('${cleanPath}'); background-size: cover; background-position: center;"`;
                }
                return `
                    <div class="project-card glow-card reveal" data-tag="${item.tag || 'Project'}" onclick="openProjectDetailModal(${item.id}, 'project')" style="cursor: pointer;">
                        <div class="project-img ${item.bgClass || 'bg-p1'}" ${imgStyle}></div>
                        <span class="tag">${item.tag || 'Project'}</span>
                        <h3>${item.title || ''}</h3>
                        <p>${item.description || ''}</p>
                    </div>
                `;
            }).join('');
        }

        if (projectsGrid) {
            // Render seluruh proyek dari terbaru ke terlama (Modul/project.html)
            projectsGrid.innerHTML = projData.map(item => {
                let imgStyle = '';
                if (item.imgUrl && item.imgUrl.trim() !== '') {
                    const cleanPath = item.imgUrl.startsWith('../') ? item.imgUrl : `../${item.imgUrl}`;
                    imgStyle = `style="background-image: url('${cleanPath}'); background-size: cover; background-position: center;"`;
                }
                return `
                    <div class="project-card glow-card" data-tag="${item.tag || 'Project'}" onclick="openProjectDetailModal(${item.id}, 'project')" style="cursor: pointer;">
                        <div class="project-img ${item.bgClass || 'bg-a1'}" ${imgStyle}></div>
                        <span class="tag">${item.tag || 'Project'}</span>
                        <h3>${item.title || ''}</h3>
                        <p>${item.description || ''}</p>
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
                if (item.imgUrl && item.imgUrl.trim() !== '') {
                    const cleanPath = item.imgUrl.replace(/^\.\.\//, '');
                    imgStyle = `style="background-image: url('${cleanPath}'); background-size: cover; background-position: center;"`;
                }
                return `
                    <div class="project-card glow-card reveal" data-tag="${item.tag || 'Portfolio'}" onclick="openProjectDetailModal(${item.id}, 'portfolio')" style="cursor: pointer;">
                        <div class="project-img ${item.bgClass || 'bg-p2'}" ${imgStyle}></div>
                        <span class="tag">${item.tag || 'Portfolio'}</span>
                        <h3>${item.title || ''}</h3>
                        <p>${item.description || ''}</p>
                    </div>
                `;
            }).join('');
        }

        if (portfolioGrid) {
            // Render seluruh portofolio personal dari terbaru ke terlama (Modul/portfolio.html)
            portfolioGrid.innerHTML = portData.map(item => {
                let imgStyle = '';
                if (item.imgUrl && item.imgUrl.trim() !== '') {
                    const cleanPath = item.imgUrl.startsWith('../') ? item.imgUrl : `../${item.imgUrl}`;
                    imgStyle = `style="background-image: url('${cleanPath}'); background-size: cover; background-position: center;"`;
                }
                return `
                    <div class="project-card glow-card" data-tag="${item.tag || 'Portfolio'}" onclick="openProjectDetailModal(${item.id}, 'portfolio')" style="cursor: pointer;">
                        <div class="project-img ${item.bgClass || 'bg-a2'}" ${imgStyle}></div>
                        <span class="tag">${item.tag || 'Portfolio'}</span>
                        <h3>${item.title || ''}</h3>
                        <p>${item.description || ''}</p>
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
                    <a href="${article.url || 'Modul/article.html'}" target="_blank" class="project-card glow-card reveal" data-tag="${article.tag || 'Testing'}">
                        <div class="project-img ${article.bgClass || 'bg-a1'}" ${imgStyle}></div>
                        <span class="tag">${article.tag || 'Article'}</span>
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
                    <a href="${article.url || '#'}" target="_blank" class="project-card glow-card" data-tag="${article.tag || 'Testing'}">
                        <div class="project-img ${article.bgClass || 'bg-a1'}" ${imgStyle}></div>
                        <span class="tag">${article.tag || 'Article'}</span>
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
                         data-source="${cert.tag || cert.source || 'Certificate'}" 
                         data-tag="${cert.tag || 'Certificate'}" 
                         data-img="${cleanImg}" 
                         data-pages="${pagesList}" 
                         style="cursor: pointer;">
                        <div class="project-img ${cert.bgClass || 'bg-c1'}" ${imgStyle}></div>
                        <span class="tag">${cert.tag || 'Certificate'}</span>
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
                         data-source="${cert.tag || cert.source || 'Certificate'}" 
                         data-tag="${cert.tag || 'Certificate'}" 
                         data-img="${cleanImg}" 
                         data-pages="${pagesList}" 
                         style="cursor: pointer;">
                        <div class="project-img ${cert.bgClass || 'bg-c1'}" ${imgStyle}></div>
                        <span class="tag">${cert.tag || 'Certificate'}</span>
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
            heroCardsGrid.innerHTML = timelineData.map(item => `
                <div class="mini-card" onclick="openModal('${item.modalId}')">
                    <img src="${item.miniCardImg}" alt="${item.miniCardLabel}">
                    <div class="mini-card-overlay">${item.miniCardLabel}</div>
                </div>
            `).join('');
        }

        if (timelineContainer) {
            const itemsHtml = timelineData.map((item, index) => {
                const isLast = index === timelineData.length - 1;
                const dotColor = item.isCurrent ? 'var(--accent-yellow)' : 'var(--cyan-primary)';
                const badgeBg = item.isCurrent ? 'rgba(250, 204, 21, 0.15)' : 'rgba(6, 182, 212, 0.15)';
                const badgeColor = item.isCurrent ? '#fde047' : 'var(--cyan-light)';
                const badgeBorder = item.isCurrent ? 'rgba(250, 204, 21, 0.3)' : 'rgba(6, 182, 212, 0.3)';
                const subtitleColor = item.isCurrent ? '#facc15' : 'var(--cyan-light)';

                return `
                    <div class="reveal" style="position: relative; margin-bottom: ${isLast ? '25px' : '35px'};">
                        <span style="position: absolute; left: -39px; top: 16px; width: 16px; height: 16px; background: ${dotColor}; border-radius: 50%; box-shadow: 0 0 12px ${dotColor}; border: 3px solid var(--bg-main);"></span>
                        <div class="timeline-card">
                            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                                <span style="display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder};">
                                    ${item.category}
                                </span>
                                <span style="display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; background: rgba(250, 204, 21, 0.12); color: var(--accent-yellow); border: 1px solid rgba(250, 204, 21, 0.3);">
                                    <i class="fa-regular fa-calendar-days" style="font-size: 11px;"></i> ${item.year}
                                </span>
                            </div>
                            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 4px; color: var(--text-main);">${item.title}</h3>
                            <p style="font-size: 12px; color: ${subtitleColor}; font-weight: 600; margin-bottom: 10px;">${item.subtitle}</p>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6; margin: 0;">
                                ${item.description}
                            </p>
                            <button class="btn-read-more" onclick="openModal('${item.modalId}')">
                                Lihat Selengkapnya <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

            timelineContainer.innerHTML = `
                <!-- Garis Vertikal Timeline -->
                <div style="position: absolute; left: 12px; top: 12px; bottom: 12px; width: 3px; background: linear-gradient(to bottom, var(--cyan-primary), var(--accent-yellow), transparent); border-radius: 3px; box-shadow: 0 0 12px var(--cyan-glow);"></div>
                ${itemsHtml}
            `;
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
    // 4. CERTIFICATE PREVIEW MODAL (LIGHTBOX SLIDER)
    // =============================================================
    const certCards = document.querySelectorAll('.cert-card');
    const certModal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');
    const certCloseBtn = document.getElementById('certCloseBtn');
    const certPrevBtn = document.getElementById('certPrevBtn');
    const certNextBtn = document.getElementById('certNextBtn');
    const certCurrentPage = document.getElementById('certCurrentPage');
    const certTotalPages = document.getElementById('certTotalPages');
    const certPageIndicator = document.getElementById('certPageIndicator');

    let currentCertList = [];
    let currentCertIndex = 0;

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
            document.body.style.overflow = 'auto';
        }
    }

    if (certModal) {
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.cert-card');
            if (card) {
                const singleImg = card.getAttribute('data-img');
                const multiPages = card.getAttribute('data-pages');

                if (multiPages) {
                    currentCertList = multiPages.split(',').map(s => s.trim()).filter(Boolean);
                } else if (singleImg) {
                    currentCertList = [singleImg];
                } else {
                    currentCertList = [];
                }

                currentCertIndex = 0;
                showCertSlide(0);

                certModal.classList.add('active');
                certModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
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

        // Close on clicking backdrop (outside image and nav buttons)
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal || e.target.classList.contains('cert-img-wrapper')) {
                closeCertLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (certModal.classList.contains('active')) {
                if (e.key === 'ArrowLeft' && certPrevBtn && !certPrevBtn.disabled) {
                    certPrevBtn.click();
                } else if (e.key === 'ArrowRight' && certNextBtn && !certNextBtn.disabled) {
                    certNextBtn.click();
                } else if (e.key === 'Escape') {
                    closeCertLightbox();
                }
            }
        });
    }

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

        if (titleEl) titleEl.textContent = `Detail ${type === 'portfolio' ? 'Portofolio' : 'Proyek'} – ${project.tag || 'Overview'}`;
        if (tagEl) tagEl.textContent = project.tag || (type === 'portfolio' ? 'Portofolio' : 'Proyek');
        if (nameEl) nameEl.textContent = project.detailName || project.title;
        if (descEl) descEl.textContent = project.detailDesc || project.description;
        if (roleEl) roleEl.textContent = project.role || 'QA Engineer';
        if (durationEl) durationEl.textContent = project.duration || '-';
        if (categoryEl) categoryEl.textContent = project.tag || 'Quality Assurance';

        if (bannerEl) {
            bannerEl.className = `project-banner-preview ${project.bgClass || 'bg-a1'}`;
            if (project.imgUrl && project.imgUrl.trim() !== '') {
                const isInsideModul = window.location.pathname.includes('/Modul/') || window.location.pathname.includes('\\Modul\\');
                let cleanImg = project.imgUrl;
                if (isInsideModul) {
                    cleanImg = project.imgUrl.startsWith('../') ? project.imgUrl : `../${project.imgUrl}`;
                } else {
                    cleanImg = project.imgUrl.replace(/^\.\.\//, '');
                }
                bannerEl.style.backgroundImage = `url('${cleanImg}')`;
            } else {
                bannerEl.style.backgroundImage = '';
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
