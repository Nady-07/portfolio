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
       5. INTERACTIVE PROJECT MODAL (IBM HR Analytics detail deck)
       ========================================================================== */
    const modalTrigger = document.querySelector('.modal-trigger');
    const modalOverlay = document.getElementById('project-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalContentArea = document.querySelector('.modal-content-area');
    
    const projectsData = {
        'ibm-hr': `
            <div class="modal-project-title">IBM HR Employee Attrition Case Study</div>
            <div class="modal-project-tech">Power BI · DAX · Excel · 1,470 Employee Records</div>
            
            <div class="modal-project-section">
                <h4>Executive Dashboard Overview</h4>
                <p>Built a comprehensive 4-page analytical report tracking key metrics, identifying high-risk churn signals, and modeling attrition drivers. The solution maps out demographic factors and job categories to deliver actionable retention tactics.</p>
                <div class="modal-project-grid">
                    <div class="modal-metric-card">
                        <span class="kpi-label">Active Headcount</span>
                        <div class="modal-metric-val">1,233</div>
                    </div>
                    <div class="modal-metric-card">
                        <span class="kpi-label">Attrition Rate</span>
                        <div class="modal-metric-val" style="color: #ef4444;">16.1%</div>
                    </div>
                    <div class="modal-metric-card">
                        <span class="kpi-label">Satisfaction Average</span>
                        <div class="modal-metric-val">3.1 / 4</div>
                    </div>
                    <div class="modal-metric-card">
                        <span class="kpi-label">Years of Average Tenure</span>
                        <div class="modal-metric-val" style="color: #10b981;">7.0 yrs</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-project-section">
                <h4>Key Analytical Discoveries</h4>
                <ul class="modal-bullets">
                    <li><strong>Overtime Impact:</strong> Workers performing overtime leave the company at <strong>30.5%</strong> vs. only 10.4% of those working standard hours. This was the single highest attrition driver identified.</li>
                    <li><strong>Young Talent Vulnerability:</strong> Staff members under the age of 25 suffer an attrition rate of <strong>39.18%</strong>, mostly resigning during their first 24 months.</li>
                    <li><strong>Tenure Threshold:</strong> New hires show a severe attrition spike during years 1 and 2, which drops significantly once hitting their 3rd anniversary.</li>
                    <li><strong>Job Role Risks:</strong> Sales Representatives and Laboratory Technicians showed the highest segment churn rates, exceeding 25%.</li>
                </ul>
            </div>
            
            <div class="modal-project-section">
                <h4>Calculated Measures Designed (DAX)</h4>
                <ul class="modal-bullets">
                    <li><code>Total Attrition = CALCULATE(COUNT(Employee[EmployeeID]), Employee[Attrition] = "Yes")</code></li>
                    <li><code>Attrition Rate = DIVIDE([Total Attrition], [Total Employees], 0)</code></li>
                    <li><code>Retention Rate = 1 - [Attrition Rate]</code></li>
                    <li><code>Satisfaction Index = AVERAGE(Employee[JobSatisfaction])</code></li>
                </ul>
            </div>

            <div class="modal-project-section">
                <h4>Strategic Retention Playbook</h4>
                <ul class="modal-bullets">
                    <li><strong>Overtime Auditing:</strong> Implement workload tracking to cap consecutive weeks of overtime, specifically targeting R&D/Lab departments.</li>
                    <li><strong>Early Mentorship:</strong> Roll out structured peer mentorship programs for employees under 25 during their first two years to curb entry-level turnover.</li>
                    <li><strong>Role Redefinition:</strong> Re-evaluate career progression routes and incentive plans for Sales Representatives to improve tenure.</li>
                </ul>
            </div>
        `
    };
    
    if (modalTrigger) {
        modalTrigger.addEventListener('click', () => {
            const projectKey = modalTrigger.getAttribute('data-project');
            const projectHTML = projectsData[projectKey];
            
            if (projectHTML) {
                modalContentArea.innerHTML = projectHTML;
                modalOverlay.classList.add('open');
                document.body.classList.add('no-scroll');
            }
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
