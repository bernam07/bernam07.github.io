---
layout: page
icon: fas fa-code-branch
order: 4
title: Projects
---

> "Talk is cheap. Show me the code." – Linus Torvalds

Here are some of the projects I've worked on, ranging from university assignments to personal tools and professional contributions.

<div class="projects-grid">

  <div class="project-card">
    <div class="card-header">
      <i class="fas fa-shopping-cart card-icon"></i>
      <h3>Loja Social SAS</h3>
    </div>
    <p>A web-based platform developed for IPCA's Social Services to manage their social store. It includes comprehensive inventory tracking, user request handling, and dedicated administrator dashboards.</p>
    <div class="tech-stack">
      <span class="badge">C#</span>
      <span class="badge">ASP.NET Core</span>
      <span class="badge">MVC</span>
      <span class="badge">SQL Server</span>
    </div>
    <div class="card-links">
      <a href="https://github.com/joseegomes555/G7-LojaSas" target="_blank"><i class="fab fa-github"></i> Repository</a>
    </div>
  </div>

  <div class="project-card">
    <div class="card-header">
      <i class="fas fa-laptop-code card-icon"></i>
      <h3>Personal Dashboard</h3>
    </div>
    <p>The source code for this portfolio! A static website generated with Jekyll, featuring a completely automated, real-time stock market tracker powered by Python scripts via GitHub Actions.</p>
    <div class="tech-stack">
      <span class="badge">JavaScript</span>
      <span class="badge">Python</span>
      <span class="badge">Jekyll</span>
      <span class="badge">GitHub Actions</span>
    </div>
    <div class="card-links">
      <a href="https://github.com/bernam07/bernam07.github.io" target="_blank"><i class="fab fa-github"></i> Repository</a>
    </div>
  </div>

  <div class="project-card">
    <div class="card-header">
      <i class="fas fa-robot card-icon"></i>
      <h3>MT5 Trading Bot</h3>
    </div>
    <p>An algorithmic trading bot for MetaTrader 5 (MT5). It leverages Machine Learning models (XGBoost) trained on stationary mathematical indicators (like ATR and Returns) to predict short-term market movements.</p>
    <div class="tech-stack">
      <span class="badge">Python</span>
      <span class="badge">XGBoost</span>
      <span class="badge">Telegram API</span>
    </div>
    <div class="card-links">
      <a href="https://github.com/bernam07/forex-signals" target="_blank"><i class="fab fa-github"></i> Repository</a>
    </div>
  </div>

  <div class="project-card">
    <div class="card-header">
      <i class="fas fa-music card-icon"></i>
      <h3>Eclipse Player</h3>
    </div>
    <p>A minimalist, standalone local music player built with Electron, Vite, and TypeScript. Features a sleek dark/neon theme, a dynamic vinyl with a real-time audio visualizer, and automatic lyrics fetching.</p>
    <div class="tech-stack">
      <span class="badge">Electron</span>
      <span class="badge">TypeScript</span>
      <span class="badge">Vite</span>
      <span class="badge">CSS</span>
    </div>
    <div class="card-links">
      <a href="https://github.com/bernam07/eclipse-player" target="_blank"><i class="fab fa-github"></i> Repository</a>
    </div>
  </div>

</div>

<style>
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 2rem;
  }

  .project-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
    border-color: var(--link-color);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    color: var(--heading-color);
  }

  .card-icon {
    font-size: 1.5rem;
    color: var(--link-color);
  }

  .project-card h3 {
    margin: 0;
    font-size: 1.25rem;
  }

  .project-card p {
    font-size: 0.95rem;
    color: var(--text-color);
    opacity: 0.9;
    flex-grow: 1;
    margin-bottom: 15px;
    line-height: 1.5;
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 15px;
  }

  .badge {
    background-color: var(--tag-bg);
    color: var(--tag-color);
    font-size: 0.75rem;
    padding: 4px 8px;
    border-radius: 6px;
    font-family: monospace;
    border: 1px solid var(--border-color);
  }

  .card-links a {
    text-decoration: none;
    font-weight: bold;
    font-size: 0.9rem;
    color: var(--link-color);
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  
  .card-links a:hover {
    text-decoration: underline;
  }
</style>

<br>

> *Last updated: June 2026*