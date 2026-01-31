// assets/js/dashboard.js

// CONFIGURATION
const FINNHUB_KEY = 'd5ttd2pr01qtjet18pb0d5ttd2pr01qtjet18pbg';

// --- STOCKS ---
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

// --- CRYPTO ---
const myCrypto = [
  { id: 'ondo-finance', symbol: 'ONDO', avgPrice: 0.799, holdings: 1278.461 },
  { id: 'avalanche-2', symbol: 'AVAX', avgPrice: 11.76, holdings: 7.237 },
  { id: 'cardano', symbol: 'ADA', avgPrice: 0.337, holdings: 148.181 }
];

// --- POKEMON CARDS ---
const myCards = [
  { id: 'svp-85', name: 'Pikachu Grey Felt Hat', grade: 'PSA 9' },
  { id: 'sv4pt5-232', name: 'Mew ex (JP sv4a)', grade: 'PSA 10' },
  { id: 'sm12-241', name: 'Pikachu (JP sm11b)', grade: 'CCC 9' },
  { id: 'gym2-7', name: "Team Rocket's Nidoking", grade: 'Ungraded' },
  { id: 'swsh12pt5-gg35', name: 'Leafeon VSTAR', grade: 'PSA 10' }
];

// --- NEW PROXY FUNCTION (CodeTabs) ---
async function fetchViaProxy(targetUrl) {
  try {
    // CodeTabs is more robust for JSON data than AllOrigins
    const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`;
    
    const response = await fetch(proxyUrl);
    
    if (!response.ok) throw new Error(`Proxy Error: ${response.status}`);
    
    // CodeTabs returns the JSON directly
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Proxy Failed for ${targetUrl}:`, error);
    return null;
  }
}

// --- 1. EXCHANGE RATES ---
async function getExchangeRates() {
  let rates = { usdToEur: 0.95, gbpToEur: 1.19 };
  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=tether,british-pound-sterling&vs_currencies=eur&t=${Date.now()}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.tether?.eur) rates.usdToEur = data.tether.eur;
      if (data['british-pound-sterling']?.eur) rates.gbpToEur = data['british-pound-sterling'].eur;
    }
  } catch (e) { console.warn("Fallback Exchange Rates"); }
  return rates;
}

// --- 2. STOCKS ---
async function fetchStocks(rates) {
  const tableBody = document.getElementById('stock-rows');
  if(!tableBody) return;
  tableBody.innerHTML = ''; 

  for (const stock of myStocks) {
    let currentPrice = null;
    try {
      // VUSA.L via Proxy (CodeTabs + Yahoo)
      if (stock.ticker === 'VUSA.L') {
        const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.ticker}?interval=1d`;
        const data = await fetchViaProxy(yahooUrl);
        
        if (data && data.chart && data.chart.result) {
          const meta = data.chart.result[0].meta;
          let price = meta.regularMarketPrice;
          if (meta.currency === 'GBp' || price > 2000) price = price / 100;
          currentPrice = price * rates.gbpToEur;
        }
      } 
      // US Stocks via Finnhub (Direct)
      else {
        // Random token to prevent caching
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${FINNHUB_KEY}&rand=${Math.random()}`);
        const data = await res.json();
        if (data.c) currentPrice = data.c * rates.usdToEur;
      }

      if (!currentPrice) {
         const cleanTicker = stock.ticker.replace('.L', '').replace('.AS', '');
         tableBody.innerHTML += `<tr><td colspan="4" style="color: orange; font-size:0.8rem;">⚠️ ${cleanTicker}: API Error</td></tr>`;
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
    } catch (err) { console.error(`Error ${stock.ticker}`, err); }
  }
}

// --- 3. CRYPTO ---
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
  } catch (error) { console.error("Error Crypto", error); }
}

// --- 4. POKEMON (VIA CODETABS PROXY) ---
async function fetchPokemon(rates) {
  const container = document.getElementById('poke-container');
  if(!container) return;
  container.innerHTML = ''; 

  for (const card of myCards) {
    try {
      // Force Proxy on Pokemon API to bypass CORS
      const targetUrl = `https://api.pokemontcg.io/v2/cards/${card.id}`;
      const data = await fetchViaProxy(targetUrl);
      
      if (!data || !data.data) {
        throw new Error("No Data (Proxy)");
      }

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
      console.error(`Error Pokemon ${card.id}:`, error);
      container.innerHTML += `<div style="display:inline-block; border:1px solid red; padding:10px;">Error: ${card.name}</div>`;
    }
  }
}

// --- STARTUP ---
let dashboardLoaded = false;
document.addEventListener('DOMContentLoaded', async () => {
  if (dashboardLoaded) return;
  dashboardLoaded = true;

  const rates = await getExchangeRates();
  fetchCrypto();
  fetchStocks(rates);
  fetchPokemon(rates);
});
