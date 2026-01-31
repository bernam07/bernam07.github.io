// assets/js/dashboard.js

// CONFIGURAÇÃO
const FINNHUB_KEY = 'd5ttd2pr01qtjet18pb0d5ttd2pr01qtjet18pbg';
const CACHE_DURATION = 1000 * 60 * 15; // 15 Minutos de Cache

// --- 1. STOCKS ---
const myStocks = [
  {
    ticker: 'VUSA.L',
    avgPrice: 100.9381,
    shares: 15.288,
    fallbackPrice: 105.1,
  },
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

// --- 3. POKEMON CARDS (TCGDex IDs) ---
// Nota: A TCGDex usa '.' em vez de 'pt' nos sets (ex: swsh12.5)
const myCards = [
  {
    name: 'Pikachu Grey Felt Hat',
    grade: 'PSA 9',
    manualImg: 'https://images.pokemontcg.io/svp/85_hires.png',
    tcgDexId: 'svp-85',
  },
  {
    name: 'Mew ex (JP sv4a)',
    grade: 'PSA 10',
    manualImg:
      'https://storage.googleapis.com/images.pricecharting.com/3re7lj6h6aqxecm4/1600.jpg',
    tcgDexId: 'sv4.5-232', // Paldean Fates
  },
  {
    name: 'Pikachu (JP sm11b)',
    grade: 'CCC 9',
    manualImg:
      'https://tcgplayer-cdn.tcgplayer.com/product/574914_in_1000x1000.jpg',
    tcgDexId: 'sm12-241', // Cosmic Eclipse
  },
  {
    name: "Team Rocket's Nidoking EX",
    grade: 'Ungraded',
    manualImg:
      'https://assets.pokemon.com/static-assets/content-assets/cms2/img/cards/web/SV10/SV10_EN_233.png',
    tcgDexId: null, // Carta muito recente, ainda sem dados estáveis
  },
  {
    name: 'Leafeon VSTAR (JP s12a)',
    grade: 'PSA 10',
    manualImg:
      'https://den-cards.pokellector.com/357/Leafeon-VSTAR.S12A.210.45960.png',
    tcgDexId: 'swsh12.5-gg35', // Crown Zenith
  },
  {
    name: 'Charizard V (JP s12a)',
    grade: 'CGC 9.5',
    manualImg:
      'https://storage.googleapis.com/images.pricecharting.com/cqvwd3dhpbt4giji/1600.jpg',
    tcgDexId: 'swsh12.5-18', // Crown Zenith
  },
  {
    name: 'Iono',
    grade: 'PSA 9',
    manualImg: 'https://images.pokemontcg.io/sv4pt5/237_hires.png',
    tcgDexId: 'sv4.5-237', // Paldean Fates
  },
  {
    name: "N's Zoroark EX (JP sv9)",
    grade: 'Ungraded',
    manualImg:
      'https://tcgplayer-cdn.tcgplayer.com/product/615003_in_600x600.jpg',
    tcgDexId: null, // Sem ID inglês compatível direto
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

// --- PROXY RAW (PARA VUSA) ---
async function fetchViaRawProxy(targetUrl) {
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
      targetUrl
    )}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error(`Proxy Error`);
    return await response.json();
  } catch (error) {
    return null;
  }
}

// --- 1. TAXAS DE CÂMBIO ---
async function getExchangeRates() {
  const cached = getCachedData('rates');
  if (cached) return cached;

  let rates = { usdToEur: 0.95, gbpToEur: 1.19 };
  try {
    // Removi o timestamp para não levar block da CoinGecko
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
          // Yahoo via RAW Proxy
          const url = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.ticker}?interval=1d`;
          const data = await fetchViaRawProxy(url);

          if (data?.chart?.result?.[0]?.meta) {
            let p = data.chart.result[0].meta.regularMarketPrice;
            if (data.chart.result[0].meta.currency === 'GBp' || p > 2000)
              p = p / 100;
            currentPrice = p * rates.gbpToEur;
            setCachedData(cacheKey, currentPrice);
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
      } catch (e) {}
    }

    if (!currentPrice && stock.fallbackPrice)
      currentPrice = stock.fallbackPrice;

    // Render
    const cleanTicker = stock.ticker.replace('.L', '').replace('.AS', '');
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
      // Removido o cache busting agressivo para evitar erro 429
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

// --- 4. POKEMON (VIA TCGDEX) ---
async function fetchPokemon(rates) {
  const container = document.getElementById('poke-container');
  if (!container) return;
  container.innerHTML = '';

  for (const card of myCards) {
    let cardPrice = null;

    if (card.tcgDexId) {
      const cacheKey = `dex_${card.tcgDexId}`;
      cardPrice = getCachedData(cacheKey);

      if (!cardPrice) {
        try {
          // TCGDex API - Permite CORS por defeito!
          const url = `https://api.tcgdex.net/v2/en/cards/${card.tcgDexId}`;
          const response = await fetch(url);

          if (response.ok) {
            const data = await response.json();
            // A TCGDex devolve preços do Cardmarket em Euros! (se existirem)
            if (data.cardmarket && data.cardmarket.prices) {
              // Usamos a média dos últimos 7 dias (avg7) ou avg30
              const euros =
                data.cardmarket.prices.avg7 ||
                data.cardmarket.prices.avg30 ||
                0;
              if (euros > 0) {
                cardPrice = euros; // Já está em Euros, não precisa de conversão
                setCachedData(cacheKey, cardPrice);
              }
            }
          }
        } catch (e) {
          console.log(`Erro Dex ${card.name}`);
        }
      }
    }

    const displayPrice = cardPrice ? `Mkt: €${cardPrice.toFixed(2)}` : 'N/A';

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
