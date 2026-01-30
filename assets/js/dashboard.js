// assets/js/dashboard.js

// CONFIGURAÇÃO
const FINNHUB_KEY = 'd5ttd2pr01qtjet18pb0d5ttd2pr01qtjet18pbg';

// Ações (Avg Price em EUROS)
const myStocks = [
  // VUSA.L (Londres) -> O código vai converter de GBP para EUR
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

// 1. Obter Taxas de Câmbio (USD->EUR e GBP->EUR)
async function getExchangeRates() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether,british-pound-sterling&vs_currencies=eur');
    const data = await response.json();
    return {
      usdToEur: data.tether.eur, // Ex: 0.92
      gbpToEur: 1.18 // Valor fixo de segurança caso a API de forex falhe, ou ajusta aqui
    };
    // Nota: A CoinGecko tem 'british-pound-sterling' mas às vezes falha.
    // Se quiseres ser mais preciso, usamos um valor fixo aproximado ou outra API, 
    // mas para já vamos tentar assumir um valor de mercado comum se a API falhar.
  } catch (error) {
    console.error("Erro câmbio, usando fallbacks");
    return { usdToEur: 0.92, gbpToEur: 1.18 };
  }
}

// 2. CRYPTO
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

// 3. STOCKS
async function fetchStocks() {
  const tableBody = document.getElementById('stock-rows');
  if(!tableBody) return;
  tableBody.innerHTML = ''; 

  const rates = await getExchangeRates();
  // Se a API de forex falhar, forçamos um valor atualizado manualmente para GBP
  // Atualmente 1 GBP ~= 1.19 EUR
  if(!rates.gbpToEur) rates.gbpToEur = 1.19; 

  for (const stock of myStocks) {
    try {
      const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${FINNHUB_KEY}`);
      const data = await res.json();
      let currentPrice = data.c;

      if (!currentPrice) {
         tableBody.innerHTML += `<tr><td colspan="4" style="color: orange">Erro ${stock.ticker}</td></tr>`;
         continue;
      }

      // --- LÓGICA DE CONVERSÃO ---
      
      // CASO 1: VUSA.L (Londres) -> Geralmente vem em GBP
      if (stock.ticker === 'VUSA.L') {
        // Conversão GBP -> EUR
        currentPrice = currentPrice * rates.gbpToEur;
      } 
      // CASO 2: Stocks Americanas (Sem ponto) -> USD
      else if (!stock.ticker.includes('.')) {
        // Conversão USD -> EUR
        currentPrice = currentPrice * rates.usdToEur;
      }
      // Outros casos assumimos que já é EUR (ex: .AS, .LS)

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
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchCrypto();
  fetchStocks();
});
