---
layout: page
icon: fas fa-map-signs
order: 4
title: Roadmap
---

> "It's not about the destination, it's about the journey." 🚀

A timeline of my academic and professional milestones, balancing full-time work with higher education.

<div class="timeline">

  <div class="timeline-item future">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <span class="timeline-date">July 2027 (Expected)</span>
      <h3 class="timeline-title"><i class="fas fa-graduation-cap"></i> BSc Graduation</h3>
      <p>Expected completion of the Bachelor's Degree in <strong>Computer Systems Engineering</strong> at IPCA.</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-marker current"></div>
    <div class="timeline-content">
      <span class="timeline-date">September 2024</span>
      <h3 class="timeline-title"><i class="fas fa-university"></i> Enrolled in BSc Degree</h3>
      <p>Admitted to the Bachelor's Degree in <strong>Computer Systems Engineering</strong> at IPCA, continuing my academic specialization.</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <span class="timeline-date">July 2024</span>
      <h3 class="timeline-title"><i class="fas fa-certificate"></i> CTeSP Completion</h3>
      <p>Finished the Higher Professional Technical Course in <strong>Tecnologia e Inovação Informática</strong>.</p>
      <div class="highlight-badge"><i class="fas fa-star"></i> Final Grade: 16/20</div>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-marker work"></div>
    <div class="timeline-content">
      <span class="timeline-date">October 2022</span>
      <h3 class="timeline-title"><i class="fas fa-briefcase"></i> Joined Deloitte</h3>
      <p>Started working as a <strong>Developer</strong>. Balancing professional responsibilities with academic studies from day one.</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <span class="timeline-date">October 2022</span>
      <h3 class="timeline-title"><i class="fas fa-school"></i> Started Academic Journey</h3>
      <p>Enrolled in the CTeSP program at <strong>IPCA</strong> (Instituto Politécnico do Cávado e do Ave).</p>
    </div>
  </div>

</div>

<style>
  .timeline {
    position: relative;
    max-width: 800px;
    margin: 2rem auto;
    padding-left: 20px;
  }

  /* Linha Vertical */
  .timeline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 6px;
    width: 3px;
    background: var(--border-color);
    border-radius: 2px;
  }

  .timeline-item {
    position: relative;
    margin-bottom: 2.5rem;
    padding-left: 35px;
  }

  /* Bolinha (Marker) */
  .timeline-marker {
    position: absolute;
    left: 0;
    top: 5px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: var(--card-bg);
    border: 3px solid var(--link-color);
    z-index: 1;
  }

  /* Estilos Especiais para os Markers */
  .timeline-marker.current {
    background: var(--link-color);
    box-shadow: 0 0 0 4px rgba(0, 120, 212, 0.2);
  }

  .timeline-marker.work {
    border-color: #d4af37; /* Dourado para Trabalho */
  }

  .timeline-item.future .timeline-marker {
    border-color: var(--text-muted);
    border-style: dashed;
  }

  .timeline-item.future .timeline-content {
    opacity: 0.7;
  }

  /* Conteúdo */
  .timeline-content {
    background: var(--card-bg);
    padding: 15px 20px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    transition: transform 0.2s;
  }

  .timeline-content:hover {
    transform: translateX(5px);
    border-color: var(--link-color);
  }

  .timeline-date {
    display: block;
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 5px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .timeline-title {
    margin: 0 0 10px 0;
    font-size: 1.2rem;
    color: var(--heading-color);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .timeline-title i {
    font-size: 1rem;
    color: var(--link-color);
  }

  .timeline-content p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .highlight-badge {
    display: inline-block;
    margin-top: 10px;
    padding: 4px 10px;
    background: rgba(0, 128, 0, 0.1);
    color: #2ea44f;
    border-radius: 12px;
    font-weight: bold;
    font-size: 0.85rem;
    border: 1px solid rgba(0, 128, 0, 0.2);
  }
</style>