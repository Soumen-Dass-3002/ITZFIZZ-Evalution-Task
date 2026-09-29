# ITZFIZZ — Scroll-Driven Hero Section & Digital Landing Page

A premium, production-grade frontend implementation built for the **Itzfizz Web Development Internship Assignment**.

Featuring a fullscreen scroll-driven 3D interactive hero section powered by **React.js**, **Vite**, **Tailwind CSS**, and **GSAP ScrollTrigger**.

---

## Key Features

- **Scroll-Driven Motion Scrubbing**: 3D spatial centerpiece visual that transforms, tilts, rotates, and explodes into layered depth in real-time as the user scrolls.
- **Initial Load Stagger Timeline**: Smooth load choreography revealing the display headline (`W E L C O M E  I T Z F I Z Z`), sub-elements, 3D visual container, and metrics.
- **4 Interactive Floating Statistics**: Metric cards (`58% Engagement`, `23% Bounce Rate`, `27% Conversions`, `40% Load Time`) with visual hierarchy and scroll parallax.
- **Itzfizz Cybertech Visual Identity**: Minimalist obsidian aesthetic with glassmorphic cards, glowing radial spheres, and fine grid background.
- **Fully Responsive Layout**: Tested across all viewports (1920px, 1440px, 1024px, 768px, 480px, 375px) with `overflow-x: hidden`.
- ♿ **Accessibility & Reduced Motion**: Automatically detects `prefers-reduced-motion` and degrades gracefully without scroll pinning.
- **GitHub Pages Deployment Ready**: Configured relative base paths in `vite.config.js`.

---

## Tech Stack

- **Framework**: [React.js](https://react.dev/) (v18)
- **Build Tool**: [Vite](https://vitejs.dev/) (v6)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4) with custom 3D utilities & glassmorphism
- **Animation Engine**: [GSAP](https://gsap.com/) & [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Scroll Animation Architecture

The core scroll interaction is orchestrated using `gsap.context()` inside a custom React hook `useScrollAnimation`:

1. **ScrollTrigger Pinning**: The `#hero-container` section is pinned for a responsive scroll duration (`+=2200px` on desktop, `+=1400px` on mobile) with a scrub factor of `1.2`.
2. **0% – 30% Progress**: Headline recedes upward in 3D perspective (`y: -60px`, `rotateX: 22deg`), while the central visual tilts forward along X and Y axes.
3. **30% – 70% Progress**: Spatial explosion of 3D layers. Layer 1 (code matrix) recedes in Z-space (`-120px`), Layer 2 (middle glass panel) elevates with cyan glow, and Layer 3 (floating chips) expands outward (`+160px` in Z-space).
4. **70% – 100% Progress**: Realignment into focused 3D viewport before unpinning smoothly into subsequent landing sections.

---

## How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Setup & Run
```bash
# 1. Clone repository
git clone https://github.com/your-username/itzfizz-hero-scroll.git
cd itzfizz-hero-scroll

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open your browser at `http://localhost:3000`.

### Build for Production
```bash
npm run build
```

---

## Live Demo & Screenshots

- **Live Demo**: [https://your-username.github.io/itzfizz-hero-scroll/](https://your-username.github.io/itzfizz-hero-scroll/) *(Placeholder)*
- **Screenshots**: *(Place screenshots here)*

---

## 👨‍💻 Author

Submitted for the **Itzfizz Web Development Internship Evaluation**.
# ITZFIZZ-Evalution-Task
