document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. LIGHT / DARK THEME TOGGLE
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Initialize theme
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    }
    
    // Toggle Event
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    /* ==========================================================================
       2. MOBILE MENU TOGGLE
       ========================================================================== */
    const mobileMenuToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('open');
        mobileMenuOverlay.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
        
        // Animate hamburger bars to 'X'
        const bars = mobileMenuToggle.querySelectorAll('.bar');
        if (mobileMenuToggle.classList.contains('open')) {
            bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
    
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuOverlay.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    /* ==========================================================================
       3. STICKY HEADER & BACK TO TOP BUTTON
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        // Sticky Header shadow
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px var(--card-shadow)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        // Back to top button visibility
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       4. SKILLS TABS SWITCHER
       ========================================================================== */
    const tabButtons = document.querySelectorAll('.skill-tab-btn');
    const tabContents = document.querySelectorAll('.skills-tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons and contents
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => {
                c.classList.remove('active');
                c.style.display = 'none';
            });
            
            // Add active to current button
            btn.classList.add('active');
            
            // Get Target ID and element
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            // Show target content with animation
            targetContent.style.display = 'block';
            setTimeout(() => {
                targetContent.classList.add('active');
            }, 50);
        });
    });

    /* ==========================================================================
       5. INTERACTIVE PROJECT MODAL (Slideshows and Detail Viewers)
       ========================================================================== */
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modalOverlay = document.getElementById('project-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalContentArea = document.querySelector('.modal-content-area');
    
    const projectsData = {
        'ibm-hr': `
            <div class="modal-project-title">IBM HR Employee Attrition Case Study</div>
            <div class="modal-project-tech">Power BI · DAX · Excel · 1,470 Employee Records</div>
            
            <!-- Dashboard Slideshow -->
            <div class="modal-slideshow">
                <div class="slideshow-image-wrapper">
                    <img id="slideshow-img" src="assets/ibm-hr-overview.png" alt="IBM HR Overview Page" class="slideshow-img">
                </div>
                <div class="slideshow-tabs">
                    <button class="slide-tab-btn active" data-slide="1" data-desc="Overview Dashboard: Summarizes high-level KPIs such as 1,470 total employees, 16.1% attrition rate, and key metrics by department.">Page 1: Overview</button>
                    <button class="slide-tab-btn" data-slide="2" data-desc="Attrition Deep Dive: Highlights attrition drivers. Discovers that overtime workers leave at 30.5% (nearly 3x standard workers) and single employees churn at 53.28%.">Page 2: Deep Dive</button>
                    <button class="slide-tab-btn" data-slide="3" data-desc="Workforce Profile: Breaks down active employee demographics, average tenure (7.0 years), and role-specific distribution.">Page 3: Workforce Profile</button>
                    <button class="slide-tab-btn" data-slide="4" data-desc="Compensation & Satisfaction: Compares attrition vs income ranges, proving lower-income cohorts and entry roles show severe churn spikes.">Page 4: Compensation</button>
                </div>
                <p id="slideshow-desc" class="slideshow-desc">Overview Dashboard: Summarizes high-level KPIs such as 1,470 total employees, 16.1% attrition rate, and key metrics by department.</p>
            </div>

            <div class="modal-project-section">
                <h4>Key Analytical Discoveries</h4>
                <ul class="modal-bullets">
                    <li><strong>Overtime Impact:</strong> Workers performing overtime leave the company at <strong>30.5%</strong> vs. only 10.4% of standard workers. This is the single highest attrition driver.</li>
                    <li><strong>Young Talent Vulnerability:</strong> Staff under the age of 25 suffer an attrition rate of <strong>39.18%</strong>, mostly resigning during their first 24 months.</li>
                    <li><strong>Role Specifics:</strong> Sales Representatives (25%) and Lab Technicians (24%) showed the highest segment churn rates, exceeding company average.</li>
                </ul>
            </div>
            
            <div class="modal-project-section">
                <h4>Calculated Measures Designed (DAX)</h4>
                <ul class="modal-bullets">
                    <li><code>Total Attrition = CALCULATE(COUNT(Employee[EmployeeID]), Employee[Attrition] = "Yes")</code></li>
                    <li><code>Attrition Rate = DIVIDE([Total Attrition], [Total Employees], 0)</code></li>
                    <li><code>Retention Rate = 1 - [Attrition Rate]</code></li>
                </ul>
            </div>

            <div class="modal-project-section">
                <h4>Strategic Retention Playbook</h4>
                <ul class="modal-bullets">
                    <li><strong>Overtime Audits:</strong> Implement workload tracking to cap consecutive weeks of overtime, targeting research and sales.</li>
                    <li><strong>Early Mentorship:</strong> Roll out structured peer mentorship programs for employees under 25 during their first two years.</li>
                    <li><strong>Compensation Alignment:</strong> Review pay parity and pathways for entry roles showing disproportionate attrition.</li>
                </ul>
            </div>
        `,
        'excel-sales': `
            <div class="modal-project-title">Executive Sales Performance Dashboard</div>
            <div class="modal-project-tech">Microsoft Excel · Pivot Tables · Slicers · Sales KPIs</div>
            
            <div class="modal-project-section">
                <div class="slideshow-image-wrapper">
                    <img src="assets/excel-sales-performance.png" alt="Executive Sales Performance Dashboard" class="slideshow-img">
                </div>
            </div>
            
            <div class="modal-project-section">
                <h4>Project Executive Summary</h4>
                <p>Built a dynamic sales performance reporting workbook in Excel, tracking <strong>$14.54M in revenue</strong> across 28.7K units sold. The dashboard maps historical regional trends and item categories to support commercial decision-making.</p>
                <div class="modal-project-grid">
                    <div class="modal-metric-card">
                        <span class="kpi-label">Total Revenue</span>
                        <div class="modal-metric-val">$14.54M</div>
                    </div>
                    <div class="modal-metric-card">
                        <span class="kpi-label">YoY Growth</span>
                        <div class="modal-metric-val" style="color: #10b981;">+14.6%</div>
                    </div>
                    <div class="modal-metric-card">
                        <span class="kpi-label">Avg. Order Value</span>
                        <div class="modal-metric-val">$48.5K</div>
                    </div>
                    <div class="modal-metric-card">
                        <span class="kpi-label">Units Sold</span>
                        <div class="modal-metric-val" style="color: #3b82f6;">28.7K</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-project-section">
                <h4>Commercial Insights & Trends</h4>
                <ul class="modal-bullets">
                    <li><strong>Monthly Seasonality:</strong> Uncovered a strong Q4 sales surge, peaking in December ($885.4K) and November ($783.6K), driven by seasonal purchasing behaviors.</li>
                    <li><strong>Regional Dominance:</strong> The West region ($5.23M) and East region ($4.89M) represent the largest revenue generators, combining for over 70% of sales.</li>
                    <li><strong>Gender Segments:</strong> Female customers drove the majority of purchasing contribution, accounting for <strong>64.6%</strong> of total transactions.</li>
                    <li><strong>Category Performance:</strong> Sports items ($3.10M) and Home Appliances ($2.95M) emerged as the most profitable product lines.</li>
                </ul>
            </div>
        `,
        'excel-adventureworks': `
            <div class="modal-project-title">AdventureWorks Sales & Profit Dashboard</div>
            <div class="modal-project-tech">Excel Power Pivot · Data Modeling · Star Schema · DAX</div>
            
            <div class="modal-project-section">
                <div class="slideshow-image-wrapper">
                    <img src="assets/excel-adventureworks.png" alt="AdventureWorks Sales & Profit Dashboard" class="slideshow-img">
                </div>
            </div>
            
            <div class="modal-project-section">
                <h4>Project Executive Summary</h4>
                <p>Constructed an end-to-end business intelligence workbook in Excel using Power Pivot and Power Query. Imported transactional files, modeled relationships via a star schema, and calculated margins for <strong>$307.09M in global sales</strong>.</p>
                <div class="modal-project-grid">
                    <div class="modal-metric-card">
                        <span class="kpi-label">Gross Revenue</span>
                        <div class="modal-metric-val">$307.09M</div>
                    </div>
                    <div class="modal-metric-card">
                        <span class="kpi-label">Total Profit</span>
                        <div class="modal-metric-val" style="color: #10b981;">$126.29M</div>
                    </div>
                    <div class="modal-metric-card">
                        <span class="kpi-label">Profit Margin</span>
                        <div class="modal-metric-val" style="color: #3b82f6;">41.1%</div>
                    </div>
                    <div class="modal-metric-card">
                        <span class="kpi-label">Total Transactions</span>
                        <div class="modal-metric-val">60.40K</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-project-section">
                <h4>Key Analytical Discoveries</h4>
                <ul class="modal-bullets">
                    <li><strong>Geographical Analysis:</strong> United States led global profits with <strong>$50M</strong>, closely followed by Australia (~$45M). France represented the lowest profit share (~$12M).</li>
                    <li><strong>Product Profitability:</strong> The Mountain-200 Black (size 46) series was the highest revenue-generating product, delivering <strong>$5.2M</strong> in net margin.</li>
                    <li><strong>Customer Demographics:</strong> Sales contribution was perfectly balanced between genders, showing 50.39% Female and 49.61% Male purchasing ratios.</li>
                    <li><strong>Data Optimization:</strong> Transformed raw databases into clean dimension (Client, Geography, Product) and fact tables, reducing file processing size and query times.</li>
                </ul>
            </div>
        `
    };
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const projectKey = trigger.getAttribute('data-project');
            const projectHTML = projectsData[projectKey];
            
            if (projectHTML) {
                modalContentArea.innerHTML = projectHTML;
                modalOverlay.classList.add('open');
                document.body.classList.add('no-scroll');
                
                // Initialize slideshow if it's the Power BI project
                if (projectKey === 'ibm-hr') {
                    initSlideshow();
                }
            }
        });
    });
    
    function initSlideshow() {
        const slideButtons = document.querySelectorAll('.slide-tab-btn');
        const slideshowImg = document.getElementById('slideshow-img');
        const slideshowDesc = document.getElementById('slideshow-desc');
        
        slideButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                slideButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const slideNum = btn.getAttribute('data-slide');
                const desc = btn.getAttribute('data-desc');
                
                let imgSrc = 'assets/ibm-hr-overview.png';
                if (slideNum === '2') imgSrc = 'assets/ibm-hr-page2.png';
                else if (slideNum === '3') imgSrc = 'assets/ibm-hr-page3.png';
                else if (slideNum === '4') imgSrc = 'assets/ibm-hr-page4.png';
                
                slideshowImg.src = imgSrc;
                slideshowDesc.textContent = desc;
            });
        });
    }
    
    function closeModal() {
        modalOverlay.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    
    // Close on clicking overlay background
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    
    // Close on pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
            closeModal();
        }
    });

    /* ==========================================================================
       6. SCROLL ENTRANCE ANIMATION (Intersection Observer)
       ========================================================================== */
    // Add scroll animations class automatically
    const animatedSections = [
        document.querySelector('.about-section'),
        document.querySelector('.skills-section'),
        document.querySelector('.projects-section'),
        document.querySelector('.experience-section'),
        document.querySelector('.education-section'),
        document.querySelector('.contact-section')
    ];
    
    animatedSections.forEach(sec => {
        if (sec) {
            sec.classList.add('reveal');
        }
    });
    
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);
    
    animatedSections.forEach(sec => {
        if (sec) {
            scrollObserver.observe(sec);
        }
    });

    /* ==========================================================================
       7. CONTACT FORM SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show Loading State
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending Message... <span class="spinner"></span>';
            formResponse.textContent = '';
            formResponse.className = 'form-response';
            
            // Simulate API Call
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Success Response
                formResponse.textContent = 'Thank you! Your message has been sent successfully. I will get back to you shortly.';
                formResponse.classList.add('success');
                
                // Clear Form
                contactForm.reset();
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    formResponse.textContent = '';
                    formResponse.className = 'form-response';
                }, 5000);
                
            }, 1500);
        });
    }
});
