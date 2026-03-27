import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analyse',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="header-green">
      <div class="header-green-content">
        <div>
          <h1 class="page-title">Analyse</h1>
          <p class="subtitle">Vue d'ensemble et statistiques de l'étude clinique</p>
        </div>
        <div class="search-controls">
          <select class="study-select">
            <option>EndoLife - Eczéma Sévère</option>
            <option>DermaCare - Suivi Pédiatrique</option>
            <option>AllergieTest - Impact Environnemental</option>
          </select>
          <button class="btn-export">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Exporter
          </button>
        </div>
      </div>
      
      <div class="tabs-container">
        <button 
          *ngFor="let tab of tabs" 
          (click)="activeTab = tab.id" 
          [class.active]="activeTab === tab.id" 
          class="tab-btn">
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="dashboard-content">
      <div class="charts-grid-top">
        <div class="card chart-card">
          <div class="card-header">
            <h3>Courbes d'inclusion</h3>
            <button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
          </div>
          <div class="chart-area" style="height: 250px;">
            <svg viewBox="0 0 500 200" class="line-chart">
              <path class="line line-target" d="M 0 180 L 100 150 L 200 120 L 300 90 L 400 60 L 500 30" />
              <path class="line line-actual" d="M 0 180 L 100 160 L 200 100 L 300 80 L 400 75 L 500 50" />
              <g class="axes">
                <line x1="0" y1="200" x2="500" y2="200" stroke="#e5e7eb" stroke-width="2" />
                <line x1="0" y1="0" x2="0" y2="200" stroke="#e5e7eb" stroke-width="2" />
              </g>
              <text x="450" y="20" class="chart-label" fill="#6b7280">Jan</text>
              <text x="250" y="190" class="chart-label" fill="#6b7280">Mois</text>
            </svg>
            <div class="chart-legend inline-legend">
              <span class="legend-item"><span class="dot actual"></span>Inclusions actuelles</span>
              <span class="legend-item"><span class="dot target"></span>Objectif d'inclusions</span>
            </div>
          </div>
        </div>

        <div class="card chart-card">
          <div class="card-header">
            <h3>Statut moyen des questionnaires</h3>
            <button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
          </div>
          <div class="chart-area pie-chart-area">
            <svg viewBox="0 0 32 32" class="pie-chart">
              <circle r="16" cx="16" cy="16" fill="#e5e7eb"></circle>
              <circle r="16" cx="16" cy="16" fill="#204131" stroke-dasharray="75 100"></circle>
              <circle r="16" cx="16" cy="16" fill="#10b981" stroke-dasharray="40 100" stroke-dashoffset="-75"></circle>
            </svg>
            <div class="pie-legend">
              <div class="legend-item"><span class="dot completed"></span>Complété (52%)</div>
              <div class="legend-item"><span class="dot partial"></span>Partiel (28%)</div>
              <div class="legend-item"><span class="dot pending"></span>En attente (20%)</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card chart-card full-width">
        <div class="card-header">
          <h3>Taux de complétion par rubrique</h3>
          <button class="btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
        </div>
        <div class="chart-area bar-chart-area">
          <div class="bar-group" *ngFor="let stat of completionStats">
            <div class="bar-container">
              <div class="bar" [style.height.%]="stat.value">
                <span class="bar-value">{{stat.value}}%</span>
              </div>
            </div>
            <span class="bar-label">{{stat.label}}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: #f7f9fc;
      min-height: 100vh;
      font-family: inherit;
    }

    .header-green {
      background-color: #204131;
      padding: 40px 40px 0 40px;
      margin-top: -20px;
      color: white;
    }

    .header-green-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 30px;
    }

    .page-title {
      font-size: 32px;
      font-weight: 800;
      margin: 0;
      color: white;
    }

    .subtitle {
      color: rgba(255, 255, 255, 0.8);
      margin: 8px 0 0 0;
      font-size: 16px;
    }

    .search-controls {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .study-select {
      background: white;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 15px;
      color: #1a2233;
      font-weight: 600;
      min-width: 280px;
      outline: none;
      cursor: pointer;
    }

    .btn-export {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .btn-export:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .tabs-container {
      display: flex;
      gap: 32px;
      border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    }

    .tab-btn {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      font-size: 15px;
      font-weight: 600;
      padding: 16px 0;
      cursor: pointer;
      position: relative;
      transition: color 0.2s;
    }

    .tab-btn:hover {
      color: rgba(255, 255, 255, 0.9);
    }

    .tab-btn.active {
      color: white;
    }

    .tab-btn.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: white;
      border-radius: 3px 3px 0 0;
    }

    .dashboard-content {
      padding: 40px;
    }

    .charts-grid-top {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }

    .card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border: 1px solid #f3f4f6;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .card-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      color: #1a2233;
    }

    .btn-icon {
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
    }

    .btn-icon:hover {
      background: #f3f4f6;
    }

    .chart-area {
      position: relative;
    }

    /* LINE CHART SIMULATION */
    .line-chart {
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .line {
      fill: none;
      stroke-width: 3;
      stroke-linejoin: round;
      stroke-linecap: round;
    }
    .line-target {
      stroke: #d1d5db;
      stroke-dasharray: 6 6;
    }
    .line-actual {
      stroke: #204131;
    }
    .chart-label {
      font-size: 12px;
      font-family: inherit;
    }
    .inline-legend {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-top: 16px;
    }

    /* PIE CHART SIMULATION */
    .pie-chart-area {
      display: flex;
      align-items: center;
      gap: 24px;
      height: 250px;
    }
    .pie-chart {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      transform: rotate(-90deg);
    }
    .pie-legend {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* BAR CHART SIMULATION */
    .bar-chart-area {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      height: 300px;
      padding-top: 40px;
    }
    .bar-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
    }
    .bar-container {
      height: 200px;
      width: 48px;
      background: #f3f4f6;
      border-radius: 8px;
      display: flex;
      align-items: flex-end;
      margin-bottom: 12px;
      position: relative;
    }
    .bar {
      width: 100%;
      background: #204131;
      border-radius: 8px;
      transition: height 0.5s ease-out;
      position: relative;
    }
    .bar:hover {
      background: #162d22;
    }
    .bar-value {
      position: absolute;
      top: -24px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 13px;
      font-weight: 700;
      color: #1a2233;
    }
    .bar-label {
      font-size: 13px;
      color: #4b5563;
      text-align: center;
      max-width: 120px;
      font-weight: 500;
      line-height: 1.4;
    }

    /* UTILS */
    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #4b5563;
      font-weight: 500;
    }
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .dot.actual { background: #204131; }
    .dot.target { background: #d1d5db; }
    .dot.completed { background: #204131; }
    .dot.partial { background: #10b981; }
    .dot.pending { background: #e5e7eb; }
  `]
})
export class AnalyseComponent {
  activeTab = 'global';
  
  tabs = [
    { id: 'global', label: 'Global dashboard' },
    { id: 'treatment', label: 'Traitement et chirurgie' },
    { id: 'symptoms', label: 'Symptômes et qualité de vie' },
    { id: 'impact', label: 'Impact sociaux et économiques' }
  ];

  completionStats = [
    { label: 'Etat de santé de la main', value: 92 },
    { label: 'Analyse des symptômes', value: 85 },
    { label: 'Antécédents médicaux', value: 95 },
    { label: 'Traitements', value: 88 },
    { label: 'Antécédents familiaux', value: 75 },
    { label: 'Profession et cadre de vie', value: 90 },
    { label: 'Facteurs aggravants', value: 82 },
    { label: 'Impact fonctionnel', value: 68 },
    { label: 'Votre qualité de vie', value: 72 }
  ];
}
