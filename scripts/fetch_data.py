import requests
import json
import os
from datetime import datetime

# --- CONFIGURAÇÃO ---
STOCKS = ['NVDA', 'PLTR', 'NVO', 'SOFI', 'META', 'AMZN', 'O', 'ORCL'] 

CRYPTOS = ['ondo-finance', 'avalanche-2', 'cardano']

# Github Secrets
API_KEY = os.environ.get('FINNHUB_API_KEY')

def get_stock_data():
    results = []
    if not API_KEY:
        print("Erro: API Key não encontrada.")
        return results

    for symbol in STOCKS:
        try:
            url = f'https://finnhub.io/api/v1/quote?symbol={symbol}&token={API_KEY}'
            response = requests.get(url)
            data = response.json()
            # Guardar apenas o necessário
            results.append({
                "symbol": symbol,
                "price": data.get('c', 0),      # Current Price
                "percent": data.get('dp', 0)    # Percent Change
            })
        except Exception as e:
            print(f"Erro ao buscar {symbol}: {e}")
    return results

def get_crypto_data():
    results = []
    try:
        ids = ",".join(CRYPTOS)
        url = f"https://api.coingecko.com/api/v3/simple/price?ids={ids}&vs_currencies=usd&include_24hr_change=true"
        response = requests.get(url)
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

# --- EXECUÇÃO ---
final_data = {
    "stocks": get_stock_data(),
    "crypto": get_crypto_data(),
    "last_updated": datetime.now().strftime("%d/%m/%Y %H:%M")
}

# Criar pasta se não existir e salvar JSON
os.makedirs('assets/data', exist_ok=True)
with open('assets/data/market_data.json', 'w') as f:
    json.dump(final_data, f, indent=2)

print("Dados atualizados com sucesso!")
