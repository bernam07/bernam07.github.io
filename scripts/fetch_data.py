import requests
import json
import os
import yfinance as yf
from datetime import datetime
import time

STOCKS = ['VUSA.L', 'NVDA', 'PLTR', 'NVO', 'SOFI', 'META', 'AMZN', 'O', 'ORCL']
CRYPTOS = ['ondo-finance', 'avalanche-2', 'cardano']
CS2_INVENTORY = [
    {
        "name": "★ Huntsman Knife | Gamma Doppler (Emerald)",
        "condition": "FN",
        "float": 0.0091,
        "image": "huntsman_emerald.png",
        "market_hash": "★ Huntsman Knife | Gamma Doppler (Factory New)"
    },
    {
        "name": "★ Flip Knife | Doppler (Phase 1)",
        "condition": "FN",
        "float": 0.0071,
        "image": "flip_doppler.png",
        "market_hash": "★ Flip Knife | Doppler (Factory New)"
    },
    {
        "name": "★ Broken Fang Gloves | Unhinged",
        "condition": "FT",
        "float": 0.1664,
        "image": "gloves_unhinged.png",
        "market_hash": "★ Broken Fang Gloves | Unhinged (Field-Tested)"
    },
    {
        "name": "★ Specialist Gloves | Lt. Commander",
        "condition": "FT",
        "float": 0.1820,
        "image": "gloves_commander.png",
        "market_hash": "★ Specialist Gloves | Lt. Commander (Field-Tested)"
    },
    {
        "name": "M4A1-S | Master Piece (Souvenir)",
        "condition": "FT",
        "float": 0.200,
        "image": "m4a1s_masterpiece.png",
        "market_hash": "Souvenir M4A1-S | Master Piece (Field-Tested)"
    },
    {
        "name": "AK-47 | B The Monster",
        "condition": "FT",
        "float": 0.1512,
        "image": "ak47_monster.png",
        "market_hash": "AK-47 | B The Monster (Field-Tested)"
    }
]

def get_stock_data():
    results = []
    print("\nA obter dados das ações via Yahoo Finance...")
    
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
            print(f"Sucesso: {symbol} -> ${price:.2f}")
            
        except Exception as e:
            print(f"Erro ao buscar {symbol}: {e}")
            results.append({"symbol": symbol, "price": 0, "percent": 0})
            
    return results

def get_crypto_data():
    results = []
    print("\nA obter dados de Crypto via CoinGecko...")
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
                print(f"Sucesso: {coin} -> ${data[coin]['usd']}")
    except Exception as e:
        print(f" Erro ao obter crypto: {e}")
    return results

def get_cs2_data():
    results = []
    print("\nA obter dados de CS2 via CSFloat...")
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    for item in CS2_INVENTORY:
        url = "https://csfloat.com/api/v1/listings"
        params = {"market_hash_name": item["market_hash"], "limit": 1}
        
        item_data = item.copy()
        
        try:
            response = requests.get(url, params=params, headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data and len(data) > 0:
                    price = data[0].get("price", 0) / 100
                    item_data["price"] = round(price, 2)
                    print(f"Sucesso: {item['name']} -> €{price:.2f}")
                else:
                    print(f"Sem listagens para: {item['name']}")
                    item_data["price"] = "N/A"
            else:
                print(f"Erro API CSFloat ({response.status_code}) para {item['name']}")
                item_data["price"] = "N/A"
                
        except Exception as e:
            print(f"Erro de conexão para {item['name']}: {e}")
            item_data["price"] = "N/A"
            
        results.append(item_data)
        
        time.sleep(1) 
            
    return results

if __name__ == "__main__":
    final_data = {
        "stocks": get_stock_data(),
        "crypto": get_crypto_data(),
        "cs2": get_cs2_data(),
        "last_updated": datetime.now().strftime("%d/%m/%Y %H:%M")
    }

    os.makedirs('assets/data', exist_ok=True)
    
    output_file = 'assets/data/market_data.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(final_data, f, indent=2, ensure_ascii=False)

    print(f"\nDados guardados com sucesso em {output_file}")