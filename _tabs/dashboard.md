---
layout: page
icon: fas fa-chart-line
order: 5
title: Dashboard
---

<style>
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .asset-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }
  .asset-card h3 { margin-top: 0; font-size: 1.1rem; }
  .text-green { color: #00ff00; font-weight: bold; }
  .text-red { color: #ff4d4d; font-weight: bold; }
  .stock-table { width:100%; border-collapse: collapse; font-family: monospace; }
  .stock-table th { text-align: left; padding: 10px; border-bottom: 2px solid #555; }
  .stock-table td { padding: 10px; border-bottom: 1px solid #333; }
  .poke-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 2rem;
  }
  .poke-card { background: transparent; transition: transform 0.2s; }
  .poke-card img:hover { transform: scale(1.05); cursor: pointer; }
</style>

## Stock Market Positions
<div class="table-responsive">
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
      <tr><td colspan="4">Loading...</td></tr>
    </tbody>
  </table>
</div>
<hr>

## Crypto Portfolio
<div class="dashboard-grid">
  <div class="asset-card">
    <h3>ONDO Finance</h3>
    <p>Holdings: 1436.45</p>
    <p>Avg Buy: €0.735</p>
    <p>Live: <span id="price-ondo">Loading...</span></p>
  </div>
  <div class="asset-card">
    <h3>Avalanche (AVAX)</h3>
    <p>Holdings: 7.23</p>
    <p>Avg Buy: €11.76</p>
    <p>Live: <span id="price-avax">Loading...</span></p>
  </div>
  <div class="asset-card">
    <h3>Cardano (ADA)</h3>
    <p>Holdings: 148.18</p>
    <p>Avg Buy: €0.337</p>
    <p>Live: <span id="price-ada">Loading...</span></p>
  </div>
</div>
<hr>

## Pokemon Collection
> Top 8 (Grades PSA/CGC/CCC).

<div class="poke-grid" id="poke-container">
  <p>Loading collection...</p>
</div>

<br>

> *Last updated: April 2026*

<script src="/assets/js/dashboard.js"></script>
