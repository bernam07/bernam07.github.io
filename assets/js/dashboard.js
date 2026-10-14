/**
 * Personal Portfolio — Real-time Stock Dashboard
 * Powered by GitHub Actions & Yahoo Finance data
 */

let allStocks = [];

async function fetchMarketData() {
  const tableBody = document.getElementById('stock-rows');
  try {
    // Cache-busting query to guarantee latest deployed data
    const url = `/assets/data/market_data.json?t=${Date.now()}`;
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not fetch market_data.json');

    const data = await response.json();
    allStocks = data.stocks || [];

    updateMetrics(allStocks, data.last_updated);
    renderStocks(allStocks);
    updateTimestamp(data.last_updated);
  } catch (error) {
    console.error('Failed to load market data:', error);
    if (tableBody) {
      tableBody.innerHTML =
        '<tr><td colspan="5" class="stock-empty"><i class="fas fa-circle-exclamation"></i> Market data temporarily unavailable.</td></tr>';
    }
  }
}

function updateMetrics(stocks, lastUpdated) {
  const countEl = document.getElementById('metric-total-count');
  const topEl = document.getElementById('metric-top-performer');
  const winEl = document.getElementById('metric-win-ratio');
  const statusEl = document.getElementById('metric-last-sync');

  if (!stocks || !stocks.length) return;

  if (countEl) {
    countEl.textContent = `${stocks.length} Positions`;
  }

  // Find top performer by pl_percent
  const sorted = [...stocks].sort((a, b) => (b.pl_percent || 0) - (a.pl_percent || 0));
  const top = sorted[0];
  if (topEl && top) {
    const cleanSym = top.symbol.replace('.L', '');
    const sign = (top.pl_percent || 0) >= 0 ? '+' : '';
    topEl.innerHTML = `<strong>${cleanSym}</strong> <span class="text-green">${sign}${top.pl_percent?.toFixed(1)}%</span>`;
  }

  // Profitable positions count
  if (winEl) {
    const winners = stocks.filter((s) => (s.pl_percent || 0) > 0).length;
    winEl.textContent = `${winners} of ${stocks.length} in profit`;
  }

  if (statusEl && lastUpdated) {
    statusEl.textContent = lastUpdated;
  }
}

function renderStocks(stocks) {
  const tableBody = document.getElementById('stock-rows');
  if (!tableBody) return;

  if (!stocks.length) {
    tableBody.innerHTML =
      '<tr><td colspan="5" class="stock-empty">No matching positions found.</td></tr>';
    return;
  }

  const fragment = document.createDocumentFragment();

  stocks.forEach((stock) => {
    const row = document.createElement('tr');
    const cleanTicker = stock.symbol.replace('.L', '').replace('.AS', '');
    const priceEur = stock.price_eur || stock.price || 0;
    const avgPrice = stock.avgPrice || 0;
    const plPercent =
      stock.pl_percent !== undefined
        ? stock.pl_percent
        : avgPrice > 0
          ? ((priceEur - avgPrice) / avgPrice) * 100
          : 0;
    const isUp = plPercent >= 0;

    // Asset Column (Ticker + Name)
    const assetCell = document.createElement('td');
    assetCell.className = 'stock-asset-col';
    assetCell.innerHTML = `
      <div class="stock-asset">
        <span class="stock-ticker">${cleanTicker}</span>
        ${stock.name ? `<span class="stock-company">${stock.name}</span>` : ''}
      </div>
    `;

    // Avg Buy Price
    const avgCell = document.createElement('td');
    avgCell.textContent = avgPrice > 0 ? `€${avgPrice.toFixed(2)}` : '—';

    // Live EUR Price
    const liveCell = document.createElement('td');
    const dayChange = stock.percent !== undefined ? stock.percent : 0;
    const dayUp = dayChange >= 0;
    liveCell.innerHTML = `
      <div class="stock-price-box">
        <span class="stock-price">€${priceEur > 0 ? priceEur.toFixed(2) : 'N/A'}</span>
        ${
          stock.percent !== undefined
            ? `<span class="stock-day ${dayUp ? 'text-green' : 'text-red'}">
                ${dayUp ? '+' : ''}${dayChange.toFixed(1)}%
              </span>`
            : ''
        }
      </div>
    `;

    // P/L Pill Badge
    const plCell = document.createElement('td');
    plCell.className = 'stock-pl-col';
    if (priceEur > 0 && avgPrice > 0) {
      plCell.innerHTML = `
        <span class="pl-pill ${isUp ? 'pl-pill--up' : 'pl-pill--down'}">
          <i class="fas ${isUp ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}"></i>
          ${isUp ? '+' : ''}${plPercent.toFixed(1)}%
        </span>
      `;
    } else {
      plCell.innerHTML = '<span class="pl-pill">—</span>';
    }

    row.append(assetCell, avgCell, liveCell, plCell);
    fragment.appendChild(row);
  });

  tableBody.replaceChildren(fragment);
}

function updateTimestamp(lastUpdated) {
  const note = document.getElementById('dash-updated');
  if (note && lastUpdated) {
    note.innerHTML = `
      <span class="sync-indicator"><span class="sync-pulse"></span> Data fetched via Yahoo Finance API</span>
      <span class="sync-time">Last update: <strong>${lastUpdated}</strong></span>
    `;
  }
}

// Live Search Filter
function setupSearchFilter() {
  const searchInput = document.getElementById('dash-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      renderStocks(allStocks);
      return;
    }

    const filtered = allStocks.filter((s) => {
      const sym = (s.symbol || '').toLowerCase();
      const name = (s.name || '').toLowerCase();
      return sym.includes(query) || name.includes(query);
    });

    renderStocks(filtered);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupSearchFilter();
  fetchMarketData();
});
