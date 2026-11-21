---
layout: page
title: Projects
permalink: /projects/
---

<header class="page-hero wrap reveal">
  <div class="page-hero__meta">INDEX // 01 &mdash; PROJECTS &amp; ARCHITECTURE</div>
  <h1 class="serif-display">Selected Projects</h1>
  <p>Open-source applications and full-stack systems built with strict domain boundaries, edge proxies, and zero-trust data policies.</p>
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
          <a href="https://github.com/bernam07/episodic" target="_blank" rel="noopener"><i class="fab fa-github" aria-hidden="true"></i> Repository &nearr;</a>
        </div>
      </div>
    </article>

    <article class="sys-row">
      <div class="sys-row__ref">SYS&mdash;02</div>
      <div class="sys-row__title">
        <h2 class="serif-title">ClearPost</h2>
        <span class="sys-row__domain">Multi-Carrier Parcel Tracker PWA</span>
      </div>
      <div class="sys-row__desc">
        <p>Installable Clear Glass PWA that tracks CTT, DPD/BRT, InPost, DHL, GLS, UPS, and Correos Express shipments with automatic carrier pattern detection, ambiguity resolution dialogs, and real-time multi-device sync.</p>
        <ul class="sys-specs">
          <li><strong>Cloudflare Worker Edge Proxy:</strong> Integrates the 17TRACK v2.4 API, carrier fallback endpoints, webhook ingestion (<code>POST /api/webhook</code>), and a lightweight <code>GET /api/widget</code> JSON feed for iOS Scriptable widgets.</li>
          <li><strong>Zero-Trust Firestore Rules:</strong> Default-deny per-user Cloud Firestore rules (<code>request.auth.uid == userId</code>) enforcing strict <code>hasOnly</code> field schemas, payload caps, and immutable timestamps.</li>
        </ul>
      </div>
      <div class="sys-row__meta">
        <div class="sys-row__stack">React &middot; TypeScript &middot; Firebase &middot; Cloudflare Workers &middot; 17TRACK API</div>
        <div class="sys-row__links">
          <a href="https://clearpost-pt.web.app" target="_blank" rel="noopener">Live App &nearr;</a>
          <a href="https://github.com/bernam07/clearpost" target="_blank" rel="noopener"><i class="fab fa-github" aria-hidden="true"></i> Repository &nearr;</a>
        </div>
      </div>
    </article>

    <article class="sys-row">
      <div class="sys-row__ref">SYS&mdash;03</div>
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
          <a href="https://github.com/bernam07/norma" target="_blank" rel="noopener"><i class="fab fa-github" aria-hidden="true"></i> Repository &nearr;</a>
        </div>
      </div>
    </article>

    <article class="sys-row">
      <div class="sys-row__ref">SYS&mdash;04</div>
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
          <a href="https://github.com/bernam07/eclipse-player" target="_blank" rel="noopener"><i class="fab fa-github" aria-hidden="true"></i> Repository &nearr;</a>
        </div>
      </div>
    </article>
  </div>

  <p class="last-updated">
    LAST UPDATED // {{ site.time | date: '%B %Y' | upcase }}
  </p>
</section>
