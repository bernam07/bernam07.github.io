---
layout: page
title: Projects
permalink: /projects/
---

<header class="page-hero wrap reveal">
  <div class="page-hero__meta">INDEX // 01 &mdash; PROJECTS &amp; ARCHITECTURE</div>
  <h1 class="serif-display">Selected Projects</h1>
  <p>Production software systems, open-source repositories, and architectural case studies emphasizing strict domain boundaries and deterministic state.</p>
</header>

<section class="section section--tight wrap reveal">
  <div class="sys-ledger sys-ledger--detailed" role="region" aria-label="Complete projects catalog">
    <div class="sys-ledger__head">
      <span>REF</span>
      <span>SYSTEM</span>
      <span>ARCHITECTURAL THESIS &amp; INVARIANTS</span>
      <span class="sys-ledger__right">STACK &amp; SOURCE</span>
    </div>

    <article class="sys-row">
      <div class="sys-row__ref"><span class="ref-accent">SYS&mdash;01</span></div>
      <div class="sys-row__title">
        <h2 class="serif-title">Episodic</h2>
        <span class="sys-row__domain">Social TV Tracker PWA</span>
      </div>
      <div class="sys-row__desc">
        <p>A Letterboxd for television. Track series, check off individual episodes, rate seasons, follow friends&rsquo; activity feeds, and maintain a personal viewing diary with full TMDB metadata integration.</p>
        <ul class="sys-specs">
          <li><strong>Clean Architecture:</strong> Unidirectional layer boundaries (<code>domain &larr; application &larr; infrastructure/presentation</code>) enforced at compile time via Oxlint rules.</li>
          <li><strong>Database Testing:</strong> Full SQL migration and RLS policy verification running in-memory against PGlite WASM during CI.</li>
        </ul>
      </div>
      <div class="sys-row__meta">
        <div class="sys-row__stack">React 19 &middot; TypeScript 7 &middot; Supabase &middot; TanStack Query &middot; PGlite</div>
        <div class="sys-row__links">
          <a href="https://github.com/bernam07/episodic" target="_blank" rel="noopener"><i class="fab fa-github" aria-hidden="true"></i> github.com/bernam07/episodic &nearr;</a>
        </div>
      </div>
    </article>

    <article class="sys-row">
      <div class="sys-row__ref">SYS&mdash;02</div>
      <div class="sys-row__title">
        <h2 class="serif-title">Norma</h2>
        <span class="sys-row__domain">Ephemeral Capture &amp; Extension</span>
      </div>
      <div class="sys-row__desc">
        <p>A minimalist daily capture scratchpad designed to eliminate context switching. Write fleeting notes with zero friction, capture web snippets via a Chromium extension, and receive a structured 07:00 morning briefing via Resend.</p>
        <ul class="sys-specs">
          <li><strong>Security &amp; Sync:</strong> Custom <code>scrypt</code> PIN authentication with constant-time verification, rate-limited API endpoints, and optimistic offline-first IndexedDB queuing.</li>
        </ul>
      </div>
      <div class="sys-row__meta">
        <div class="sys-row__stack">Next.js 14 &middot; TypeScript &middot; PostgreSQL &middot; Manifest V3 &middot; Resend</div>
        <div class="sys-row__links">
          <a href="https://github.com/bernam07/norma" target="_blank" rel="noopener"><i class="fab fa-github" aria-hidden="true"></i> github.com/bernam07/norma &nearr;</a>
        </div>
      </div>
    </article>

    <article class="sys-row">
      <div class="sys-row__ref">SYS&mdash;03</div>
      <div class="sys-row__title">
        <h2 class="serif-title">Market Telemetry</h2>
        <span class="sys-row__domain">Automated Portfolio Pipeline</span>
      </div>
      <div class="sys-row__desc">
        <p>The source architecture for this website and its live equity dashboard. Combines static Jekyll generation with a scheduled Python market ingestion pipeline executed via GitHub Actions.</p>
        <ul class="sys-specs">
          <li><strong>Data Pipeline:</strong> Single-source-of-truth portfolio manifest (<code>_data/portfolio.json</code>) with server-side USD/GBP to EUR FX normalization via <code>yfinance</code>.</li>
        </ul>
      </div>
      <div class="sys-row__meta">
        <div class="sys-row__stack">Python &middot; JavaScript &middot; Jekyll &middot; GitHub Actions</div>
        <div class="sys-row__links">
          <a href="{{ '/dashboard/' | relative_url }}">Live Dashboard &rarr;</a>
          <a href="https://github.com/bernam07/bernam07.github.io" target="_blank" rel="noopener"><i class="fab fa-github" aria-hidden="true"></i> Source &nearr;</a>
        </div>
      </div>
    </article>

    <article class="sys-row">
      <div class="sys-row__ref">SYS&mdash;04</div>
      <div class="sys-row__title">
        <h2 class="serif-title">Loja Social SAS</h2>
        <span class="sys-row__domain">Enterprise Inventory Platform</span>
      </div>
      <div class="sys-row__desc">
        <p>Institutional web platform engineered for UPCA&rsquo;s Social Services (SAS) to manage stock inventory, beneficiary requests, donor allocations, and administrative auditing.</p>
      </div>
      <div class="sys-row__meta">
        <div class="sys-row__stack">C# &middot; ASP.NET Core MVC &middot; SQL Server</div>
        <div class="sys-row__links">
          <a href="https://github.com/joseegomes555/G7-LojaSas" target="_blank" rel="noopener"><i class="fab fa-github" aria-hidden="true"></i> github.com/joseegomes555/G7-LojaSas &nearr;</a>
        </div>
      </div>
    </article>

    <article class="sys-row">
      <div class="sys-row__ref">SYS&mdash;05</div>
      <div class="sys-row__title">
        <h2 class="serif-title">Eclipse Player</h2>
        <span class="sys-row__domain">Desktop Audio Engine</span>
      </div>
      <div class="sys-row__desc">
        <p>Standalone local music player built with Electron, Vite, and TypeScript. Features a tactile dark interface, dynamic vinyl platter, real-time Web Audio spectrum visualizer, and automatic lyrics fetching.</p>
      </div>
      <div class="sys-row__meta">
        <div class="sys-row__stack">Electron &middot; TypeScript &middot; Vite &middot; Web Audio API</div>
        <div class="sys-row__links">
          <a href="https://github.com/bernam07/eclipse-player" target="_blank" rel="noopener"><i class="fab fa-github" aria-hidden="true"></i> github.com/bernam07/eclipse-player &nearr;</a>
        </div>
      </div>
    </article>
  </div>

  <p class="last-updated">
    LAST UPDATED // {{ site.time | date: '%B %Y' | upcase }}
  </p>
</section>
