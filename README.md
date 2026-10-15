# Bernardo Martins — Portfolio & Engineering Hub

<div align="center">

[![Build and Deploy](https://github.com/bernam07/bernam07.github.io/actions/workflows/pages-deploy.yml/badge.svg)](https://github.com/bernam07/bernam07.github.io/actions/workflows/pages-deploy.yml)
[![Update Market Data](https://github.com/bernam07/bernam07.github.io/actions/workflows/update_market.yml/badge.svg)](https://github.com/bernam07/bernam07.github.io/actions/workflows/update_market.yml)
[![Portfolio Status](https://img.shields.io/website?label=bernardomartins.me&style=flat-square&url=https%3A%2F%2Fbernardomartins.me)](https://bernardomartins.me)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Bernardo%20Martins-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/bernardomfm/)

**Software Engineer @ Deloitte &middot; Computer Systems Engineering Student @ UPCA**  
*Focusing on Backend Architecture, Distributed Systems, High-Performance Workloads, and Financial Markets.*

[Live Website (bernardomartins.me)](https://bernardomartins.me) &nbsp;&bull;&nbsp; [Alternative Domain (GitHub Pages)](https://bernam07.github.io)

</div>

---

## Overview

This repository hosts the source code for my personal portfolio and engineering hub. Rather than a static, template-driven resume, this site serves as a live, automated platform showcasing my full-stack and systems projects, verified certifications, professional milestones, and a completely automated real-time financial market dashboard.

---

## Featured Flagship Projects

| Project | Domain | Stack | Highlights |
| :--- | :--- | :--- | :--- |
| **[Strata](https://github.com/bernam07/strata)** | Wealth OS &amp; Portfolio Intelligence | React 19, TypeScript, Supabase, Tailwind v4, Vitest | Production-grade ledger accounting, multi-currency conversion, alternative asset valuations (Pok&eacute;mon, LEGO, luxury watches), and Apple Pay webhook ingestion. |
| **[Episodic](https://github.com/bernam07/episodic)** | Social TV Tracking &amp; Diary | React 19, TypeScript, Supabase, TanStack Query, PWA | Letterboxd-style tracking platform with episode check-ins, diary, friends feed, Clean Architecture, and TMDB integration. |
| **[Norma](https://github.com/bernam07/norma)** | Ephemeral Capture &amp; Morning Briefing | Next.js 14, TypeScript, PostgreSQL, Tailwind, Resend | Frictionless daily scratchpad with Chromium extension integration and automated daily email digest briefings delivered at 07:00 UTC. |

---

## Key Architectural Features

### 1. Automated Real-Time Market Dashboard
- **Single Source of Truth (`_data/portfolio.json`)**: All portfolio holdings, positions, and cost bases are defined in a single configuration file.
- **Server-Side FX & Pricing Pipeline**: A scheduled GitHub Action runs a Python script (`scripts/fetch_data.py`) that queries `yfinance` for live stock quotes and real-time forex pairs (`USDEUR=X`, `GBPEUR=X`), eliminating third-party API rate limits in the client.
- **Client-Side Search & Metrics**: Real-time ticker and company filter, automated metric computation (Total Positions, Top Performer, Profit Ratio), and cache-busted JSON fetches (`?t=timestamp` with `cache: no-store`).
- **Smart Scheduling**: Configured to run on financial market days (Monday to Friday every 6 hours), preventing unnecessary commits on weekends.

### 2. Hand-Crafted CSS & Tokyo Night Dark Aesthetics
- Built with custom SCSS (`assets/css/main.scss`) utilizing native CSS custom properties (design tokens) without heavy utility-framework runtime overhead.
- Fluid animations driven by modern `IntersectionObserver` scroll-reveal primitives.
- Dark mode theme with modern cyber accents (`#5eead4` and `#c792ea`).

### 3. Career Roadmap & Developer Setup
- **Interactive Timeline**: Highlights milestones from the Brightstart Program to Programmer promotion at Deloitte, academic degree at UPCA, and certifications (Microsoft AZ-900, AI-900, SC-900, and GitHub Foundations).
- **Setup Tour**: Detailed spec sheet covering daily-driver development hardware, peripherals, and software configuration.

---

## Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Core Generator** | ![Jekyll](https://img.shields.io/badge/Jekyll-CC0000?style=flat-square&logo=jekyll&logoColor=white) ![Ruby](https://img.shields.io/badge/Ruby-3.3-CC342D?style=flat-square&logo=ruby&logoColor=white) ![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=sass&logoColor=white) |
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![FontAwesome](https://img.shields.io/badge/FontAwesome-6.5-528DD7?style=flat-square&logo=fontawesome&logoColor=white) |
| **Automation** | ![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white) (`yfinance`) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white) |
| **Hosting & DNS** | ![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=github&logoColor=white) with custom domain (`bernardomartins.me`) |

---

## Project Structure

```text
.
├── _data/
│   ├── portfolio.json        # Single source of truth for tracked assets & cost bases
│   └── contact.yml           # Social channels & external profiles
├── _includes/                # Modular HTML components (navbar, footer, contact links)
├── _layouts/                 # Jekyll layout templates (default, page)
├── _tabs/                    # Standalone page views (Projects, Roadmap, Dashboard, Setup)
├── assets/
│   ├── css/                  # Hand-crafted SCSS styles (main.scss)
│   ├── js/                   # Dashboard logic (dashboard.js) & scroll animations (main.js)
│   ├── data/                 # Auto-generated market_data.json
│   ├── img/                  # Favicons, avatar, and Open Graph previews
│   └── cv/                   # Downloadable resume PDF
├── scripts/
│   └── fetch_data.py         # Python market fetcher & FX conversion script
├── .github/workflows/
│   ├── pages-deploy.yml      # CI/CD pipeline building & deploying Jekyll to GitHub Pages
│   └── update_market.yml     # Scheduled cron job updating market data on weekdays
├── _config.yml               # Site metadata, SEO, and build settings
└── package.json              # Development shortcuts (npm run dev, build, fetch-data)
```

---

## Local Development

### Prerequisites
- **Ruby 3.3+** and **Bundler**
- **Python 3.10+** (with `yfinance` installed)
- **Node.js 20+** (optional, for npm script shortcuts)

### 1. Clone the repository
```bash
git clone https://github.com/bernam07/bernam07.github.io.git
cd bernam07.github.io
```

### 2. Install dependencies
```bash
bundle install
pip install yfinance
```

### 3. Run the development server
You can run using `npm`:
```bash
npm run dev
```
Or directly with Bundler:
```bash
bundle exec jekyll s -l
```

The site will be available at **`http://127.0.0.1:4000`** with live-reloading.

### 4. Fetch latest market data locally
```bash
npm run fetch-data
# or: python scripts/fetch_data.py
```

---

## CI/CD & Deployment Automation

- **Site Build & Deploy (`pages-deploy.yml`)**: Triggered automatically on pushes to `main`. Sets up Ruby 3.3, installs gems via Bundler cache, compiles Jekyll for production (`JEKYLL_ENV=production`), tests HTML outputs with `html-proofer`, and deploys artifacts to GitHub Pages.
- **Market Data Pipeline (`update_market.yml`)**: Runs automatically via GitHub Actions Cron every 6 hours from Monday to Friday (`0 */6 * * 1-5`), updates `assets/data/market_data.json`, and triggers fresh deployment when positions or prices change.

---

## License

Distributed under the [MIT License](LICENSE).

---

<p align="center">
  Crafted with precision by <a href="https://github.com/bernam07">Bernardo Martins</a>
</p>
