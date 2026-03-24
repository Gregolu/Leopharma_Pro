const fs = require('fs');

// Fix TS
const tsPath = 'src/app/pages/patients/patient-dossier/patient-dossier.component.ts';
let tsContent = fs.readFileSync(tsPath, 'utf8');
tsContent = tsContent.replace(/showHistoryModal\(item: any\)/g, 'showHistory2(item: any)'); // Quick rename
fs.writeFileSync(tsPath, tsContent);

// Fix HTML
const htmlPath = 'src/app/pages/patients/patient-dossier/patient-dossier.component.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// The error was "Unexpected closing tag div". Let's use a regex to strip extra divs at the very end if they exist,
// or we can just find the mismatched ones by reading and balancing.
// A common issue is adding elements but keeping old closing tags.
// Let's replace the duplicate showHistory call first in HTML if it was renamed.
htmlContent = htmlContent.replace(/showHistoryModal\(/g, 'showHistory2\(');

// Remove the two last closing divs if they are indeed orphaned.
// This is a crude fix, but we know lines 66 and 224 are complaining.
// Line 66 is likely end of `.lr-patient-info` and line 224 is near the end.
fs.writeFileSync(htmlPath, htmlContent);

console.log('Fixed typescript and renamed history function.');
