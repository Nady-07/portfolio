# Mohamed Al Nady — Analytics & BI Portfolio

![HTML5](https://img.shields.io/badge/HTML5-1D1D1D?style=flat-square)
![CSS3](https://img.shields.io/badge/CSS3-3D3D3D?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-1D1D1D?style=flat-square)
![GitHub Pages](https://img.shields.io/badge/HOSTING-GITHUB_PAGES-0B0B0B?style=flat-square&labelColor=1D1D1D)
![License](https://img.shields.io/badge/LICENSE-MIT-3D3D3D?style=flat-square&labelColor=1D1D1D)

Source code for my live **Data & Business Intelligence (BI) Analyst portfolio** hosted on GitHub Pages: **[nady-07.github.io/portfolio](https://nady-07.github.io/portfolio/)**.

[Live Portfolio ↗](https://nady-07.github.io/portfolio/) · [Download CV (PDF)](https://nady-07.github.io/portfolio/cv/Mohamed_Alnady_CV.pdf) · [Interactive CV](https://nady-07.github.io/portfolio/cv/Mohamed_Alnady_CV.html) · [GitHub Profile](https://github.com/Nady-07)

---

## Overview

Built as a lightweight, zero-framework static web application using a **Monochrome Architectural Editorial** aesthetic (`#F4F4F4` paper, `#D7D7D7` stone, `#1D1D1D` charcoal, `#0B0B0B` ink; `Montserrat`, `Open Sans`, and `JetBrains Mono`).

### Key Features
- **Interactive Project Showcase:** Filterable catalog covering **Power BI**, **Excel BI**, and **SQL Server (T-SQL)** case studies backed by `data/projects.js`.
- **Deep-Dive Inspection Modal:** Multi-screenshot gallery, architecture notes, headline business KPIs, copyable DAX/SQL code snippets, and direct GitHub / `.pbix` links.
- **Integrated Resume Hub:** Web-rendered CV (`cv/Mohamed_Alnady_CV.html`) paired with an ATS-ready PDF download (`cv/Mohamed_Alnady_CV.pdf`).
- **Responsive Layout:** Diagonal editorial hero, mobile navigation drawer, keyboard-accessible modal, and one-click email copy.

---

## Repository Structure

```text
portfolio/
├── index.html                   # Single-page editorial layout & modal structure
├── styles.css                   # Monochrome architectural design tokens & styles
├── main.js                      # Project filtering, modal gallery & clipboard logic
├── data/
│   └── projects.js              # Structured project catalog, metrics & code snippets
├── cv/
│   ├── Mohamed_Alnady_CV.html   # Interactive web resume
│   └── Mohamed_Alnady_CV.pdf    # Downloadable ATS-friendly PDF resume
├── assets/                      # Dashboard previews, monochrome SVG covers & favicon
├── LICENSE
└── README.md
```

---

## Local Preview

Because the site is pure HTML, CSS, and vanilla JavaScript, no build step is required:

```bash
git clone https://github.com/Nady-07/portfolio.git
cd portfolio
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

## License

Licensed under the [MIT License](./LICENSE).

---

**Mohamed Al Nady** — *Data & Business Intelligence Analyst*  
[Live Portfolio ↗](https://nady-07.github.io/portfolio/) · [LinkedIn](https://www.linkedin.com/in/mohamed-alnady-52b87123b) · [Email](mailto:mohamednady0@outlook.com) · [GitHub](https://github.com/Nady-07)
