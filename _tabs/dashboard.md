---
layout: page
icon: fas fa-chart-line
order: 4
title: Dashboard
---

<style>
  /* Estilo simples para criar grelhas tipo Dashboard */
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .asset-card {
    background: var(--card-bg); /* Usa a cor do tema */
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }
  .asset-card h3 { margin-top: 0; font-size: 1.1rem; }
  .price-live { color: #00ff00; font-weight: bold; } /* Verde hacker */
  .price-red { color: #ff4d4d; font-weight: bold; }
  
  .poke-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }
  .poke-card img {
    width: 100%;
    border-radius: 8px;
    transition: transform 0.2s;
  }
  .poke-card img:hover { transform: scale(1.05); }
</style>

## 🪙 Crypto Portfolio (Live)
<div class="dashboard-grid" id="crypto-container">
  <div class="asset-card">
    <h3>ONDO Finance</h3>
    <p>Holdings: 1200 ONDO</p>
    <p>Avg Buy: $0.75 (Exemplo)</p>
    <p>Live Price: <span id="price-ondo">Loading...</span></p>
  </div>
  
  <div class="asset-card">
    <h3>Avalanche (AVAX)</h3>
    <p>Holdings: X AVAX</p>
    <p>Avg Buy: $35.00</p>
    <p>Live Price: <span id="price-avax">Loading...</span></p>
  </div>

  <div class="asset-card">
    <h3>Cardano (ADA)</h3>
    <p>Holdings: X ADA</p>
    <p>Avg Buy: $0.45</p>
    <p>Live Price: <span id="price-ada">Loading...</span></p>
  </div>
</div>

## 📈 Stock Market Positions
> Estratégia: Long-term hold & Dividends.

<div id="stock-table-container"></div>

<script>
  // --- CONFIGURAÇÃO: Coloca aqui os teus dados ---
  const portfolio = [
    { ticker: "NVDA", company: "NVIDIA", avgPrice: 450.00, currentPrice: 800.00 },
    { ticker: "TSLA", company: "Tesla", avgPrice: 200.00, currentPrice: 180.00 },
    { ticker: "MSFT", company: "Microsoft", avgPrice: 300.00, currentPrice: 405.00 },
    { ticker: "PLTR", company: "Palantir", avgPrice: 15.50, currentPrice: 24.00 }
  ];

  // --- LÓGICA (Não precisas de mexer) ---
  function renderStocks() {
    let html = `
      <table style="width:100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 2px solid #444;">
            <th style="text-align:left; padding:8px;">Ticker</th>
            <th style="text-align:left; padding:8px;">Avg Buy</th>
            <th style="text-align:left; padding:8px;">Current</th>
            <th style="text-align:right; padding:8px;">P/L (%)</th>
          </tr>
        </thead>
        <tbody>`;

    portfolio.forEach(stock => {
      // Calcular Percentagem
      const plValue = stock.currentPrice - stock.avgPrice;
      const plPercent = ((plValue / stock.avgPrice) * 100).toFixed(2);
      
      // Definir cor (Verde ou Vermelho)
      const colorClass = plPercent >= 0 ? 'price-live' : 'price-red';
      const sign = plPercent >= 0 ? '+' : '';

      html += `
        <tr style="border-bottom: 1px solid #333;">
          <td style="padding:8px;"><strong>${stock.ticker}</strong><br><small style="opacity:0.7">${stock.company}</small></td>
          <td style="padding:8px;">$${stock.avgPrice.toFixed(2)}</td>
          <td style="padding:8px;">$${stock.currentPrice.toFixed(2)}</td>
          <td style="text-align:right; padding:8px;" class="${colorClass}">
            ${sign}${plPercent}%
          </td>
        </tr>`;
    });

    html += `</tbody></table>`;
    document.getElementById('stock-table-container').innerHTML = html;
  }

  // Correr a função
  renderStocks();
</script>

---

## 🔫 CS2 Inventory
> Skins ativas e investimentos.

| Weapon | Skin | Condition | Float | Value |
| :--- | :--- | :--- | :--- | :--- |
| **AWP** | Desert Hydra | FN | 0.042 | 1.800€ |
| **AK-47** | Gold Arabesque | MW | 0.081 | 1.200€ |
| **Knife** | Butterfly Fade | FN | 0.012 | 2.500€ |

---

## 🃏 Pokemon Collection
<div class="poke-grid">
  <div class="poke-card">
    <img src="https://images.pokemontcg.io/base1/4_hires.png" alt="Charizard">
    <center><small>Charizard Base Set</small></center>
  </div>
  <div class="poke-card">
    <img src="https://images.pokemontcg.io/pl2/103_hires.png" alt="Pikachu">
    <center><small>Pikachu Lv.X</small></center>
  </div>
   <div class="poke-card">
    <img src="https://images.pokemontcg.io/xy1/1_hires.png" alt="Venusaur">
    <center><small>Venusaur EX</small></center>
  </div>
</div>

<script>
  // API da CoinGecko
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=ondo-finance,avalanche-2,cardano&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
      document.getElementById('price-ondo').innerText = '$' + data['ondo-finance'].usd;
      document.getElementById('price-avax').innerText = '$' + data['avalanche-2'].usd;
      document.getElementById('price-ada').innerText = '$' + data['cardano'].usd;
    })
    .catch(error => console.error('Erro ao buscar preços:', error));
</script>
