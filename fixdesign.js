const fs = require('fs');

// File paths
const scssPath = 'src/app/pages/patients/patient-dossier/patient-dossier.component.scss';

// Update SCSS
let scss = fs.readFileSync(scssPath, 'utf8');
scss = scss.replace('$primary: #204131;', '$primary: var(--primary);');
scss = scss.replace('$primary-light: #306148;', '$primary-light: var(--primary-light);');
scss = scss.replace('$bg-main: #f4f6f8;', '$bg-main: var(--bg-color);');
scss = scss.replace('$text-main: #1f2937;', '$text-main: var(--text-primary);');
scss = scss.replace('$text-muted: #64748b;', '$text-muted: var(--text-secondary);');
scss = scss.replace('$border: #e2e8f0;', '$border: var(--border);');
scss = scss.replace('$dark-bar: #1c273a;', '$dark-bar: var(--primary);'); // Apply main green theme
scss = scss.replace('.patient-dossier-wrapper {', '.patient-dossier-wrapper {\\n  font-family: \\"Gilroy\\", sans-serif;');
fs.writeFileSync(scssPath, scss);
console.log('SCSS updated');
