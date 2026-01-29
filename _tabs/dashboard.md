---
layout: page
icon: fas fa-chart-line
order: 4
title: Dashboard
---

<style>
  /* --- ESTILOS VISUAIS --- */
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
  
  /* Cores dinâmicas */
  .text-green { color: #00ff00; font-weight: bold; }
  .text-red { color: #ff4d4d; font-weight: bold; }
  
  /* Tabela Stocks */
  .stock-table { width:100%; border-collapse: collapse; font-family: monospace; }
  .stock-table th { text-align: left; padding: 10px; border-bottom: 2px solid #555; }
  .stock-table td { padding: 10px; border-bottom: 1px solid #333; }

  /* Pokemon Grid */
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
<div class="dashboard-grid">
  <div class="asset-card">
    <h3>ONDO Finance</h3>
    <p>Holdings: 1200 ONDO</p>
    <p>Avg Buy: $0.75</p>
    <p>Live Price: <span id="price-ondo">Loading...</span></p>
  </div>
  
  <div class="asset-card">
    <h3>Avalanche (AVAX)</h3>
    <p>Holdings: 10 AVAX</p>
    <p>Avg Buy: $35.00</p>
    <p>Live Price: <span id="price-avax">Loading...</span></p>
  </div>

  <div class="asset-card">
    <h3>Cardano (ADA)</h3>
    <p>Holdings: 500 ADA</p>
    <p>Avg Buy: $0.45</p>
    <p>Live Price: <span id="price-ada">Loading...</span></p>
  </div>
</div>

## 📈 Stock Market Positions
<div class="table-responsive">
  <table class="stock-table">
    <thead>
      <tr>
        <th>Ticker</th>
        <th>Avg Buy</th>
        <th>Live Price</th>
        <th style="text-align: right;">P/L ($)</th>
        <th style="text-align: right;">P/L (%)</th>
      </tr>
    </thead>
    <tbody id="stock-rows">
      <tr><td colspan="5">A contactar mercados...</td></tr>
    </tbody>
  </table>
</div>

## 🔫 CS2 Inventory
> Destaques da coleção.

| Weapon | Skin | Condition | Value |
| :--- | :--- | :--- | :--- |
| **AWP** | Desert Hydra | FN | 1.800€ |
| **AK-47** | Gold Arabesque | MW | 1.200€ |
| **Knife** | Butterfly Fade | FN | 2.500€ |

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
  // ==========================================
  // 1. CONFIGURAÇÃO
  // ==========================================
  const FINNHUB_KEY = 'd5ttd2pr01qtjet18pb0d5ttd2pr01qtjet18pbg'; // A tua Key já está aqui

  const myStocks = [
    { ticker: 'NVDA', avgPrice: 450.00, shares: 10 },
    { ticker: 'TSLA', avgPrice: 200.00, shares: 5 },
    { ticker: 'MSFT', avgPrice: 300.00, shares: 8 },
    { ticker: 'PLTR', avgPrice: 15.50, shares: 100 }
  ];

  // ==========================================
  // 2. FUNÇÃO CRYPTO (CoinGecko)
  // ==========================================
  async function fetchCrypto() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ondo-finance,avalanche-2,cardano&vs_currencies=usd');
      const data = await response.json();
      
      if(data['ondo-finance']) document.getElementById('price-ondo').innerText = '$' + data['ondo-finance'].usd;
      if(data['avalanche-2']) document.getElementById('price-avax').innerText = '$' + data['avalanche-2'].usd;
      if(data['cardano']) document.getElementById('price-ada').innerText = '$' + data['cardano'].usd;
      
    } catch (error) {
      console.error("Erro Crypto:", error);
      document.getElementById('price-ondo').innerText = "Erro API";
    }
  }

  // ==========================================
  // 3. FUNÇÃO STOCKS (Finnhub)
  // ==========================================
  async function fetchStocks() {
    const tableBody = document.getElementById('stock-rows');
    tableBody.innerHTML = ''; // Limpa tabela

    for (const stock of myStocks) {
      try {
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${FINNHUB_KEY}`);
        const data = await res.json();
        const currentPrice = data.c; // 'c' é o preço atual

        if (!currentPrice) {
           tableBody.innerHTML += `<tr><td colspan="5">Erro no Ticker ${stock.ticker} (Sem dados)</td></tr>`;
           continue;
        }

        // Cálculos
        const plTotal = (currentPrice - stock.avgPrice) * stock.shares;
        const plPercent = ((currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
        
        // Classes de cor
        const colorClass = plPercent >= 0 ? 'text-green' : 'text-red';
        const sign = plPercent >= 0 ? '+' : '';

        // HTML da linha
        const row = `
          <tr style="border-bottom: 1px solid #333;">
            <td><strong>${stock.ticker}</strong></td>
            <td>$${stock.avgPrice.toFixed(2)}</td>
            <td>$${currentPrice.toFixed(2)}</td>
            <td class="${colorClass}" style="text-align:right;">${sign}$${plTotal.toFixed(0)}</td>
            <td class="${colorClass}" style="text-align:right;">${sign}${plPercent.toFixed(2)}%</td>
          </tr>`;
          
        tableBody.innerHTML += row;

      } catch (err) {
        console.error(`Erro Stock ${stock.ticker}:`, err);
        tableBody.innerHTML += `<tr><td colspan="5">Erro ao carregar ${stock.ticker}</td></tr>`;
      }
    }
  }

  // ==========================================
  // 4. EXECUTAR QUANDO A PÁGINA ESTIVER PRONTA
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    fetchCrypto();
    fetchStocks();
  });
</script>
