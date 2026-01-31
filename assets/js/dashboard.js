// assets/js/dashboard.js

// CONFIGURAÇÃO
const FINNHUB_KEY = 'd5ttd2pr01qtjet18pb0d5ttd2pr01qtjet18pbg';
const CACHE_DURATION = 1000 * 60 * 15; // 15 Minutos

// --- 1. STOCKS ---
const myStocks = [
  { ticker: 'VUSA.L', avgPrice: 100.9381, shares: 15.288 },
  { ticker: 'NVDA', avgPrice: 115.84, shares: 5.206 },
  { ticker: 'PLTR', avgPrice: 35.84, shares: 6.389 },
  { ticker: 'NVO', avgPrice: 70.02, shares: 12.48 },
  { ticker: 'SOFI', avgPrice: 14.24, shares: 30.184 },
  { ticker: 'META', avgPrice: 530.52, shares: 0.981 },
  { ticker: 'AMZN', avgPrice: 176.12, shares: 2.713 },
  { ticker: 'O', avgPrice: 49.72, shares: 8.756 },
  { ticker: 'ORCL', avgPrice: 166.78, shares: 2.419 },
];

// --- 2. CRYPTO ---
const myCrypto = [
  { id: 'ondo-finance', symbol: 'ONDO', avgPrice: 0.799, holdings: 1278.461 },
  { id: 'avalanche-2', symbol: 'AVAX', avgPrice: 11.76, holdings: 7.237 },
  { id: 'cardano', symbol: 'ADA', avgPrice: 0.337, holdings: 148.181 },
];

// --- 3. POKEMON CARDS ---
const myCards = [
  {
    name: 'Pikachu Grey Felt Hat',
    grade: 'PSA 9',
    manualImg: 'https://images.pokemontcg.io/svp/85_hires.png',
    searchId: 'svp-85',
  },
  {
    name: 'Mew ex (JP sv4a)',
    grade: 'PSA 10',
    manualImg:
      'https://storage.googleapis.com/images.pricecharting.com/3re7lj6h6aqxecm4/1600.jpg',
    searchId: 'sv4pt5-232',
  },
  {
    name: 'Pikachu (JP sm11b)',
    grade: 'CCC 9',
    manualImg:
      'https://tcgplayer-cdn.tcgplayer.com/product/574914_in_1000x1000.jpg',
    searchId: 'sm12-241',
  },
  {
    name: "Team Rocket's Nidoking EX",
    grade: 'Ungraded',
    manualImg:
      'https://assets.pokemon.com/static-assets/content-assets/cms2/img/cards/web/SV10/SV10_EN_233.png',
    searchId: null,
  },
  {
    name: 'Leafeon VSTAR (JP s12a)',
    grade: 'PSA 10',
    manualImg:
      'https://den-cards.pokellector.com/357/Leafeon-VSTAR.S12A.210.45960.png',
    searchId: 'swsh12pt5-gg35',
  },
  {
    name: 'Charizard V (JP s12a)',
    grade: 'CGC 9.5',
    manualImg:
      'https://storage.googleapis.com/images.pricecharting.com/cqvwd3dhpbt4giji/1600.jpg',
    searchId: 'swsh12pt5-18',
  },
  {
    name: 'Iono (Paldean Fates)',
    grade: 'PSA 9',
    manualImg: 'https://images.pokemontcg.io/sv4pt5/237_hires.png',
    searchId: 'sv4pt5-237',
  },
  {
    name: "N's Zoroark EX (JP sv9)",
    grade: 'Ungraded',
    manualImg:
      'https://tcgplayer-cdn.tcgplayer.com/product/615003_in_600x600.jpg',
    searchId: null,
  },
];

// --- SISTEMA DE CACHE ---
function getCachedData(key) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  const parsed = JSON.parse(cached);
  if (Date.now() - parsed.timestamp > CACHE_DURATION) return null;
  return parsed.data;
}

function setCachedData(key, data) {
  localStorage.setItem(
    key,
    JSON.stringify({ timestamp: Date.now(), data: data })
  );
}

// --- 1. TAXAS DE CÂMBIO ---
async function getExchangeRates() {
  const cached = getCachedData('rates');
  if (cached) return cached;

  let rates = { usdToEur: 0.95, gbpToEur: 1.19 };
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=tether,british-pound-sterling&vs_currencies=eur'
    );
    if (response.ok) {
      const data = await response.json();
      if (data.tether?.eur) rates.usdToEur = data.tether.eur;
      if (data['british-pound-sterling']?.eur)
        rates.gbpToEur = data['british-pound-sterling'].eur;
      setCachedData('rates', rates);
    }
  } catch (e) {}
  return rates;
}

