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

## 📈 Stock Market Positions
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
      <tr><td colspan="4">A atualizar...</td></tr>
    </tbody>
  </table>
</div>
<hr>

## 🪙 Crypto Portfolio
<div class="dashboard-grid">
  <div class="asset-card">
    <h3>ONDO Finance</h3>
    <p>Holdings: 1278</p>
    <p>Avg Buy: €0.799</p>
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
    <p>Holdings: 148</p>
    <p>Avg Buy: €0.337</p>
    <p>Live: <span id="price-ada">Loading...</span></p>
  </div>
</div>
<hr>

## 🃏 Pokemon Collection
> Top 8 (Grades PSA/CGC/CCC).

<div class="poke-grid" id="poke-container">
  <p>A carregar coleção...</p>
</div>
<hr>

## 🔫 CS2 Inventory
> Inventory highlights (Estimated market prices).

<div id="cs2-container" class="cs2-grid">
  <p>A carregar inventário...</p>
</div>

<style>
  .cs2-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 2rem;
  }

  .cs2-card {
    background: linear-gradient(135deg, #1e1e1e 0%, #252525 100%);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    transition: transform 0.2s, box-shadow 0.2s;
    border-bottom: 4px solid #555; /* Cor padrão (fallback) */
  }

  .cs2-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  }

  /* Rarity Colors (Barras em baixo) */
  .rarity-covert { border-color: #eb4b4b; }      /* Vermelho */
  .rarity-classified { border-color: #d32ce6; }  /* Rosa */
  .rarity-restricted { border-color: #8847ff; }  /* Roxo */
  .rarity-knife { border-color: #caab05; }       /* Ouro/Faca */

  .cs2-img-container {
    padding: 10px;
    background: radial-gradient(circle at center, #3a3a3a 0%, #1e1e1e 70%);
    text-align: center;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cs2-img {
    max-width: 100%;
    max-height: 100%;
    filter: drop-shadow(0 5px 5px rgba(0,0,0,0.5));
  }

  .cs2-info {
    padding: 12px;
    text-align: left;
  }

  .cs2-weapon {
    font-size: 0.8rem;
    color: #888;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .cs2-name {
    font-size: 1.1rem;
    font-weight: bold;
    color: #fff;
    margin: 2px 0;
  }

  .cs2-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #aaa;
    margin-top: 8px;
    font-family: monospace;
  }

  .cs2-price {
    color: #85bb65; /* Verde Dinheiro */
    font-weight: bold;
  }
</style>

<script src="/assets/js/dashboard.js"></script>
