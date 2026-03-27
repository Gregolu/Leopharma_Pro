const fs = require('fs');

let detailHtml = fs.readFileSync('src/app/pages/patients/patient-detail/patient-detail.component.html', 'utf8');

// The block to replace: Profil Patient
const startProfil = '<!-- CARTE : PROFIL PATIENT -->';
const endProfil = '<!-- LIGNE 2 : 2 Colonnes -->';

const originalProfilHtml = `<!-- CARTE : PROFIL PATIENT -->
      <div class="card">
        <div class="card-header">
          <div class="ch-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <h2>Profil patient</h2>
          </div>
        </div>
        <div class="card-body">
          <div class="eczema-profile">
            <div class="ep-col">
              <div class="ep-header">
                <span class="ep-title">Stade de l'eczéma</span>
                <span class="ep-value severe">
                  <div class="color-pastille pastille-severe" style="width: 8px; height: 8px; border-radius: 50%; background-color: currentColor; display: inline-block; margin-right: 4px;"></div>
                  Eczéma sévère
                </span>
              </div>
              <div class="ep-score-bar">
                <div class="ep-marker" style="left: 85%;"></div>
              </div>
              <div class="ep-labels">
                <span>Léger</span>
                <span>Modéré</span>
                <span>Sévère</span>
              </div>
            </div>
            
            <div class="ep-divider"></div>
            
            <div class="ep-col ep-scores">
               <div class="score-item">
                  <span class="score-val">72</span>
                  <span class="score-lbl">IGACHE</span>
               </div>
               <div class="score-item">
                  <span class="score-val">65</span>
                  <span class="score-lbl">BOHG</span>
               </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    `;

let idxProfilStart = detailHtml.indexOf(startProfil);
if (idxProfilStart > -1) {
    let idxProfilEnd = detailHtml.indexOf(endProfil, idxProfilStart);
    if(idxProfilEnd > -1) {
       detailHtml = detailHtml.substring(0, idxProfilStart) + originalProfilHtml + detailHtml.substring(idxProfilEnd);
    }
}


// The block to replace:  Questionnaires Patient & Mes notes
const startQuest = '<!-- CARTE : QUESTIONNAIRES PATIENT -->';
const endQuest = '<!-- LIGNE 3 : Nested (Gauche = Suivi/Etudes, Droite = Monitoring) -->';

const originalQuestNotesHtml = `<!-- CARTE : QUESTIONNAIRES PATIENT -->
      <div class="card">
        <div class="card-header">
          <div class="ch-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <h2>Questionnaires patient</h2>
          </div>
        </div>
        <div class="card-body">
          <div class="quest-stats">
            <div class="quest-stat-box green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <div class="q-content">
                <span class="q-num">10</span>
                <span class="q-label">complétés</span>
              </div>
            </div>
            <div class="quest-stat-box orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <div class="q-content">
                <span class="q-num">5</span>
                <span class="q-label">en attente</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn-action" (click)="setTab('Dossier patient')">Voir les questionnaires</button>
        </div>
      </div>

      <!-- CARTE : MES NOTES -->
      <div class="card card-notes">
        <div class="card-header">
          <div class="ch-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            <h2>Mes notes</h2>
          </div>
          <button class="btn-circle-edit" (click)="openNoteModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
          </button>
        </div>
        <div class="card-body">
          <div class="note-preview">
            <p>{{ noteContent }}</p>
          </div>
        </div>
      </div>

    </div>

    `;

let idxQuestStart = detailHtml.indexOf(startQuest);
if (idxQuestStart > -1) {
    let idxQuestEnd = detailHtml.indexOf(endQuest, idxQuestStart);
    if(idxQuestEnd > -1) {
       detailHtml = detailHtml.substring(0, idxQuestStart) + originalQuestNotesHtml + detailHtml.substring(idxQuestEnd);
    }
}

// The block to replace Suivi therapeutique et etudes
const startSuivi = '<!-- CARTE : SUIVI THERAPEUTIQUE -->';
const endSuivi = '<!-- COLONNE DROITE (Monitoring global) -->';

