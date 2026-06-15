---
layout: page
icon: fas fa-chart-line
order: 5
title: Dashboard
---

<style>
  .text-green { color: #00ff00; font-weight: bold; }
  .text-red { color: #ff4d4d; font-weight: bold; }
  .stock-table { width:100%; border-collapse: collapse; font-family: monospace; }
  .stock-table th { text-align: left; padding: 10px; border-bottom: 2px solid #555; }
  .stock-table td { padding: 10px; border-bottom: 1px solid #333; }
</style>

## Stock Market Positions

Live view of my current positions in the traditional stock market.

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
      <tr><td colspan="4" style="text-align: center; color: #888;">Loading market data...</td></tr>
    </tbody>
  </table>
</div>

<br>

> *Data is automatically fetched via Yahoo Finance API.*

<script src="/assets/js/dashboard.js"></script>