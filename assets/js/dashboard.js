// assets/js/dashboard.js

// CONFIGURAÇÃO
const FINNHUB_KEY = 'd5ttd2pr01qtjet18pb0d5ttd2pr01qtjet18pbg';
const CACHE_DURATION = 1000 * 60 * 15; // 15 Minutos de Cache

// --- DADOS ---
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

const myCrypto = [
  { id: 'ondo-finance', symbol: 'ONDO', avgPrice: 0.799, holdings: 1278.461 },
  { id: 'avalanche-2', symbol: 'AVAX', avgPrice: 11.76, holdings: 7.237 },
  { id: 'cardano', symbol: 'ADA', avgPrice: 0.337, holdings: 148.181 }
];

const myCards = [
  { id: 'svp-85', name: 'Pikachu Grey Felt Hat', grade: 'PSA 9', manualImg: 'https://images.pokemontcg.io/svp/85_hires.png' },
  { id: 'sv4pt5-232', name: 'Mew ex (JP sv4a)', grade: 'PSA 10', manualImg: 'https://images.pokemontcg.io/sv4pt5/232_hires.png' },
  { id: 'sm12-241', name: 'Pikachu (JP sm11b)', grade: 'CCC 9', manualImg: 'https://images.pokemontcg.io/sm12/241_hires.png' },
  { id: 'gym2-7', name: "Team Rocket's Nidoking", grade: 'Ungraded', manualImg: 'https://images.pokemontcg.io/gym2/7_hires.png' },
  { id: 'swsh12pt5-gg35', name: 'Leafeon VSTAR', grade: 'PSA 10', manualImg: 'https://images.pokemontcg.io/swsh12pt5/gg35_hires.png' }
];

// --- SISTEMA DE CACHE ---
function getCachedData(key) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  const parsed = JSON.parse(cached);
  if (Date.now() - parsed.timestamp > CACHE_DURATION) return null; // Expirou
  return parsed.data;
}

function setCachedData(key, data) {
  localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data: data }));
}

// --- PROXY ROBUSTO (CorsProxy.io) ---
async function fetchViaProxy(targetUrl) {
  try {
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error("Proxy Error");
    return await response.json();
  } catch (error) {
    console.warn(`Proxy falhou para ${targetUrl}`);
    return null;
  }
}

// --- 1. TAXAS DE CÂMBIO ---
async function getExchangeRates() {
  // Tenta Cache Primeiro
  const cached = getCachedData('rates');
  if (cached) return cached;

  let rates = { usdToEur: 0.95, gbpToEur: 1.19 };
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether,british-pound-sterling&vs_currencies=eur');
    if (response.ok) {
      const data = await response.json();
      if (data.tether?.eur) rates.usdToEur = data.tether.eur;
      if (data['british-pound-sterling']?.eur) rates.gbpToEur = data['british-pound-sterling'].eur;
      setCachedData('rates', rates); // Guarda na cache
    }
  } catch (e) { console.warn("Usando taxas fallback"); }
  return rates;
}

// --- 2. STOCKS ---
async function fetchStocks(rates) {
  const tableBody = document.getElementById('stock-rows');
  if(!tableBody) return;
  tableBody.innerHTML = ''; 

  for (const stock of myStocks) {
    let currentPrice = null;
    const cacheKey = `stock_${stock.ticker}`;
    
    // 1. Tenta Cache
    const cachedPrice = getCachedData(cacheKey);
    
    if (cachedPrice) {
      currentPrice = cachedPrice;
    } else {
      // 2. Se não houver cache, tenta API
      try {
        if (stock.ticker === 'VUSA.L') {
          // Yahoo via CorsProxy
          const url = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.ticker}?interval=1d`;
          const data = await fetchViaProxy(url);
          if (data?.chart?.result?.[0]?.meta) {
            let p = data.chart.result[0].meta.regularMarketPrice;
            if (data.chart.result[0].meta.currency === 'GBp' || p > 2000) p = p / 100;
            currentPrice = p * rates.gbpToEur;
          }
        } else {
          // Finnhub
          const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${FINNHUB_KEY}`);
          const data = await res.json();
          if (data.c) currentPrice = data.c * rates.usdToEur;
        }
        // Se sucesso, guarda na cache
        if (currentPrice) setCachedData(cacheKey, currentPrice);
      } catch (e) { console.error(e); }
    }

    // --- RENDER ---
    const cleanTicker = stock.ticker.replace('.L', '').replace('.AS', '');
    
    if (!currentPrice) {
       // Se falhar tudo (cache e api), mostra N/A mas mantém linha limpa
       tableBody.innerHTML += `<tr><td><strong>${cleanTicker}</strong></td><td>€${stock.avgPrice.toFixed(2)}</td><td style="color:orange">N/A</td><td>-</td></tr>`;
       continue;
    }

    const plPercent = ((currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
    const colorClass = plPercent >= 0 ? 'text-green' : 'text-red';
    const sign = plPercent >= 0 ? '+' : '';

    const row = `
      <tr style="border-bottom: 1px solid #333;">
        <td><strong>${cleanTicker}</strong></td>
        <td>€${stock.avgPrice.toFixed(2)}</td>
        <td>€${currentPrice.toFixed(2)}</td>
        <td class="${colorClass}" style="text-align:right; font-weight:bold;">${sign}${plPercent.toFixed(1)}%</td>
      </tr>`;
    tableBody.innerHTML += row;
  }
}

