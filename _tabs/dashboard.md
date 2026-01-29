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
> Dados atualizados em tempo real via Finnhub API.
> Estratégia: Long-term hold & Dividends.

<div class="table-responsive">
  <table style="width:100%; border-collapse: collapse; font-family: monospace;">
    <thead>
      <tr style="border-bottom: 2px solid #555; text-align: left;">
        <th style="padding: 10px;">Ticker</th>
        <th style="padding: 10px;">Avg Buy</th>
        <th style="padding: 10px;">Live Price</th>
        <th style="padding: 10px; text-align: right;">P/L ($)</th>
        <th style="padding: 10px; text-align: right;">P/L (%)</th>
      </tr>
    </thead>
    <tbody id="stock-rows">
      <tr><td colspan="5">Loading market data...</td></tr>
    </tbody>
  </table>
</div>

<script>
  const FINNHUB_API_KEY = 'd5ttd2pr01qtjet18pb0d5ttd2pr01qtjet18pbg';
  
  const myStocks = [
    { ticker: 'NVDA', avgPrice: 450.00, shares: 10 },
    { ticker: 'TSLA', avgPrice: 200.00, shares: 5 },
    { ticker: 'MSFT', avgPrice: 300.00, shares: 8 },
    { ticker: 'PLTR', avgPrice: 15.50, shares: 100 }
  ];

  // --- LÓGICA DE FETCH E RENDER ---
  async function fetchStockData() {
    const tableBody = document.getElementById('stock-rows');
    tableBody.innerHTML = ''; // Limpar loading

    // Vamos iterar sobre cada stock e buscar o preço
    for (const stock of myStocks) {
      try {
        // Fetch à API da Finnhub (Quote endpoint)
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${FINNHUB_API_KEY}`);
        const data = await response.json();
        
        // 'c' é o Current Price na resposta da Finnhub
        const currentPrice = data.c; 

        if (!currentPrice) throw new Error("Sem dados");

        // Cálculos
        const plPerShare = currentPrice - stock.avgPrice;
        const totalPL = plPerShare * stock.shares;
        const plPercent = ((plPerShare / stock.avgPrice) * 100).toFixed(2);
        
        // Estilização (Verde/Vermelho)
        const colorClass = plPercent >= 0 ? 'color: #00ff00;' : 'color: #ff4d4d;';
        const sign = plPercent >= 0 ? '+' : '';

        // Construir a linha HTML
        const row = `
          <tr style="border-bottom: 1px solid #333;">
            <td style="padding: 10px;"><strong>${stock.ticker}</strong></td>
            <td style="padding: 10px;">$${stock.avgPrice.toFixed(2)}</td>
            <td style="padding: 10px;">$${currentPrice.toFixed(2)}</td>
            <td style="padding: 10px; text-align: right; ${colorClass}">
               ${sign}$${totalPL.toFixed(0)}
            </td>
            <td style="padding: 10px; text-align: right; ${colorClass}">
               ${sign}${plPercent}%
            </td>
          </tr>
        `;
        
        tableBody.innerHTML += row;

      } catch (error) {
        console.error(`Erro ao carregar ${stock.ticker}`, error);
        tableBody.innerHTML += `<tr><td colspan="5">Erro ao carregar ${stock.ticker}</td></tr>`;
      }
    }
  }

  // Arrancar a função
  fetchStockData();
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
