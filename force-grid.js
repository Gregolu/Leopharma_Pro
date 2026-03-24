const fs = require('fs');
const htmlPath = 'src/app/pages/patients/patient-dossier/patient-dossier.component.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Force grid layout to guarantee strictly two columns, impossible to wrap.
// And force min-width 0 to prevent main from pushing the grid.
html = html.replace(/<div class="patient-dossier-wrapper">/, '<div class="patient-dossier-wrapper" style="display: grid; grid-template-columns: 320px minmax(0, 1fr); min-height: 100vh; background: var(--bg-color);">');
html = html.replace(/<div class="sidebar-left">/, '<div class="sidebar-left" style="display: flex; flex-direction: column; border-right: 1px solid var(--border); overflow-y: auto;">');
html = html.replace(/<div class="main-content"[^>]*>/, '<div class="main-content" style="padding: 2rem; overflow-y: auto; display: block;">');

fs.writeFileSync(htmlPath, html);
console.log('Forced strict grid layout on dossier patient.');
