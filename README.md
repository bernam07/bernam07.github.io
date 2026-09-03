# Bernardo Martins - Portfolio 

[![Portfolio Status](https://img.shields.io/website?label=bernam07.github.io&style=flat-square&url=https%3A%2F%2Fbernam07.github.io)](https://bernam07.github.io)
[![GitHub](https://img.shields.io/badge/GitHub-bernam07-181717?style=flat-square&logo=github)](https://github.com/bernam07)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Bernardo%20Martins-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/bernardomfm/)

> **A personal portfolio showcasing my journey as a Software Developer, featuring real-time financial tracking and professional milestones.**

---

## 🌐 Live Demo
Check out the live website here: **[bernam07.github.io](https://bernam07.github.io)**
You can also access it through here: **[bernardomartins.me](https://bernardomartins.me)**

---

## 🛠️ About The Project

This portfolio was built to go beyond a simple resume. It serves as a central hub for my professional identity, technical projects, and personal interests.

### Key Features:
* **Professional Roadmap:** A visual timeline of my academic path (IPCA) and career at Deloitte.
* **Real-time Dashboard:** Tracks live stock positions. Prices are refreshed by a scheduled GitHub Action (Yahoo Finance) and converted to EUR client-side (CoinGecko FX rates).
* **Project Showcase:** A clean grid layout highlighting my work in C#, Python, and .NET.
* **Setup Tour:** A detailed look at my hardware and development environment.

---

## 💻 Tech Stack

This site is built with **Jekyll** and hosted on **GitHub Pages**, customized heavily from the *Chirpy* theme.

| Category      | Technologies                                                                                                                                                                                                                                                                                       |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core**      | ![Jekyll](https://img.shields.io/badge/Jekyll-CC0000?style=flat-square&logo=jekyll&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=sass&logoColor=white) |
| **Scripting** | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)                                                                                                                                                                                    |
| **APIs Used** | Yahoo Finance (stock prices, via `yfinance`), CoinGecko (EUR FX rates)                                                                                                                                                                                                                             |
| **Deploy**    | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)                                                                                                                                                                        |

---

## 📂 Project Structure

A quick look at how the code is organized based on my repository:

```text
.
├── _tabs/              # Content pages (Projects, Roadmap, Dashboard, Setup)
├── _includes/          # Custom HTML components (nav, footer, contact links)
├── _layouts/           # Page templates (default, page)
├── _data/              # Structured data (contact links)
├── assets/
│   ├── img/            # Profile picture, favicons, OG image
│   ├── css/            # Hand-written styles (main.scss)
│   ├── js/             # Site & dashboard scripts
│   └── data/           # Auto-generated market_data.json
├── scripts/            # fetch_data.py (Yahoo Finance fetcher)
├── .github/workflows/  # CI/CD configuration
└── _config.yml         # Main site configuration (SEO, plugins)
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ & 🍺 by <a href="https://github.com/bernam07">Bernardo Martins</a>
</p>
