# Contributing Guidelines

Thank you for your interest in contributing to **Abubakar Siddique's Developer Portfolio**! This document provides guidelines for contributing code, tests, documentation, and reporting issues.

---

## 🧭 Code of Conduct & Standards

We strive to maintain a professional, respectful, and inclusive environment. All contributions must adhere to clean code principles, accessibility guidelines (WCAG 2.1 AA), and performance standards.

---

## 🌿 Git Branching Strategy

- **`main`**: Production branch deployed directly to Vercel. Always kept deployable and green.
- Feature and bug fix branches should branch directly from `main` using structured prefixes:
  - `feat/feature-name` — New user-facing or architectural capability.
  - `fix/bug-description` — Defect resolution or fix.
  - `refactor/scope-target` — Code reorganization without functional changes.
  - `test/component-or-util` — Test suite expansions or regression guards.
  - `docs/topic-summary` — Documentation, guides, and typing updates.
  - `perf/optimization-target` — Performance tuning or bundle reductions.

---

## 📝 Commit Conventions

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<optional scope>): <short description in present tense>
```

**Types**:
- `feat`: New feature or user interaction.
- `fix`: Bug resolution.
- `test`: Adding or updating test suites.
- `refactor`: Refactoring without behavior change.
- `style`: Formatting, CSS, or UI presentation refinements.
- `perf`: Performance optimizations (lazy loading, asset decoding, tree-shaking).
- `docs`: README, JSDoc, contributing, or security docs.
- `chore`: Dependency updates, tooling, and release bumps.

---

## 🧪 Local Quality Pipeline

Before submitting a Pull Request, ensure that all automated checks pass locally:

```bash
# 1. Ultra-fast AST linting
npm run lint

# 2. Automated test suite (Vitest + RTL)
npm test

# 3. Production bundle compilation
npm run build

# 4. Full suite end-to-end check
npm run check
```

---

## 📬 Pull Request Checklist

When opening a Pull Request:
1. Ensure the PR title follows Conventional Commits.
2. Link any related issues or discussions.
3. Confirm that all automated checks (`npm run check`) pass with zero errors and warnings.
4. Verify accessibility outlines, keyboard focus indicators, and reduced-motion fallbacks where applicable.
