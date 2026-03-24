const fs = require('fs');

const TS_CONTENT = `
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent {
  activeTab = 'Résumé';
  tabs = ['Résumé', 'Dossier patient', 'Monitoring', 'Suivi thérapeutique', 'Réseau', 'Discussion'];

  setTab(t: string) {
    this.activeTab = t;
  }
}
`;

const SCSS_CONTENT = `
$primary: #204131;
$primary-light: #eef2f0;
$gray-50: #f8fafc;
$gray-100: #f1f5f9;
$gray-200: #e2e8f0;
$gray-400: #94a3b8;
$gray-600: #475569;
$gray-800: #1e293b;
$gray-900: #0f172a;
$success: #10b981;
$warning: #f59e0b;

:host {
  display: block;
  min-height: 100vh;
  background-color: $gray-50;
  font-family: 'Inter', system-ui, sans-serif;
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 40px;
}

// Header
.header-patient {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;

  .btn-back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: #fff;
    border: 1px solid $gray-200;
    border-radius: 12px;
    cursor: pointer;
    color: $gray-800;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);

    &:hover {
      background: $gray-50;
      border-color: $gray-400;
    }
  }

  .patient-info {
    flex: 1;

    .info-top {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 8px;

      h1 {
        font-size: 28px;
        font-weight: 700;
        color: $gray-900;
        margin: 0;
        letter-spacing: -0.02em;
      }
    }

    .info-bottom {
      display: flex;
      align-items: center;
      color: $gray-600;
      font-size: 15px;
      gap: 12px;

      .bullet {
        width: 4px;
        height: 4px;
        background-color: $gray-400;
        border-radius: 50%;
      }
    }
  }
}

.badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;

  &.active {
    background-color: rgba($success, 0.1);
    color: darken($success, 10%);
    border: 1px solid rgba($success, 0.2);
  }
}

// Navigation Tabs
.tabs-navigation {
  display: flex;
  gap: 40px;
  border-bottom: 2px solid $gray-100;
  margin-bottom: 40px;

  .tab {
    padding: 0 0 16px 0;
    color: $gray-600;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    transition: color 0.2s ease;

    &:hover {
      color: $gray-900;
    }

    &.active {
      color: $primary;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 4px;
        background-color: $primary;
        border-radius: 4px 4px 0 0;
      }
    }
  }
}

// Content Grid
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

// Card Standard
.card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.02);
  padding: 32px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 8px 30px rgba(0,0,0,0.06);
  }

  &.col-span-2 {
    grid-column: span 2;
    @media (max-width: 1200px) {
      grid-column: span 1;
    }
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 32px;

    svg {
      color: $primary;
    }

    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      color: $gray-900;
      letter-spacing: -0.01em;
    }
  }

  .card-body {
    flex: 1;
  }

  .card-footer {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid $gray-100;
    text-align: center;
    
    .btn-action {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: $primary;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      width: 100%;
      justify-content: center;

      &:hover {
        background: lighten($primary, 8%);
      }

      svg {
        width: 16px;
        height: 16px;
      }
    }
    .btn-action-outline {
      background: transparent;
      color: $primary;
      border: 1px solid $primary;
      &:hover { background: $primary-light; }
    }
  }
}

// Specific Blocks

// Rapports
.report-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: $gray-50;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid $gray-100;

  .left {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    font-weight: 500;
    color: $gray-800;

    svg { color: $gray-400; }
  }

  .icon-dl {
    color: $gray-400;
    cursor: pointer;
    &:hover { color: $primary; }
  }
}

// Discussion
.message-block {
  margin-bottom: 20px;
  
  .meta {
    font-size: 12px;
    font-weight: 600;
    color: $gray-600;
    margin-bottom: 6px;
  }
  
  .text {
    font-size: 15px;
    color: $gray-800;
    line-height: 1.6;
    background: $gray-50;
    padding: 16px;
    border-radius: 12px 12px 12px 0;
    border: 1px solid $gray-100;
  }

  &.own {
    .meta { text-align: right; }
    .text {
      background: $primary-light;
      color: $primary;
      border: none;
      border-radius: 12px 12px 0 12px;
    }
  }
}

// Notes
.note-preview {
  background: #FFFBEB;
  padding: 24px;
  border-radius: 12px;
  font-size: 15px;
  color: #92400E;
  line-height: 1.6;
  border: 1px solid #FEF3C7;

  .note-date {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #B45309;
  }
  
  p { margin: 0 0 8px 0; }
}

// Questionnaires
.stats-row {
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-top: 16px;

  .stat-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    .num {
      font-size: 40px;
      font-weight: 800;
      color: $gray-900;
    }
    
    .label {
      font-size: 14px;
      color: $gray-600;
      font-weight: 500;
    }

    &.success .num { color: $success; }
    &.warning .num { color: $warning; }
  }
}

// Profil
.patient-profile {
  .score-title {
    font-size: 14px;
    color: $gray-600;
    margin-bottom: 8px;
    font-weight: 500;
  }
  
  .score-value {
    font-size: 20px;
    font-weight: 700;
    color: $gray-900;
    margin-bottom: 32px;
  }

  .gauge-track {
    width: 100%;
    height: 12px;
    background: $gray-200;
    border-radius: 6px;
    overflow: hidden;
    display: flex;

    .seg-green { width: 33%; background: $success; }
    .seg-orange { width: 33%; background: $warning; }
    .seg-red { width: 34%; background: #EF4444; }
  }
  
  .gauge-marker {
    width: 16px;
    height: 16px;
    background: white;
    border: 3px solid #EF4444; // Positioned on red
    border-radius: 50%;
    margin-top: -14px;
    margin-left: 80%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.15);
  }
}

// Suivi
.therapeutic-followup {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: $primary-light;
  border-radius: 12px;
  margin-top: 24px;
  
  .left {
    display: flex;
    align-items: center;
    gap: 16px;
    color: $primary;
    font-weight: 600;
    font-size: 16px;

    .icon-wrapper {
      background: white;
      padding: 10px;
      border-radius: 8px;
      display: flex;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }
  }

  .icon-info { color: $primary; opacity: 0.6; cursor: pointer; }
}

// Etudes cliniques
.clinical-list {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .study-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: 1px solid $gray-100;
    
    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }

    .study-name {
      font-size: 15px;
      font-weight: 600;
      color: $gray-900;
    }

    .study-right {
      display: flex;
      align-items: center;
      gap: 24px;
      
      .status-text {
        font-size: 14px;
        font-weight: 500;
        color: $gray-600;
      }

      button {
        background: transparent;
        border: 1px solid $primary;
        color: $primary;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        width: 180px;

        &:hover {
          background: $primary;
          color: white;
        }

        &.transparent {
          border-color: transparent;
          color: $gray-400;
          &:hover { background: transparent; color: $gray-400; cursor: default; }
        }
      }
    }
  }
}

// Monitoring charts
.monitoring-charts {
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .chart {
    flex: 1;
    background: $gray-50;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid $gray-100;

    .chart-title {
      font-size: 14px;
      font-weight: 600;
      color: $gray-800;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
      
      .dot { width: 10px; height: 10px; border-radius: 50%; }
      .dot-green { background: $success; }
      .dot-blue { background: #3B82F6; }
      .dot-purple { background: #8B5CF6; }
    }

    .sparkline {
      width: 100%;
      height: 80px;
    }
  }
}
`;

