const fs = require('fs');

const tsPath = 'src/app/pages/patients/patient-detail/patient-detail.component.ts';
let tsCont = fs.readFileSync(tsPath, 'utf8');

if (!tsCont.includes('openReport()')) {
  tsCont = tsCont.replace(/saveNote\(\) \{[\s\S]*?\}/, `$&

  openReport() {
    window.open('images/Dossierpatient.pdf', '_blank');
  }`);
  fs.writeFileSync(tsPath, tsCont);
}

const htmlPath = 'src/app/pages/patients/patient-detail/patient-detail.component.html';
let htmlCont = fs.readFileSync(htmlPath, 'utf8');

// 1. "Accéder aux discussions" (or "Accéder à la discussion")
htmlCont = htmlCont.replace(
  /<button class="btn-action">(Accéder aux discussions|Accéder à la discussion)<\/button>/g,
  '<button class="btn-action" (click)="setTab(\'Discussion\')">$1</button>'
);

// 2. "Voir les questionnaires"
htmlCont = htmlCont.replace(
  /<button class="btn-action">Voir les questionnaires<\/button>/g,
  '<button class="btn-action" (click)="setTab(\'Dossier patient\')">Voir les questionnaires</button>'
);

// 3. "Protocole de suivi"
htmlCont = htmlCont.replace(
  /<button class="btn-action full-width">Protocole de suivi<\/button>/g,
  '<button class="btn-action full-width" (click)="setTab(\'Suivi protocole\')">Protocole de suivi</button>'
);

// 4. "Voir toutes les études"
htmlCont = htmlCont.replace(
  /<button class="btn-action full-width">Voir toutes les études<\/button>/g,
  '<button class="btn-action full-width" (click)="setTab(\'Suivi protocole\')">Voir toutes les études</button>'
);

// 5. "Voir mon monitoring"
htmlCont = htmlCont.replace(
  /<button class="btn-action">Voir mon monitoring<\/button>/g,
  '<button class="btn-action" (click)="setTab(\'Monitoring\')">Voir mon monitoring</button>'
);

// 6. Report "Rapport patient"
// The card body for report-item:
const reportItemRegex = /<div class="report-item">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/;
// We'll just replace the start of `<div class="report-item">`
htmlCont = htmlCont.replace(
  /<div class="report-item">/g,
  '<div class="report-item" (click)="openReport()" style="cursor: pointer;">'
);

fs.writeFileSync(htmlPath, htmlCont);
console.log('Fixed navigation in patient detail component.');
