import json
import os
from datetime import datetime
import yfinance as yf

# Resolve paths safely regardless of where the script is executed
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
PORTFOLIO_FILE = os.path.join(ROOT_DIR, "_data", "portfolio.json")
OUTPUT_FILE = os.path.join(ROOT_DIR, "assets", "data", "market_data.json")

DEFAULT_PORTFOLIO = [
    {"ticker": "VUSA.L", "name": "Vanguard S&P 500 ETF", "avgPrice": 102.25},
    {"ticker": "NVDA", "name": "NVIDIA Corporation", "avgPrice": 117.62},
    {"ticker": "PLTR", "name": "Palantir Technologies", "avgPrice": 41.76},
    {"ticker": "NVO", "name": "Novo Nordisk", "avgPrice": 61.90},
    {"ticker": "SOFI", "name": "SoFi Technologies", "avgPrice": 14.35},
    {"ticker": "META", "name": "Meta Platforms", "avgPrice": 529.08},
    {"ticker": "AMZN", "name": "Amazon.com", "avgPrice": 178.70},
    {"ticker": "O", "name": "Realty Income Corp", "avgPrice": 50.51},
    {"ticker": "ORCL", "name": "Oracle Corporation", "avgPrice": 158.16},
]


def load_portfolio():
    if os.path.exists(PORTFOLIO_FILE):
        try:
            with open(PORTFOLIO_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"⚠️ Erro ao ler {PORTFOLIO_FILE}: {e}")
    return DEFAULT_PORTFOLIO


def get_exchange_rates():
    rates = {"usdToEur": 0.90, "gbpToEur": 1.18}
    print("--> A obter taxas de cambio via Yahoo Finance...")

    # USD to EUR
    try:
        usd_rate = yf.Ticker("USDEUR=X").fast_info.last_price
        if usd_rate and usd_rate > 0:
            rates["usdToEur"] = round(float(usd_rate), 4)
            print(f"   [+] USDEUR: {rates['usdToEur']}")
    except Exception as e:
        print(f"   [!] USDEUR fallback: {e}")

    # GBP to EUR
    try:
        gbp_rate = yf.Ticker("GBPEUR=X").fast_info.last_price
        if gbp_rate and gbp_rate > 0:
            rates["gbpToEur"] = round(float(gbp_rate), 4)
            print(f"   [+] GBPEUR: {rates['gbpToEur']}")
    except Exception as e:
        print(f"   [!] GBPEUR fallback: {e}")

    return rates


def convert_to_eur(raw_price, symbol, currency, rates):
    if raw_price is None or raw_price <= 0:
        return 0.0

    curr = (currency or "").upper()
    sym = symbol.upper()

    # London-listed stocks (GBp pence or GBP pounds)
    if sym.endswith(".L") or curr in ("GBP", "GBX", "GBPENCE"):
        price_gbp = raw_price / 100.0 if raw_price > 1000 else raw_price
        return round(price_gbp * rates["gbpToEur"], 2)

    # Already EUR
    if curr == "EUR":
        return round(raw_price, 2)

    # Default assumed USD
    return round(raw_price * rates["usdToEur"], 2)


def get_stock_data(portfolio, rates):
    results = []
    print("\n--> A obter dados das acoes via Yahoo Finance...")

    for item in portfolio:
        symbol = item.get("ticker")
        name = item.get("name", symbol)
        avg_price = float(item.get("avgPrice", 0.0))

        try:
            ticker = yf.Ticker(symbol)
            fast_info = ticker.fast_info
            price = fast_info.last_price
            prev_close = fast_info.previous_close
            currency = getattr(fast_info, "currency", "USD")

            if price is None:
                price = 0.0

            day_percent = (
                ((price - prev_close) / prev_close) * 100
                if prev_close and prev_close > 0
                else 0.0
            )

            price_eur = convert_to_eur(price, symbol, currency, rates)
            pl_percent = (
                ((price_eur - avg_price) / avg_price) * 100
                if avg_price > 0 and price_eur > 0
                else 0.0
            )

            stock_info = {
                "symbol": symbol,
                "name": name,
                "avgPrice": avg_price,
                "price": round(float(price), 2),
                "price_eur": price_eur,
                "currency": currency,
                "percent": round(float(day_percent), 2),
                "pl_percent": round(float(pl_percent), 2),
            }
            results.append(stock_info)
            print(
                f"   [+] {symbol:7} -> Raw: {price:8.2f} {currency:3} | Live: EUR {price_eur:8.2f} | P/L: {pl_percent:+6.1f}%"
            )

        except Exception as e:
            print(f"   [!] Erro ao buscar {symbol}: {e}")
            results.append({
                "symbol": symbol,
                "name": name,
                "avgPrice": avg_price,
                "price": 0.0,
                "price_eur": 0.0,
                "currency": "USD",
                "percent": 0.0,
                "pl_percent": 0.0,
            })

    return results


if __name__ == "__main__":
    portfolio = load_portfolio()
    rates = get_exchange_rates()
    stocks = get_stock_data(portfolio, rates)

    final_data = {
        "stocks": stocks,
        "rates": rates,
        "last_updated": datetime.now().strftime("%d/%m/%Y %H:%M"),
    }

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(final_data, f, indent=2, ensure_ascii=False)

    print(f"\n[+] Dados guardados com sucesso em {OUTPUT_FILE}")