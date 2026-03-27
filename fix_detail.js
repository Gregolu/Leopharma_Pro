const fs = require('fs');
const path = 'src/app/pages/patients/patient-detail/patient-detail.component.html';
const tsPath = 'src/app/pages/patients/patient-detail/patient-detail.component.ts';

// Update TS
let tsContent = fs.readFileSync(tsPath, 'utf8');
tsContent = tsContent.replace(
  "tabs = ['Résumé', 'Dossier patient', 'Monitoring', 'Suivi protocole', 'Réseau', 'Discussion'];",
  "tabs = ['Résumé', 'Dossier patient', 'Monitoring', 'Suivi protocole', 'Réseau'];"
);
fs.writeFileSync(tsPath, tsContent);

// Update HTML
let htmlContent = fs.readFileSync(path, 'utf8');

// Rename "Rapport patient" -> "Dossier patient"
htmlContent = htmlContent.replace(/Rapport patient/g, "Dossier patient");

// Remove Discussion section / div from Resume
// Needs regex or specific string replacements
// First let's check what's inside.
