---
layout: page
title: Projects
---

<div class="page-hero wrap reveal">
  <div class="page-hero__icon"><i class="fas fa-code-branch"></i></div>
  <h1>Projects</h1>
  <p>&ldquo;Talk is cheap. Show me the code.&rdquo; &mdash; Linus Torvalds</p>
</div>

<div class="section wrap">
  <div class="grid-auto">

    <div class="card project-card reveal">
      <div class="card-header">
        <i class="fas fa-vault card-icon"></i>
        <div class="card-header__info">
          <h3>Strata</h3>
          <span class="card-tag">Wealth OS</span>
        </div>
      </div>
      <p>A production-grade, ledger-backed financial operating system uniting equities, crypto, alternative assets (Pok&eacute;mon cards, LEGO, luxury watches), and Apple Pay automation into a unified net-worth view.</p>
      <div class="tech-stack">
        <span class="badge">React 19</span>
        <span class="badge">TypeScript</span>
        <span class="badge">Supabase</span>
        <span class="badge">Tailwind CSS v4</span>
        <span class="badge">PostgreSQL</span>
      </div>
      <div class="card-links">
        <a href="https://github.com/bernam07/strata" target="_blank" rel="noopener"><i class="fab fa-github"></i> Repository</a>
      </div>
    </div>

    <div class="card project-card reveal">
      <div class="card-header">
        <i class="fas fa-tv card-icon"></i>
        <div class="card-header__info">
          <h3>Episodic</h3>
          <span class="card-tag">PWA &amp; Social</span>
        </div>
      </div>
      <p>A Letterboxd for television. Track series, check off individual episodes, rate seasons, follow friends' activity feeds, and manage a personal diary. Built with strict Clean Architecture, PWA mobile-first design, and TMDB integration.</p>
      <div class="tech-stack">
        <span class="badge">React 19</span>
        <span class="badge">TypeScript</span>
        <span class="badge">Supabase</span>
        <span class="badge">Tailwind CSS v4</span>
        <span class="badge">TanStack Query</span>
      </div>
      <div class="card-links">
        <a href="https://github.com/bernam07/episodic" target="_blank" rel="noopener"><i class="fab fa-github"></i> Repository</a>
      </div>
    </div>

    <div class="card project-card reveal">
      <div class="card-header">
        <i class="fas fa-inbox card-icon"></i>
        <div class="card-header__info">
          <h3>Norma</h3>
          <span class="card-tag">Productivity &amp; Extension</span>
        </div>
      </div>
      <p>A minimalist daily capture scratchpad designed to eliminate context switching. Write fleeting notes with zero friction, capture web snippets via a Chromium extension, and receive a structured morning briefing in your inbox via Resend.</p>
      <div class="tech-stack">
        <span class="badge">Next.js 14</span>
        <span class="badge">TypeScript</span>
        <span class="badge">PostgreSQL</span>
        <span class="badge">Tailwind CSS</span>
        <span class="badge">Resend</span>
      </div>
      <div class="card-links">
        <a href="https://github.com/bernam07/norma" target="_blank" rel="noopener"><i class="fab fa-github"></i> Repository</a>
      </div>
    </div>

    <div class="card project-card reveal">
      <div class="card-header">
        <i class="fas fa-laptop-code card-icon"></i>
        <div class="card-header__info">
          <h3>Personal Dashboard</h3>
          <span class="card-tag">Automation</span>
        </div>
      </div>
      <p>The source code for this portfolio! A statically generated website featuring a completely automated, real-time stock market tracker powered by Python scripts via GitHub Actions.</p>
      <div class="tech-stack">
        <span class="badge">JavaScript</span>
        <span class="badge">Python</span>
        <span class="badge">Jekyll</span>
        <span class="badge">GitHub Actions</span>
      </div>
      <div class="card-links">
        <a href="{{ '/dashboard/' | relative_url }}"><i class="fas fa-chart-line"></i> Live View</a>
        <a href="https://github.com/bernam07/bernam07.github.io" target="_blank" rel="noopener"><i class="fab fa-github"></i> Repository</a>
      </div>
    </div>

    <div class="card project-card reveal">
      <div class="card-header">
        <i class="fas fa-shopping-cart card-icon"></i>
        <div class="card-header__info">
          <h3>Loja Social SAS</h3>
          <span class="card-tag">Enterprise Web</span>
        </div>
      </div>
      <p>A web-based platform developed for UPCA's Social Services to manage their social store. It includes comprehensive inventory tracking, user request handling, and dedicated administrator dashboards.</p>
      <div class="tech-stack">
        <span class="badge">C#</span>
        <span class="badge">ASP.NET Core</span>
        <span class="badge">MVC</span>
        <span class="badge">SQL Server</span>
      </div>
      <div class="card-links">
        <a href="https://github.com/joseegomes555/G7-LojaSas" target="_blank" rel="noopener"><i class="fab fa-github"></i> Repository</a>
      </div>
    </div>

    <div class="card project-card reveal">
      <div class="card-header">
        <i class="fas fa-music card-icon"></i>
        <div class="card-header__info">
          <h3>Eclipse Player</h3>
          <span class="card-tag">Desktop App</span>
        </div>
      </div>
      <p>A minimalist, standalone local music player built with Electron, Vite, and TypeScript. Features a sleek dark/neon theme, a dynamic vinyl with a real-time audio visualizer, and automatic lyrics fetching.</p>
      <div class="tech-stack">
        <span class="badge">Electron</span>
        <span class="badge">TypeScript</span>
        <span class="badge">Vite</span>
        <span class="badge">CSS</span>
      </div>
      <div class="card-links">
        <a href="https://github.com/bernam07/eclipse-player" target="_blank" rel="noopener"><i class="fab fa-github"></i> Repository</a>
      </div>
    </div>

  </div>

  <p class="last-updated">
    Last updated: {{ site.time | date: '%B %Y' }}
  </p>
</div>
