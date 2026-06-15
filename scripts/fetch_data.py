import json
import os
import yfinance as yf
from datetime import datetime

STOCKS = ['VUSA.L', 'NVDA', 'PLTR', 'NVO', 'SOFI', 'META', 'AMZN', 'O', 'ORCL']

def get_stock_data():
    results = []
    print("\n A obter dados das ações via Yahoo Finance...")
    
    for symbol in STOCKS:
        try:
            ticker = yf.Ticker(symbol)
            price = ticker.fast_info.last_price
            prev_close = ticker.fast_info.previous_close
            
            percent = ((price - prev_close) / prev_close) * 100 if prev_close and prev_close > 0 else 0.0

            results.append({
                "symbol": symbol,
                "price": price,
                "percent": percent
            })
            print(f" Sucesso: {symbol} -> ${price:.2f}")
            
        except Exception as e:
            print(f" Erro ao buscar {symbol}: {e}")
            results.append({"symbol": symbol, "price": 0, "percent": 0})
            
    return results

if __name__ == "__main__":
    final_data = {
        "stocks": get_stock_data(),
        "last_updated": datetime.now().strftime("%d/%m/%Y %H:%M")
    }

    os.makedirs('assets/data', exist_ok=True)
    
    output_file = 'assets/data/market_data.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(final_data, f, indent=2, ensure_ascii=False)

    print(f"\n Dados guardados com sucesso em {output_file}")