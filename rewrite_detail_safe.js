const fs = require('fs');
const path = 'src/app/pages/patients/patient-detail/patient-detail.component.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Rename Rapport patient to sequence nav
html = html.replaceAll("activeTab === 'Rapport patient'", "activeTab === 'Dossier patient'");
html = html.replace("<span>Rapport patient</span>", "<span>Dossier patient</span>");

// 2. Remove Discussion from Nav
const discNavStart = `<div class="nav-item" [class.active]="activeTab === 'Discussion'"`;
if (html.includes(discNavStart)) {
    const navEnd = `<span>Discussion</span>\n      </div>`;
    let startIdx = html.indexOf(discNavStart);
    let endIdx = html.indexOf(navEnd) + navEnd.length;
    if (startIdx > -1 && endIdx > -1) {
        html = html.substring(0, startIdx) + html.substring(endIdx);
    }
}

// 3. Remove Discussion NgContainer completely
const discContStart = `<ng-container *ngIf="activeTab === 'Discussion'">`;
if (html.includes(discContStart)) {
    let startIdx = html.indexOf(discContStart);
    let checkNext = html.indexOf('<ng-container', startIdx + 10);
    if(checkNext === -1) checkNext = html.lastIndexOf('</ng-container>');
    
    // safe fallback
    if (checkNext > -1) {
       html = html.substring(0, startIdx) + html.substring(checkNext);
    }
}

