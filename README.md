# Abubakar Siddique — Developer Portfolio

[![CI Pipeline](https://github.com/mrabukust-cmd/abubakar-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/mrabukust-cmd/abubakar-portfolio/actions/workflows/ci.yml)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-C29B7F.svg)](LICENSE)

A production-ready, high-performance personal portfolio website built with **React 19**, **Vite 8**, **Framer Motion**, and **React Icons**.

Designed specifically for **Abubakar Siddique** (Software Engineering Student & Flutter Developer) to showcase real-world mobile applications, technical competencies, academic journey, and contact options.

---

## 🚀 Tech Stack & Performance

- **Framework**: React.js 19 (Vite 8 + Rolldown)
- **Styling**: Nordic Architectural Design System (Vanilla CSS3 Tokens, Zero Bloat)
- **Animations**: Framer Motion 12 (Reduced-motion accessible)
- **Typography**: Instrument Serif, Syne, DM Sans, Space Mono
- **Testing**: Vitest 4 + React Testing Library (81 automated tests across 21 test suites)
- **Linting**: Oxlint (Sub-20ms ultra-fast AST linting)
- **Security & Headers**: HTTP Strict Transport Security (HSTS), X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy configured via `vercel.json`
- **Bundle Optimization**: Rollup manual chunks splitting (`react-vendor`, `motion-vendor`, `icons-vendor`)
- **Deployment**: Vercel ready with automated CI workflow

---

## 📦 Vendor Chunk Splitting

| Chunk Name | Modules Included | Purpose |
|------------|------------------|---------|
| `react-vendor` | `react`, `react-dom` | Core React 19 runtime with long-term caching |
| `motion-vendor` | `framer-motion` | Motion engine isolated from business logic |
| `icons-vendor` | `react-icons` | SVG icon tree-shaken assets |

---

## 🧪 Automated Test Suites (81 Tests across 21 Suites)

The test suite validates data schemas, business logic, component behavior, accessibility fallbacks, and error recovery:

| Test Suite | File Path | Focus & Coverage |
|------------|-----------|------------------|
| **App Smoke & Integrations** | `src/components/__tests__/App.test.jsx` | Mount smoke test, error boundary integration, project filters, email regex |
| **Navbar & Navigation** | `src/components/__tests__/Navbar.test.jsx` | Brand branding, theme palette toggling, mobile drawer, Escape key dismissal, CV modal trigger |
| **Hero Section** | `src/components/__tests__/Hero.test.jsx` | Hero title, subtitle, CTAs, interactive Dart code tabs, clipboard copy feedback |
| **About Section** | `src/components/__tests__/About.test.jsx` | Profile imagery, engineering philosophy, story paragraphs, continuous learning topics |
| **Projects Showcase** | `src/components/__tests__/Projects.test.jsx` | Project catalog rendering, trust summary metrics, project details modal opening |
| **Project Details Modal** | `src/components/__tests__/ProjectModal.test.jsx` | Modal dialog presentation, feature list, tech pills, close button & Escape handling |
| **Skills & Filter Tabs** | `src/components/__tests__/Skills.test.jsx` | Skills categories, category filter tabs, proficiency indicators, reset to all |
| **Journey Timeline** | `src/components/__tests__/Journey.test.jsx` | Timeline milestones, role badges, technical achievements |
| **Contact Form** | `src/components/__tests__/Contact.test.jsx` | Validation, honeypot spam trap, character counter, clipboard copy feedback |
| **Services Section** | `src/components/__tests__/Services.test.jsx` | Service offerings, deliverable items, contact scroll CTA navigation |
| **GitHub Section** | `src/components/__tests__/GithubSection.test.jsx` | Profile URL security, featured projects anchor navigation, motion adaptation |
| **Scroll To Top** | `src/components/__tests__/ScrollToTop.test.jsx` | Scroll threshold visibility, smooth scroll, reduced motion, listener cleanup |
| **Animated Counter** | `src/components/__tests__/AnimatedCounter.test.jsx` | Prefix/suffix bounds, in-view trigger, reduced-motion bypass, frame cancellation |
| **Footer & Navigation** | `src/components/__tests__/Footer.test.jsx` | Dynamic copyright year, navigation mapping, external links, back-to-top |
| **Error Boundary** | `src/components/__tests__/ErrorBoundary.test.jsx` | Safe render, error catching, fallback UI, window reload trigger |
| **Projects Data Schema** | `src/data/__tests__/projects.test.js` | Schema integrity, required keys, image URLs, GitHub repo link validity |
| **Journey Data** | `src/data/__tests__/journey.test.js` | Timeline entries, period badges, technical milestones |
| **Navigation & Links** | `src/data/__tests__/navigation.test.js` | Route anchors, section link identifiers |
| **Profile & Bio** | `src/data/__tests__/profile.test.js` | Author identity, social endpoints, headline data |
| **Skills Catalog** | `src/data/__tests__/skills.test.js` | Categories, technology tiers, icon bindings |
| **Social Links** | `src/data/__tests__/socialLinks.test.js` | Formatted displays, URI schemes |

---

## 🛠️ Local Development & Quality Pipeline

```bash
npm install
npm run dev
```

Available quality checks:

```bash
npm run lint    # Runs Oxlint across all JSX and JS files
npm test        # Runs Vitest unit and integration test suite (81 tests across 21 test suites)
npm run build   # Validates production compilation and asset generation
npm run check   # Runs lint, test, and build in sequence
```

The GitHub Actions CI workflow runs these same checks on every pull request and push to `main`, ensuring strict quality standards before deployment.

---

## 📱 Featured Engineering Projects

- **[Mentora](https://github.com/mrabukust-cmd/Mentora)** — Peer tutoring and skill exchange mobile app featuring 1-on-1 HD video calling via Agora RTC, Firestore signaling, and smart mentor matching.
- **[EduManage](https://github.com/mrabukust-cmd/EduManage)** — Academic portal connecting Parents, Students, Teachers, and Admins with automated attendance tracking, grade analytics, and CSV report export.
- **ZiloLive** — Live streaming client with real-time stream interactions, ranking leaderboards, and coin wallet management.

---

## ☁️ Deployment Guide

### Vercel (Recommended)

1. Push your repository to **GitHub**.
2. Connect the repository in the [Vercel Dashboard](https://vercel.com).
3. Set the build parameters:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variables if utilizing external contact APIs:
   - `VITE_WEB3FORMS_KEY`: Optional Web3Forms API key for direct inbox routing.
5. Deploy. Updates to `main` will automatically trigger preview and production builds.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

- **Source Code**: Free to use, modify, and distribute under the MIT License.
- **Personal Content & Imagery**: All bio details, project writeups, and branding © 2026 Abubakar Siddique.
