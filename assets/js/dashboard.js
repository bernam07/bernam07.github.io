// assets/js/dashboard.js

// CONFIGURAÇÃO
const FINNHUB_KEY = 'd5ttd2pr01qtjet18pb0d5ttd2pr01qtjet18pbg';

// 1. STOCKS
const myStocks = [
  { ticker: 'VUSA.L', avgPrice: 100.9381, shares: 15.288 }, 
  { ticker: 'NVDA', avgPrice: 115.84, shares: 5.206 },
  { ticker: 'PLTR', avgPrice: 35.84, shares: 6.389 },
  { ticker: 'NVO', avgPrice: 70.02, shares: 12.480 },
  { ticker: 'SOFI', avgPrice: 14.24, shares: 30.184 },
  { ticker: 'META', avgPrice: 530.52, shares: 0.981 },
  { ticker: 'AMZN', avgPrice: 176.12, shares: 2.713 },
  { ticker: 'O', avgPrice: 49.72, shares: 8.756 },
  { ticker: 'ORCL', avgPrice: 166.78, shares: 2.419 }
];

// 2. CRYPTO
const myCrypto = [
  { id: 'ondo-finance', symbol: 'ONDO', avgPrice: 0.799, holdings: 1278.461 },
  { id: 'avalanche-2', symbol: 'AVAX', avgPrice: 11.76, holdings: 7.237 },
  { id: 'cardano', symbol: 'ADA', avgPrice: 0.337, holdings: 148.181 }
];

// 3. POKEMON CARDS
const myCards = [
  { id: 'svp-85', name: 'Pikachu Grey Felt Hat', grade: 'PSA 9' },
  { id: 'sv4pt5-232', name: 'Mew ex (JP sv4a)', grade: 'PSA 10' },
  { id: 'sm12-241', name: 'Pikachu (JP sm11b)', grade: 'CCC 9' },
  { id: 'gym2-7', name: "Team Rocket's Nidoking", grade: 'Ungraded' },
  { id: 'swsh12pt5-gg35', name: 'Leafeon VSTAR', grade: 'PSA 10' }
];

// --- FUNÇÕES AUXILIARES ---

async function getExchangeRates() {
  let rates = { usdToEur: 0.95, gbpToEur: 1.19 };
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=tether,british-pound-sterling&vs_currencies=eur&t=${Date.now()}`);
    if (response.ok) {
      const data = await response.json();
      if (data.tether?.eur) rates.usdToEur = data.tether.eur;
      if (data['british-pound-sterling']?.eur) rates.gbpToEur = data['british-pound-sterling'].eur;
    }
  } catch (e) { console.warn("Fallback Câmbio"); }
  return rates;
}

// --- LÓGICA STOCKS (Yahoo Proxy + Finnhub) ---
async function fetchStocks(rates) {
  const tableBody = document.getElementById('stock-rows');
  if(!tableBody) return;
  tableBody.innerHTML = ''; 

  for (const stock of myStocks) {
    let currentPrice = null;
    try {
      // VUSA.L: Usa Proxy CodeTabs para ler Yahoo Finance
      if (stock.ticker === 'VUSA.L') {
        const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.ticker}?interval=1d`;
        // Adicionamos um numero random para evitar cache do browser
        const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}&rand=${Math.random()}`;
        
        try {
          const res = await fetch(proxyUrl);
          if (res.ok) {
            const data = await res.json();
            const meta = data.chart?.result?.[0]?.meta;
            if (meta) {
              let price = meta.regularMarketPrice;
              if (meta.currency === 'GBp' || price > 2000) price = price / 100;
              currentPrice = price * rates.gbpToEur;
            }
          }
        } catch (e) { console.warn("VUSA Proxy falhou (Rate Limit?)"); }
      } 
      // OUTRAS: Finnhub API Direta
      else {
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${FINNHUB_KEY}`);
        const data = await res.json();
        if (data.c) currentPrice = data.c * rates.usdToEur;
      }

      if (!currentPrice) {
         // Se falhar (ex: proxy em baixo), mostra erro mas não crasha
         const cleanTicker = stock.ticker.replace('.L', '').replace('.AS', '');
         tableBody.innerHTML += `<tr><td colspan="4" style="color: orange; font-size:0.8rem;">⚠️ ${cleanTicker}: N/A</td></tr>`;
         continue;
      }

      const plPercent = ((currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
      const colorClass = plPercent >= 0 ? 'text-green' : 'text-red';
      const sign = plPercent >= 0 ? '+' : '';
      const cleanTicker = stock.ticker.replace('.L', '').replace('.AS', '');

      const row = `
        <tr style="border-bottom: 1px solid #333;">
          <td><strong>${cleanTicker}</strong></td>
          <td>€${stock.avgPrice.toFixed(2)}</td>
          <td>€${currentPrice.toFixed(2)}</td>
          <td class="${colorClass}" style="text-align:right; font-weight:bold;">${sign}${plPercent.toFixed(1)}%</td>
        </tr>`;
      tableBody.innerHTML += row;
    } catch (err) { console.error(`Erro ${stock.ticker}`, err); }
  }
}