const newDashboardGrid = `
<div class="dashboard-main-grid">

    <!-- LIGNE 1 : 2 Colonnes -->
    <div class="grid-row-2">
      
      <!-- CARTE : DERNIER RAPPORT -->
      <div class="card">
        <div class="card-header">
          <div class="ch-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <h2>Dernier rapport</h2>
          </div>
        </div>
        <div class="card-body">
          <div class="report-item" (click)="openReport()" style="cursor: pointer;">
            <div class="left">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              Dossier patient
            </div>
            <button class="btn-icon">
              <svg class="icon-dl" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- CARTE : PROFIL PATIENT -->
      <div class="card">
        <div class="card-header">
          <div class="ch-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <h2>Profil patient</h2>
          </div>
        </div>
        <div class="card-body">
          <div class="eczema-profile" style="display: flex; gap: 24px; align-items: stretch;">
            <!-- Score Eczéma (gauche) -->
            <div style="flex: 2;">
              <div class="ep-header">
                <span class="ep-title">Stade de l'eczéma</span>
                <div style="display:flex; align-items:center;"><div class="color-pastille pastille-severe" style="width: 12px; height: 12px; border-radius: 50%; background-color: #ec4899; display: inline-block; margin-right: 8px;"></div> <span class="ep-value severe" style="background:transparent; color:#ec4899; padding:0; border:none; font-weight: 600;">Eczéma sévère</span></div>
              </div>
              <div class="ep-score-bar" style="margin-top: 12px; background: #f1f5f9; height: 8px; border-radius: 4px; position: relative;">
                <div class="ep-marker" style="left: 85%; width: 12px; height: 12px; border-radius: 50%; background: #ec4899; position: absolute; top: -2px; transform: translateX(-50%); border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.2);"></div>
              </div>
              <div class="ep-labels" style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #64748b; margin-top: 8px;">
                <span>Léger</span>
                <span>Modéré</span>
                <span>Sévère</span>
              </div>
            </div>
            
            <!-- Scores IGACHE & BOHG (droite) -->
            <div style="flex: 1; display: flex; gap: 16px;">
                <div style="flex: 1; background: #f8fafc; border-radius: 8px; padding: 12px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <span style="font-size: 1.5rem; font-weight: 700; color: #1e293b; line-height: 1;">72</span>
                    <span style="font-size: 0.8rem; color: #64748b; font-weight: 600; margin-top: 4px;">IGACHE</span>
                </div>
                <div style="flex: 1; background: #f8fafc; border-radius: 8px; padding: 12px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <span style="font-size: 1.5rem; font-weight: 700; color: #1e293b; line-height: 1;">65</span>
                    <span style="font-size: 0.8rem; color: #64748b; font-weight: 600; margin-top: 4px;">BOHG</span>
                </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- LIGNE 2 : 2 Colonnes -->
    <div class="grid-row-2" style="margin-top: 24px;">
      
      <!-- CARTE : QUESTIONNAIRES PATIENT -->
      <div class="card">
        <div class="card-header">
          <div class="ch-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <h2>Questionnaires patient</h2>
          </div>
        </div>
        <div class="card-body">
          <div class="quest-stats" style="display: flex; gap: 16px;">
            <div class="quest-stat-box green" style="flex: 1; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; display: flex; align-items: center; gap: 12px; background: #f0fdf4;">
              <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="3" style="width: 24px; height: 24px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <div class="q-content" style="display: flex; flex-direction: column;">
                <span class="q-num" style="font-size: 1.25rem; font-weight: 700; color: #15803d; line-height: 1;">10</span>
                <span class="q-label" style="font-size: 0.85rem; color: #166534; font-weight: 500; margin-top: 4px;">complétés</span>
              </div>
            </div>
            <div class="quest-stat-box orange" style="flex: 1; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; display: flex; align-items: center; gap: 12px; background: #fff7ed;">
              <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="3" style="width: 24px; height: 24px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <div class="q-content" style="display: flex; flex-direction: column;">
                <span class="q-num" style="font-size: 1.25rem; font-weight: 700; color: #c2410c; line-height: 1;">5</span>
                <span class="q-label" style="font-size: 0.85rem; color: #9a3412; font-weight: 500; margin-top: 4px;">en attente</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer" style="padding: 16px 24px; border-top: 1px solid #e2e8f0;">
          <button class="btn-action" style="color: #204131; font-weight: 600; font-size: 0.95rem; background: transparent; border: none; cursor: pointer; padding: 0;" (click)="setTab('Dossier patient')">Voir les questionnaires</button>
        </div>
      </div>

      <!-- CARTE : MES NOTES -->
      <div class="card card-notes">
        <div class="card-header">
          <div class="ch-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            <h2>Mes notes</h2>
          </div>
          <button class="btn-circle-edit" (click)="openNoteModal()" style="width: 32px; height: 32px; border-radius: 50%; background: #f1f5f9; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748b;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
          </button>
        </div>
        <div class="card-body">
          <div class="note-preview" style="font-size: 0.95rem; color: #475569; line-height: 1.5; background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; height: calc(100% - 32px);">
            <p style="margin: 0;">{{ noteContent }}</p>
          </div>
        </div>
      </div>

    </div>

    <!-- LIGNE 3 : Nested (Gauche = Suivi/Etudes, Droite = Monitoring) -->
    <div class="grid-row-nested" style="margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
      
      <!-- COLONNE GAUCHE (L3: Suivi thérapeutique, L4: Etudes cliniques) -->
      <div class="left-column" style="display: flex; flex-direction: column; gap: 24px;">
        
        <!-- CARTE : SUIVI THERAPEUTIQUE -->
        <div class="card" style="flex: 1; display: flex; flex-direction: column;">
          <div class="card-header">
            <div class="ch-left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              <h2>Suivi thérapeutique</h2>
            </div>
          </div>
          <div class="card-body">
            <div class="unified-list">
              <div class="list-row" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                <div class="lr-left" style="display: flex; align-items: center; gap: 12px;">
                  <div class="lr-vignette color-blue" style="width: 8px; height: 8px; border-radius: 50%; background: #3b82f6;"></div>
                  <span class="lr-name" style="font-weight: 500; color: #1e293b;">Dermocorticoïdes class II</span>
                </div>
                <div class="lr-actions" style="display: flex; align-items: center; gap: 12px;">
                  <span class="lr-status lr-progress" style="font-size: 0.8rem; font-weight: 600; padding: 4px 8px; border-radius: 4px; background: #eff6ff; color: #2563eb;">En cours</span>
                  <button class="lr-btn" style="background: white; border: 1px solid #cbd5e1; padding: 4px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 500; cursor: pointer;">Détails</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer" style="padding: 16px 24px; border-top: 1px solid #e2e8f0; margin-top: auto;">
            <button class="btn-action full-width" style="width: 100%; border: none; background: transparent; color: #204131; font-weight: 600; text-align: left; cursor: pointer; padding: 0" (click)="setTab('Suivi protocole')">Protocole de suivi</button>
          </div>
        </div>

        <!-- CARTE : ETUDES CLINIQUES -->
        <div class="card" style="flex: 1; display: flex; flex-direction: column;">
          <div class="card-header">
            <div class="ch-left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              <h2>Études cliniques</h2>
            </div>
          </div>
          <div class="card-body">
            <div class="unified-list">
              <div class="list-row" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                <div class="lr-left" style="display: flex; align-items: center; gap: 12px;">
                  <div class="color-pastille pastille-trial-a" style="width: 8px; height: 8px; border-radius: 50%; background: #8b5cf6;"></div>
                  <span class="lr-name" style="font-weight: 500; color: #1e293b;">EczemaCare Trial A</span>
                </div>
                <div class="lr-actions" style="display: flex; align-items: center; gap: 12px;">
                  <span class="lr-status lr-progress" style="font-size: 0.8rem; font-weight: 600; padding: 4px 8px; border-radius: 4px; background: #eff6ff; color: #2563eb;">En cours</span>
                  <button class="lr-btn" style="background: white; border: 1px solid #cbd5e1; padding: 4px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 500; cursor: pointer;" (click)="openStudyModal('EczemaCare Trial A', 'active', 'pastille-trial-a')">Voir l'avancement</button>
                </div>
              </div>
              <div class="list-row" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0;">
                <div class="lr-left" style="display: flex; align-items: center; gap: 12px;">
                  <div class="lr-vignette color-green" style="width: 8px; height: 8px; border-radius: 50%; background: #22c55e;"></div>
                  <span class="lr-name" style="font-weight: 500; color: #1e293b;">SkinLife ECP-4</span>
                </div>
                <div class="lr-actions" style="display: flex; align-items: center; gap: 12px;">
                  <span class="lr-status lr-eligible" style="font-size: 0.8rem; font-weight: 600; padding: 4px 8px; border-radius: 4px; background: #f0fdf4; color: #166534;">Éligible</span>
                  <button class="lr-btn lr-btn-primary" style="background: #204131; border: none; color: white; padding: 4px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 500; cursor: pointer;" (click)="openStudyModal('SkinLife ECP-4', 'eligible', 'pastille-trial-b')">Envoyer consentement</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer" style="padding: 16px 24px; border-top: 1px solid #e2e8f0; margin-top: auto;">
            <button class="btn-action full-width" style="width: 100%; border: none; background: transparent; color: #204131; font-weight: 600; text-align: left; cursor: pointer; padding: 0" (click)="setTab('Suivi protocole')">Voir toutes les études</button>
          </div>
        </div>

      </div>

      <!-- COLONNE DROITE (Monitoring global) -->
      <div class="right-column" style="display: flex; flex-direction: column;">
        
        <div class="card card-monitoring" style="flex: 1; display: flex; flex-direction: column;">
          <div class="card-header">
            <div class="ch-left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              <h2>Monitoring</h2>
            </div>
            <button style="border: none; background: #f8fafc; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 600; color: #204131; cursor: pointer;" (click)="setTab('Monitoring')">Voir le monitoring</button>
          </div>
          <div class="card-body card-body-monitoring" style="flex: 1; display: flex; flex-direction: column; gap: 24px;">
            
            <!-- Graphe 1: Score eczéma -->
            <div class="chart-block" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
               <div class="c-header" style="margin-bottom: 12px;">
                  <h3 style="margin: 0; font-size: 0.95rem; font-weight: 600; color: #1e293b;">Evolution des symptômes (IGA-CHE)</h3>
               </div>
               <div style="height: 120px; display: flex; flex-direction: column; position: relative;">
                 <svg viewBox="0 0 400 100" preserveAspectRatio="none" style="flex: 1; width: 100%; height: 100%; overflow: visible;">
                    <line x1="0" y1="20" x2="400" y2="20" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4" />
                    <line x1="0" y1="50" x2="400" y2="50" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4" />
                    <line x1="0" y1="80" x2="400" y2="80" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4" />
                    <polyline points="0,80 100,60 200,30 300,50 400,20" fill="none" stroke="#2563eb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="0" cy="80" r="4" fill="#2563eb"/>
                    <circle cx="100" cy="60" r="4" fill="#2563eb"/>
                    <circle cx="200" cy="30" r="4" fill="#2563eb"/>
                    <circle cx="300" cy="50" r="4" fill="#2563eb"/>
                    <circle cx="400" cy="20" r="4" fill="#2563eb"/>
                 </svg>
                 <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748b; margin-top: 8px;">
                    <span>J-4</span>
                    <span>J-3</span>
                    <span>J-2</span>
                    <span>J-1</span>
                    <span>Aujourd'hui</span>
                 </div>
               </div>
            </div>

            <!-- Graphe 2: Qualité de vie -->
            <div class="chart-block" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
               <div class="c-header" style="margin-bottom: 12px;">
                  <h3 style="margin: 0; font-size: 0.95rem; font-weight: 600; color: #1e293b;">Evolution de la qualité de vie (BoHG)</h3>
               </div>
               <div style="height: 120px; display: flex; flex-direction: column; position: relative;">
                 <svg viewBox="0 0 400 100" preserveAspectRatio="none" style="flex: 1; width: 100%; height: 100%; overflow: visible;">
                    <line x1="0" y1="20" x2="400" y2="20" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4" />
                    <line x1="0" y1="50" x2="400" y2="50" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4" />
                    <line x1="0" y1="80" x2="400" y2="80" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4" />
                    <polyline points="0,50 100,45 200,60 300,30 400,25" fill="none" stroke="#ec4899" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="0" cy="50" r="4" fill="#ec4899"/>
                    <circle cx="100" cy="45" r="4" fill="#ec4899"/>
                    <circle cx="200" cy="60" r="4" fill="#ec4899"/>
                    <circle cx="300" cy="30" r="4" fill="#ec4899"/>
                    <circle cx="400" cy="25" r="4" fill="#ec4899"/>
                 </svg>
                 <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748b; margin-top: 8px;">
                    <span>J-4</span>
                    <span>J-3</span>
                    <span>J-2</span>
                    <span>J-1</span>
                    <span>Aujourd'hui</span>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
`;

let tStart = html.indexOf('<div class="dashboard-main-grid">');
if (tStart > -1) {
    let tEnd = html.indexOf('</ng-container>', tStart);
    if (tEnd > -1) {
        html = html.substring(0, tStart) + newDashboardGrid + "\n  " + html.substring(tEnd);
    }
}
fs.writeFileSync(path, html);
console.log('Update HTML complete!');
