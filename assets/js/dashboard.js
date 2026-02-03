// assets/js/dashboard.js

// CONFIGURAÇÃO
const WORKER_URL = 'https://justtcg-proxy.bernamartins07.workers.dev';
const CACHE_DURATION = 1000 * 60 * 15; // 15 Minutos

// --- 1. PORTFOLIO DE STOCKS ---
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

// --- 2. PORTFOLIO DE CRYPTO ---
const myCrypto = [
  { id: 'ondo-finance', symbol: 'ONDO', avgPrice: 0.799, holdings: 1278.461 },
  { id: 'avalanche-2', symbol: 'AVAX', avgPrice: 11.76, holdings: 7.237 },
  { id: 'cardano', symbol: 'ADA', avgPrice: 0.337, holdings: 148.181 },
];

// --- 3. POKEMON CARDS ---
const myCards = [
  { name: 'Pikachu with Grey Felt Hat', grade: 'PSA 9', manualImg: 'https://images.pokemontcg.io/svp/85_hires.png', tcgId: '518861' },
  { name: 'Mew ex (sv4a #347)', grade: 'PSA 10', manualImg: 'https://storage.googleapis.com/images.pricecharting.com/3re7lj6h6aqxecm4/1600.jpg', tcgId: '534919' },
  { name: 'Pikachu (sm11b #054)', grade: 'CCC 9', manualImg: 'https://tcgplayer-cdn.tcgplayer.com/product/574914_in_1000x1000.jpg', tcgId: '201352' },
  { name: "Team Rocket's Nidoking", grade: 'Ungraded', manualImg: 'https://assets.pokemon.com/static-assets/content-assets/cms2/img/cards/web/SV10/SV10_EN_233.png', tcgId: '633033' },
  { name: 'Leafeon VSTAR (s12a #210)', grade: 'PSA 10', manualImg: 'https://den-cards.pokellector.com/357/Leafeon-VSTAR.S12A.210.45960.png', tcgId: '477060' },
  { name: 'Charizard V (s12a #211)', grade: 'CGC 9.5', manualImg: 'https://storage.googleapis.com/images.pricecharting.com/cqvwd3dhpbt4giji/1600.jpg', tcgId: '285384' },
  { name: 'Iono', grade: 'PSA 9', manualImg: 'https://images.pokemontcg.io/sv4pt5/237_hires.png', tcgId: '535101' },
  { name: "N's Zoroark EX (sv9 #127)", grade: 'Ungraded', manualImg: 'https://tcgplayer-cdn.tcgplayer.com/product/615003_in_600x600.jpg', tcgId: '623612' },
];

// --- 4. CS2 INVENTORY ---
const mySkins = [
  { weapon: '★ Huntsman Knife', name: 'Gamma Doppler (Emerald)', wear: 'FN', float: '0.0091', pattern: '991', price: 700, rarity: 'knife', img: 'https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SA1iVzOtkse1tcCSyhx8rtjSfn4vGLSLANkI-A5d0Q7EI4BPqwdHlNe3m4Q3Zj4IQnn6s2ilJ6y5i5r4AU_cg-qaBiBaBb-MAj17m6g/330x192?allow_animated=1' },
  { weapon: '★ Flip Knife', name: 'Doppler (Phase 1)', wear: 'FN', float: '0.0071', pattern: '429', price: 300, rarity: 'knife', img: 'https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d4_u-V6VgH_ScHnecxPxJoOloXCziqhEutDWR1Nf6JHmfPw4kDsQkEeBbtRTsw9CyMu_nslPeg4wRmH2qhy9K7nxp4ukcEf1yIYwwFPU/330x192?allow_animated=1' },
  { weapon: '★ Broken Fang Gloves', name: 'Unhinged', wear: 'FT', float: '0.1664', price: 80, rarity: 'knife', img: 'https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YoDOEkYrqKiLJAVR8W8ErKrpf5kn9z8rgNeu37gbf3Y5Hziv4j3gbvyxo47pQBfVzq6feiVvBMeU8tJEGJvmvU13QD-pmf_lF/330x192?allow_animated=1' },
  { weapon: '★ Specialist Gloves', name: 'Lt. Commander', wear: 'FT', float: '0.1820', price: 180, rarity: 'knife', img: 'https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJouhqRDqygiIksjCKpYL8JSLSMxggC5NxELMD5ES5xtznZeOzsVPZjdlGyCv-3Cgc7ixi4uhQVqdz8vWBkUifZmiWDZ2w/330x192?allow_animated=1' },
  { weapon: 'M4A1-S (Souvenir)', name: 'Master Piece', wear: 'FT', float: '0.200', price: 250, rarity: 'classified', desc: 'DreamEaters vs G2 (Shox Gold)', img: 'https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL87o956RiW2mx4ijDCAnobsLGWUOwUoCMN2RrUL5hHrxN3gZu7ltFeM3dkUmy__jS1A7i9o6rxTV_Ys5OSJ2LuWmDvh/330x192?allow_animated=1' },
  { weapon: 'AK-47', name: 'B the Monster', wear: 'FT', float: '0.1512', price: 350, rarity: 'covert', img: 'https://community.fastly.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0P24bbZ9IeOAMWqfz_1itfNWTiLnwiIqtjmMj4K3IC-Xb1d2WZUmEbMN4xDrmoDlPujktgONjY1HmH_4jCJJ7C454LsHAL1lpPMPrvuW_g/330x192?allow_animated=1' },
];

