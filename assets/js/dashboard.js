// assets/js/dashboard.js

// CONFIGURAÇÃO
const FINNHUB_KEY = 'd5ttd2pr01qtjet18pb0d5ttd2pr01qtjet18pbg';
const JUSTTCG_KEY = 'tcg_958179cf4f9147f392943be40a28779f';
const CACHE_DURATION = 1000 * 60 * 15; // 15 Minutos

// --- 1. STOCKS ---
const myStocks = [
  {
    ticker: 'VUSA.L',
    avgPrice: 100.9381,
    shares: 15.288,
    fallbackPrice: 106.5,
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

// --- 3. POKEMON CARDS (JustTCG API) ---
const myCards = [
  {
    name: 'Pikachu Grey Felt Hat',
    grade: 'PSA 9',
    manualImg: 'https://images.pokemontcg.io/svp/85_hires.png',
    tcgId: '518861',
  },
  {
    name: 'Mew ex (JP sv4a)',
    grade: 'PSA 10',
    manualImg:
      'https://storage.googleapis.com/images.pricecharting.com/3re7lj6h6aqxecm4/1600.jpg',
    tcgId: '534919',
  },
  {
    name: 'Pikachu (JP Dream League)',
    grade: 'CCC 9',
    manualImg:
      'https://tcgplayer-cdn.tcgplayer.com/product/574914_in_1000x1000.jpg',
    tcgId: '201352',
  },
  {
    name: "Team Rocket's Nidoking",
    grade: 'Ungraded',
    manualImg:
      'https://assets.pokemon.com/static-assets/content-assets/cms2/img/cards/web/SV10/SV10_EN_233.png',
    tcgId: '633033',
  },
  {
    name: 'Leafeon VSTAR (JP)',
    grade: 'PSA 10',
    manualImg:
      'https://den-cards.pokellector.com/357/Leafeon-VSTAR.S12A.210.45960.png',
    tcgId: '477060',
  },
  {
    name: 'Charizard V (JP SAR)',
    grade: 'CGC 9.5',
    manualImg:
      'https://storage.googleapis.com/images.pricecharting.com/cqvwd3dhpbt4giji/1600.jpg',
    tcgId: '285384',
  },
  {
    name: 'Iono (SIR)',
    grade: 'PSA 9',
    manualImg: 'https://images.pokemontcg.io/sv4pt5/237_hires.png',
    tcgId: '535101',
  },
  {
    name: "N's Zoroark EX",
    grade: 'Ungraded',
    manualImg:
      'https://tcgplayer-cdn.tcgplayer.com/product/615003_in_600x600.jpg',
    tcgId: '623612',
  },
];

// --- 5. CS2 INVENTORY (A tua seleção) ---
const mySkins = [
  {
    weapon: '★ Huntsman Knife',
    name: 'Gamma Doppler (Emerald)',
    wear: 'FN',
    float: '0.0091',
    pattern: '991',
    price: 700,
    rarity: 'knife',
    img: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRv3sxJjIEg8gIQ1U4r_1IFM0h_z3fT8SuImJz4i02aCta-6ClDkBu50ojOvA8Nym2wS3-kE_MWv1IY-WclI/360fx360f',
  },
  {
    weapon: '★ Flip Knife',
    name: 'Doppler (Phase 1)',
    wear: 'FN',
    float: '0.0071',
    pattern: '429',
    price: 300,
    rarity: 'knife',
    img: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRv3sxJjIEg8gIQ1U4r_1IFM0h_z3fT8SuImJz4i02aCta-6ClDkBu50ojOvA8Nym2wS3-kE_MWv1IY-WclI/360fx360f',
  },
  {
    weapon: '★ Broken Fang Gloves',
    name: 'Unhinged',
    wear: 'FT',
    float: '0.1664',
    price: 80,
    rarity: 'knife',
    img: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRv3sxJjIEg8gIQ1U4r_1IFM0h_z3fT8SuImJz4i02aCta-6ClDkBu50ojOvA8Nym2wS3-kE_MWv1IY-WclI/360fx360f',
  },
  {
    weapon: '★ Specialist Gloves',
    name: 'Lt. Commander',
    wear: 'FT',
    float: '0.1820',
    price: 180,
    rarity: 'knife',
    img: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRv3sxJjIEg8gIQ1U4r_1IFM0h_z3fT8SuImJz4i02aCta-6ClDkBu50ojOvA8Nym2wS3-kE_MWv1IY-WclI/360fx360f',
  },
  {
    weapon: 'M4A1-S (Souvenir)',
    name: 'Master Piece',
    wear: 'FT',
    float: '0.200',
    price: 250,
    rarity: 'classified',
    desc: 'DreamEaters vs G2 (shox gold)',
    img: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRv3sxJjIEg8gIQ1U4r_1IFM0h_z3fT8SuImJz4i02aCta-6ClDkBu50ojOvA8Nym2wS3-kE_MWv1IY-WclI/360fx360f',
  },
  {
    weapon: 'AK-47',
    name: 'B the Monster',
    wear: 'FT',
    float: '0.1512',
    price: 350,
    rarity: 'covert',
    desc: 'Renamed (Jaguar Craft)',
    img: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRv3sxJjIEg8gIQ1U4r_1IFM0h_z3fT8SuImJz4i02aCta-6ClDkBu50ojOvA8Nym2wS3-kE_MWv1IY-WclI/360fx360f',
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

// --- PROXY HELPER ---
async function fetchViaProxy(targetUrl, options = {}) {
  try {
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
    const response = await fetch(proxyUrl, options);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
}

async function fetchViaRawProxy(targetUrl) {
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
      targetUrl
    )}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error('Proxy Error');
    return await response.json();
  } catch (error) {
    return null;
  }
}

// --- 1. RATES ---
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

    if (cachedPrice) currentPrice = cachedPrice;
    else {
      try {
        if (stock.ticker === 'VUSA.L') {
          const url = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.ticker}?interval=1d`;
          const res = await fetch(
            `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
          );
          const data = await res.json();
          if (data?.chart?.result?.[0]?.meta) {
            let p = data.chart.result[0].meta.regularMarketPrice;
            if (data.chart.result[0].meta.currency === 'GBp' || p > 2000)
              p = p / 100;
            currentPrice = p * rates.gbpToEur;
            setCachedData(cacheKey, currentPrice);
          }
        } else {
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

    const cleanTicker = stock.ticker.replace('.L', '').replace('.AS', '');
    const priceDisplay = currentPrice ? `€${currentPrice.toFixed(2)}` : 'N/A';
    let plCell = '<td style="text-align:right">-</td>';
    if (currentPrice) {
      const pl = ((currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
      const color = pl >= 0 ? 'text-green' : 'text-red';
      const sign = pl >= 0 ? '+' : '';
      plCell = `<td class="${color}" style="text-align:right; font-weight:bold;">${sign}${pl.toFixed(
        1
      )}%</td>`;
    }
    tableBody.innerHTML += `<tr style="border-bottom: 1px solid #333;"><td><strong>${cleanTicker}</strong></td><td>€${stock.avgPrice.toFixed(
      2
    )}</td><td>${priceDisplay}</td>${plCell}</tr>`;
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

// --- 4. POKEMON (JustTCG - Batch Request) ---
async function fetchPokemon(rates) {
  const container = document.getElementById('poke-container');
  if (!container) return;
  container.innerHTML = '';

  // Gera HTML com Loading
  myCards.forEach((card, index) => {
    container.innerHTML += `
      <div id="card-${index}" class="poke-card" style="position: relative; display: inline-block;">
        <div style="position: absolute; top: -10px; right: -10px; background: ${
          card.grade.includes('10') || card.grade.includes('9.5')
            ? '#d4af37'
            : card.grade.includes('9')
            ? '#c0c0c0'
            : '#555'
        }; color: white; padding: 4px 8px; border-radius: 12px; font-weight: bold; font-size: 0.8rem; box-shadow: 0 2px 4px rgba(0,0,0,0.5); z-index: 10;">${
      card.grade
    }</div>
        <a href="${card.manualImg}" target="_blank"><img src="${
      card.manualImg
    }" alt="${card.name}" style="border-radius: 10px; width: 100%;"></a>
        <center><small style="opacity: 0.9; font-weight: bold; margin-top: 5px; display: block; min-height: 40px;">${
          card.name
        }</small><small id="price-${index}" style="opacity: 0.6; font-size: 0.75rem;">Loading...</small></center>
      </div>`;
  });

  const cacheKey = 'justtcg_batch_prices';
  let batchData = getCachedData(cacheKey);

  if (!batchData) {
    try {
      const requestBody = myCards
        .filter((c) => c.tcgId)
        .map((c) => ({ tcgplayerId: c.tcgId }));
      const response = await fetchViaProxy('https://api.justtcg.com/v1/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': JUSTTCG_KEY,
        },
        body: JSON.stringify(requestBody),
      });
      if (response && response.data) {
        batchData = response.data;
        setCachedData(cacheKey, batchData);
      }
    } catch (e) {
      console.log('Erro JustTCG Batch', e);
    }
  }

  myCards.forEach((card, index) => {
    const priceEl = document.getElementById(`price-${index}`);
    if (!batchData) {
      priceEl.innerText = 'N/A';
      return;
    }
    const apiCard = batchData.find((c) => c.tcgplayerId === card.tcgId);
    let finalPrice = 0;
    if (apiCard && apiCard.variants) {
      const bestVariant =
        apiCard.variants.find(
          (v) =>
            v.condition === 'Near Mint' &&
            (v.printing === 'Holofoil' || v.printing === 'Normal')
        ) || apiCard.variants[0];
      if (bestVariant && bestVariant.price)
        finalPrice = bestVariant.price * rates.usdToEur;
    }
    priceEl.innerText =
      finalPrice > 0 ? `Est: €${finalPrice.toFixed(2)}` : 'N/A';
  });
}

// --- 5. CS2 SKINS (Render Manual) ---
function renderCS2() {
  const container = document.getElementById('cs2-container');
  if (!container) return;
  container.innerHTML = '';

  for (const skin of mySkins) {
    const rarityClass = `rarity-${skin.rarity || 'restricted'}`;
    const imgUrl =
      skin.img ||
      'https://community.cloudflare.steamstatic.com/economy/image/default_placeholder.png';
    const patternHtml = skin.pattern
      ? `<span style="margin-left:8px; color:#aaa;">P:${skin.pattern}</span>`
      : '';
    const descHtml = skin.desc
      ? `<div style="font-size:0.7rem; color:#f0ad4e; margin-top:4px;">${skin.desc}</div>`
      : '';

    const cardHtml = `
      <div class="cs2-card ${rarityClass}">
        <div class="cs2-img-container">
          <img src="${imgUrl}" alt="${skin.name}" class="cs2-img">
        </div>
        <div class="cs2-info">
          <div class="cs2-weapon">${skin.weapon}</div>
          <div class="cs2-name">${skin.name}</div>
          <div class="cs2-meta">
            <span>${skin.wear}</span>
            <span>Float: ${skin.float}</span>
            ${patternHtml}
          </div>
          ${descHtml}
          <div style="margin-top: 8px; display: flex; justify-content: space-between; align-items: center;">
             <span class="cs2-price">€${skin.price}</span>
          </div>
        </div>
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
  renderCS2();
});
