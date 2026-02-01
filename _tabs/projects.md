---
layout: page
icon: fas fa-code-branch
order: 3
title: Projects
---

> "Talk is cheap. Show me the code." – Linus Torvalds

Here are some of the projects I've worked on, ranging from university assignments to personal tools and professional contributions.

<div class="projects-grid">

  <div class="project-card">
    <div class="card-header">
      <i class="fas fa-university card-icon"></i>
      <h3>Academic System</h3>
    </div>
    <p>A comprehensive management system developed during my degree at IPCA. Handles student registrations, grades, and course schedules.</p>
    <div class="tech-stack">
      <span class="badge">C#</span>
      <span class="badge">.NET</span>
      <span class="badge">SQL Server</span>
    </div>
    <div class="card-links">
      <a href="https://github.com/bernam07" target="_blank"><i class="fab fa-github"></i> View Code</a>
    </div>
  </div>

  <div class="project-card">
    <div class="card-header">
      <i class="fas fa-robot card-icon"></i>
      <h3>Auto Scraper</h3>
    </div>
    <p>Python script to automate data extraction from financial websites. Used to track stock prices and generate alerts.</p>
    <div class="tech-stack">
      <span class="badge">Python</span>
      <span class="badge">Selenium</span>
      <span class="badge">Pandas</span>
    </div>
    <div class="card-links">
      <a href="#" target="_blank"><i class="fab fa-github"></i> View Code</a>
    </div>
  </div>

  <div class="project-card">
    <div class="card-header">
      <i class="fas fa-laptop-code card-icon"></i>
      <h3>Personal Dashboard</h3>
    </div>
    <p>This portfolio website! A static site featuring a real-time financial dashboard (Stocks/Crypto) and CS2 inventory showcase.</p>
    <div class="tech-stack">
      <span class="badge">JavaScript</span>
      <span class="badge">Jekyll</span>
      <span class="badge">APIs</span>
    </div>
    <div class="card-links">
      <a href="https://github.com/bernam07/bernam07.github.io" target="_blank"><i class="fab fa-github"></i> Repository</a>
    </div>
  </div>

  <div class="project-card">
    <div class="card-header">
      <i class="fas fa-gamepad card-icon"></i>
      <h3>CS2 Config Manager</h3>
    </div>
    <p>A simple tool to manage and swap Counter-Strike 2 config files and autoexecs based on different playstyles.</p>
    <div class="tech-stack">
      <span class="badge">Shell</span>
      <span class="badge">Lua</span>
    </div>
    <div class="card-links">
      <a href="#" target="_blank"><i class="fab fa-github"></i> View Code</a>
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
    background: var(--card-bg); /* Adapta-se ao tema Dark/Light */
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
  }
  
  .card-links a:hover {
    text-decoration: underline;
  }
</style>