// --- HELPERS ---
function getCachedData(key) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  const parsed = JSON.parse(cached);
  if (Date.now() - parsed.timestamp > CACHE_DURATION) return null;
  return parsed.data;
}
function setCachedData(key, data) {
  localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data: data }));
}

// --- 1. RATES (Mantido local para converter USD -> EUR) ---
async function getExchangeRates() {
  const cached = getCachedData('rates');
  if (cached) return cached;
  let rates = { usdToEur: 0.95, gbpToEur: 1.19 };
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether,british-pound-sterling&vs_currencies=eur');
    if (response.ok) {
      const data = await response.json();
      if (data.tether?.eur) rates.usdToEur = data.tether.eur;
      if (data['british-pound-sterling']?.eur) rates.gbpToEur = data['british-pound-sterling'].eur;
      setCachedData('rates', rates);
    }
  } catch (e) {}
  return rates;
}

async function fetchMarketData(rates) {
  try {
    // Tenta carregar o ficheiro gerado pelo Python
    const response = await fetch('/assets/data/market_data.json');
    if (!response.ok) throw new Error('Dados não encontrados');
    const data = await response.json();

    // Atualizar Stocks
    updateStocksUI(data.stocks, rates);
    
    // Atualizar Crypto
    updateCryptoUI(data.crypto, rates);

    // Atualizar Timestamp (Opcional)
    if(data.last_updated) {
       console.log("Dados atualizados em:", data.last_updated);
    }

  } catch (error) {
    console.error("Erro ao carregar market_data.json:", error);
  }
}

// --- RENDER STOCKS (Com dados do JSON) ---
function updateStocksUI(stockData, rates) {
  const tableBody = document.getElementById('stock-rows');
  if (!tableBody) return;
  tableBody.innerHTML = '';

  for (const myStock of myStocks) {
    // Procura o stock correspondente no JSON
    const apiData = stockData.find(s => s.symbol === myStock.ticker);
    
    let currentPriceEur = null;

    if (apiData) {
      let price = apiData.price;
      
      if (myStock.ticker.includes('.L')) {
        // Converter Pence para Libras se necessário
        if (price > 1000) price = price / 100;
        currentPriceEur = price * rates.gbpToEur;
      } else {
        // Stocks US vêm em Dólares
        currentPriceEur = price * rates.usdToEur;
      }
    } else if (myStock.fallbackPrice) {
        currentPriceEur = myStock.fallbackPrice;
    }

    const cleanTicker = myStock.ticker.replace('.L', '').replace('.AS', '');
    const priceDisplay = currentPriceEur ? `€${currentPriceEur.toFixed(2)}` : 'N/A';
    
    // Calcular Variação
    let plCell = '<td style="text-align:right">-</td>';
    if (currentPriceEur) {
        const diff = currentPriceEur - myStock.avgPrice;
        const percent = (diff / myStock.avgPrice) * 100;
        const colorClass = diff >= 0 ? 'text-green' : 'text-red';
        const sign = diff >= 0 ? '+' : '';
        plCell = `<td class="${colorClass}" style="text-align:right; font-weight:bold;">${sign}${percent.toFixed(1)}%</td>`;
    }

    tableBody.innerHTML += `
      <tr style="border-bottom: 1px solid #333;">
        <td><strong>${cleanTicker}</strong></td>
        <td>€${myStock.avgPrice.toFixed(2)}</td>
        <td>${priceDisplay}</td>
        ${plCell}
      </tr>`;
  }
}

// --- RENDER CRYPTO ---
function updateCryptoUI(cryptoData, rates) {
  myCrypto.forEach((coin) => {
    const priceEl = document.getElementById(`price-${coin.symbol.toLowerCase()}`);
    if (!priceEl) return;

    // Procura a coin no JSON
    const apiData = cryptoData.find(c => c.id === coin.id);

    if (apiData) {
      // O Python guarda o preço em USD, convertemos para EUR
      const currentPriceEur = apiData.price * rates.usdToEur;
      
      const diff = currentPriceEur - coin.avgPrice;
      const percent = (diff / coin.avgPrice) * 100;
      const colorClass = diff >= 0 ? 'text-green' : 'text-red';
      const sign = diff >= 0 ? '+' : '';

      priceEl.innerHTML = `€${currentPriceEur.toFixed(2)} <span class="${colorClass}" style="font-size: 0.8em;">(${sign}${percent.toFixed(1)}%)</span>`;
    } else {
      priceEl.innerText = 'N/A';
    }
  });
}

