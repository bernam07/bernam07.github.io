const CACHE_DURATION = 1000 * 60 * 15;

const myStocks = [
  { ticker: 'VUSA.L', avgPrice: 102.25 },
  { ticker: 'NVDA', avgPrice: 117.62 },
  { ticker: 'PLTR', avgPrice: 41.76 },
  { ticker: 'NVO', avgPrice: 61.9 },
  { ticker: 'SOFI', avgPrice: 14.35 },
  { ticker: 'META', avgPrice: 529.08 },
  { ticker: 'AMZN', avgPrice: 178.7 },
  { ticker: 'O', avgPrice: 50.51 },
  { ticker: 'ORCL', avgPrice: 158.16 },
];

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
    JSON.stringify({ timestamp: Date.now(), data: data }),
  );
}

// Continuamos a precisar das taxas para converter USD e GBP para EUR
async function getExchangeRates() {
  const cached = getCachedData('rates');
  if (cached) return cached;

  let rates = { usdToEur: 0.95, gbpToEur: 1.19 };
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=tether,british-pound-sterling&vs_currencies=eur',
    );
    if (response.ok) {
      const data = await response.json();
      if (data.tether?.eur) rates.usdToEur = data.tether.eur;
      if (data['british-pound-sterling']?.eur)
        rates.gbpToEur = data['british-pound-sterling'].eur;
      setCachedData('rates', rates);
    }
  } catch (e) {
    console.error('Erro a carregar taxas de câmbio:', e);
  }
  return rates;
}

async function fetchMarketData(rates) {
  try {
    const response = await fetch('/assets/data/market_data.json');
    if (!response.ok) throw new Error('Data not found');
    const data = await response.json();

    updateStocksUI(data.stocks, rates);

    if (data.last_updated) {
      console.log('Dados atualizados em:', data.last_updated);
    }
  } catch (error) {
    console.error('Erro a carregar market_data.json:', error);
  }
}

function updateStocksUI(stockData, rates) {
  const tableBody = document.getElementById('stock-rows');
  if (!tableBody) return;
  tableBody.innerHTML = '';

  for (const myStock of myStocks) {
    const apiData = stockData.find((s) => s.symbol === myStock.ticker);
    let currentPriceEur = null;

    if (apiData) {
      let price = apiData.price;

      if (myStock.ticker.includes('.L')) {
        if (price > 1000) price = price / 100; // Converte GBX para GBP
        currentPriceEur = price * rates.gbpToEur;
      } else {
        currentPriceEur = price * rates.usdToEur;
      }
    } else if (myStock.fallbackPrice) {
      currentPriceEur = myStock.fallbackPrice;
    }

    const cleanTicker = myStock.ticker.replace('.L', '').replace('.AS', '');
    const priceDisplay = currentPriceEur
      ? `€${currentPriceEur.toFixed(2)}`
      : 'N/A';

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

let loaded = false;
document.addEventListener('DOMContentLoaded', async () => {
  if (loaded) return;
  loaded = true;

  const rates = await getExchangeRates();
  await fetchMarketData(rates);
});