const originalSuiviHtml = `<!-- CARTE : SUIVI THERAPEUTIQUE -->
        <div class="card">
          <div class="card-header">
            <div class="ch-left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              <h2>Suivi thérapeutique</h2>
            </div>
          </div>
          <div class="card-body">
            <div class="unified-list">
              <div class="list-row">
                <div class="lr-left">
                  <div class="lr-vignette color-blue"></div>
                  <span class="lr-name">Dermocorticoïdes class II</span>
                </div>
                <div class="lr-actions">
                  <span class="lr-status lr-progress">En cours</span>
                  <button class="lr-btn">Détails</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn-action full-width" (click)="setTab('Suivi protocole')">Protocole de suivi</button>
          </div>
        </div>

        <!-- CARTE : ETUDES CLINIQUES -->
        <div class="card">
          <div class="card-header">
            <div class="ch-left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              <h2>Études cliniques</h2>
            </div>
          </div>
          <div class="card-body">
            <div class="unified-list">
              <div class="list-row">
                <div class="lr-left">
                  <div class="color-pastille pastille-trial-a" style="width: 8px; height: 8px; border-radius: 50%; display: inline-block;"></div>
                  <span class="lr-name">EczemaCare Trial A</span>
                </div>
                <div class="lr-actions">
                  <span class="lr-status lr-progress">En cours</span>
                  <button class="lr-btn" (click)="openStudyModal('EczemaCare Trial A', 'active', 'pastille-trial-a')">Voir l'avancement</button>
                </div>
              </div>
              <div class="list-row">
                <div class="lr-left">
                  <div class="lr-vignette color-green"></div>
                  <span class="lr-name">SkinLife ECP-4</span>
                </div>
                <div class="lr-actions">
                  <span class="lr-status lr-eligible">Éligible</span>
                  <button class="lr-btn lr-btn-primary" (click)="openStudyModal('SkinLife ECP-4', 'eligible', 'pastille-trial-b')">Envoyer consentement</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn-action full-width" (click)="setTab('Suivi protocole')">Voir toutes les études</button>
          </div>
        </div>

      </div>

      `;

let idxSuiviStart = detailHtml.indexOf(startSuivi);
if (idxSuiviStart > -1) {
    let idxSuiviEnd = detailHtml.indexOf(endSuivi, idxSuiviStart);
    if(idxSuiviEnd > -1) {
       detailHtml = detailHtml.substring(0, idxSuiviStart) + originalSuiviHtml + detailHtml.substring(idxSuiviEnd);
    }
}

// remove styling from grid rows to fallback on styles.scss
detailHtml = detailHtml.replace('<div class="grid-row-2" style="margin-top: 24px;">', '<div class="grid-row-2">');
detailHtml = detailHtml.replace('<div class="grid-row-nested" style="margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">', '<div class="grid-row-nested">');
detailHtml = detailHtml.replace('<div class="left-column" style="display: flex; flex-direction: column; gap: 24px;">', '<div class="left-column">');
detailHtml = detailHtml.replace('<div class="right-column" style="display: flex; flex-direction: column;">', '<div class="right-column">');

// Finally replace only Dernier rapport hardcoded styles
const startRapport = '<!-- CARTE : DERNIER RAPPORT -->';
const endRapport = '<!-- CARTE : PROFIL PATIENT -->';

const originalRapportHtml = `<!-- CARTE : DERNIER RAPPORT -->
      <div class="card">
        <div class="card-header">
          <div class="ch-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <h2>Dernier rapport</h2>
          </div>
        </div>
        <div class="card-body">
          <div class="report-item" (click)="openReport()">
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

      `;

let idxRapStart = detailHtml.indexOf(startRapport);
if (idxRapStart > -1) {
    let idxRapEnd = detailHtml.indexOf(endRapport, idxRapStart);
    if(idxRapEnd > -1) {
       detailHtml = detailHtml.substring(0, idxRapStart) + originalRapportHtml + detailHtml.substring(idxRapEnd);
    }
}


fs.writeFileSync('src/app/pages/patients/patient-detail/patient-detail.component.html', detailHtml);
console.log('Restored original styles classes for cards.');
