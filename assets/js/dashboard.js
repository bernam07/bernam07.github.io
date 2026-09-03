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
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const parsed = JSON.parse(cached);
    if (Date.now() - parsed.timestamp > CACHE_DURATION) return null;
    return parsed.data;
  } catch (e) {
    return null;
  }
}

function setCachedData(key, data) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({ timestamp: Date.now(), data: data }),
    );
  } catch (e) {
    /* storage may be unavailable (private mode) — ignore */
  }
}

// We still need the FX rates to convert USD and GBP holdings into EUR.
async function getExchangeRates() {
  const cached = getCachedData('rates');
  if (cached) return cached;

  const rates = { usdToEur: 0.95, gbpToEur: 1.19 };
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=tether,british-pound-sterling&vs_currencies=eur',
    );
    if (response.ok) {
      const data = await response.json();
      if (data.tether?.eur) rates.usdToEur = data.tether.eur;
      if (data['british-pound-sterling']?.eur) {
        rates.gbpToEur = data['british-pound-sterling'].eur;
      }
      setCachedData('rates', rates);
    }
  } catch (e) {
    console.error('Failed to load exchange rates:', e);
  }
  return rates;
}

async function fetchMarketData(rates) {
  const tableBody = document.getElementById('stock-rows');
  try {
    const response = await fetch('/assets/data/market_data.json');
    if (!response.ok) throw new Error('Data not found');
    const data = await response.json();

    updateStocksUI(data.stocks, rates);
    updateTimestamp(data.last_updated);
  } catch (error) {
    console.error('Failed to load market_data.json:', error);
    if (tableBody) {
      tableBody.innerHTML =
        '<tr><td colspan="4" class="stock-empty">Market data is currently unavailable.</td></tr>';
    }
  }
}

function priceToEur(ticker, price, rates) {
  if (ticker.includes('.L')) {
    // London-listed prices come in pence (GBX); normalise to GBP first.
    if (price > 1000) price = price / 100;
    return price * rates.gbpToEur;
  }
  return price * rates.usdToEur;
}

function updateStocksUI(stockData, rates) {
  const tableBody = document.getElementById('stock-rows');
  if (!tableBody) return;

  const fragment = document.createDocumentFragment();

  for (const myStock of myStocks) {
    const apiData = stockData.find((s) => s.symbol === myStock.ticker);
    const currentPriceEur = apiData
      ? priceToEur(myStock.ticker, apiData.price, rates)
      : null;

    const cleanTicker = myStock.ticker.replace('.L', '').replace('.AS', '');
    const row = document.createElement('tr');

    const tickerCell = document.createElement('td');
    tickerCell.innerHTML = `<strong>${cleanTicker}</strong>`;

    const avgCell = document.createElement('td');
    avgCell.textContent = `€${myStock.avgPrice.toFixed(2)}`;

    const liveCell = document.createElement('td');
    liveCell.textContent = currentPriceEur
      ? `€${currentPriceEur.toFixed(2)}`
      : 'N/A';

    const plCell = document.createElement('td');
    plCell.className = 'pl-cell';
    if (currentPriceEur) {
      const percent =
        ((currentPriceEur - myStock.avgPrice) / myStock.avgPrice) * 100;
      const up = percent >= 0;
      plCell.classList.add(up ? 'text-green' : 'text-red');
      plCell.textContent = `${up ? '+' : ''}${percent.toFixed(1)}%`;
    } else {
      plCell.textContent = '—';
    }

    row.append(tickerCell, avgCell, liveCell, plCell);
    fragment.appendChild(row);
  }

  tableBody.replaceChildren(fragment);
}

function updateTimestamp(lastUpdated) {
  const note = document.getElementById('dash-updated');
  if (note && lastUpdated) {
    note.textContent = `Auto-updated via the Yahoo Finance API · Last sync: ${lastUpdated}`;
  }
}

let loaded = false;
document.addEventListener('DOMContentLoaded', async () => {
  if (loaded) return;
  loaded = true;

  const rates = await getExchangeRates();
  await fetchMarketData(rates);
});
