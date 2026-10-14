---
layout: page
title: Dashboard
---

<div class="page-hero wrap reveal">
  <div class="page-hero__icon"><i class="fas fa-chart-line"></i></div>
  <h1>Live Market Dashboard</h1>
  <p>Real-time tracking of my personal stock portfolio, automated via GitHub Actions & Yahoo Finance.</p>
</div>

<div class="section wrap reveal">
  <!-- Key Metrics Row -->
  <div class="dash-metrics-grid">
    <div class="dash-metric-card">
      <div class="dash-metric-card__label"><i class="fas fa-layer-group"></i> Tracked Assets</div>
      <div class="dash-metric-card__value" id="metric-total-count">-- Positions</div>
    </div>
    <div class="dash-metric-card">
      <div class="dash-metric-card__label"><i class="fas fa-trophy"></i> Top Performer</div>
      <div class="dash-metric-card__value" id="metric-top-performer">--</div>
    </div>
    <div class="dash-metric-card">
      <div class="dash-metric-card__label"><i class="fas fa-chart-pie"></i> Profit Ratio</div>
      <div class="dash-metric-card__value" id="metric-win-ratio">-- in profit</div>
    </div>
    <div class="dash-metric-card">
      <div class="dash-metric-card__label"><i class="fas fa-clock-rotate-left"></i> Last Sync</div>
      <div class="dash-metric-card__value" id="metric-last-sync">--</div>
    </div>
  </div>

  <div class="dash-toolbar">
    <div class="section-heading" style="margin-bottom: 0; border-bottom: none; padding-bottom: 0;">
      <h2>Holdings &amp; Performance</h2>
    </div>

    <div class="dash-search-box">
      <i class="fas fa-magnifying-glass"></i>
      <input type="text" id="dash-search-input" placeholder="Filter ticker or name..." aria-label="Filter stocks" />
    </div>
  </div>

  <div class="table-responsive">
    <table class="stock-table">
      <thead>
        <tr>
          <th>Asset</th>
          <th>Avg Buy (€)</th>
          <th>Live Price (€)</th>
          <th style="text-align: right;">Total P/L (%)</th>
        </tr>
      </thead>
      <tbody id="stock-rows">
        <tr><td colspan="4" class="stock-empty"><i class="fas fa-spinner fa-spin"></i> Loading real-time market data&hellip;</td></tr>
      </tbody>
    </table>
  </div>

  <div class="last-updated" id="dash-updated">
    <span class="sync-indicator"><span class="sync-pulse"></span> Data fetched via Yahoo Finance API</span>
  </div>
</div>

<script src="{{ '/assets/js/dashboard.js' | relative_url }}"></script>
