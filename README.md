# ITZFIZZ — Scroll-Driven Hero Section & Web Experience

> **Production-Grade Frontend Implementation for Itzfizz Web Development Internship Evaluation**  
> Built by **Soumen Dass** using **React.js**, **Vite**, **Tailwind CSS**, and **GSAP ScrollTrigger**.

---

## Assignment Objective

Create a premium, modern, scroll-driven hero section inspired by the interaction mechanics of the reference demo ([https://paraschaturvedi.github.io/car-scroll-animation/](https://paraschaturvedi.github.io/car-scroll-animation/)) with an original, polished **Itzfizz Digital** brand identity.

### Key Highlights
- **Fullscreen Hero Layout**: `min-height: 100vh` viewport featuring the letter-spaced display headline `W E L C O M E   I T Z F I Z Z`.
- **Initial Load Choreography**: GSAP timeline with character/word stagger reveal (`y: 35px → 0px`, `rotateX: -25deg → 0deg`), badge entrance, and sequential statistics animations.
- **Scroll-Driven 3D Centerpiece Visual**: Pinned hero container (`pin: true`, `scrub: 1.2`) with real-time 3D spatial rotation, layer explosion (Z-depth displacement of code console, middle glass canvas, and foreground HUD badges), and live HTML5 Canvas 3D particle mesh.
- **4 Impact Statistics Cards**: Floating metric cards (`58% Engagement`, `23% Bounce Rate`, `27% Conversions`, `40% Load Time`) with parallax scroll movement.
- **Hardware-Accelerated Performance**: Animation restricted to `transform3d` and `opacity` to maintain rock-solid 60 FPS with zero layout reflows (`CLS: 0.00`).
- **Accessibility (`prefers-reduced-motion`)**: Automatically detects user motion preferences and degrades gracefully.

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React.js (v18)** | Component-driven UI architecture |
| **Vite (v6)** | Sub-second HMR & optimized production bundling |
| **GSAP (v3.12)** | Core animation timeline engine |
| **GSAP ScrollTrigger** | Pinned scroll scrubbing & physical interaction logic |
| **Tailwind CSS (v4)** | Custom styling, glassmorphic filters, and 3D utility layers |
| **HTML5 Canvas 2D/3D** | High-performance rotating polyhedron & particle matrix |
| **Lucide Icons** | Minimalist modern interface iconography |
| **GitHub Actions** | Automated CI/CD pipeline for GitHub Pages deployment |

---

## 📂 Project Architecture

```
itzfizz-hero-scroll/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD Pipeline
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Glassmorphic navigation & live status badge
│   │   ├── Hero.jsx            # Fullscreen pinned ScrollTrigger wrapper & headline
│   │   ├── HeroVisual.jsx      # 3D spatial centerpiece with live HTML5 Canvas 3D mesh
│   │   ├── Stats.jsx           # 4 floating metrics cards with parallax trajectories
│   │   ├── Services.jsx        # Capabilities, architecture benchmark & submission matrix
│   │   ├── Footer.jsx          # Sleek agency footer with back-to-top action
│   │   └── ReducedMotionNotice.jsx # Accessibility banner for reduced-motion users
│   ├── hooks/
│   │   └── useScrollAnimation.js # GSAP ScrollTrigger timeline hook with context cleanup
│   ├── App.jsx                 # Root composition layout
│   ├── main.jsx                # React DOM entry point
│   └── index.css               # Tailwind v4 directives, glassmorphism & 3D rules
├── index.html                  # HTML5 shell with Google Fonts (Syne & Plus Jakarta)
├── vite.config.js              # Vite config with relative base path
└── package.json                # Project dependencies & build scripts
```

---

## How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/Soumen-Dass-3002/ITZFIZZ-Evalution-Task.git
cd ITZFIZZ-Evalution-Task
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Build for production
```bash
npm run build
```

---

## Evaluation Compliance Matrix

| Requirement | Implementation Status | Notes |
| :--- | :---: | :--- |
| **Fullscreen Hero** | Complete | `min-h-screen` container with obsidian dark theme |
| **Display Headline** | Complete | `W E L C O M E   I T Z F I Z Z` with letter spacing & load stagger |
| **4 Statistics** | Complete | 58%, 23%, 27%, 40% with animated load & parallax |
| **Core Visual** | Complete | 3D spatial glass rig + HTML5 Canvas rotating cyber matrix |
| **Scroll-Driven Motion** | Complete | Pinned hero with GSAP ScrollTrigger scrub (`scrub: 1.2`) |
| **3D Layer Explosion** | Complete | Code matrix recedes in Z, foreground chips explode in Z |
| **Performance** | Complete | GPU transforms only, 60 FPS, `gsap.context()` cleanup |
| **Responsiveness** | Complete | Responsive from 375px mobile to 1920px 4K |
| **Accessibility** | Complete | Semantic HTML + `prefers-reduced-motion` detection |
| **GitHub Pages** | Complete | CI/CD Action configured + `base: './'` relative assets |

---

## Author

**Soumen Dass**  
- **GitHub**: [@Soumen-Dass-3002](https://github.com/Soumen-Dass-3002)  
- **Submission for**: Itzfizz Web Development Internship Evaluation
