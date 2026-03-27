const fs = require('fs');
const path = 'src/app/pages/patients/patient-detail/patient-detail.component.html';
const tsPath = 'src/app/pages/patients/patient-detail/patient-detail.component.ts';

// 1. Update TS: Remove "Discussion" from tabs
let tsContent = fs.readFileSync(tsPath, 'utf8');
tsContent = tsContent.replace(
  "tabs = ['Résumé', 'Dossier patient', 'Monitoring', 'Suivi protocole', 'Réseau', 'Discussion'];",
  "tabs = ['Résumé', 'Dossier patient', 'Monitoring', 'Suivi protocole', 'Réseau'];"
);
fs.writeFileSync(tsPath, tsContent);

// 2. Update HTML
let html = fs.readFileSync(path, 'utf8');

// Rename "Rapport patient" -> "Dossier patient"
html = html.replace(/Rapport patient/g, "Dossier patient");

// Remove "Discussion" section
const discussionRegex = /<div class="card card-discussion">[\s\S]*?<div class="card card-notes">/i;
if (discussionRegex.test(html)) {
  html = html.replace(discussionRegex, '<div class="card card-notes">');
} else {
  const commentRegex = /<!-- CARTE :\s*DERNIERE DISCUSSION\s*-->[\s\S]*?<!-- CARTE :\s*MES NOTES\s*-->/i;
  html = html.replace(commentRegex, '<!-- CARTE : MES NOTES -->');
}

// 3. Limit to 2 graphs in Résumé Monitoring section
const mbStart = html.indexOf('card-body-monitoring');
const mbEnd = html.indexOf('</div> <!-- / COLONNE DROITE -->');
if (mbStart > -1 && mbEnd > -1) {
    let mbSection = html.substring(mbStart, mbEnd);
    const g3Start = mbSection.indexOf('<!-- Graphe 3');
    if (g3Start > -1) {
       mbSection = mbSection.substring(0, g3Start) + "\n          </div>\n        </div>\n";
       html = html.substring(0, mbStart) + mbSection + html.substring(mbEnd);
    }
}

fs.writeFileSync(path, html);
console.log("patient detail cleaned up successfully.");
