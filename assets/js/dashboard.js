// assets/js/dashboard.js

// CONFIGURAÇÃO
const FINNHUB_KEY = 'd5ttd2pr01qtjet18pb0d5ttd2pr01qtjet18pbg';

// Ações (Avg Price em EUROS)
const myStocks = [
  // VUSA.L tratado via Yahoo + Proxy Alternativo
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

// --- 1. TAXAS DE CÂMBIO (BLINDADA) ---
async function getExchangeRates() {
  // Valores de fallback (segurança) caso a API falhe
  let rates = { usdToEur: 0.95, gbpToEur: 1.19 };

  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether,british-pound-sterling&vs_currencies=eur');
    
    if (!response.ok) throw new Error("CoinGecko Error");
    
    const data = await response.json();

    // Verificação defensiva: só atualiza se os dados existirem
    if (data.tether && data.tether.eur) {
      rates.usdToEur = data.tether.eur;
    }
    if (data['british-pound-sterling'] && data['british-pound-sterling'].eur) {
      rates.gbpToEur = data['british-pound-sterling'].eur;
    }

  } catch (error) {
    console.warn("Aviso: Falha no câmbio online. Usando valores fixos.", error);
    // Não fazemos 'throw', apenas retornamos os valores fixos para o site não parar
  }
  
  return rates;
}

// --- 2. YAHOO FINANCE (NOVO PROXY: AllOrigins) ---
async function fetchYahooPrice(ticker) {
  try {
    // Adicionamos timestamp para evitar cache
    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d`;
    // Usamos allorigins.win que retorna JSON dentro de 'contents'
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(yahooUrl)}&timestamp=${new Date().getTime()}`;
    
    const response = await fetch(proxyUrl);
    const wrapper = await response.json();
    
    // O allorigins devolve os dados numa string dentro de .contents
    if (!wrapper.contents) throw new Error("Proxy vazio");
    
    const data = JSON.parse(wrapper.contents);
    
    if (!data.chart || !data.chart.result) throw new Error("Yahoo sem dados");

    const meta = data.chart.result[0].meta;
    let price = meta.regularMarketPrice;
    const currency = meta.currency;

    // Correção Pence (GBp) -> Pounds (GBP)
    // Se a moeda for GBp OU se o preço for absurdamente alto (> 2000), divide por 100
    if (currency === 'GBp' || (ticker.includes('.L') && price > 2000)) { 
        price = price / 100; 
    }

    return price;
  } catch (error) {
    console.error(`Erro Yahoo (${ticker}):`, error);
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

// --- 4. STOCKS ---
async function fetchStocks() {
  const tableBody = document.getElementById('stock-rows');
  if(!tableBody) return;
  tableBody.innerHTML = ''; 

  const rates = await getExchangeRates();
  console.log("Taxas aplicadas:", rates);

  for (const stock of myStocks) {
    let currentPrice = null;

    try {
      // --- DECISÃO DA FONTE ---
      
      // CASO ESPECIAL: VUSA.L (Yahoo + AllOrigins)
      if (stock.ticker === 'VUSA.L') {
        const rawPrice = await fetchYahooPrice(stock.ticker);
        if (rawPrice) {
          currentPrice = rawPrice * rates.gbpToEur; // GBP -> EUR
        }
      } 
      // RESTO: Stocks Americanas (Finnhub)
      else {
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${FINNHUB_KEY}`);
        const data = await res.json();
        
        if (data.c) {
          currentPrice = data.c * rates.usdToEur; // USD -> EUR
        }
      }

      // --- RENDER ---
      
      if (!currentPrice) {
         // Se falhar tudo, mostra linha de erro mas continua o loop
         const cleanTicker = stock.ticker.replace('.L', '').replace('.AS', '');
         tableBody.innerHTML += `<tr><td colspan="4" style="color: orange; font-size:0.8rem;">⚠️ ${cleanTicker}: Erro API</td></tr>`;
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
      console.error(`Erro fatal no loop ${stock.ticker}:`, err);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchCrypto();
  fetchStocks();
});
