---
layout: page
title: Dashboard
---

<div class="page-hero wrap reveal">
  <div class="page-hero__icon"><i class="fas fa-chart-line"></i></div>
  <h1>Dashboard</h1>
  <p>Live view of my current positions in the traditional stock market.</p>
</div>

<div class="section wrap reveal">
  <div class="section-heading">
    <h2>Stock Market Positions</h2>
  </div>

  <div class="table-responsive" style="overflow-x: auto;">
    <table class="stock-table">
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Avg Buy (€)</th>
          <th>Live (€)</th>
          <th style="text-align: right;">P/L (%)</th>
        </tr>
      </thead>
      <tbody id="stock-rows">
        <tr><td colspan="4" style="text-align: center; color: var(--text-dim);">Loading market data...</td></tr>
      </tbody>
    </table>
  </div>

  <p style="text-align: center; color: var(--text-dim); font-family: var(--font-mono); font-size: 0.82rem; margin-top: 2rem;">
    Data is automatically fetched via Yahoo Finance API.
  </p>
</div>

<script src="{{ '/assets/js/dashboard.js' | relative_url }}"></script>
