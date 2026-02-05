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
    <p>A social store management platform developed for IPCA's Social Services. Features inventory management, user requests, and admin dashboards. Built as a team project for university.</p>
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
    <p>This portfolio website! A static site featuring a real-time financial dashboard (Stocks/Crypto) and CS2 inventory showcase built with JavaScript and APIs.</p>
    <div class="tech-stack">
      <span class="badge">JavaScript</span>
      <span class="badge">Jekyll</span>
      <span class="badge">APIs</span>
      <span class="badge">GitHub Pages</span>
    </div>
    <div class="card-links">
      <a href="https://github.com/bernam07/bernam07.github.io" target="_blank"><i class="fab fa-github"></i> Repository</a>
    </div>
  </div>

  <div class="project-card">
    <div class="card-header">
      <i class="fas fa-robot card-icon"></i>
      <h3>G-Maps Lead Extractor</h3>
    </div>
    <p>Automated bot to scrape local business data for lead generation. Features infinite scrolling handling and CSV export for marketing integration.</p>
    <div class="tech-stack">
      <span class="badge">Python</span>
      <span class="badge">Selenium</span>
      <span class="badge">Pandas</span>
    </div>
    <div class="card-links">
      <a href="https://github.com/bernam07/gmaps-biz-scraper" target="_blank"><i class="fab fa-github"></i> Repository</a>
    </div>
  </div>

  <div class="project-card" style="opacity: 0.7; border-style: dashed;">
    <div class="card-header">
      <i class="fas fa-flask card-icon"></i>
      <h3>Work in Progress</h3>
    </div>
    <p>Currently developing a new tool related to system optimization. Stay tuned for updates!</p>
    <div class="tech-stack">
      <span class="badge">Coming Soon</span>
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
