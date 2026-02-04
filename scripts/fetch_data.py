import requests
import json
import os
import yfinance as yf
from datetime import datetime

STOCKS = ['VUSA.L', 'NVDA', 'PLTR', 'NVO', 'SOFI', 'META', 'AMZN', 'O', 'ORCL']
CRYPTOS = ['ondo-finance', 'avalanche-2', 'cardano']

def get_stock_data():
    results = []
    print("A obter dados das ações via Yahoo Finance...")
    
    for symbol in STOCKS:
        try:
            ticker = yf.Ticker(symbol)
            price = ticker.fast_info.last_price
            prev_close = ticker.fast_info.previous_close
            
            if prev_close and prev_close > 0:
                percent = ((price - prev_close) / prev_close) * 100
            else:
                percent = 0.0

            results.append({
                "symbol": symbol,
                "price": price,
                "percent": percent
            })
            print(f"Sucesso: {symbol} -> {price}")
            
        except Exception as e:
            print(f"Erro ao buscar {symbol}: {e}")
            results.append({"symbol": symbol, "price": 0, "percent": 0})
            
    return results

def get_crypto_data():
    results = []
    print("A obter dados de Crypto via CoinGecko...")
    try:
        ids = ",".join(CRYPTOS)
        url = f"https://api.coingecko.com/api/v3/simple/price?ids={ids}&vs_currencies=usd&include_24hr_change=true"
        response = requests.get(url, timeout=10)
        data = response.json()
        
        for coin in CRYPTOS:
            if coin in data:
                results.append({
                    "id": coin,
                    "price": data[coin]['usd'],
                    "percent": data[coin]['usd_24h_change']
                })
    except Exception as e:
        print(f"Erro ao buscar crypto: {e}")
    return results

if __name__ == "__main__":
    final_data = {
        "stocks": get_stock_data(),
        "crypto": get_crypto_data(),
        "last_updated": datetime.now().strftime("%d/%m/%Y %H:%M")
    }

    os.makedirs('assets/data', exist_ok=True)
    
    output_file = 'assets/data/market_data.json'
    with open(output_file, 'w') as f:
        json.dump(final_data, f, indent=2)

    print(f"Dados guardados em {output_file}")
