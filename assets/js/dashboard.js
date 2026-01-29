// assets/js/dashboard.js

// CONFIGURAÇÃO
const FINNHUB_KEY = 'd5ttd2pr01qtjet18pb0d5ttd2pr01qtjet18pbg';

const myStocks = [
  { ticker: 'NVDA', avgPrice: 450.00, shares: 10 },
  { ticker: 'TSLA', avgPrice: 200.00, shares: 5 },
  { ticker: 'MSFT', avgPrice: 300.00, shares: 8 },
  { ticker: 'PLTR', avgPrice: 15.50, shares: 100 }
];

// FUNÇÃO CRYPTO
async function fetchCrypto() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ondo-finance,avalanche-2,cardano&vs_currencies=usd');
    const data = await response.json();
    
    if(data['ondo-finance']) document.getElementById('price-ondo').innerText = '$' + data['ondo-finance'].usd;
    if(data['avalanche-2']) document.getElementById('price-avax').innerText = '$' + data['avalanche-2'].usd;
    if(data['cardano']) document.getElementById('price-ada').innerText = '$' + data['cardano'].usd;
    
  } catch (error) {
    console.error("Erro Crypto:", error);
    const el = document.getElementById('price-ondo');
    if(el) el.innerText = "Erro API";
  }
}

// FUNÇÃO STOCKS
async function fetchStocks() {
  const tableBody = document.getElementById('stock-rows');
  if(!tableBody) return; // Proteção caso a tabela não exista
  
  tableBody.innerHTML = ''; 

  for (const stock of myStocks) {
    try {
      const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${FINNHUB_KEY}`);
      const data = await res.json();
      const currentPrice = data.c; 

      if (!currentPrice) {
         tableBody.innerHTML += `<tr><td colspan="5">Erro no Ticker ${stock.ticker}</td></tr>`;
         continue;
      }

      const plTotal = (currentPrice - stock.avgPrice) * stock.shares;
      const plPercent = ((currentPrice - stock.avgPrice) / stock.avgPrice) * 100;
      
      const colorClass = plPercent >= 0 ? 'text-green' : 'text-red';
      const sign = plPercent >= 0 ? '+' : '';

      const row = `
        <tr style="border-bottom: 1px solid #333;">
          <td><strong>${stock.ticker}</strong></td>
          <td>$${stock.avgPrice.toFixed(2)}</td>
          <td>$${currentPrice.toFixed(2)}</td>
          <td class="${colorClass}" style="text-align:right;">${sign}$${plTotal.toFixed(0)}</td>
          <td class="${colorClass}" style="text-align:right;">${sign}${plPercent.toFixed(2)}%</td>
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
