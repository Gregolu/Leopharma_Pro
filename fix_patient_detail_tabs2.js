const fs = require('fs');
const tsPath = 'src/app/pages/patients/patient-detail/patient-detail.component.html';
let html = fs.readFileSync(tsPath, 'utf8');

// Replace standard HTML for Report Patient to Dossier patient for the nav
html = html.replaceAll("activeTab === 'Rapport patient'", "activeTab === 'Dossier patient'");
// Also remove Discussion tab container entirely
const discussionStart = '<ng-container *ngIf="activeTab === \'Discussion\'">';
const idx = html.indexOf(discussionStart);
if (idx > -1) {
    const endTag = '</ng-container>';
    const lastIdx = html.indexOf(endTag, idx);
    if (lastIdx > -1) {
        html = html.substring(0, idx) + html.substring(lastIdx + endTag.length);
        console.log('Removed discussion container');
    }
}
fs.writeFileSync(tsPath, html);