// --- 2. STOCKS ---
async function fetchStocks(rates) {
  const tableBody = document.getElementById('stock-rows');
  if (!tableBody) return;
  tableBody.innerHTML = '';

  for (const stock of myStocks) {
    let currentPrice = null;
    const cacheKey = `stock_${stock.ticker}`;
    const cachedPrice = getCachedData(cacheKey);

    if (cachedPrice) {
      currentPrice = cachedPrice;
    } else {
      try {
        if (stock.ticker === 'VUSA.L') {
          // Yahoo via AllOrigins (Modo RAW para evitar erros de JSON)
          const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.ticker}?interval=1d`;
          // O 'raw' devolve o JSON original do Yahoo limpo
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
            targetUrl
          )}`;

          const res = await fetch(proxyUrl);
          if (res.ok) {
            const data = await res.json();
            const meta = data.chart?.result?.[0]?.meta;
            if (meta) {
              let p = meta.regularMarketPrice;
              if (meta.currency === 'GBp' || p > 2000) p = p / 100;
              currentPrice = p * rates.gbpToEur;
              setCachedData(cacheKey, currentPrice);
            }
          }
        } else {
          // Finnhub Direct
          const res = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${FINNHUB_KEY}`
          );
          const data = await res.json();
          if (data.c) {
            currentPrice = data.c * rates.usdToEur;
            setCachedData(cacheKey, currentPrice);
          }
        }
      } catch (e) {
        console.warn(`Falha ${stock.ticker}`);
      }
    }

    // Render
    const cleanTicker = stock.ticker.replace('.L', '').replace('.AS', '');

    // Se não temos preço, usamos um placeholder "N/A" sem cor
    const priceDisplay = currentPrice
      ? `€${currentPrice.toFixed(2)}`
      : '<span style="color:orange">N/A</span>';

    let plCell = '<td style="text-align:right">-</td>';
    if (currentPrice) {
      const pl = ((currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
      const color = pl >= 0 ? 'text-green' : 'text-red';
      const sign = pl >= 0 ? '+' : '';
      plCell = `<td class="${color}" style="text-align:right; font-weight:bold;">${sign}${pl.toFixed(
        1
      )}%</td>`;
    }

    const row = `
      <tr style="border-bottom: 1px solid #333;">
        <td><strong>${cleanTicker}</strong></td>
        <td>€${stock.avgPrice.toFixed(2)}</td>
        <td>${priceDisplay}</td>
        ${plCell}
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
      const ids = myCrypto.map((c) => c.id).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=eur`
      );
      if (response.ok) {
        prices = await response.json();
        setCachedData(cacheKey, prices);
      }
    } catch (e) {}
  }

  myCrypto.forEach((coin) => {
    const priceEl = document.getElementById(
      `price-${coin.symbol.toLowerCase()}`
    );
    if (priceEl && prices && prices[coin.id]) {
      const currentPrice = prices[coin.id].eur;
      const plPercent = ((currentPrice - coin.avgPrice) / coin.avgPrice) * 100;
      const colorClass = plPercent >= 0 ? 'text-green' : 'text-red';
      const sign = plPercent >= 0 ? '+' : '';
      priceEl.innerHTML = `€${currentPrice.toFixed(
        2
      )} <span class="${colorClass}" style="font-size: 0.8em;">(${sign}${plPercent.toFixed(
        1
      )}%)</span>`;
    }
  });
}

// --- 4. POKEMON (DIRETO E LIMPO) ---
async function fetchPokemon(rates) {
  const container = document.getElementById('poke-container');
  if (!container) return;
  container.innerHTML = '';

  for (const card of myCards) {
    let cardPrice = null;

    if (card.searchId) {
      const cacheKey = `card_${card.searchId}`;
      cardPrice = getCachedData(cacheKey);

      if (!cardPrice) {
        try {
          // PEDIDO DIRETO OFICIAL (Sem proxy, sem key, sem headers)
          // 'credentials: omit' garante que o browser não envia nada que dispare CORS
          const url = `https://api.pokemontcg.io/v2/cards/${card.searchId}`;
          const response = await fetch(url, {
            method: 'GET',
            credentials: 'omit',
          });

          if (response.ok) {
            const data = await response.json();
            if (data?.data?.tcgplayer?.prices) {
              const prices = data.data.tcgplayer.prices;
              let usd =
                prices.holofoil?.market ||
                prices.normal?.market ||
                prices.reverseHolofoil?.market ||
                0;
              if (usd > 0) {
                cardPrice = usd * rates.usdToEur;
                setCachedData(cacheKey, cardPrice);
              }
            }
          }
        } catch (e) {
          console.log(`Erro ${card.name}`);
        }
      }
    }

    const displayPrice = cardPrice ? `Est: €${cardPrice.toFixed(0)}` : 'N/A';

    // Cores da Badge
    let badgeColor = '#555';
    if (card.grade.includes('10') || card.grade.includes('9.5'))
      badgeColor = '#d4af37';
    else if (card.grade.includes('9')) badgeColor = '#c0c0c0';

    const cardHtml = `
      <div class="poke-card" style="position: relative; display: inline-block;">
        <div style="position: absolute; top: -10px; right: -10px; background: ${badgeColor}; color: white; padding: 4px 8px; border-radius: 12px; font-weight: bold; font-size: 0.8rem; box-shadow: 0 2px 4px rgba(0,0,0,0.5); z-index: 10;">
          ${card.grade}
        </div>
        <a href="${card.manualImg}" target="_blank">
          <img src="${card.manualImg}" alt="${card.name}" style="border-radius: 10px; width: 100%;">
        </a>
        <center>
          <small style="opacity: 0.9; font-weight: bold; margin-top: 5px; display: block; min-height: 40px;">${card.name}</small>
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
