// assets/js/dashboard.js

// CONFIGURAÇÃO
const FINNHUB_KEY = 'd5ttd2pr01qtjet18pb0d5ttd2pr01qtjet18pbg';

// Ações (Avg Price em EUROS)
const myStocks = [
  // VUSA.L vai ser tratado de forma especial via Yahoo Finance
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

// Crypto (Avg Price em EUROS)
const myCrypto = [
  { id: 'ondo-finance', symbol: 'ONDO', avgPrice: 0.799, holdings: 1278.461 },
  { id: 'avalanche-2', symbol: 'AVAX', avgPrice: 11.76, holdings: 7.237 },
  { id: 'cardano', symbol: 'ADA', avgPrice: 0.337, holdings: 148.181 }
];

// --- 1. OBTER TAXAS DE CÂMBIO ---
async function getExchangeRates() {
  try {
    // Vamos buscar a taxa USD/EUR e GBP/EUR
    // Usamos Tether como USD proxy e GBP direta
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether,british-pound-sterling&vs_currencies=eur');
    const data = await response.json();
    return {
      usdToEur: data.tether.eur, 
      gbpToEur: data['british-pound-sterling'].eur
    };
  } catch (error) {
    console.error("Erro câmbio (usando fallbacks):", error);
    return { usdToEur: 0.92, gbpToEur: 1.19 };
  }
}

// --- 2. FUNÇÃO ESPECIAL PARA YAHOO FINANCE (Para o VUSA) ---
async function fetchYahooPrice(ticker) {
  try {
    // Usamos um proxy (corsproxy.io) para o GitHub Pages conseguir ler dados do Yahoo
    const proxyUrl = 'https://corsproxy.io/?';
    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d`;
    
    const response = await fetch(proxyUrl + encodeURIComponent(yahooUrl));
    const data = await response.json();
    
    // O Yahoo devolve o preço no meta data do gráfico
    let price = data.chart.result[0].meta.regularMarketPrice;
    const currency = data.chart.result[0].meta.currency;

    // O VUSA.L em Londres muitas vezes vem em "Pence" (GBp) em vez de Pounds (GBP)
    // Se o preço for > 500 (ex: 9500), assumimos que são centimos e dividimos por 100
    if (currency === 'GBP' && price > 2000) { 
        price = price / 100; 
    }
    // Se vier explicitamente como GBp (pence)
    if (currency === 'GBp') {
        price = price / 100;
    }

    return price;
  } catch (error) {
    console.error(`Erro Yahoo para ${ticker}:`, error);
    return null;
  }
}

// --- 3. CRYPTO ---
async function fetchCrypto() {
  try {
    const ids = myCrypto.map(c => c.id).join(',');
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=eur`);
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
  } catch (error) { console.error("Erro Crypto:", error); }
}

// --- 4. STOCKS (LÓGICA HÍBRIDA) ---
async function fetchStocks() {
  const tableBody = document.getElementById('stock-rows');
  if(!tableBody) return;
  tableBody.innerHTML = ''; 

  const rates = await getExchangeRates();
  console.log("Taxas: USD->EUR:", rates.usdToEur, "GBP->EUR:", rates.gbpToEur);

  for (const stock of myStocks) {
    let currentPrice = null;
    let usedSource = 'Finnhub';

    try {
      // --- DECISÃO DA FONTE ---
      
      // CASO ESPECIAL: VUSA.L (Vai ao Yahoo via Proxy)
      if (stock.ticker === 'VUSA.L') {
        usedSource = 'Yahoo';
        const rawPrice = await fetchYahooPrice(stock.ticker);
        if (rawPrice) {
          // Yahoo devolve em Libras, convertemos para Euros
          currentPrice = rawPrice * rates.gbpToEur;
        }
      } 
      // RESTO: Stocks Americanas (Vai à Finnhub)
      else {
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${FINNHUB_KEY}`);
        const data = await res.json();
        
        // Se a Finnhub der erro 403 ou devolver 0
        if (data.error || !data.c) {
           throw new Error(data.error || "Sem dados");
        }
        
        // Converter USD para EUR
        currentPrice = data.c * rates.usdToEur;
      }

      // --- CÁLCULOS E RENDER ---
      
      if (!currentPrice) {
         tableBody.innerHTML += `<tr><td colspan="4" style="color: orange">Erro ${stock.ticker} (Fonte: ${usedSource})</td></tr>`;
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
          <td class="${colorClass}" style="text-align:right; font-weight:bold;">
             ${sign}${plPercent.toFixed(1)}%
          </td>
        </tr>`;
        
      tableBody.innerHTML += row;

    } catch (err) { 
      console.error(`Erro ${stock.ticker}:`, err);
      tableBody.innerHTML += `<tr><td colspan="4" style="color: red; font-size: 0.8em;">${stock.ticker}: Acesso Negado (API)</td></tr>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchCrypto();
  fetchStocks();
});
