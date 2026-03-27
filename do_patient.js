const fs = require('fs');

const htmlPath = 'src/app/pages/patients/patient-detail/patient-detail.component.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Rename 'Rapport patient' to 'Dossier patient' in line text
html = html.replace(/Rapport patient\n/g, "Dossier patient\n");
html = html.replace(/>Rapport patient</g, ">Dossier patient<");
html = html.replace(/              Rapport patient\n/g, "              Dossier patient\n");

// 2. Remove Discussion Tab
const discussionTabMatch = /<div class="nav-item" \[class\.active\]="activeTab === 'Discussion'"[^>]*>.*?<\/div>/s;
// Let's use string operations instead to be safe.
let startIdx = html.indexOf('<div class="nav-item" [class.active]="activeTab === \'Discussion\'"');
if (startIdx !== -1) {
  let endIdx = html.indexOf('</div>', startIdx) + 6;
  html = html.substring(0, startIdx) + html.substring(endIdx);
}

// 3. Remove <ng-container *ngIf="activeTab === 'Discussion'">
let contStart = html.indexOf('<ng-container *ngIf="activeTab === \'Discussion\'">');
if (contStart !== -1) {
  let contEnd = html.indexOf('</ng-container>', contStart) + 15;
  html = html.substring(0, contStart) + html.substring(contEnd);
}

// 4. Transform Ligne 1 grid
// We need to:
// a) Move Profil Patient to line 1
// b) Enhance Profil patient to show Eczema score, Symptom score, and IGA-ACHE score.
// c) Simplify Monitoring logic in Resume (just a very small block instead of big graphs).
// LIGNE 1 has "grid-row-3", but maybe we should make it "grid-row-3" with:
// Col 1: Dernier rapport
// Col 2: Profil patient (expanded)
// Col 3: Monitoring simple? Or what about "mes notes"? The user didn't mention it. Let's make "mes notes" go to line 2 maybe, or keep it in Ligne 1? The user said: "Ce qui fait que sur la même ligne, tu me mettrais les derniers rapports, le profil patient [...]. Et donc du coup, sur la partie résumée, tu ne me mettrais que deux mots de monitoring."

// Let's reconstruct the layout from "<!-- GRILLE PRINCIPALE (CARTES) -->"
const startMainGrid = html.indexOf('<!-- LIGNE 1 : 3 Colonnes -->');
const endMainGrid = html.indexOf('</div> <!-- / GRILLE PRINCIPALE -->');

if (startMainGrid !== -1 && endMainGrid !== -1) {

  // We rewrite entirely the grid layout to be perfectly satisfying
  const newGrid = `
    <!-- LIGNE 1 : 3 Colonnes -->
    <div class="grid-row-3">
      
      <!-- CARTE 1: DERNIER RAPPORT -->
      <div class="card">
        <div class="card-header">
          <div class="ch-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <h2>Derniers rapports</h2>
          </div>
        </div>
        <div class="card-body">
          <div class="report-item" (click)="openReport()" style="cursor: pointer;">
            <div class="left">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              Dossier patient 01.02.25
            </div>
            <button class="btn-icon">
              <svg class="icon-dl" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
          </div>
          <div class="report-item" (click)="openReport()" style="cursor: pointer;">
            <div class="left">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              Analyse mains 02.01.25
            </div>
            <button class="btn-icon">
              <svg class="icon-dl" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
          </div>
        </div>
        <div class="card-footer" style="margin-top:auto;">
          <button class="btn-action" (click)="setTab('Dossier patient')">Tous les dossiers</button>
        </div>
      </div>

      <!-- CARTE 2: PROFIL PATIENT (With Scores Highlights) -->
      <div class="card">
        <div class="card-header">
          <div class="ch-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <h2>Profil patient</h2>
          </div>
        </div>
        <div class="card-body" style="display:flex; flex-direction:column; gap:15px;">
           <div style="background: rgba(236,72,153,0.1); border-left: 4px solid #ec4899; padding: 12px; border-radius: 4px;">
              <div style="font-size:12px; color:#666; font-weight:600;">SCORE D'ECZÉMA</div>
              <div style="font-size:20px; font-weight:700; color:#ec4899; margin-top:2px;">Sévère</div>
           </div>
           <div style="background: rgba(245,158,11,0.1); border-left: 4px solid #f59e0b; padding: 12px; border-radius: 4px;">
              <div style="font-size:12px; color:#666; font-weight:600;">SCORE DE SYMPTÔMES</div>
              <div style="font-size:20px; font-weight:700; color:#b45309; margin-top:2px;">Élevé (8/10)</div>
           </div>
           <div style="background: rgba(32,65,49,0.1); border-left: 4px solid #204131; padding: 12px; border-radius: 4px;">
              <div style="font-size:12px; color:#666; font-weight:600;">SCORE IGA-ACHE</div>
              <div style="font-size:20px; font-weight:700; color:#204131; margin-top:2px;">Stade 4 (Sévère)</div>
           </div>
        </div>
      </div>

      <!-- CARTE 3: MONITORING (DEUX MOTS) -->
      <div class="card">
        <div class="card-header">
          <div class="ch-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            <h2>Monitoring</h2>
          </div>
        </div>
        <div class="card-body" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#204131" stroke-width="1" style="opacity:0.2; margin-bottom:15px;"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          <div style="font-size: 16px; font-weight: 600; color: #1a2233; margin-bottom: 5px;">Suivi stabilisé</div>
          <div style="font-size: 13px; color: #666;">Les données cliniques restent stables depuis le dernier contrôle.</div>
        </div>
        <div class="card-footer" style="margin-top:auto;">
          <button class="btn-action" (click)="setTab('Monitoring')">Accéder au monitoring</button>
        </div>
      </div>

    </div> <!-- / LIGNE 1 -->

    <!-- LIGNE 2 : SUIVI THERAPEUTIQUE & NOTES -->
    <div class="grid-row-2">
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

      <!-- CARTE : SUIVI THEPRAPEUTIQUE -->
      <div class="card">
        <div class="card-header">
          <div class="ch-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <h2>Protocole actuel</h2>
          </div>
        </div>
        <div class="card-body">
          <div class="protocol-item">
            <div class="date-badge">12/05</div>
            <div class="p-details">
              <h4>Crème Corticoïde 2%</h4>
              <p>Application locale 2x/jour pendant 2 semaines</p>
            </div>
          </div>
        </div>
      </div>
    </div> <!-- / LIGNE 2 -->

`;

  html = html.substring(0, startMainGrid) + newGrid + html.substring(endMainGrid);
}

fs.writeFileSync(htmlPath, html);
console.log("Updated Dashboard Resume tab.");
