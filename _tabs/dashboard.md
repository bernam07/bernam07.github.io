---
layout: page
title: Dashboard
permalink: /dashboard/
---

<header class="page-hero wrap reveal">
  <div class="page-hero__meta">INDEX // 04 &mdash; LIVE MARKET DASHBOARD</div>
  <h1 class="serif-display">Equity Portfolio Ledger</h1>
  <p>Automated market tracking of personal equity positions, normalized to EUR via scheduled GitHub Actions and Yahoo Finance ingestion.</p>
</header>

<section class="section section--tight wrap reveal">
  <!-- Key Metrics Row -->
  <div class="dash-metrics-grid">
    <div class="dash-metric-card">
      <div class="dash-metric-card__label">01 / TRACKED ASSETS</div>
      <div class="dash-metric-card__value" id="metric-total-count">-- Positions</div>
    </div>
    <div class="dash-metric-card">
      <div class="dash-metric-card__label">02 / TOP PERFORMER</div>
      <div class="dash-metric-card__value" id="metric-top-performer">--</div>
    </div>
    <div class="dash-metric-card">
      <div class="dash-metric-card__label">03 / PROFIT RATIO</div>
      <div class="dash-metric-card__value" id="metric-win-ratio">-- in profit</div>
    </div>
    <div class="dash-metric-card">
      <div class="dash-metric-card__label">04 / LAST SYNC</div>
      <div class="dash-metric-card__value" id="metric-last-sync">--</div>
    </div>
  </div>

  <div class="dash-toolbar">
    <div class="monograph-section-header__left">
      <span class="sec-num">HOLDINGS // EUR NORMALIZED</span>
      <h2 class="serif-heading" id="holdings-table-caption">Positions &amp; Return Ledger</h2>
    </div>

    <div class="dash-search-box">
      <i class="fas fa-magnifying-glass" aria-hidden="true"></i>
      <input type="text" id="dash-search-input" placeholder="Filter ticker or company..." aria-label="Filter stocks" />
    </div>
  </div>

  <div class="table-responsive" tabindex="0" role="region" aria-labelledby="holdings-table-caption">
    <table class="stock-table">
      <thead>
        <tr>
          <th scope="col">Asset</th>
          <th scope="col">Avg Buy (&euro;)</th>
          <th scope="col">Live Price (&euro;)</th>
          <th scope="col" class="stock-pl-col">Total P/L (%)</th>
        </tr>
      </thead>
      <tbody id="stock-rows">
        <tr><td colspan="4" class="stock-empty"><i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Loading real-time market data&hellip;</td></tr>
      </tbody>
    </table>
  </div>

  <div class="last-updated" id="dash-updated">
    <span class="sync-indicator"><span class="sync-pulse"></span> Data fetched via Yahoo Finance API</span>
  </div>
</section>

<script src="{{ '/assets/js/dashboard.js' | relative_url }}"></script>
