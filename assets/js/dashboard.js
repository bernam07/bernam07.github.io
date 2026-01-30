// assets/js/dashboard.js

// CONFIGURAÇÃO
const FINNHUB_KEY = 'd5ttd2pr01qtjet18pb0d5ttd2pr01qtjet18pbg';

// Ações (Avg Price em EUROS)
const myStocks = [
  { ticker: 'VUSA.AS', avgPrice: 100.9381, shares: 15.288 }, // Vanguard S&P 500
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
// IDs da CoinGecko: ondo-finance, avalanche-2, cardano
const myCrypto = [
  { id: 'ondo-finance', symbol: 'ONDO', avgPrice: 0.799, holdings: 1278.461 },
  { id: 'avalanche-2', symbol: 'AVAX', avgPrice: 11.76, holdings: 7.237 },
  { id: 'cardano', symbol: 'ADA', avgPrice: 0.337, holdings: 148.181 }
];

// FUNÇÃO: Obter Taxa de Câmbio USD -> EUR
// Usamos o Tether (USDT) como proxy para o Dólar, pois vale sempre ~$1 USD.
async function getUsdToEurRate() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=eur');
    const data = await response.json();
    return data.tether.eur; // Ex: 0.92 (1 USD = 0.92 EUR)
  } catch (error) {
    console.error("Erro ao obter cambio USD/EUR, assumindo 0.92", error);
    return 0.92; // Fallback se a API falhar
  }
}

// FUNÇÃO CRYPTO
async function fetchCrypto() {
  try {
    const ids = myCrypto.map(c => c.id).join(',');
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=eur`);
    const data = await response.json();
    
    // Atualizar HTML
    myCrypto.forEach(coin => {
      const priceEl = document.getElementById(`price-${coin.symbol.toLowerCase()}`);
      if (priceEl && data[coin.id]) {
        const currentPrice = data[coin.id].eur;
        
        // Calcular P/L %
        const plPercent = ((currentPrice - coin.avgPrice) / coin.avgPrice) * 100;
        const colorClass = plPercent >= 0 ? 'text-green' : 'text-red';
        const sign = plPercent >= 0 ? '+' : '';

        // Mostrar: Preço Atual (€) | P/L %
        priceEl.innerHTML = `€${currentPrice.toFixed(2)} <span class="${colorClass}" style="font-size: 0.8em; margin-left: 5px;">(${sign}${plPercent.toFixed(1)}%)</span>`;
      }
    });
    
  } catch (error) {
    console.error("Erro Crypto:", error);
  }
}

// FUNÇÃO STOCKS
async function fetchStocks() {
  const tableBody = document.getElementById('stock-rows');
  if(!tableBody) return;
  
  tableBody.innerHTML = ''; 

  // 1. Obter taxa de câmbio para converter ações americanas
  const usdToEur = await getUsdToEurRate();
  console.log("Taxa USD->EUR aplicada:", usdToEur);

  for (const stock of myStocks) {
    try {
      const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${FINNHUB_KEY}`);
      const data = await res.json();
      let currentPrice = data.c; // Preço na moeda da bolsa

      if (!currentPrice) {
         tableBody.innerHTML += `<tr><td colspan="5">Erro ${stock.ticker}</td></tr>`;
         continue;
      }

      // Detetar moeda e converter para EUR se necessário
      // VUSA.AS é em EUR. As outras (sem ponto ou .US) são em USD.
      let currencySymbol = '€';
      if (!stock.ticker.includes('.')) {
        // Assumimos Stocks US -> Converter USD para EUR
        currentPrice = currentPrice * usdToEur;
      }

      // Cálculos (Tudo em EUR agora)
      const plPercent = ((currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
      
      const colorClass = plPercent >= 0 ? 'text-green' : 'text-red';
      const sign = plPercent >= 0 ? '+' : '';

      // Renderizar Linha (Sem coluna de P/L $)
      const row = `
        <tr style="border-bottom: 1px solid #333;">
          <td><strong>${stock.ticker.replace('.AS', '')}</strong></td>
          <td>€${stock.avgPrice.toFixed(2)}</td>
          <td>€${currentPrice.toFixed(2)}</td>
          <td class="${colorClass}" style="text-align:right; font-weight:bold;">
             ${sign}${plPercent.toFixed(1)}%
          </td>
        </tr>`;
        
      tableBody.innerHTML += row;

    } catch (err) {
      console.error(`Erro Stock ${stock.ticker}:`, err);
    }
  }
}

// EXECUTAR
document.addEventListener('DOMContentLoaded', () => {
  fetchCrypto();
  fetchStocks();
});
