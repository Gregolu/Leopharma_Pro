const fs = require('fs');

const SCSS_CONTENT = `
:host {
  display: block;
  min-height: 100vh;
  background-color: #F8FAFC; 
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.patient-header-section {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;

  .btn-back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    cursor: pointer;
    color: #1E293B;

    &:hover { background: #F1F5F9; }
  }

  h1 {
    font-size: 28px;
    font-weight: 800;
    color: #0F172A;
    margin: 0 0 6px 0;
  }

  p {
    margin: 0;
    color: #475569;
    font-size: 15px;
  }
}

.tabs-navigation {
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #E2E8F0;
  margin-bottom: 32px;

  .tab {
    padding: 0 0 16px 0;
    color: #64748B;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    position: relative;

    &.active {
      color: #0F172A;
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 3px;
        background-color: #84CC16;
        border-radius: 3px 3px 0 0;
      }
    }
  }
}

.layout-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card-section {
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  padding: 32px;

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;

    .icon-wrapper {
      color: #0F172A;
    }

    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: #0F172A;
    }
  }

  .card-content {
    margin-left: 36px;
  }
}

.action-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: #FFFFFF;
    border: 1px solid #CBD5E1;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    color: #334155;
    cursor: pointer;

    &:hover { background: #F8FAFC; }
    svg { width: 16px; height: 16px; }
  }
}

.discussion-preview {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;

  .message p {
    margin: 0;
    font-size: 15px;
    line-height: 1.5;
  }
  
  .meta {
    font-weight: 600;
    color: #0F172A;
    margin-bottom: 4px;
  }

  .text { color: #475569; }
}

.questionnaire-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;

  .stat-row {
    display: flex;
    align-items: center;
    gap: 12px;

    .number {
      font-size: 18px;
      font-weight: 700;
      color: #0F172A;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .label {
      color: #475569;
      font-size: 15px;
    }

    .icon-check { color: #10B981; font-size: 16px; }
    .icon-alert {
      color: #F87171;
      font-size: 12px;
    }
  }
}
`;

const HTML_CONTENT = `
<div class="page-container">
  <div class="patient-header-section">
    <button class="btn-back" routerLink="/dashboard">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    <div class="patient-identity">
      <h1>Jean Dupont</h1>
      <p>(40 ans) – 12/05/1986 &nbsp;|&nbsp; 06 12 34 56 78 &nbsp;|&nbsp; jean.dupont@email.com</p>
    </div>
  </div>

  <div class="tabs-navigation">
    <div class="tab" [class.active]="activeTab === 'Résumé'" (click)="setTab('Résumé')">Résumé</div>
    <div class="tab" [class.active]="activeTab === 'Dossier patient'" (click)="setTab('Dossier patient')">Dossier patient</div>
    <div class="tab" [class.active]="activeTab === 'Monitoring'" (click)="setTab('Monitoring')">Monitoring</div>
    <div class="tab" [class.active]="activeTab === 'Protocole de suivi'" (click)="setTab('Protocole de suivi')">Protocole de suivi</div>
    <div class="tab" [class.active]="activeTab === 'Recommandations'" (click)="setTab('Recommandations')">Recommandations</div>
    <div class="tab" [class.active]="activeTab === 'Discussion'" (click)="setTab('Discussion')">Discussion</div>
  </div>

  <div [ngSwitch]="activeTab">
    <div *ngSwitchCase="'Résumé'" class="layout-grid">
      
      <!-- Derniers rapports -->
      <div class="card-section">
        <div class="card-header">
          <div class="icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          </div>
          <h2>Derniers rapports</h2>
        </div>
        <div class="card-content">
          <div class="action-buttons">
            <button class="btn-outline">
              Bilan patient
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
            <button class="btn-outline">
              Fichier de suivi
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
            <button class="btn-outline">
              Rapport clinique
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Dernière discussion -->
      <div class="card-section">
        <div class="card-header">
          <div class="icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <h2>Dernière discussion</h2>
        </div>
        <div class="card-content">
          <div class="discussion-preview">
            <div class="message">
              <p class="meta">Jean Dupont - 11/05/2026 17:28</p>
              <p class="text">Bonjour, est-ce que ce rendez-vous sera le même que les précédents ou y aura-t-il autre chose ?</p>
            </div>
            <div class="message">
              <p class="meta">Vous - 12/05/2026 13:07</p>
              <p class="text">En plus des soins habituels, nous vous proposons de participer à un suivi renforcé pour votre traitement.</p>
            </div>
          </div>
          <div class="action-buttons">
            <button class="btn-outline">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg> Discussion
            </button>
          </div>
        </div>
      </div>

      <!-- Questionnaires -->
      <div class="card-section">
        <div class="card-header">
          <div class="icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <h2>Questionnaires - Dossier</h2>
        </div>
        <div class="card-content">
          <div class="questionnaire-stats">
            <div class="stat-row">
              <span class="number">10 <span class="icon-check">✓</span></span>
              <span class="label">sont déjà à jour</span>
            </div>
            <div class="stat-row">
              <span class="number">17 <span class="icon-alert">🔴</span></span>
              <span class="label">à compléter ou échus</span>
            </div>
          </div>
          <div class="action-buttons">
            <button class="btn-outline">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg> Questionnaires patient
            </button>
          </div>
        </div>
      </div>

    </div>
    
    <div *ngSwitchDefault>
      <div class="card-section">
        <h2>Contenu en cours de construction</h2>
      </div>
    </div>
  </div>
</div>
`;

fs.writeFileSync('src/app/pages/patients/patient-detail/patient-detail.component.html', HTML_CONTENT);
fs.writeFileSync('src/app/pages/patients/patient-detail/patient-detail.component.scss', SCSS_CONTENT);
console.log('Update Complete!');
