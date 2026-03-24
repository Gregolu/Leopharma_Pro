const fs = require('fs');

// 1. Patient Dossier HTML
const dossierPath = 'src/app/pages/patients/patient-dossier/patient-dossier.component.html';
let dossierHtml = fs.readFileSync(dossierPath, 'utf8');

if (!dossierHtml.includes('btn-download-zone')) {
  // Insert download button in the header
  dossierHtml = dossierHtml.replace(
    /<h2 class="q-main-title".*?>\{\{ activeQuestionnaireName \}\}<\/h2>/,
    `<div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
      <h2 class="q-main-title" style="margin-top:0; font-size: 1.5rem; color: var(--primary);">{{ activeQuestionnaireName }}</h2>
      <div class="btn-download-zone" (click)="downloadDossier()" style="cursor: pointer; display: flex; align-items: center; gap: 8px; background: #f8fafc; padding: 10px 16px; border-radius: 8px; border: 1px solid var(--border); transition: all 0.2s;">
        <i class="fas fa-file-download" style="color: var(--primary); font-size: 1.2rem;"></i>
        <strong style="color: var(--text-primary); font-size: 0.95rem;">Télécharger le dossier patient</strong>
      </div>
    </div>`
  );
  fs.writeFileSync(dossierPath, dossierHtml);
}

// 2. Patient Monitoring HTML
const monitoringPath = 'src/app/pages/patients/patient-monitoring/patient-monitoring.html';
let monitoringHtml = fs.readFileSync(monitoringPath, 'utf8');

if (!monitoringHtml.includes('btn-download-zone')) {
  monitoringHtml = monitoringHtml.replace(
    /<button class="btn-download">\s*<i class="fas fa-file-download"><\/i>\s*Télécharger le dossier patient\s*<\/button>/g,
    `<div class="btn-download-zone" (click)="downloadDossier()" style="cursor: pointer; display: flex; align-items: center; gap: 8px; background: #f8fafc; padding: 10px 16px; border-radius: 8px; border: 1px solid #cbd5e1; transition: all 0.2s;">
          <i class="fas fa-file-download" style="color: #204131; font-size: 1.2rem;"></i>
          <strong style="color: #1e293b; font-size: 0.95rem;">Télécharger le dossier patient</strong>
      </div>`
  );
  fs.writeFileSync(monitoringPath, monitoringHtml);
}

// 3. Add logic in patient-monitoring TS
const monitoringTsPath = 'src/app/pages/patients/patient-monitoring/patient-monitoring.ts';
let monitoringTs = fs.readFileSync(monitoringTsPath, 'utf8');
if (!monitoringTs.includes('downloadDossier')) {
  monitoringTs = monitoringTs.replace(/globalAlertOn = true;/, `globalAlertOn = true;

  downloadDossier() {
    window.open('assets/Dossierpatient.pdf', '_blank');
  }`);
  fs.writeFileSync(monitoringTsPath, monitoringTs);
}

console.log("Download logic patched.");
