const fs = require('fs');
const path = 'src/app/pages/patients/patient-monitoring/patient-monitoring.html';
const newHtml = `
<div class="monitoring-container" style="padding: 24px; max-width: 1400px; margin: 0 auto;">
  <div class="monitoring-header" style="margin-bottom: 32px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <h2 style="font-size: 1.5rem; color: #1e293b; font-weight: 700; margin-bottom: 8px;">Monitoring global</h2>
      <p style="color: #64748b; font-size: 0.95rem;">Suivi de l'évolution des scores IGA-CHE et BoHG</p>
    </div>
    <div class="monitoring-actions" style="display: flex; gap: 12px;">
      <button class="btn-secondary" style="background: white; border: 1px solid #cbd5e1; padding: 8px 16px; border-radius: 8px; font-weight: 600; color: #475569; display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        Derniers 30 jours
      </button>
      <button class="btn-secondary" style="background: white; border: 1px solid #cbd5e1; padding: 8px 16px; border-radius: 8px; font-weight: 600; color: #475569; display: flex; align-items: center; gap: 8px; cursor: pointer;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        Exporter
      </button>
    </div>
  </div>

  <div class="grid-row-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    
    <!-- CARD: SCORE IGA-CHE -->
    <div class="card card-graph" style="background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03); overflow: hidden;">
      <div class="card-header" style="padding: 16px 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
        <div class="ch-left" style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 36px; height: 36px; border-radius: 8px; background: #eff6ff; display: flex; align-items: center; justify-content: center; color: #2563eb;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.1rem; font-weight: 600; color: #1e293b;">Évolution IGA-CHE</h3>
            <span style="font-size: 0.85rem; color: #64748b;">Suivi du stade de l'eczéma</span>
          </div>
        </div>
      </div>
      <div class="card-body" style="padding: 24px;">
        <div class="chart-container" style="height: 300px; width: 100%; position: relative; border-bottom: 1px solid #e2e8f0; border-left: 1px solid #e2e8f0; padding-left: 8px; padding-bottom: 8px;">
          <!-- Graphique factice SVG pour IGA-CHE -->
          <svg viewBox="0 0 500 250" preserveAspectRatio="none" style="width: 100%; height: 100%; overflow: visible;">
            <!-- Guides horizontaux -->
            <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" stroke-width="1" />
            <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" stroke-width="1" />
            <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" stroke-width="1" />
            <line x1="0" y1="200" x2="500" y2="200" stroke="#f1f5f9" stroke-width="1" />
            <!-- Ligne de tendance -->
            <path d="M0 200 Q 50 180 100 150 T 200 120 T 300 80 T 400 90 T 500 50" fill="none" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/>
            <!-- Points de données -->
            <circle cx="0" cy="200" r="5" fill="white" stroke="#2563eb" stroke-width="2"/>
            <circle cx="100" cy="150" r="5" fill="white" stroke="#2563eb" stroke-width="2"/>
            <circle cx="200" cy="120" r="5" fill="white" stroke="#2563eb" stroke-width="2"/>
            <circle cx="300" cy="80" r="5" fill="white" stroke="#2563eb" stroke-width="2"/>
            <circle cx="400" cy="90" r="5" fill="white" stroke="#2563eb" stroke-width="2"/>
            <circle cx="500" cy="50" r="5" fill="#2563eb" stroke="white" stroke-width="2"/>
            <!-- Tooltip factice dernier point -->
            <g transform="translate(460, 20)">
              <rect width="40" height="24" rx="4" fill="#1e293b" />
              <text x="20" y="16" fill="white" font-size="12" font-weight="bold" text-anchor="middle">72</text>
            </g>
          </svg>
        </div>
        <div class="x-axis" style="display: flex; justify-content: space-between; margin-top: 12px; color: #64748b; font-size: 0.85rem; font-weight: 500;">
          <span>Sem -4</span>
          <span>Sem -3</span>
          <span>Sem -2</span>
          <span>Sem -1</span>
          <span style="color: #2563eb; font-weight: 700;">Aujourd'hui</span>
        </div>
      </div>
    </div>

    <!-- CARD: SCORE BOHG -->
    <div class="card card-graph" style="background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03); overflow: hidden;">
      <div class="card-header" style="padding: 16px 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
        <div class="ch-left" style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 36px; height: 36px; border-radius: 8px; background: #fdf2f8; display: flex; align-items: center; justify-content: center; color: #db2777;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.1rem; font-weight: 600; color: #1e293b;">Qualité de vie BoHG</h3>
            <span style="font-size: 0.85rem; color: #64748b;">Évolution de la charge mentale liée à la maladie</span>
          </div>
        </div>
      </div>
      <div class="card-body" style="padding: 24px;">
        <div class="chart-container" style="height: 300px; width: 100%; position: relative; border-bottom: 1px solid #e2e8f0; border-left: 1px solid #e2e8f0; padding-left: 8px; padding-bottom: 8px;">
          <!-- Graphique factice SVG pour BoHG -->
          <svg viewBox="0 0 500 250" preserveAspectRatio="none" style="width: 100%; height: 100%; overflow: visible;">
            <!-- Guides horizontaux -->
            <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" stroke-width="1" />
            <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" stroke-width="1" />
            <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" stroke-width="1" />
            <line x1="0" y1="200" x2="500" y2="200" stroke="#f1f5f9" stroke-width="1" />
            <!-- Ligne de tendance -->
            <path d="M0 150 L 100 130 L 200 160 L 300 100 L 400 110 L 500 60" fill="none" stroke="#db2777" stroke-width="3" stroke-linecap="round"/>
            <!-- Points de données -->
            <circle cx="0" cy="150" r="5" fill="white" stroke="#db2777" stroke-width="2"/>
            <circle cx="100" cy="130" r="5" fill="white" stroke="#db2777" stroke-width="2"/>
            <circle cx="200" cy="160" r="5" fill="white" stroke="#db2777" stroke-width="2"/>
            <circle cx="300" cy="100" r="5" fill="white" stroke="#db2777" stroke-width="2"/>
            <circle cx="400" cy="110" r="5" fill="white" stroke="#db2777" stroke-width="2"/>
            <circle cx="500" cy="60" r="5" fill="#db2777" stroke="white" stroke-width="2"/>
            <!-- Tooltip factice dernier point -->
            <g transform="translate(460, 30)">
              <rect width="40" height="24" rx="4" fill="#1e293b" />
              <text x="20" y="16" fill="white" font-size="12" font-weight="bold" text-anchor="middle">65</text>
            </g>
          </svg>
        </div>
        <div class="x-axis" style="display: flex; justify-content: space-between; margin-top: 12px; color: #64748b; font-size: 0.85rem; font-weight: 500;">
          <span>Sem -4</span>
          <span>Sem -3</span>
          <span>Sem -2</span>
          <span>Sem -1</span>
          <span style="color: #db2777; font-weight: 700;">Aujourd'hui</span>
        </div>
      </div>
    </div>

  </div>
</div>
`;
fs.writeFileSync(path, newHtml);
console.log('Update Monitoring HTML complete!');