// --- 4. POKEMON ---
async function fetchPokemon(rates) {
  const container = document.getElementById('poke-container');
  if (!container) return;
  container.innerHTML = '';

  myCards.forEach((card, index) => {
    container.innerHTML += `
      <div id="card-${index}" class="poke-card" style="position: relative; display: inline-block;">
        <div style="position: absolute; top: -10px; right: -10px; background: ${
          card.grade.includes('10') || card.grade.includes('9.5') ? '#d4af37' : card.grade.includes('9') ? '#c0c0c0' : '#555'
        }; color: white; padding: 4px 8px; border-radius: 12px; font-weight: bold; font-size: 0.8rem; box-shadow: 0 2px 4px rgba(0,0,0,0.5); z-index: 10;">${card.grade}</div>
        <a href="${card.manualImg}" target="_blank"><img src="${card.manualImg}" alt="${card.name}" style="border-radius: 10px; width: 100%;"></a>
        <center><small style="opacity: 0.9; font-weight: bold; margin-top: 5px; display: block; min-height: 40px;">${card.name}</small><small id="price-${index}" style="opacity: 0.6; font-size: 0.75rem;">Loading...</small></center>
      </div>`;
  });

  const cacheKey = 'justtcg_worker_prices';
  let batchData = getCachedData(cacheKey);

  if (!batchData) {
    try {
      if (WORKER_URL.includes('SEU-NOME')) { console.warn('Define o WORKER_URL!'); return; }
      const requestBody = myCards.filter((c) => c.tcgId).map((c) => ({ tcgplayerId: c.tcgId }));
      const response = await fetch(WORKER_URL, { method: 'POST', body: JSON.stringify(requestBody) });
      if (response.ok) {
        const result = await response.json();
        if (result && result.data) {
          batchData = result.data;
          setCachedData(cacheKey, batchData);
        }
      }
    } catch (e) { console.log('Erro Worker', e); }
  }

  myCards.forEach((card, index) => {
    const priceEl = document.getElementById(`price-${index}`);
    if (!batchData) { priceEl.innerText = 'N/A'; return; }
    const apiCard = batchData.find((c) => c.tcgplayerId === card.tcgId);
    let finalPrice = 0;
    if (apiCard && apiCard.variants) {
      const bestVariant = apiCard.variants.find((v) => v.condition === 'Near Mint' && (v.printing === 'Holofoil' || v.printing === 'Normal')) || apiCard.variants[0];
      if (bestVariant && bestVariant.price) finalPrice = bestVariant.price * rates.usdToEur;
    }
    priceEl.innerText = finalPrice > 0 ? `Est: €${finalPrice.toFixed(2)}` : 'N/A';
  });
}

// --- 5. CS2 ---
function renderCS2() {
  const container = document.getElementById('cs2-container');
  if (!container) return;
  container.innerHTML = '';
  for (const skin of mySkins) {
    const rarityClass = `rarity-${skin.rarity || 'restricted'}`;
    const imgUrl = skin.img || 'https://community.cloudflare.steamstatic.com/economy/image/default_placeholder.png';
    const patternHtml = skin.pattern ? `<span style="margin-left:8px; color:#aaa;">P:${skin.pattern}</span>` : '';
    const descHtml = skin.desc ? `<div style="font-size:0.7rem; color:#f0ad4e; margin-top:4px;">${skin.desc}</div>` : '';
    container.innerHTML += `
      <div class="cs2-card ${rarityClass}">
        <div class="cs2-img-container"><img src="${imgUrl}" alt="${skin.name}" class="cs2-img" onerror="this.style.display='none'"></div>
        <div class="cs2-info">
          <div class="cs2-weapon">${skin.weapon}</div>
          <div class="cs2-name">${skin.name}</div>
          <div class="cs2-meta"><span>${skin.wear}</span><span>Float: ${skin.float}</span>${patternHtml}</div>
          ${descHtml}
          <div style="margin-top: 8px; display: flex; justify-content: space-between; align-items: center;"><span class="cs2-price">€${skin.price}</span></div>
        </div>
      </div>`;
  }
}

// --- ARRANQUE ---
let loaded = false;
document.addEventListener('DOMContentLoaded', async () => {
  if (loaded) return;
  loaded = true;
  
  // 1. Vai buscar taxas de câmbio (USD->EUR)
  const rates = await getExchangeRates();
  
  // 2. Vai buscar os dados de Mercado (Stocks/Crypto) do ficheiro JSON
  await fetchMarketData(rates);
  
  // 3. Renderiza o resto
  fetchPokemon(rates);
  renderCS2();
});