// --- LÓGICA CRYPTO ---
async function fetchCrypto() {
  try {
    const ids = myCrypto.map(c => c.id).join(',');
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=eur&t=${Date.now()}`);
    const data = await response.json();
    myCrypto.forEach(coin => {
      const priceEl = document.getElementById(`price-${coin.symbol.toLowerCase()}`);
      if (priceEl && data[coin.id]) {
        const currentPrice = data[coin.id].eur;
        const plPercent = ((currentPrice - coin.avgPrice) / coin.avgPrice) * 100;
        const colorClass = plPercent >= 0 ? 'text-green' : 'text-red';
        const sign = plPercent >= 0 ? '+' : '';
        priceEl.innerHTML = `€${currentPrice.toFixed(2)} <span class="${colorClass}" style="font-size: 0.8em; margin-left: 5px;">(${sign}${plPercent.toFixed(1)}%)</span>`;
      }
    });
  } catch (error) { console.error("Erro Crypto", error); }
}

// --- LÓGICA POKEMON (DIRETA, SEM PROXY) ---
async function fetchPokemon(rates) {
  const container = document.getElementById('poke-container');
  if(!container) return;
  container.innerHTML = ''; 

  for (const card of myCards) {
    try {
      // Fazemos pedido DIRETO. Sem Proxy, Sem API Key (para evitar CORS preflight)
      // A API pública permite isto para volumes baixos.
      const response = await fetch(`https://api.pokemontcg.io/v2/cards/${card.id}`);
      
      if (!response.ok) throw new Error(`Status ${response.status}`);
      
      const data = await response.json();
      const cardData = data.data;
      const imageUrl = cardData.images.small;
      
      let priceUsd = 0;
      if (cardData.tcgplayer?.prices) {
         const prices = cardData.tcgplayer.prices;
         if (prices.holofoil) priceUsd = prices.holofoil.market;
         else if (prices.normal) priceUsd = prices.normal.market;
         else if (prices.reverseHolofoil) priceUsd = prices.reverseHolofoil.market;
      }
      const priceEur = priceUsd * rates.usdToEur;
      const displayPrice = priceEur > 0 ? `Raw: €${priceEur.toFixed(0)}` : '';

      let badgeColor = '#555'; 
      if (card.grade.includes('10')) badgeColor = '#d4af37'; 
      else if (card.grade.includes('9')) badgeColor = '#c0c0c0'; 

      const cardHtml = `
        <div class="poke-card" style="position: relative; display: inline-block;">
          <div style="position: absolute; top: -10px; right: -10px; background: ${badgeColor}; color: white; padding: 4px 8px; border-radius: 12px; font-weight: bold; font-size: 0.8rem; box-shadow: 0 2px 4px rgba(0,0,0,0.5); z-index: 10;">
            ${card.grade}
          </div>
          <a href="${cardData.tcgplayer?.url || '#'}" target="_blank">
            <img src="${imageUrl}" alt="${card.name}" title="${card.name}" style="border-radius: 10px; width: 100%;">
          </a>
          <center>
            <small style="opacity: 0.9; font-weight: bold; margin-top: 5px; display: block;">${card.name}</small>
            <small style="opacity: 0.6; font-size: 0.75rem;">${displayPrice}</small>
          </center>
        </div>
      `;
      container.innerHTML += cardHtml;

    } catch (error) {
      console.error(`Erro Pokemon ${card.id}:`, error);
      // Se der erro, tentamos mostrar pelo menos o nome
      container.innerHTML += `<div class="poke-card" style="border:1px dashed #555; display:flex; align-items:center; justify-content:center;"><small>Erro: ${card.name}</small></div>`;
    }
  }
}

// --- ARRANQUE ---
let dashboardLoaded = false;
document.addEventListener('DOMContentLoaded', async () => {
  if (dashboardLoaded) return;
  dashboardLoaded = true;

  const rates = await getExchangeRates();
  // Ordem de carregamento não importa, mas a chamada sim
  fetchStocks(rates);
  fetchCrypto();
  fetchPokemon(rates);
});
