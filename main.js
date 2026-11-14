/**
 * Interactive portfolio controller for Mohamed Al Nady.
 * Handles header state, window.scrollTo anchor scrolling, portfolio filters,
 * project case-study modal, EmailJS form submission, and clipboard copy.
 */
document.addEventListener('DOMContentLoaded', () => {
    const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];

    const state = {
        activeFilter: 'all',
        showAllInAllTab: false
    };

    /* ======================================================================
       1. HEADER SCROLL & SMOOTH ANCHOR NAVIGATION (window.scrollTo)
       ====================================================================== */
    const siteHeader = document.getElementById('site-header');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');

    function updateHeaderOnScroll() {
        if (!siteHeader) return;
        siteHeader.classList.toggle('is-scrolled', window.scrollY > 40);
    }

    window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
    updateHeaderOnScroll();

    function scrollToSection(hash) {
        if (!hash || hash === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const target = document.querySelector(hash);
        if (!target) return;
        const headerOffset = siteHeader ? siteHeader.offsetHeight : 76;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (!href) return;
            e.preventDefault();
            if (mobileDrawer && !mobileDrawer.hidden) {
                mobileDrawer.hidden = true;
                mobileBtn?.setAttribute('aria-expanded', 'false');
            }
            scrollToSection(href);
        });
    });

    document.getElementById('back-to-top-btn')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    if (mobileBtn && mobileDrawer) {
        mobileBtn.addEventListener('click', () => {
            const isHidden = mobileDrawer.hidden;
            mobileDrawer.hidden = !isHidden;
            mobileBtn.setAttribute('aria-expanded', String(isHidden));
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 960 && !mobileDrawer.hidden) {
                mobileDrawer.hidden = true;
                mobileBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ======================================================================
       2. PORTFOLIO RENDERING & CATEGORY FILTERING
       ====================================================================== */
    const portfolioGrid = document.getElementById('portfolio-grid');
    const portfolioMoreWrap = document.getElementById('portfolio-more-wrap');
    const portfolioMoreBtn = document.getElementById('portfolio-more-btn');
    const filterButtons = document.querySelectorAll('.filter-tab');

    function getVisibleProjects() {
        const filtered =
            state.activeFilter === 'all'
                ? projects
                : projects.filter((p) => p.category === state.activeFilter);

        if (state.activeFilter === 'all' && !state.showAllInAllTab) {
            return filtered.filter((p) => p.featured);
        }
        return filtered;
    }

    function renderPortfolio() {
        if (!portfolioGrid) return;
        const visible = getVisibleProjects();

        if (!visible.length) {
            portfolioGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; border: 1px solid rgba(255,255,255,0.14);">
                    <p style="color: #B5B5B5; margin-bottom: 16px;">No projects matched this filter.</p>
                    <button type="button" class="bar-cta" id="reset-filter-inline">Show All Projects</button>
                </div>`;
            document.getElementById('reset-filter-inline')?.addEventListener('click', () => {
                setActiveFilter('all');
            });
        } else {
            portfolioGrid.innerHTML = visible
                .map((p) => {
                    const cover = p.coverImage || p.images[0] || 'assets/cover-sql-generic.svg';
                    const isCentered = cover.endsWith('.svg') || p.category === 'sql';
                    return `
                        <article class="project-tile">
                            <div class="project-thumb-wrap" data-open-modal="${p.id}" tabindex="0" role="button" aria-label="Inspect ${p.title}">
                                <img
                                    src="${cover}"
                                    alt="${p.title}"
                                    loading="lazy"
                                    class="project-thumb ${isCentered ? 'project-thumb--center' : ''}"
                                />
                                <div class="project-hover-scrim">
                                    <span class="scrim-cat">${p.categoryLabel}</span>
                                    <h3 class="scrim-title">${p.title}</h3>
                                    <div class="scrim-actions">
                                        <button type="button" class="scrim-btn" data-open-modal="${p.id}">Inspect Case</button>
                                        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="scrim-btn" onclick="event.stopPropagation()">GitHub ↗</a>
                                    </div>
                                </div>
                            </div>
                            <div class="project-caption">
                                <button type="button" class="project-caption-title" data-open-modal="${p.id}">${p.title}</button>
                                <span class="project-caption-metric">${p.primaryMetric}</span>
                            </div>
                        </article>`;
                })
                .join('');
        }

        if (portfolioMoreWrap && portfolioMoreBtn) {
            if (state.activeFilter === 'all' && projects.length > 6) {
                portfolioMoreWrap.hidden = false;
                portfolioMoreBtn.textContent = state.showAllInAllTab
                    ? 'Show Featured 6 Only'
                    : `Show All ${projects.length} Projects`;
            } else {
                portfolioMoreWrap.hidden = true;
            }
        }
    }

    function setActiveFilter(filter) {
        state.activeFilter = filter;
        filterButtons.forEach((btn) => {
            const match = btn.getAttribute('data-filter') === filter;
            btn.classList.toggle('is-active', match);
            btn.setAttribute('aria-pressed', String(match));
        });
        renderPortfolio();
    }

    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter') || 'all';
            setActiveFilter(filter);
        });
    });

    portfolioMoreBtn?.addEventListener('click', () => {
        state.showAllInAllTab = !state.showAllInAllTab;
        renderPortfolio();
    });

    /* ======================================================================
       3. CASE STUDY INSPECTION MODAL
       ====================================================================== */
    const modalOverlay = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalKicker = document.getElementById('modal-kicker');
    const modalMainImg = document.getElementById('modal-main-img');
    const modalThumbs = document.getElementById('modal-thumbs');
    const modalMetric1 = document.getElementById('modal-metric-1');
    const modalMetric2 = document.getElementById('modal-metric-2');
    const modalTags = document.getElementById('modal-tags');
    const modalDesc = document.getElementById('modal-desc');
    const modalArchNotes = document.getElementById('modal-arch-notes');
    const modalCodeLabel = document.getElementById('modal-code-label');
    const modalCodeBlock = document.getElementById('modal-code-block');
    const modalGithubLink = document.getElementById('modal-github-link');
    const modalDownloadSlot = document.getElementById('modal-download-slot');
    const modalTabOverview = document.getElementById('modal-panel-overview');
    const modalTabCode = document.getElementById('modal-panel-code');
    const modalTabBtns = document.querySelectorAll('[data-modal-tab]');
    const copyCodeBtn = document.getElementById('modal-copy-code-btn');

    let lastFocusedBeforeModal = null;

    function switchModalTab(tab) {
        const isOverview = tab === 'overview';
        if (modalTabOverview) modalTabOverview.hidden = !isOverview;
        if (modalTabCode) modalTabCode.hidden = isOverview;
        modalTabBtns.forEach((btn) => {
            const active = btn.getAttribute('data-modal-tab') === tab;
            btn.classList.toggle('is-active', active);
            btn.setAttribute('aria-selected', String(active));
        });
    }

    modalTabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            switchModalTab(btn.getAttribute('data-modal-tab') || 'overview');
        });
    });

    function openProjectModal(projectId) {
        const project = projects.find((p) => p.id === projectId);
        if (!project || !modalOverlay) return;

        lastFocusedBeforeModal = document.activeElement;
        switchModalTab('overview');

        if (modalKicker) modalKicker.textContent = `${project.categoryLabel} · ${project.domain}`;
        if (modalTitle) modalTitle.textContent = project.title;
        if (modalMetric1) modalMetric1.textContent = project.primaryMetric;
        if (modalMetric2) modalMetric2.textContent = project.secondaryMetric;
        if (modalDesc) modalDesc.textContent = project.description;
        if (modalArchNotes) modalArchNotes.textContent = project.architectureNotes;
        if (modalCodeLabel) modalCodeLabel.textContent = project.codeLanguage;
        if (modalCodeBlock) modalCodeBlock.textContent = project.codeSnippet;
        if (modalGithubLink) modalGithubLink.href = project.github;

        if (modalTags) {
            modalTags.innerHTML = project.tags
                .map((tag) => `<span class="modal-tag">${tag}</span>`)
                .join('');
        }

        if (modalDownloadSlot) {
            modalDownloadSlot.innerHTML = project.download
                ? `<a href="${project.download}" download class="modal-btn-secondary">Download .PBIX ↓</a>`
                : '';
        }

        if (modalMainImg) {
            modalMainImg.src = project.images[0] || 'assets/cover-sql-generic.svg';
            modalMainImg.alt = `${project.title} preview`;
        }

        if (modalThumbs) {
            if (project.images.length > 1) {
                modalThumbs.hidden = false;
                modalThumbs.innerHTML = project.images
                    .map((src, idx) => {
                        const label = (project.imageLabels && project.imageLabels[idx]) || `View ${idx + 1}`;
                        return `<button type="button" class="modal-thumb-btn ${idx === 0 ? 'is-active' : ''}" data-thumb-src="${src}">${label}</button>`;
                    })
                    .join('');
            } else {
                modalThumbs.hidden = true;
                modalThumbs.innerHTML = '';
            }
        }

        modalOverlay.hidden = false;
        document.body.style.overflow = 'hidden';
        modalCloseBtn?.focus();
    }

    function closeProjectModal() {
        if (!modalOverlay || modalOverlay.hidden) return;
        modalOverlay.hidden = true;
        document.body.style.overflow = '';
        if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
            lastFocusedBeforeModal.focus();
        }
    }

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-open-modal]');
        if (trigger) {
            const id = trigger.getAttribute('data-open-modal');
            if (id) openProjectModal(id);
            return;
        }

        const thumbBtn = e.target.closest('[data-thumb-src]');
        if (thumbBtn && modalMainImg) {
            const src = thumbBtn.getAttribute('data-thumb-src');
            if (src) modalMainImg.src = src;
            modalThumbs?.querySelectorAll('.modal-thumb-btn').forEach((b) => {
                b.classList.toggle('is-active', b === thumbBtn);
            });
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && !modalOverlay.hidden) {
            closeProjectModal();
        }
        if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.project-thumb-wrap[data-open-modal]')) {
            e.preventDefault();
            const id = e.target.getAttribute('data-open-modal');
            if (id) openProjectModal(id);
        }
    });

    modalCloseBtn?.addEventListener('click', closeProjectModal);
    modalOverlay?.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeProjectModal();
    });

    /* ======================================================================
       4. CLIPBOARD COPY HELPERS
       ====================================================================== */
    function copyText(text, onDone) {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            navigator.clipboard.writeText(text).then(onDone).catch(() => fallbackCopy(text, onDone));
        } else {
            fallbackCopy(text, onDone);
        }
    }

    function fallbackCopy(text, onDone) {
        const area = document.createElement('textarea');
        area.value = text;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        try {
            document.execCommand('copy');
        } catch (_err) {
            // ignore
        }
        document.body.removeChild(area);
        onDone();
    }

    const copyEmailBtn = document.getElementById('copy-email-btn');
    copyEmailBtn?.addEventListener('click', () => {
        copyText('mohamednady0@outlook.com', () => {
            const orig = copyEmailBtn.textContent;
            copyEmailBtn.textContent = 'Copied';
            setTimeout(() => {
                copyEmailBtn.textContent = orig;
            }, 2000);
        });
    });

    copyCodeBtn?.addEventListener('click', () => {
        if (!modalCodeBlock) return;
        copyText(modalCodeBlock.textContent || '', () => {
            const orig = copyCodeBtn.textContent;
            copyCodeBtn.textContent = 'Copied';
            setTimeout(() => {
                copyCodeBtn.textContent = orig;
            }, 2000);
        });
    });

    /* ======================================================================
       5. CONTACT FORM (Existing EmailJS Configuration + Offline Fallback)
       ====================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const nameEl = document.getElementById('form-name');
        const emailEl = document.getElementById('form-email');
        const phoneEl = document.getElementById('form-phone');
        const messageEl = document.getElementById('form-message');

        if (!submitBtn || !nameEl || !emailEl || !messageEl || !formStatus) return;

        const origLabel = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'SENDING...';
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        const payload = {
            service_id: 'service_qty1cef',
            template_id: 'template_69as8sp',
            user_id: 'su7tbpdo6ynL9DHiW',
            template_params: {
                from_name: nameEl.value.trim(),
                email: emailEl.value.trim(),
                subject: phoneEl && phoneEl.value.trim()
                    ? `Portfolio Inquiry (${phoneEl.value.trim()})`
                    : 'Portfolio Inquiry',
                message: messageEl.value.trim()
            }
        };

        fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                formStatus.textContent = 'Message sent. I will get back to you shortly.';
                formStatus.classList.add('form-status--ok');
                contactForm.reset();
            })
            .catch(() => {
                formStatus.textContent =
                    'Could not reach EmailJS right now. Please email mohamednady0@outlook.com directly.';
                formStatus.classList.add('form-status--err');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = origLabel;
            });
    });

    /* Initialize */
    renderPortfolio();
});