const HTML_CONTENT = `
<div class="page-container">
  
  <!-- Header Patient -->
  <header class="header-patient">
    <button class="btn-back" routerLink="/dashboard">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    
    <div class="patient-info">
      <div class="info-top">
        <h1>Jean Dupont</h1>
        <span class="badge active">Actif</span>
      </div>
      <div class="info-bottom">
        <span>40 ans – 12/05/1986</span>
        <span class="bullet"></span>
        <span>06 12 34 56 78</span>
        <span class="bullet"></span>
        <span>jean.dupont@email.com</span>
      </div>
    </div>
  </header>

  <!-- Secondary Navigation -->
  <nav class="tabs-navigation">
    <div *ngFor="let tab of tabs" 
         class="tab" 
         [class.active]="activeTab === tab" 
         (click)="setTab(tab)">
      {{ tab }}
    </div>
  </nav>

  <!-- Main Content Area -->
  <div [ngSwitch]="activeTab">
    
    <!-- Tab: Résumé -->
    <div *ngSwitchCase="'Résumé'" class="dashboard-grid">

      <!-- SECTION 1 : DERNIERS RAPPORTS -->
      <div class="card">
        <div class="card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <h2>Derniers rapports</h2>
        </div>
        <div class="card-body">
          <div class="report-item">
            <div class="left">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              Rapport patient
            </div>
            <svg class="icon-dl" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </div>
          <div class="report-item">
            <div class="left">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              Rapport de monitoring
            </div>
            <svg class="icon-dl" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </div>
          <div class="report-item">
            <div class="left">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              Bilan sanguin
            </div>
            <svg class="icon-dl" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn-action">
            Voir tous les rapports
          </button>
        </div>
      </div>

      <!-- SECTION 2 : DERNIÈRE DISCUSSION -->
      <div class="card">
        <div class="card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <h2>Dernière discussion</h2>
        </div>
        <div class="card-body">
          <div class="message-block">
            <div class="meta">Patient - 11/05/2026 à 17:28</div>
            <div class="text">Bonjour, mes rougeurs sont revenues malgré la pommade, puis-je augmenter la dose ?</div>
          </div>
          <div class="message-block own">
            <div class="meta">Vous - 12/05/2026 à 13:07</div>
            <div class="text">N'augmentez pas la dose de cortisone, nous devons revoir la posologie lors d'une visite de suivi.</div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn-action btn-action-outline">
            Accéder à la discussion
          </button>
        </div>
      </div>

      <!-- SECTION 3 : MES NOTES -->
      <div class="card">
        <div class="card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          <h2>Mes notes</h2>
        </div>
        <div class="card-body">
          <div class="note-preview">
            <div class="note-date">Mise à jour : 02/05/2026</div>
            <p>Erythème persistant sur la face dorsale des mains. Mieux toléré depuis l'adaptation du traitement local.</p>
            <p>A surveiller : risque de surinfection au niveau des gerçures.</p>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn-action">
            Modifier la note
          </button>
        </div>
      </div>

      <!-- SECTION 4 : QUESTIONNAIRES PATIENT -->
      <div class="card">
        <div class="card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          <h2>Questionnaires patient</h2>
        </div>
        <div class="card-body" style="display: flex; align-items: center; justify-content: center;">
          <div class="stats-row" style="width: 100%;">
            <div class="stat-block success">
              <span class="num">10</span>
              <span class="label">complétés</span>
            </div>
            <div class="stat-block warning">
              <span class="num">5</span>
              <span class="label">en attente</span>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn-action">
            Voir les questionnaires
          </button>
        </div>
      </div>

      <!-- SECTION 5 : PROFIL PATIENT -->
      <div class="card">
        <div class="card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <h2>Profil patient</h2>
        </div>
        <div class="card-body">
          <div class="patient-profile">
            <div class="score-title">Stade de l'eczéma (HECSI)</div>
            <div class="score-value" style="color: #EF4444;">Sévère - Stade 3</div>
            
            <div class="score-title" style="margin-top: 32px;">Statut global</div>
            <div class="gauge-track">
              <div class="segment seg-green"></div>
              <div class="segment seg-orange"></div>
              <div class="segment seg-red"></div>
            </div>
            <div class="gauge-marker"></div>
          </div>
        </div>
      </div>

      <!-- SECTION 6 : SUIVI THERAPEUTIQUE -->
      <div class="card">
        <div class="card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
          <h2>Suivi thérapeutique</h2>
        </div>
        <div class="card-body">
          <p style="font-size: 15px; color: #475569; margin: 0; line-height: 1.5;">Ce patient suit actuellement un protocole pour son eczéma des mains avec dermocorticoïdes.</p>
          <div class="therapeutic-followup">
            <div class="left">
              <div class="icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              Protocole Sévère
            </div>
            <svg class="icon-info" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn-action">
            Voir le protocole
          </button>
        </div>
      </div>

      <!-- SECTION 7 : ETUDES CLINIQUES -->
      <div class="card col-span-2">
        <div class="card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          <h2>Études cliniques</h2>
        </div>
        <div class="card-body">
          <p style="font-size: 15px; color: #475569; margin: 0 0 24px 0;">Ce patient est surveillé ou impliqué dans les essais cliniques suivants :</p>
          <div class="clinical-list">
            
            <div class="study-item">
              <span class="study-name">▸ EczemaCare Trial A</span>
              <div class="study-right">
                <span class="status-text">En cours</span>
                <button>Voir l'avancement</button>
              </div>
            </div>
            
            <div class="study-item">
              <span class="study-name">▸ DermaTop Topical Study</span>
              <div class="study-right">
                <span class="status-text">En attente</span>
                <button class="transparent"></button>
              </div>
            </div>
            
            <div class="study-item">
              <span class="study-name">▸ SkinLife ECP-4</span>
              <div class="study-right">
                <span class="status-text" style="color: #10B981;">Éligible</span>
                <button>Envoyer le consentement</button>
              </div>
            </div>
            
            <div class="study-item">
              <span class="study-name">▸ NewGen Biologics</span>
              <div class="study-right">
                <span class="status-text">Vérification</span>
                <button>Vérifier l'éligibilité</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- SECTION 8 : MONITORING -->
      <div class="card col-span-2">
        <div class="card-header" style="justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            <h2>Monitoring</h2>
          </div>
          <button class="btn-action" style="width: auto; padding: 10px 20px; border-radius: 8px;">Voir les alertes</button>
        </div>
        <div class="card-body">
          <p style="font-size: 15px; color: #475569; margin: 0 0 24px 0;">Aperçu des indicateurs clés sur les 30 derniers jours.</p>
          
          <div class="monitoring-charts">
            <div class="chart">
              <div class="chart-title"><div class="dot dot-green"></div> Score d'eczéma</div>
              <svg class="sparkline" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M0,35 Q20,10 40,25 T80,15 L100,5" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="100" cy="5" r="3" fill="#10b981"/>
                <line x1="0" y1="38" x2="100" y2="38" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="2,2"/>
              </svg>
            </div>
            
            <div class="chart">
              <div class="chart-title"><div class="dot dot-blue"></div> Qualité de vie</div>
              <svg class="sparkline" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M0,10 Q20,30 50,15 T80,25 L100,20" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="100" cy="20" r="3" fill="#3B82F6"/>
                <line x1="0" y1="38" x2="100" y2="38" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="2,2"/>
              </svg>
            </div>
            
            <div class="chart">
              <div class="chart-title"><div class="dot dot-purple"></div> Tolérance traitement</div>
              <svg class="sparkline" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M0,20 L30,20 L50,10 L70,30 L100,10" fill="none" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="100" cy="10" r="3" fill="#8B5CF6"/>
                <line x1="0" y1="38" x2="100" y2="38" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="2,2"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Autres onglets placeholders -->
    <div *ngSwitchDefault>
      <div class="card" style="align-items: center; justify-content: center; padding: 100px;">
        <h2 style="color: #0f172a; margin-bottom: 12px;">En construction</h2>
        <p style="color: #64748b; font-size: 16px;">La section <strong>{{ activeTab }}</strong> sera disponible prochainement.</p>
      </div>
    </div>

  </div>
</div>
`;

try {
  fs.writeFileSync('src/app/pages/patients/patient-detail/patient-detail.component.ts', TS_CONTENT);
  fs.writeFileSync('src/app/pages/patients/patient-detail/patient-detail.component.html', HTML_CONTENT);
  fs.writeFileSync('src/app/pages/patients/patient-detail/patient-detail.component.scss', SCSS_CONTENT);
  console.log('UI files written successfully.');
} catch (e) {
  console.error('Error writing files:', e);
}