// --- 3. CRYPTO ---
async function fetchCrypto() {
  const cacheKey = 'crypto_prices';
  let prices = getCachedData(cacheKey);

  if (!prices) {
    try {
      const ids = myCrypto.map(c => c.id).join(',');
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=eur`);
      if (response.ok) {
        prices = await response.json();
        setCachedData(cacheKey, prices);
      }
    } catch (e) { console.warn("Crypto API limit"); }
  }

  // Renderizar (mesmo se prices for null, tentamos o fallback visual)
  myCrypto.forEach(coin => {
    const priceEl = document.getElementById(`price-${coin.symbol.toLowerCase()}`);
    if (priceEl) {
      if (prices && prices[coin.id]) {
        const currentPrice = prices[coin.id].eur;
        const plPercent = ((currentPrice - coin.avgPrice) / coin.avgPrice) * 100;
        const colorClass = plPercent >= 0 ? 'text-green' : 'text-red';
        const sign = plPercent >= 0 ? '+' : '';
        priceEl.innerHTML = `€${currentPrice.toFixed(2)} <span class="${colorClass}" style="font-size: 0.8em;">(${sign}${plPercent.toFixed(1)}%)</span>`;
      } else {
        priceEl.innerText = "Limit Reached"; 
        priceEl.style.color = "orange";
      }
    }
  });
}

// --- 4. POKEMON (VISUAL GARANTIDO) ---
async function fetchPokemon(rates) {
  const container = document.getElementById('poke-container');
  if(!container) return;
  container.innerHTML = ''; 

  for (const card of myCards) {
    // Tentar Cache
    const cacheKey = `card_${card.id}`;
    let cardPrice = getCachedData(cacheKey);

    // Se não tem preço em cache, tenta buscar (API CodeTabs)
    if (cardPrice === null) {
        try {
            const url = `https://api.pokemontcg.io/v2/cards/${card.id}`;
            const data = await fetchViaProxy(url);
            if (data?.data?.tcgplayer?.prices) {
                const prices = data.data.tcgplayer.prices;
                let usd = prices.holofoil?.market || prices.normal?.market || prices.reverseHolofoil?.market || 0;
                cardPrice = usd * rates.usdToEur;
                setCachedData(cacheKey, cardPrice);
            }
        } catch (e) { console.warn(`Card ${card.id} failed`); }
    }

    const displayPrice = cardPrice ? `Raw: €${cardPrice.toFixed(0)}` : 'N/A';
    
    // Cores da Badge
    let badgeColor = '#555'; 
    if (card.grade.includes('10')) badgeColor = '#d4af37'; 
    else if (card.grade.includes('9')) badgeColor = '#c0c0c0'; 

    // Usamos a imagem manual como fallback para garantir que aparece sempre
    const imageUrl = card.manualImg;

    const cardHtml = `
      <div class="poke-card" style="position: relative; display: inline-block;">
        <div style="position: absolute; top: -10px; right: -10px; background: ${badgeColor}; color: white; padding: 4px 8px; border-radius: 12px; font-weight: bold; font-size: 0.8rem; box-shadow: 0 2px 4px rgba(0,0,0,0.5); z-index: 10;">
          ${card.grade}
        </div>
        <img src="${imageUrl}" alt="${card.name}" style="border-radius: 10px; width: 100%;">
        <center>
          <small style="opacity: 0.9; font-weight: bold; margin-top: 5px; display: block;">${card.name}</small>
          <small style="opacity: 0.6; font-size: 0.75rem;">${displayPrice}</small>
        </center>
      </div>
    `;
    container.innerHTML += cardHtml;
  }
}

// --- ARRANQUE ---
let loaded = false;
document.addEventListener('DOMContentLoaded', async () => {
  if (loaded) return;
  loaded = true;
  const rates = await getExchangeRates();
  fetchStocks(rates);
  fetchCrypto();
  fetchPokemon(rates);
});
