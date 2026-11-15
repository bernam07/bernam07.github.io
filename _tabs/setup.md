---
layout: page
title: Setup
permalink: /setup/
---

<header class="page-hero wrap reveal">
  <div class="page-hero__meta">INDEX // 03 &mdash; HARDWARE &amp; SOFTWARE SETUP</div>
  <h1 class="serif-display">Working Environment</h1>
  <p>The workstation hardware, peripherals, and development toolchain used daily for systems engineering and university research.</p>
</header>

<section class="section section--tight wrap reveal">
  <div class="monograph-split">
    <div class="monograph-split__aside">
      <span class="sec-num">01 / WORKSTATION</span>
      <h2 class="serif-heading">Compute &amp; Display</h2>
      <p class="monograph-split__note">Primary desktop configuration for compilation, local containerization, and high-refresh display output.</p>
    </div>

    <div class="monograph-split__main">
      <div class="spec-table-wrap" role="region" aria-label="Workstation hardware specifications" tabindex="0">
        <table class="spec-table">
          <thead>
            <tr>
              <th scope="col">Subsystem</th>
              <th scope="col">Specification</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Processor (CPU)</th>
              <td>AMD Ryzen 7 5800X (8 Cores / 16 Threads)</td>
            </tr>
            <tr>
              <th scope="row">Graphics (GPU)</th>
              <td>NVIDIA GeForce RTX 3070</td>
            </tr>
            <tr>
              <th scope="row">Memory (RAM)</th>
              <td>16 GB DDR4 @ 3600 MHz</td>
            </tr>
            <tr>
              <th scope="row">Primary Storage</th>
              <td>500 GB NVMe PCIe Gen4 SSD</td>
            </tr>
            <tr>
              <th scope="row">Chassis</th>
              <td>NOX Infinity SIGMA</td>
            </tr>
            <tr>
              <th scope="row">Primary Display</th>
              <td>AOC AG251FZ2E &mdash; 24.5&Prime; @ 240 Hz</td>
            </tr>
            <tr>
              <th scope="row">Secondary Display</th>
              <td>AOC 27G2U5 &mdash; 27&Prime; IPS @ 75 Hz</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight wrap reveal">
  <div class="monograph-split">
    <div class="monograph-split__aside">
      <span class="sec-num">02 / INTERFACE</span>
      <h2 class="serif-heading">Peripherals &amp; Audio</h2>
      <p class="monograph-split__note">Tactile input devices and acoustic monitoring.</p>
    </div>

    <div class="monograph-split__main">
      <div class="spec-table-wrap" role="region" aria-label="Peripherals and audio specifications" tabindex="0">
        <table class="spec-table">
          <thead>
            <tr>
              <th scope="col">Device</th>
              <th scope="col">Model</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Mechanical Keyboard</th>
              <td>Razer BlackWidow V3 Tenkeyless</td>
            </tr>
            <tr>
              <th scope="row">Pointing Device</th>
              <td>SteelSeries Rival 650 Wireless</td>
            </tr>
            <tr>
              <th scope="row">Headphones</th>
              <td>Sony WH-1000XM4</td>
            </tr>
            <tr>
              <th scope="row">Microphone</th>
              <td>Logitech G Yeti GX</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight wrap reveal">
  <div class="monograph-split">
    <div class="monograph-split__aside">
      <span class="sec-num">03 / TOOLCHAIN</span>
      <h2 class="serif-heading">Software &amp; Stack</h2>
      <p class="monograph-split__note">Development environment, languages, and daily operational utilities.</p>
    </div>

    <div class="monograph-split__main">
      <div class="spec-matrix">
        <div class="spec-matrix__group">
          <div class="spec-matrix__label">CORE LANGUAGES &amp; FRAMEWORKS</div>
          <div class="spec-matrix__items">
            <span>TypeScript</span>
            <span>Python</span>
            <span>C# / .NET</span>
            <span>JavaScript</span>
            <span>Kotlin</span>
            <span>React 19</span>
            <span>Next.js 14</span>
            <span>Node.js</span>
            <span>Electron</span>
            <span>Tailwind CSS</span>
            <span>Supabase</span>
            <span>PostgreSQL</span>
            <span>SQL Server</span>
            <span>Jekyll</span>
          </div>
        </div>

        <div class="spec-matrix__group">
          <div class="spec-matrix__label">DEVELOPMENT ENVIRONMENT</div>
          <div class="spec-matrix__items">
            <span>Visual Studio Code</span>
            <span>Windows Terminal + PowerShell 7</span>
            <span>Git &amp; GitHub Actions</span>
            <span>Docker Desktop</span>
          </div>
        </div>

        <div class="spec-matrix__group">
          <div class="spec-matrix__label">OPERATIONS &amp; DOCUMENTATION</div>
          <div class="spec-matrix__items">
            <span>Norma (Daily Scratchpad)</span>
            <span>Notion</span>
            <span>Opera</span>
            <span>Discord &amp; Microsoft Teams</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <p class="last-updated">
    ENVIRONMENT REVISION // {{ site.time | date: '%B %Y' | upcase }}
  </p>
</section>
