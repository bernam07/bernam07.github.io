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

| Ticker | Empresa | Avg Price | Current Price | P/L (%) |
| :--- | :--- | :--- | :--- | :--- |
| **NVDA** | NVIDIA | $450.00 | $800.00 | <span class="price-live">+77%</span> |
| **TSLA** | Tesla | $200.00 | $180.00 | <span class="price-red">-10%</span> |
| **MSFT** | Microsoft | $300.00 | $400.00 | <span class="price-live">+33%</span> |

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
